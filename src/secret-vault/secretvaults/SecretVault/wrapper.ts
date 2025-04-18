import { createJWT, ES256KSigner } from 'did-jwt';
import { Buffer } from 'buffer';
import { NilQLWrapper } from '../nilQl/wrapper';
import { v4 as uuidv4 } from 'uuid';

interface Node {
  url: string;
  did: string;
}

interface OrgCredentials {
  orgDid: string;
  secretKey: string;
}

interface NodeConfig {
  url: string;
  jwt: string;
}

interface SchemaCreationResult {
  schemaId: string;
  [key: string]: any;
}

interface RecordGroup {
  shares: any[];
  recordIndex: string;
}

/**
 * SecretVaultWrapper manages distributed data storage across multiple nodes.
 * It handles node authentication, data distribution, and uses NilQLWrapper
 * for field-level encryption. Provides CRUD operations with built-in
 * security and error handling.
 *
 * @example
 * const vault = new SecretVaultWrapper(nodes, credentials, schemaId);
 * await vault.init();
 * await vault.writeToNodes(data, ['sensitiveField']);
 */
export class SecretVaultWrapper {
  private nodes: Node[];
  private nodesJwt: NodeConfig[] | null;
  private credentials: OrgCredentials;
  private schemaId: string | null;
  private operation: string;
  private tokenExpirySeconds: number;
  private nilqlWrapper: NilQLWrapper | null;

  constructor(
    nodes: Node[],
    credentials: OrgCredentials,
    schemaId: string | null = null,
    operation: string = 'store',
    tokenExpirySeconds: number = 3600
  ) {
    this.nodes = nodes;
    this.nodesJwt = null;
    this.credentials = credentials;
    this.schemaId = schemaId;
    this.operation = operation;
    this.tokenExpirySeconds = tokenExpirySeconds;
    this.nilqlWrapper = null;
  }

  /**
   * Initializes the SecretVaultWrapper by generating tokens for all nodes
   * and setting up the NilQLWrapper
   * @returns {Promise<NilQLWrapper>} Initialized NilQLWrapper instance
   */
  async init(): Promise<NilQLWrapper> {
    const nodeConfigs = await Promise.all(
      this.nodes.map(async (node: Node) => ({
        url: node.url,
        jwt: await this.generateNodeToken(node.did),
      }))
    );
    this.nodesJwt = nodeConfigs;
    this.nilqlWrapper = new NilQLWrapper({ nodes: this.nodes }, this.operation);
    await this.nilqlWrapper.init();
    return this.nilqlWrapper;
  }

  /**
   * Updates the schema ID for the SecretVaultWrapper
   * @param {string} schemaId - The new schema ID
   */
  setSchemaId(schemaId: string, operation: string = this.operation): void {
    this.schemaId = schemaId;
    this.operation = operation;
  }

  /**
   * Generates a JWT token for node authentication
   * @param {string} nodeDid - The DID of the node to generate token for
   * @returns {Promise<string>} JWT token
   */
  async generateNodeToken(nodeDid: string): Promise<string> {
    const signer = ES256KSigner(Buffer.from(this.credentials.secretKey, 'hex'));
    const payload = {
      iss: this.credentials.orgDid,
      aud: nodeDid,
      exp: Math.floor(Date.now() / 1000) + this.tokenExpirySeconds,
    };
    return await createJWT(payload, {
      issuer: this.credentials.orgDid,
      signer,
    });
  }

  /**
   * Generates tokens for all nodes and returns an array of objects containing node and token
   * @returns {Promise<Array<{ node: string, token: string }>>} Array of nodes with their corresponding tokens
   */
  async generateTokensForAllNodes(): Promise<Array<{ node: string, token: string }>> {
    const tokens = await Promise.all(
      this.nodes.map(async (node: Node) => {
        const token = await this.generateNodeToken(node.did);
        return { node: node.url, token };
      })
    );
    return tokens;
  }

  /**
   * Makes an HTTP request to a node's endpoint
   * @param {string} nodeUrl - URL of the node
   * @param {string} endpoint - API endpoint
   * @param {string} token - JWT token for authentication
   * @param {object} payload - Request payload
   * @returns {Promise<object>} Response data
   */
  async makeRequest(
    nodeUrl: string, 
    endpoint: string, 
    token: string, 
    payload: any, 
    method: string = 'POST'
  ): Promise<any> {
    try {
      const response = await fetch(`${nodeUrl}/api/v1/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: method === 'GET' ? null : JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${text}`
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return {
          status: response.status,
          ...data,
        };
      }
      return {
        status: response.status,
      };
    } catch (error) {
      const typedError = error as Error;
      console.error(
        `❌ Failed to ${method} ${endpoint} from ${nodeUrl}:`,
        typedError.message
      );
      const statusMatch = typedError.message.match(/status: (\d+)/);
      const bodyMatch = typedError.message.match(/body: ({.*})/);

      const errorJson = {
        status: statusMatch ? parseInt(statusMatch[1]) : null,
        error: bodyMatch ? JSON.parse(bodyMatch[1]) : { errors: [typedError] },
      };
      return errorJson;
    }
  }

  /**
   * Transforms data by encrypting specified fields across all nodes
   * @param {object|array} data - Data to transform
   * @param {array} fieldsToEncrypt - Fields to encrypt
   * @returns {Promise<array>} Array of transformed data for each node
   */
  async allotData(data: any[]): Promise<any[]> {
    if (!this.nilqlWrapper) {
      throw new Error('SecretVaultWrapper not initialized. Call init() first.');
    }
    const encryptedRecords = [];
    for (const item of data) {
      const encryptedItem = await this.nilqlWrapper.prepareAndAllot(item);
      encryptedRecords.push(encryptedItem);
    }
    return encryptedRecords;
  }

  /**
   * Flushes (clears) data from all nodes for the current schema
   * @returns {Promise<array>} Array of flush results from each node
   */
  async flushData(): Promise<any[]> {
    const results = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      const payload = { schema: this.schemaId };
      const result = await this.makeRequest(
        node.url,
        'data/flush',
        jwt,
        payload
      );
      results.push({ ...result, node });
    }
    return results;
  }

  /**
   * Lists schemas from all nodes in the org
   * @returns {Promise<array>} Array of schema results from each node
   */
  async getSchemas(): Promise<any[]> {
    const results = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      try {
        const result = await this.makeRequest(
          node.url,
          'schemas',
          jwt,
          {},
          'GET'
        );
        results.push({ ...result, node });
      } catch (error) {
        const typedError = error as Error;
        console.error(
          `❌ Failed to get schemas from ${node.url}:`,
          typedError.message
        );
        results.push({ error, node });
      }
    }
    return results;
  }

  /**
   * Creates a new schema on all nodes
   * @param {object} schema - The schema to create
   * @param {string} schemaName - The name of the schema
   * @param {string} schemaId - Optional: The ID of the schema
   * @returns {Promise<array>} Array of creation results from each node
   */
  async createSchema(
    schema: any, 
    schemaName: string, 
    schemaId: string | null = null
  ): Promise<SchemaCreationResult[]> {
    if (!schemaId) {
      schemaId = uuidv4();
    }
    const schemaPayload = {
      _id: schemaId,
      name: schemaName,
      schema,
    };
    const results: SchemaCreationResult[] = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      try {
        const result = await this.makeRequest(
          node.url,
          'schemas',
          jwt,
          schemaPayload
        );
        results.push({
          ...result,
          node,
          schemaId,
          name: schemaName,
        });
      } catch (error) {
        const typedError = error as Error;
        console.error(
          `❌ Error while creating schema on ${node.url}:`,
          typedError.message
        );
        results.push({ error, node, schemaId: '' });
      }
    }
    return results;
  }

  /**
   * Deletes a schema from all nodes
   * @param {string} schemaId - The ID of the schema to delete
   * @returns {Promise<array>} Array of deletion results from each node
   */
  async deleteSchema(schemaId: string): Promise<any[]> {
    const results = [];
    for (const node of this.nodes) {
      const jwt = await this.generateNodeToken(node.did);
      const result = await this.makeRequest(
        node.url,
        `schemas`,
        jwt,
        {
          id: schemaId,
        },
        'DELETE'
      );
      results.push({ ...result, node, schemaId });
    }
    return results;
  }

  /**
   * Writes data to all nodes, with optional field encryption
   * @param {array} data - Data to write
   * @returns {Promise<array>} Array of write results from each node
   */
  async writeToNodes(data: any[]): Promise<any[]> {
    // add a _id field to each record if it doesn't exist
    const idData = data.map((record: any) => {
      if (!record._id) {
        return { ...record, _id: uuidv4() };
      }
      return record;
    });
    const transformedData = await this.allotData(idData);
    const results = [];

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      try {
        const nodeData = transformedData.map((encryptedShares: any) => {
          if (encryptedShares.length !== this.nodes.length) {
            return encryptedShares[0];
          }
          return encryptedShares[i];
        });
        const jwt = await this.generateNodeToken(node.did);
        const payload = {
          schema: this.schemaId,
          data: nodeData,
        };
        const result = await this.makeRequest(
          node.url,
          'data/create',
          jwt,
          payload
        );

        results.push({
          ...result,
          node,
          schemaId: this.schemaId,
        });
      } catch (error) {
        console.log(error);
        const typedError = error as Error;
        console.error(`❌ Failed to write to ${node.url}:`, typedError.message);
        results.push({ node, error });
      }
    }

    return results;
  }

  /**
   * Reads data from all nodes with optional decryption of specified fields
   * @param {object} filter - Filter criteria for reading data
   * @returns {Promise<array>} Array of decrypted records
   */
  async readFromNodes(filter: Record<string, any> = {}): Promise<any[]> {
    const results = [];

    for (const node of this.nodes) {
      try {
        const jwt = await this.generateNodeToken(node.did);
        const payload = { schema: this.schemaId, filter };
        const result = await this.makeRequest(
          node.url,
          'data/read',
          jwt,
          payload
        );
        results.push({ ...result, node });
      } catch (error) {
        const typedError = error as Error;
        console.error(`❌ Failed to read from ${node.url}:`, typedError.message);
        results.push({ error, node });
      }
    }

    // Group records across nodes by _id
    const recordGroups = results.reduce((acc: RecordGroup[], nodeResult: any) => {
      nodeResult.data.forEach((record: any) => {
        const existingGroup = acc.find((group: RecordGroup) =>
          group.shares.some((share: any) => share._id === record._id)
        );
        if (existingGroup) {
          existingGroup.shares.push(record);
        } else {
          acc.push({ shares: [record], recordIndex: record._id });
        }
      });
      return acc;
    }, []);

    if (!this.nilqlWrapper) {
      throw new Error('SecretVaultWrapper not initialized. Call init() first.');
    }
    
    const recombinedRecords = await Promise.all(
      recordGroups.map(async (record: RecordGroup) => {
        const recombined = await this.nilqlWrapper!.unify(record.shares);
        return recombined;
      })
    );
    return recombinedRecords;
  }

  /**
   * Updates data on all nodes, with optional field encryption
   * @param {array} recordUpdate - Data to update
   * @param {object} filter - Filter criteria for which records to update
   * @returns {Promise<array>} Array of update results from each node
   */
  async updateDataToNodes(recordUpdate: any, filter: Record<string, any> = {}): Promise<any[]> {
    const results = [];

    const transformedData = await this.allotData([recordUpdate]);
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      try {
        const [nodeData] = transformedData.map((encryptedShares: any) => {
          if (encryptedShares.length !== this.nodes.length) {
            return encryptedShares[0];
          }
          return encryptedShares[i];
        });
        const jwt = await this.generateNodeToken(node.did);
        const payload = {
          schema: this.schemaId,
          update: {
            $set: nodeData,
          },
          filter,
        };
        const result = await this.makeRequest(
          node.url,
          'data/update',
          jwt,
          payload
        );
        results.push({ ...result, node });
      } catch (error) {
        const typedError = error as Error;
        console.error(`❌ Failed to write to ${node.url}:`, typedError.message);
        results.push({ error, node });
      }
    }
    return results;
  }

  /**
   * Deletes data from all nodes based on the provided filter
   * @param {object} filter - Filter criteria for which records to delete
   * @returns {Promise<array>} Array of deletion results from each node
   */
  async deleteDataFromNodes(filter: Record<string, any> = {}): Promise<any[]> {
    const results = [];

    for (const node of this.nodes) {
      try {
        const jwt = await this.generateNodeToken(node.did);
        const payload = { schema: this.schemaId, filter };
        const result = await this.makeRequest(
          node.url,
          'data/delete',
          jwt,
          payload
        );
        results.push({ ...result, node });
      } catch (error) {
        const typedError = error as Error;
        console.error(`❌ Failed to delete from ${node.url}:`, typedError.message);
        results.push({ error, node });
      }
    }
    return results;
  }
  
  /**
   * Retrieves a record by its ID
   * @param {string} id - The ID of the record to retrieve
   * @returns {Promise<any>} The retrieved record
   */
  async getById(id: string): Promise<any> {
    const results = await this.readFromNodes({ _id: id });
    if (results.length === 0) {
      return null;
    }
    return results[0];
  }
}
import { SecretVaultWrapper } from './secretvaults';
import { orgConfig } from './orgConfig';
import schema from './schema.json';

export interface StorePrivateKeyResponse {
  id: string;
  success: boolean;
}

export interface RetrievePrivateKeyResponse {
  privateKey: string;
  description?: string;
  createdAt?: string;
  success: boolean;
}

export class SecretVaultService {
  private secretVault: SecretVaultWrapper;
  private schemaId: string;
  private initialized: boolean = false;

  constructor() {
    this.schemaId = process.env.SCHEMA_ID || '';
    console.log('Schema ID:', this.schemaId);
    this.secretVault = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      this.schemaId
    );
  }

  public async init(): Promise<void> {
    try {
      if (!this.initialized) {
        await this.secretVault.init();
        
        // If no schema ID was provided, create a new schema
        if (!this.schemaId) {
          const newSchema = await this.secretVault.createSchema(schema, 'Web3 Private Keys Vault');
          this.schemaId = newSchema[0].schemaId;
          console.log('Created new schema with ID:', this.schemaId);
        }
        
        this.initialized = true;
      }
    } catch (error) {
      const typedError = error as Error;
      console.error('Failed to initialize SecretVaultService:', typedError.message);
      throw new Error(`Secret Vault initialization failed: ${typedError.message}`);
    }
  }

  /**
   * Store a private key in the secret vault
   * @param privateKey The private key to store (with or without '0x' prefix)
   * @param description Optional description for this private key
   * @returns The ID of the stored private key
   */
  public async storePrivateKey(privateKey: string, description?: string): Promise<StorePrivateKeyResponse> {
    try {
      if (!this.initialized) {
        await this.init();
      }

      // Remove '0x' prefix if present
      const cleanedKey = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;
      
      const data = [{
        private_key: { '%share': cleanedKey },
        description: description || 'Private key stored via SecretVaultService',
        created_at: new Date().toISOString()
      }];

      const result = await this.secretVault.writeToNodes(data);
      const newIds = [...new Set(result.map(item => item.data.created).flat())];
      
      if (newIds.length === 0) {
        throw new Error('Failed to store private key - no ID returned');
      }

      return {
        id: newIds[0],
        success: true
      };
    } catch (error) {
      const typedError = error as Error;
      console.error('Failed to store private key:', typedError.message);
      throw new Error(`Failed to store private key: ${typedError.message}`);
    }
  }

  /**
   * Retrieve a private key from the secret vault
   * @param id The ID of the stored private key
   * @returns The private key and metadata
   */
  public async retrievePrivateKey(id: string): Promise<RetrievePrivateKeyResponse> {
    try {
      if (!this.initialized) {
        await this.init();
      }

      const result = await this.secretVault.getById(id);
      
      if (!result || !result.private_key) {
        throw new Error(`No private key found with ID: ${id}`);
      }

      // Add '0x' prefix if not present
      const privateKey = result.private_key.startsWith('0x') ? 
        result.private_key : 
        `0x${result.private_key}`;

      return {
        privateKey,
        description: result.description,
        createdAt: result.created_at,
        success: true
      };
    } catch (error) {
      const typedError = error as Error;
      console.error('Failed to retrieve private key:', typedError.message);
      throw new Error(`Failed to retrieve private key: ${typedError.message}`);
    }
  }

  /**
   * List all private keys stored in the vault (returns only IDs and metadata, not the keys themselves)
   * @returns Array of private key entries with IDs and metadata
   */
  public async listPrivateKeys(): Promise<Array<{id: string, description?: string, createdAt?: string}>> {
    try {
      if (!this.initialized) {
        await this.init();
      }

      const results = await this.secretVault.readFromNodes({});
      
      return results.map(item => ({
        id: item._id,
        description: item.description,
        createdAt: item.created_at
      }));
    } catch (error) {
      const typedError = error as Error;
      console.error('Failed to list private keys:', typedError.message);
      throw new Error(`Failed to list private keys: ${typedError.message}`);
    }
  }
} 
# Nillion Secret Vault

The GOAT SDK integrates with Nillion to provide a secure private key storage solution powered by secure multi-party computation technology. This integration allows for enhanced security when working with blockchain wallets by storing private keys in a secure, distributed manner.

## Overview

Nillion's technology uses advanced cryptographic techniques to split sensitive data (like private keys) into multiple shares that are distributed across different nodes. This ensures that:

1. No single node has access to the complete private key
2. The key can only be reconstructed when explicitly requested with proper authentication
3. All operations using stored keys happen in secure enclaves

## API Endpoints

### Store a Private Key

```
POST /goat/storePrivateKey
```

This endpoint allows you to securely store a wallet private key in the Nillion secret vault.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| walletPrivateKey | string | Yes | The private key to store (with or without '0x' prefix) |
| description | string | No | Optional description for this key |

#### Example Request

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "description": "My Base mainnet wallet"
}
```

#### Example Response

```json
{
  "walletPrivateKeyId": "unique-id-for-the-key",
  "message": "Private key stored successfully"
}
```

### List Stored Private Keys

```
GET /goat/listPrivateKeys
```

This endpoint returns a list of all stored private keys (metadata only, not the actual keys).

#### Example Response

```json
{
  "keys": [
    {
      "id": "key-id-1",
      "description": "My Base mainnet wallet",
      "createdAt": "2023-07-15T12:34:56Z"
    },
    {
      "id": "key-id-2",
      "description": "My Polygon wallet",
      "createdAt": "2023-07-16T09:45:12Z"
    }
  ],
  "count": 2
}
```

## Using Stored Private Keys

When registering a new agent or making direct API calls, you can now use a `walletPrivateKeyId` instead of providing the actual private key.

### When Registering an Agent

```
POST /goat/registerAgent
```

```json
{
  "walletPrivateKeyId": "your-stored-key-id",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "chain": "base"
}
```

### When Making Direct API Calls

```
POST /goat/generate
```

```json
{
  "prompt": "Show my USDC balance",
  "walletPrivateKeyId": "your-stored-key-id",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "chain": "base"
}
```

## Technical Implementation

The Nillion integration is implemented through the `SecretVaultService` class. Key components include:

### NilQLWrapper

A wrapper for Nillion's NilQL library that provides encryption and decryption of data. It generates and manages secret keys, splits data into shares when encrypting, and recombines shares when decrypting.

### SecretVaultWrapper

Handles the communication with Nillion's network nodes. It creates schemas, initializes connections, and manages read/write operations to the secure vault.

### Schema

The secret vault uses a schema to define the structure of stored data:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Web3 Private Keys Vault",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "_id": {
        "type": "string",
        "format": "uuid",
        "coerce": true
      },
      "private_key": {
        "type": "object",
        "properties": {
          "%share": {
            "type": "string"
          }
        },
        "required": ["%share"]
      },
      "description": {
        "type": "string",
        "description": "Optional user-provided description for this private key"
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      }
    },
    "required": ["_id", "private_key"]
  }
}
```

## Security Considerations

- The private keys are never stored in plaintext on any single server
- Keys are encrypted and split into multiple shares using secure MPC
- The API server does not persist private keys in memory after use
- Always use HTTPS when making API calls to the GOAT SDK
- Never share your `walletPrivateKeyId` with untrusted parties
- Consider rotating keys periodically for improved security

## Configuration

The Nillion integration requires the following environment variables to be set:

- `ORG_SECRET_KEY`: Nillion organization secret key
- `ORG_DID`: Nillion organization DID (Decentralized Identifier)
- `SCHEMA_ID` (optional): ID of an existing schema to use. If not provided, a new schema will be created

## Error Handling

The Nillion integration includes robust error handling:

- Failed initialization of the secret vault service
- Failed storage of private keys
- Failed retrieval of private keys
- Failed listing of stored keys

All operations return standardized response objects with success indicators and error messages if applicable. 
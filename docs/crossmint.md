# Crossmint Headless Checkout Plugin

The Crossmint Headless Checkout plugin enables your AI agent to interact with Crossmint's NFT checkout system. It allows for purchasing NFTs, SFTs, and other tokenized items across multiple blockchains using a simple unified API.

## API Usage

There are two ways to use the Crossmint plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to NFT checkout operations.

#### Required Parameters

```json
{
  "prompt": "Your Crossmint-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "crossmintApiKey": "your-crossmint-api-key",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o",
  
  // Chain parameter is optional for Crossmint, as it determines only which wallet will execute transactions
  // It can be any supported chain: "mainnet", "base", "polygon", "sepolia", etc.
  "chain": "base" // Optional for Crossmint
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "crossmintApiKey": "your-crossmint-api-key",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o",
  "chain": "base"
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your Crossmint checkout query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Chains

Crossmint supports purchasing NFTs across multiple blockchains. You can connect with any of the supported chains to execute transactions:

### Source Chains (for payment)
- Ethereum (Mainnet and Sepolia)
- Base (Mainnet and Sepolia)
- Polygon (Mainnet and Amoy)
- Solana

### Destination Chains (for NFTs)
NFTs can be purchased on any of the source chains listed above, regardless of which chain your wallet is connected to.

## Available Tool and Example Prompts

### Buy Token

**Tool:** `buy_token`

Description: Buy a token such as an NFT, SFT or item tokenized by them, listed on any blockchain. Supports various payment methods and can deliver to either a wallet address or email recipient.

Example prompts:
- "Purchase NFT from collection:f165af36-7b65-41bb-8617-4c4acf553c5e using USDC on Polygon. Recipient address is 0xb98Ee84a0dcECf67399d0bca3C28A105EA0268e5 and Payer address is 0xc6DDE7CE20DfcCF6A2b8c998B066a3ce48911311"

## Parameters Format

The buy_token tool accepts the following parameter structure:

```json
{
  "recipient": {
    "walletAddress": "0x123..." // or
    "email": "user@example.com",
    "physicalAddress": { // Optional, for NFTs with physical items
      "name": "John Doe",
      "line1": "123 Main St",
      "line2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "US"
    }
  },
  "payment": {
    "method": "ethereum", // or "polygon", "base", "solana", etc.
    "currency": "usdc",
    "payerAddress": "0x123...",
    "receiptEmail": "receipt@example.com" // Optional
  },
  "lineItems": [
    {
      "collectionLocator": "ethereum:0x123..." // or
      "productLocator": "amazon:B12345678"
    }
  ]
}
```

## API Response Examples

When buying a token, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "buy_token",
      "result": {
        "order": {
          "orderId": "ord_123abc",
          "status": "pending",
          "payment": {
            "method": "ethereum",
            "status": "pending",
            "currency": "usdc"
          },
          "recipient": {
            "walletAddress": "0x123..."
          }
        },
        "txId": "0x456def789ghi123abc..."
      }
    }
  ],
  "response": "I've submitted your NFT purchase order. The transaction has been sent with hash 0x456def789ghi123abc... Once confirmed, the NFT will be delivered to your wallet address."
}
```

## Supported Features

### Payment Methods
- Ethereum (Mainnet and Sepolia)
- Base (Mainnet and Sepolia)
- Polygon (Mainnet and Amoy)
- Solana

### Payment Currencies
- USDC

### Delivery Options
- Direct to wallet address
- Email recipient (creates Crossmint wallet)
- Physical address delivery (US only, when applicable)

## About Crossmint

Crossmint is a platform that simplifies the process of buying and selling NFTs across multiple blockchains. It provides a unified checkout experience that works across different chains and can handle both digital and physical NFT deliveries.

Key features:
- Multi-chain support
- Email or wallet delivery
- Physical item fulfillment
- USDC payments
- Automated transaction handling

Note: Some NFTs may require physical address information for delivery. The plugin will indicate when this is required. 
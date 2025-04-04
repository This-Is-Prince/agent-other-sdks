# Crossmint Headless Checkout Plugin

The Crossmint Headless Checkout plugin enables your AI agent to interact with Crossmint's NFT checkout system. It allows for purchasing NFTs, SFTs, and other tokenized items across multiple blockchains using a simple unified API.

## API Usage

To use the Crossmint plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to NFT purchases.

### Required Parameters

```json
{
  "prompt": "Your Crossmint-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "crossmintApiKey": "your-crossmint-api-key"
}
```

## Available Tool and Example Prompts

### Buy Token

**Tool:** `buy_token`

Description: Buy a token such as an NFT, SFT or item tokenized by them, listed on any blockchain. Supports various payment methods and can deliver to either a wallet address or email recipient.

Example prompts:
- "Buy an NFT from collection 0x123... on Ethereum and send it to my wallet"
- "Purchase NFT using USDC on Polygon and deliver to bob@example.com"
- "Buy a Solana NFT from collection ABC and send to my address"
- "Purchase a Base NFT with physical item delivery to my US address"
- "Buy an NFT from collection XYZ on Ethereum Sepolia testnet"

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
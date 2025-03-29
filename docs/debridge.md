# DeBridge Plugin

The DeBridge plugin enables your AI agent to perform cross-chain operations and transfers between different blockchain networks.

## API Usage

To use the DeBridge plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to cross-chain transfers.

### Required Parameters

```json
{
  "prompt": "Your cross-chain transfer query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "debrigeBaseUrl": "https://your-debridge-api-endpoint.com" // Optional, default endpoint is used if not provided
}
```

## Available Tools and Example Prompts

The DeBridge plugin supports various cross-chain operations. Here are the primary functions and example prompts:

### Cross-Chain Transfers

**Tool:** `sendCrossChain`

Example prompts:
- "Send 100 USDC from Base to Ethereum mainnet"
- "Transfer 0.5 ETH from Base to Arbitrum"
- "Send 200 USDC to 0x1234... on Optimism"
- "Bridge 50 USDC to my wallet on Polygon"
- "Move 10 USDC from Base to Arbitrum with minimal fees"

### Getting Chain Information

**Tool:** `getSupportedChains`

Example prompts:
- "What chains does DeBridge support?"
- "Is Polygon supported by DeBridge?"
- "List all the chains I can transfer to using DeBridge"
- "Can I send tokens from Base to Solana?"
- "Tell me about the supported chains for cross-chain transfers"

### Fee Estimation

**Tool:** `estimateFee`

Example prompts:
- "What's the gas fee for sending USDC from Base to Ethereum?"
- "How much will it cost to transfer 100 USDC to Arbitrum?"
- "Estimate fees for sending 0.5 ETH to Optimism"
- "What's the cheapest chain to transfer 50 USDC to?"
- "Compare fees for transferring USDC to Arbitrum vs Optimism"

### Transaction Status

**Tool:** `getTransactionStatus`

Example prompts:
- "Check the status of my last cross-chain transfer"
- "Has my transfer to Arbitrum completed?"
- "Track my DeBridge transaction with hash 0xabcd..."
- "Is my transfer of 100 USDC to Ethereum finished?"
- "What's happening with my pending cross-chain transaction?"

## API Response Examples

When initiating a cross-chain transfer, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "sendCrossChain",
      "result": {
        "txHash": "0xabcd1234...",
        "sourceChain": "Base",
        "destinationChain": "Ethereum",
        "token": "USDC",
        "amount": "100000000",
        "formattedAmount": "100",
        "recipient": "0x1234...",
        "estimatedTime": "15 minutes"
      }
    }
  ],
  "response": "Successfully initiated transfer of 100 USDC from Base to Ethereum. Transaction hash: 0xabcd1234... Estimated completion time: 15 minutes."
}
```

When checking supported chains, the response might include:

```json
{
  "toolResults": [
    {
      "name": "getSupportedChains",
      "result": {
        "chains": [
          "Ethereum",
          "Arbitrum",
          "Optimism",
          "Base",
          "Polygon",
          "Avalanche",
          "BNB Chain"
        ]
      }
    }
  ],
  "response": "DeBridge supports the following chains: Ethereum, Arbitrum, Optimism, Base, Polygon, Avalanche, and BNB Chain."
} 
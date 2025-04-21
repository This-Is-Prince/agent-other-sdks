# OpenSea Plugin

The OpenSea plugin enables your AI agent to interact with OpenSea, the popular NFT marketplace. It allows for retrieving NFT collection statistics and sales data.

## API Usage

There are two ways to use the OpenSea plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to NFT operations.

#### Required Parameters

```json
{
  "prompt": "Your OpenSea-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://eth-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "openseaApiKey": "your-opensea-api-key",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o",
  
  // Optional: specify which chain to use
  "chain": "mainnet" // Options: "mainnet" (Ethereum), "polygon", "base"
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "openseaApiKey": "your-opensea-api-key",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o",
  "chain": "base"  // Optional, defaults to Base
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your NFT-related query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Chains

The OpenSea plugin supports NFT data retrieval from the following chains:

- Ethereum Mainnet (Chain ID: 1)
- Polygon (Chain ID: 137)
- Base (Chain ID: 8453)

Note that the majority of NFT collections are on Ethereum mainnet, so connecting to Ethereum is recommended for the best experience.

## Available Tools and Example Prompts

The OpenSea plugin provides tools for accessing NFT data:

### Get NFT Collection Statistics

**Tool:** `getNftCollectionStatistics`

Description: Get statistics for an NFT collection, such as floor price, volume, and more.

Example prompts:
- "What is the floor price of Bored Ape Yacht Club?"
- "Show me statistics for the Azuki collection"

### Get NFT Sales

**Tool:** `getNftSales`

Description: Get recent NFT sales for a collection.

Example prompts:
- "Show me recent sales from the Bored Ape Yacht Club collection"
- "What NFTs were recently sold in the CryptoPunks collection?"

## API Response Examples

When getting NFT collection statistics, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "getNftCollectionStatistics",
      "result": {
        "floorPrice": 15.75,
        "totalVolume": 983452.34,
        "numOwners": 6231,
        "totalSupply": 10000,
        "oneDayVolume": 152.45,
        "oneDayChange": -2.3,
        "oneDayFloorPriceChange": 0.5
      }
    }
  ],
  "response": "The floor price for Bored Ape Yacht Club is currently 15.75 ETH. The collection has a total volume of 983,452 ETH across 10,000 NFTs owned by 6,231 unique wallets. In the last 24 hours, the collection saw 152.45 ETH in trading volume (down 2.3%) while the floor price increased by 0.5%."
}
```

When getting NFT sales, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "getNftSales",
      "result": [
        {
          "tokenId": "7804",
          "price": 18.5,
          "timestamp": "2023-06-14T09:23:45Z",
          "buyer": "0x1234...",
          "seller": "0xabcd..."
        },
        {
          "tokenId": "9021",
          "price": 16.2,
          "timestamp": "2023-06-14T08:12:33Z",
          "buyer": "0x5678...",
          "seller": "0xefgh..."
        }
      ]
    }
  ],
  "response": "Here are the recent sales from the Bored Ape Yacht Club collection: BAYC #7804 sold for 18.5 ETH on June 14th at 9:23 AM, and BAYC #9021 sold for 16.2 ETH on June 14th at 8:12 AM."
}
```

## About OpenSea

OpenSea is the world's largest NFT marketplace, providing a platform for discovering, collecting, and trading NFTs across multiple blockchain networks. The marketplace features collections across art, gaming, sports, virtual worlds, and other categories.

The OpenSea API provides access to comprehensive data about NFT collections, individual assets, sales history, and more. 
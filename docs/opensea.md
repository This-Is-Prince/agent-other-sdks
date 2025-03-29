# OpenSea Plugin

The OpenSea plugin enables your AI agent to interact with OpenSea, the world's largest NFT marketplace. It allows for NFT discovery, price checks, and transaction capabilities.

## Installation

```bash
pnpm add @goat-sdk/plugin-opensea
```

## Configuration

To use the OpenSea plugin, you need to provide an OpenSea API key:

```typescript
import { opensea } from "@goat-sdk/plugin-opensea";

// Add the plugin to your GOAT SDK setup
const plugins = [
  opensea("your-opensea-api-key"),
  // other plugins...
];
```

## Usage Examples

Once configured, your AI agent can perform the following OpenSea operations through natural language:

### NFT Collection Information

Example prompts:
- "What is the floor price of Bored Ape Yacht Club?"
- "How many items are in the Azuki collection?"
- "Show me the top NFT collections by volume"

### NFT Asset Queries

Example prompts:
- "Show NFT #1234 from the Doodles collection"
- "What's the current price of Bored Ape #5678?"
- "Who owns CryptoPunk #9012?"

### User NFT Portfolio

Example prompts:
- "What NFTs do I own?"
- "Show me all my Ethereum NFTs"
- "Do I own any Bored Apes?"

### NFT Transactions

Example prompts:
- "Buy Doodle #1234 for 3 ETH"
- "Place a bid on Azuki #5678 for 2 ETH"
- "Accept the offer for my CryptoPunk #9012"

## API Response

When checking an NFT collection, the agent might respond with:

```
The current floor price for Bored Ape Yacht Club is 28.5 ETH.
Total items: 10,000
Total owners: 6,389
Volume traded: 850,324 ETH
```

For displaying owned NFTs:

```
You own 3 NFTs:
1. Doodle #1234
2. Azuki #5678
3. CryptoPunk #9012
```

## Required Parameters

For the OpenSea plugin to work, ensure your API request includes:
- `walletPrivateKey`: To sign transactions
- `rpcProviderUrl`: To connect to the blockchain
- `openseaApiKey`: Your OpenSea API key

## Obtaining an OpenSea API Key

To get an OpenSea API key:
1. Visit the [OpenSea Developer Portal](https://docs.opensea.io/reference/api-overview)
2. Follow the instructions to create an API key
3. Use the provided API key in your configuration 
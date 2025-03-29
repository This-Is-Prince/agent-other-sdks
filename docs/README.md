# GOAT SDK API Documentation

This directory contains documentation for all the GOAT SDK plugins integrated in this project. Each document explains:

- What the plugin does
- How to use the API with this plugin
- Required parameters for API calls
- Example prompts that can be used with the plugin

## Available Plugins

- [ERC20 Tokens](./erc20.md) - Interact with ERC20 tokens (USDC, PEPE, WETH)
- [Uniswap](./uniswap.md) - Swap tokens and provide liquidity on Uniswap
- [DeBridge](./debridge.md) - Cross-chain operations
- [OpenSea](./opensea.md) - NFT marketplace interactions
- [Renzo](./renzo.md) - Liquid staking protocol interactions
- [Polymarket](./polymarket.md) - Prediction market interactions
- [CoinMarketCap](./coinmarketcap.md) - Crypto market data
- [CoinGecko](./coingecko.md) - Crypto market data and information
- [ENS](./ens.md) - Ethereum Name Service operations

## API Usage

To use any of these plugins, you'll make a POST request to the `/goat/generate` endpoint with a natural language prompt and the required parameters for your selected plugins.

### General Request Format

```json
{
  "prompt": "Your natural language instruction here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // Additional parameters specific to plugins you're using
}
```

### Response Format

```json
{
  "toolResults": [...],  // Information about the blockchain operations performed
  "response": "Human-readable response from the AI about what it did"
}
```

See each plugin's documentation for specific parameters required and example prompts. 
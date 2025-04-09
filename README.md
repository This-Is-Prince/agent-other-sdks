# GOAT SDK - AI-Powered Blockchain Interaction API

This project provides an API endpoint that combines AI capabilities with blockchain interactions, allowing you to perform various operations like checking balances, making transfers, and interacting with DeFi protocols using natural language prompts.

## Prerequisites

- Node.js (v20.12.2 or higher)
- pnpm (recommended package manager)
- Access to EVM-compatible network RPC endpoint
- At least one AI model provider API key (OpenAI, Anthropic, etc.)
- (Optional) API keys for various plugins

## Installation

1. Clone the repository
2. Install pnpm if you haven't already:
```bash
npm install -g pnpm
```
3. Install dependencies:
```bash
pnpm install
```

## Configuration

You'll need to provide the following parameters when making requests to the API:

- `walletPrivateKey`: Your wallet's private key
- `rpcProviderUrl`: Base network RPC provider URL
- `OPENAI_API_KEY`: Your OpenAI API key
- (Optional) `uniswapBaseUrl`: Uniswap API base URL
- (Optional) `uniswapApiKey`: Uniswap API key
- (Optional) `debrigeBaseUrl`: DeBridge API base URL

## Starting the Server

```bash
pnpm start
```

The server will start on port 3000 by default. You can modify this by setting the `PORT` environment variable.

## API Usage

The API provides a single endpoint that processes natural language prompts and executes blockchain operations.

### POST /goat/generate

#### Multi-Model Support

The GOAT SDK API supports multiple language model providers, allowing you to choose your preferred AI model:

| Provider    | Parameter           | Description                         |
|-------------|--------------------|-------------------------------------|
| OpenAI      | `OPENAI_API_KEY`    | API key for OpenAI models (GPT-4, etc.) |
| Anthropic   | `ANTHROPIC_API_KEY` | API key for Anthropic models (Claude) |
| Groq        | `GROQ_API_KEY`      | API key for Groq models             |
| Mistral     | `MISTRAL_API_KEY`   | API key for Mistral models          |
| Xai         | `XAI_API_KEY`       | API key for Xai models              |
| DeepSeek    | `DEEPSEEK_API_KEY`  | API key for DeepSeek models         |
| Perplexity  | `PERPLEXITY_API_KEY`| API key for Perplexity models       |

You must provide at least one model provider API key. You can also specify the exact model to use with the `modelName` parameter.

#### General Request Format

```json
{
  "prompt": "Your natural language instruction here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "modelName": "gpt-4o",  // Optional: specify which model to use
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or
  "ANTHROPIC_API_KEY": "YourAnthropicApiKey",
  // or
  "GROQ_API_KEY": "YourGroqApiKey",
  // or
  "MISTRAL_API_KEY": "YourMistralApiKey",
  // or
  "XAI_API_KEY": "YourXaiApiKey",
  // or
  "DEEPSEEK_API_KEY": "YourDeepSeekApiKey",
  // or
  "PERPLEXITY_API_KEY": "YourPerplexityApiKey",
  
  // Chain selection (optional, defaults to Base)
  "chain": "base", // Options: "base", "baseSepolia", "mainnet", "sepolia", "polygon"
  
  // Additional parameters specific to plugins you're using
  // See plugin documentation for required parameters
}
```

#### Example cURL Request

```bash
curl -X POST http://localhost:3000/goat/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Show my USDC balance",
    "walletPrivateKey": "0xYourPrivateKeyHere",
    "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
    "OPENAI_API_KEY": "YourOpenAIApiKey"
  }'
```

#### Response Format

```json
{
  "toolResults": [...],  // Information about the blockchain operations performed
  "response": "Human-readable response from the AI about what it did"
}
```

## Available Plugins

The GOAT SDK includes the following plugins, each providing specific blockchain capabilities:

- **ERC20 Tokens** - Interact with ERC20 tokens (USDC, PEPE, WETH)
- **Uniswap** - Swap tokens and provide liquidity on Uniswap
- **DeBridge** - Cross-chain operations
- **OpenSea** - NFT marketplace interactions
- **Renzo** - Liquid staking protocol interactions
- **Polymarket** - Prediction market interactions
- **CoinMarketCap** - Crypto market data
- **CoinGecko** - Crypto market data and information
- **ENS** - Ethereum Name Service operations
- **Crossmint** - NFT checkout system for multi-chain purchases

Detailed documentation for each plugin is available in the [docs](./docs) directory.

## Plugin Configuration

Each plugin may require additional parameters in your API request:

### ERC20 Tokens
No additional parameters required. Supports USDC, PEPE, and WETH by default.

### Uniswap
```json
{
  "uniswapBaseUrl": "https://api.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key"
}
```

### DeBridge
```json
{
  "debrigeBaseUrl": "https://your-debridge-api-endpoint.com" // Optional
}
```

### OpenSea
```json
{
  "openseaApiKey": "your-opensea-api-key"
}
```

### Polymarket
```json
{
  "polymarketApiKey": "your-polymarket-api-key",
  "polymarketSecret": "your-polymarket-secret",
  "polymarketPassphrase": "your-polymarket-passphrase"
}
```

### CoinMarketCap
```json
{
  "coinmarketcapApiKey": "your-coinmarketcap-api-key"
}
```

### CoinGecko
```json
{
  "coingeckoApiKey": "your-coingecko-api-key",
  "isCoingeckoPro": true // Optional: set to true if you have a Pro account
}
```

### Crossmint
```json
{
  "crossmintApiKey": "your-crossmint-api-key"
}
```

### ENS & Renzo
No additional parameters required.

## Error Handling

The API will return appropriate error messages with HTTP status codes:
- 400: Bad Request (missing parameters)
- 500: Internal Server Error (execution failures)

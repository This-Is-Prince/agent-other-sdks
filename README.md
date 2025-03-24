# AI-Powered Blockchain Interaction API

This project provides an API endpoint that combines AI capabilities with blockchain interactions, allowing you to perform various operations like checking balances, making transfers, and interacting with DeFi protocols using natural language prompts.

## Features

- Natural language processing for blockchain interactions
- Support for ERC20 token operations (USDC, PEPE, WETH)
- Uniswap integration (optional)
- Wallet operations using Viem
- Base network support
- OpenAI integration for processing commands

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Access to Base network RPC endpoint
- OpenAI API key
- (Optional) Uniswap API credentials

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Configuration

You'll need to provide the following parameters when making requests to the API:

- `walletPrivateKey`: Your wallet's private key
- `rpcProviderUrl`: Base network RPC provider URL
- `OPENAI_API_KEY`: Your OpenAI API key
- (Optional) `uniswapBaseUrl`: Uniswap API base URL
- (Optional) `uniswapApiKey`: Uniswap API key

## Starting the Server

```bash
npm start
# or
yarn start
```

The server will start on port 3000 by default. You can modify this by setting the `PORT` environment variable.

## API Usage

### POST /generate

This endpoint processes natural language prompts and executes blockchain operations.

#### Request Format

```json
{
    "prompt": "Show my USDC balance",
    "walletPrivateKey": "0xYourPrivateKeyHere",
    "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
    "uniswapBaseUrl": "https://trade-api.gateway.uniswap.org/v1",
    "uniswapApiKey": "YourUniswapApiKey",
    "OPENAI_API_KEY": "YourOpenAIApiKey"
}
```

#### Example cURL Request

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Show my USDC balance",
    "walletPrivateKey": "0xYourPrivateKeyHere",
    "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
    "uniswapBaseUrl": "https://trade-api.gateway.uniswap.org/v1",
    "uniswapApiKey": "YourUniswapApiKey",
    "OPENAI_API_KEY": "YourOpenAIApiKey"
  }'
```

#### Response Format

```json
{
    "toolResults": [...],
    "response": "Your USDC balance is X USDC"
}
```

## Security Considerations

- Never share or commit your private keys or API keys
- Use environment variables for sensitive information in production
- Consider implementing rate limiting and additional security measures for production use

## Supported Operations

The API currently supports:
- Checking token balances (USDC, PEPE, WETH)
- Sending ETH
- ERC20 token operations
- Uniswap interactions (when configured)

## Error Handling

The API will return appropriate error messages with HTTP status codes:
- 400: Bad Request (missing parameters)
- 500: Internal Server Error (execution failures)

## License

[Add your license information here] 
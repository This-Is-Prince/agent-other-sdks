# GOAT SDK API Usage Guide

This guide explains how to use the GOAT SDK in this project through the API endpoint.

## Overview

The GOAT SDK allows AI agents to interact with blockchain networks and various decentralized finance (DeFi) protocols. Our API implementation uses the Vercel AI adapter to connect OpenAI models with GOAT SDK tools, enabling natural language processing of blockchain-related commands.

## API Usage

Our API endpoint provides access to all GOAT SDK functionality. To use it, send a POST request to `/goat/generate` with the appropriate parameters.

### Basic Request Format

```json
{
  "prompt": "Your natural language instruction here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey"
}
```

### Plugin-Specific Parameters

Depending on which plugins you want to use, you may need to include additional parameters:

#### Uniswap Plugin
```json
{
  "uniswapBaseUrl": "https://trade-api.gateway.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key"
}
```

#### DeBridge Plugin
```json
{
  "debrigeBaseUrl": "https://your-debridge-api-endpoint.com"
}
```

#### OpenSea Plugin
```json
{
  "openseaApiKey": "your-opensea-api-key"
}
```

#### Polymarket Plugin
```json
{
  "polymarketApiKey": "your-polymarket-api-key",
  "polymarketSecret": "your-polymarket-secret",
  "polymarketPassphrase": "your-polymarket-passphrase"
}
```

#### CoinMarketCap Plugin
```json
{
  "coinmarketcapApiKey": "your-coinmarketcap-api-key"
}
```

#### CoinGecko Plugin
```json
{
  "coingeckoApiKey": "your-coingecko-api-key",
  "isCoingeckoPro": true // or false
}
```

### Example Complete Request

Here's an example that includes parameters for multiple plugins:

```json
{
  "prompt": "Swap 0.1 ETH for USDC and show me the current price of Bitcoin",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey", 
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "uniswapBaseUrl": "https://trade-api.gateway.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key",
  "coinmarketcapApiKey": "your-coinmarketcap-api-key"
}
```

### API Response Format

The API response will include both the raw tool results and a human-readable response:

```json
{
  "toolResults": [
    // Array of results from blockchain operations
    {
      "name": "swap",
      "result": {
        "txHash": "0xabcd1234...",
        "inputToken": "ETH",
        "outputToken": "USDC",
        "inputAmount": "100000000000000000",
        "formattedInputAmount": "0.1",
        "outputAmount": "324567000",
        "formattedOutputAmount": "324.567"
      }
    },
    {
      "name": "getPrice",
      "result": {
        "symbol": "BTC",
        "price": "57245.83",
        "currency": "USD",
        "change24h": "+2.3%"
      }
    }
  ],
  "response": "Successfully swapped 0.1 ETH for 324.567 USDC. Bitcoin is currently trading at $57,245.83, up 2.3% in the last 24 hours."
}
```

## Example Prompts by Category

Here are some example prompts you can use with the GOAT SDK API:

### Basic Wallet Operations
- "What is my ETH balance?"
- "Send 0.01 ETH to 0x1234..."
- "What tokens do I own?"

### ERC20 Operations
- "What is my USDC balance?"
- "Send 10 USDC to vitalik.eth"
- "Show me the total supply of PEPE token"

### DeFi Operations
- "Swap 0.1 ETH for USDC on Uniswap"
- "What's the current APR for staking ETH on Renzo?"
- "Show me the best trading pair for PEPE/USDC"

### Market Information
- "What's the current price of Bitcoin?"
- "Show me the top 5 cryptocurrencies by market cap"
- "Has Ethereum gone up or down in the last 24 hours?"

### Cross-Chain Operations
- "Send 100 USDC from Base to Ethereum"
- "What chains does DeBridge support?"
- "What's the fee for transferring to Arbitrum?"

### NFT Operations
- "What NFTs do I own?"
- "What's the floor price of Bored Ape Yacht Club?"
- "Show me information about Doodle #1234"

### ENS Operations
- "What's the address for vitalik.eth?"
- "Look up the ENS for 0x1234..."
- "Who owns ethereum.eth?"

## Security Considerations

- Never expose your private key in client-side code
- Use environment variables for sensitive information like API keys
- Consider implementing additional authentication for the API endpoint 
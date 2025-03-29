# CoinMarketCap Plugin

The CoinMarketCap plugin enables your AI agent to access cryptocurrency market data from CoinMarketCap, one of the most popular cryptocurrency data providers.

## Installation

```bash
pnpm add @goat-sdk/plugin-coinmarketcap
```

## Configuration

To use the CoinMarketCap plugin, you need to provide an API key:

```typescript
import { coinmarketcap } from '@goat-sdk/plugin-coinmarketcap';

// Add the plugin to your GOAT SDK setup
const plugins = [
  coinmarketcap({
    apiKey: "your-coinmarketcap-api-key",
  }),
  // other plugins...
];
```

## Usage Examples

Once configured, your AI agent can perform the following CoinMarketCap operations through natural language:

### Price Information

Example prompts:
- "What is the current price of Bitcoin?"
- "Show me the price of Ethereum in USD"
- "What's the exchange rate between BTC and ETH?"

### Market Data

Example prompts:
- "What are the top 10 cryptocurrencies by market cap?"
- "What's the 24-hour trading volume of Bitcoin?"
- "How much has Solana's price changed in the last 24 hours?"

### Token Information

Example prompts:
- "What is the total supply of Bitcoin?"
- "On what exchanges can I trade PEPE?"
- "What's the all-time high price of Ethereum?"

### Market Analysis

Example prompts:
- "What's the total cryptocurrency market cap?"
- "Which crypto has gained the most in the past 24 hours?"
- "What's the current fear and greed index for crypto?"

## API Response

When checking cryptocurrency prices, the agent might respond with:

```
Bitcoin (BTC) is currently trading at $57,245.83 USD.
24h change: +2.3%
Market cap: $1.12T
24h volume: $32.5B
```

For market rankings:

```
Top 5 cryptocurrencies by market cap:
1. Bitcoin (BTC): $1.12T
2. Ethereum (ETH): $352.8B
3. Tether (USDT): $95.1B
4. BNB (BNB): $82.5B
5. Solana (SOL): $53.1B
```

## Required Parameters

For the CoinMarketCap plugin to work, ensure your API request includes:
- `coinmarketcapApiKey`: Your CoinMarketCap API key

## Obtaining a CoinMarketCap API Key

To get a CoinMarketCap API key:
1. Visit the [CoinMarketCap Developer Portal](https://coinmarketcap.com/api/)
2. Sign up for an account
3. Subscribe to a plan (there is a free Basic plan available)
4. Generate an API key
5. Use this API key in your configuration

## API Rate Limits

Be aware that CoinMarketCap API has rate limits depending on your subscription plan:
- Basic plan: 10,000 credits per month (approximately 333 calls per day)
- Higher tier plans offer more credits and additional endpoints

For more information on rate limits and available endpoints, visit the [CoinMarketCap API Documentation](https://coinmarketcap.com/api/documentation/v1/). 
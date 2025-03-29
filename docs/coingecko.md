# CoinGecko Plugin

The CoinGecko plugin enables your AI agent to access cryptocurrency market data from CoinGecko, a comprehensive cryptocurrency data provider with information on thousands of tokens.

## Installation

```bash
pnpm add @goat-sdk/plugin-coingecko
```

## Configuration

To use the CoinGecko plugin, you need to provide an API key and specify whether you're using the Pro version:

```typescript
import { coingecko } from "@goat-sdk/plugin-coingecko";

// Add the plugin to your GOAT SDK setup
const plugins = [
  coingecko({
    apiKey: "your-coingecko-api-key",
    isPro: false, // Set to true if you have a CoinGecko Pro subscription
  }),
  // other plugins...
];
```

## Usage Examples

Once configured, your AI agent can perform the following CoinGecko operations through natural language:

### Price Information

Example prompts:
- "What is the current price of Bitcoin according to CoinGecko?"
- "Show me the price of Ethereum in USD from CoinGecko"
- "What's the price of Solana in BTC?"

### Market Data

Example prompts:
- "What are the top 10 cryptocurrencies by market cap on CoinGecko?"
- "What's the 24-hour trading volume of Cardano?"
- "How much has DOGE's price changed in the last 7 days?"

### Token Information

Example prompts:
- "What is the circulating supply of Bitcoin?"
- "Show me information about the token APE"
- "What's the all-time high price of Polygon?"

### Historical Data

Example prompts:
- "What was Bitcoin's price 1 year ago?"
- "Show me Ethereum's price chart for the last month"
- "How has BNB performed over the last 6 months?"

## API Response

When checking cryptocurrency prices, the agent might respond with:

```
According to CoinGecko, Bitcoin (BTC) is currently trading at $57,245.83 USD.
24h change: +2.3%
Market cap: $1.12T
24h volume: $32.5B
```

For token information:

```
APE (ApeCoin) information:
Current price: $1.25 USD
Market cap rank: #63
Market cap: $827.5M
24h volume: $45.2M
All-time high: $39.40 (April 28, 2022)
```

## Required Parameters

For the CoinGecko plugin to work, ensure your API request includes:
- `coingeckoApiKey`: Your CoinGecko API key
- `isCoingeckoPro`: Boolean indicating whether you have a CoinGecko Pro subscription

## Obtaining a CoinGecko API Key

To get a CoinGecko API key:
1. Visit the [CoinGecko API Plans page](https://www.coingecko.com/en/api/pricing)
2. Sign up for an account
3. Choose between the free plan or a paid Pro plan
4. Generate an API key
5. Use this API key in your configuration

## API Rate Limits

CoinGecko's API has different rate limits depending on your subscription:
- Free tier: 10-50 calls per minute
- Pro plans: Higher rate limits (varies by plan)

The Pro plans also offer additional endpoints and features not available in the free tier.

For more information on CoinGecko's API services, visit the [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation). 
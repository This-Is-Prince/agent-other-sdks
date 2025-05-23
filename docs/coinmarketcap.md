# CoinMarketCap Plugin

The CoinMarketCap plugin enables your AI agent to access cryptocurrency market data from CoinMarketCap, one of the most popular cryptocurrency data providers.

## API Usage

There are two ways to use the CoinMarketCap plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to cryptocurrency data.

#### Required Parameters

```json
{
  "prompt": "Your cryptocurrency data query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "coinmarketcapApiKey": "your-coinmarketcap-api-key",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o"
  
  // Note: Chain parameter is not needed for CoinMarketCap as it's a data provider
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "coinmarketcapApiKey": "your-coinmarketcap-api-key",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o"
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your cryptocurrency data query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Chain Compatibility

The CoinMarketCap plugin is chain-agnostic, meaning it functions independently of the blockchain you're connecting to. It retrieves cryptocurrency data directly from CoinMarketCap's API and does not depend on any specific blockchain network.

## Available Tools and Example Prompts

The CoinMarketCap plugin provides several tools for accessing cryptocurrency data:

### Get Cryptocurrency Listings

**Tool:** `getCryptocurrencyListings`

Description: Fetch the latest cryptocurrency listings with market data including price, market cap, volume, and other key metrics.

Example prompts:
- "Show me the top 10 cryptocurrencies by market cap"
- "List the most popular cryptocurrencies"

### Get Cryptocurrency Quotes

**Tool:** `getCryptocurrencyQuotes`

Description: Get the latest market quotes for one or more cryptocurrencies, including price, market cap, and volume in any supported currency.

Example prompts:
- "What is the current price of Bitcoin and Ethereum?"
- "Get quotes for SOL, ADA, and DOT in USD"

### Get Exchange Listings

**Tool:** `getExchangeListings`

Description: Fetch the latest cryptocurrency exchange listings with market data including trading volume, number of markets, and liquidity metrics.

Example prompts:
- "List the top cryptocurrency exchanges by volume"
- "What are the most popular crypto exchanges?"

### Get Exchange Quotes

**Tool:** `getExchangeQuotes`

Description: Get the latest market data for one or more exchanges including trading volume, number of markets, and other exchange-specific metrics.

Example prompts:
- "Show me detailed information about Binance"
- "What's the 24-hour trading volume on Coinbase?"

### Get Latest Content

**Tool:** `getContent`

Description: Fetch the latest cryptocurrency news, articles, and market analysis content from trusted sources.

Example prompts:
- "Get the latest news about Bitcoin"
- "Show me recent articles about crypto regulation"

### Get Cryptocurrency Map

**Tool:** `getCryptocurrencyMap`

Description: Get a mapping of all cryptocurrencies with unique CoinMarketCap IDs, including active and inactive assets.

Example prompts:
- "What is the CoinMarketCap ID for Ethereum?"
- "Find all coins with 'bit' in their name"

### Get Cryptocurrency OHLCV Data

**Tool:** `getCryptocurrencyOHLCV`

Description: Get the latest OHLCV (Open, High, Low, Close, Volume) values for cryptocurrencies.

Example prompts:
- "What's the OHLCV data for Bitcoin today?"
- "Show me the opening and closing prices for ETH"

### Get Trending Cryptocurrencies

**Tool:** `getCryptocurrencyTrending`

Description: Get the latest trending cryptocurrencies based on CoinMarketCap user activity.

Example prompts:
- "What cryptocurrencies are trending right now?"
- "Show me the hot coins on CoinMarketCap"

### Get Most Visited Cryptocurrencies

**Tool:** `getCryptocurrencyMostVisited`

Description: Get the most visited cryptocurrencies on CoinMarketCap over a specified time period.

Example prompts:
- "Which coins are most viewed on CoinMarketCap?"
- "Show me the most popular cryptocurrencies by page views"

### Get Cryptocurrency Gainers and Losers

**Tool:** `getCryptocurrencyGainersLosers`

Description: Get the top gaining and losing cryptocurrencies based on price changes over different time periods.

Example prompts:
- "Which cryptocurrencies gained the most in the last 24 hours?"
- "Show me the biggest losers today"

## API Response Examples

When getting cryptocurrency listings, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "getCryptocurrencyListings",
      "result": {
        "data": [
          {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "cmc_rank": 1,
            "quote": {
              "USD": {
                "price": 57245.83,
                "market_cap": 1120000000000,
                "volume_24h": 32500000000,
                "percent_change_24h": 2.3
              }
            }
          },
          {
            "id": 1027,
            "name": "Ethereum",
            "symbol": "ETH",
            "slug": "ethereum",
            "cmc_rank": 2,
            "quote": {
              "USD": {
                "price": 3245.67,
                "market_cap": 352800000000,
                "volume_24h": 12400000000,
                "percent_change_24h": 1.5
              }
            }
          }
        ]
      }
    }
  ],
  "response": "Here are the top 2 cryptocurrencies by market cap: 1. Bitcoin (BTC) at $57,245.83 with a market cap of $1.12T, up 2.3% in the last 24h. 2. Ethereum (ETH) at $3,245.67 with a market cap of $352.8B, up 1.5% in the last 24h."
}
```

When getting cryptocurrency quotes, the response might show:

```json
{
  "toolResults": [
    {
      "name": "getCryptocurrencyQuotes",
      "result": {
        "data": {
          "1": {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "quote": {
              "USD": {
                "price": 57245.83,
                "volume_24h": 32500000000,
                "percent_change_1h": 0.2,
                "percent_change_24h": 2.3,
                "percent_change_7d": 5.1,
                "market_cap": 1120000000000,
                "last_updated": "2023-06-15T09:30:00.000Z"
              }
            }
          }
        }
      }
    }
  ],
  "response": "Bitcoin (BTC) is currently trading at $57,245.83. It's up 0.2% in the last hour, 2.3% in the last 24 hours, and 5.1% over the past week. Its market cap is $1.12T with a 24h trading volume of $32.5B."
}
```

## About CoinMarketCap

CoinMarketCap is a leading cryptocurrency data provider that offers comprehensive information about thousands of digital assets. Their API provides access to real-time and historical price data, volume information, market capitalization, and other key metrics for cryptocurrencies and exchanges.

## API Rate Limits

Be aware that CoinMarketCap API has rate limits depending on your subscription plan:
- Basic plan: 10,000 credits per month (approximately 333 calls per day)
- Higher tier plans offer more credits and additional endpoints 
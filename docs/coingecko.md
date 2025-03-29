# CoinGecko Plugin

The CoinGecko plugin enables your AI agent to access cryptocurrency market data from CoinGecko, a comprehensive cryptocurrency data provider with information on thousands of tokens.

## API Usage

To use the CoinGecko plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to cryptocurrency data.

### Required Parameters

```json
{
  "prompt": "Your cryptocurrency data query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "coingeckoApiKey": "your-coingecko-api-key",
  "isCoingeckoPro": true // or false
}
```

## Available Tools and Example Prompts

The CoinGecko plugin provides several tools for accessing cryptocurrency data:

### Get Trending Coins

**Tool:** `coingecko_get_trending_coins`

Example prompts:
- "What are the trending coins right now?"
- "Show me the most popular cryptocurrencies today"
- "Which coins are trending on CoinGecko?"
- "Get the hottest coins currently trending"
- "What cryptocurrencies are gaining popularity today?"

### Get Coin Prices

**Tool:** `coingecko_get_coin_prices`

Example prompts:
- "What is the current price of Bitcoin?"
- "Show me the prices of Ethereum, Solana, and Cardano"
- "Get the price of PEPE in USD"
- "What's the market cap of Bitcoin and Ethereum?"
- "How much is 1 ETH worth in USD with 24-hour change data?"

### Search Coins by Keyword

**Tool:** `coingecko_search_coins`

Example prompts:
- "Search for coins related to AI"
- "Find all cryptocurrencies with 'meta' in their name"
- "Look up tokens associated with gaming"
- "Search for DeFi tokens on CoinGecko"
- "Find coins related to the word 'exchange'"

### Get Coin Price by Contract Address

**Tool:** `coingecko_get_coin_price_by_contract_address`

Example prompts:
- "What's the price of the token with contract address 0x1234...?"
- "Get the value of token contract 0xabcd... on Ethereum"
- "Check the price of smart contract 0x5678... on the Ethereum chain"
- "Find the current value of ERC-20 token at address 0xefgh..."
- "How much is the token at contract 0x9876... worth in USD?"

### Get Detailed Coin Data

**Tool:** `coingecko_get_coin_data`

Example prompts:
- "Show me detailed information about Bitcoin"
- "Get comprehensive data about Ethereum including market data"
- "Tell me everything about Solana including developer stats"
- "What are all the details for Cardano including community data?"
- "Give me a complete overview of Dogecoin with all available data"

### Get Historical Coin Data

**Tool:** `coingecko_get_historical_data`

Example prompts:
- "What was the price of Bitcoin on January 1, 2023?"
- "Show historical data for Ethereum from last week"
- "How much was Solana worth on December 25, 2022?"
- "Get historical information for BNB from a month ago"
- "What was the market cap of ADA on March 15, 2023?"

### Get OHLC Chart Data

**Tool:** `coingecko_get_ohlc_data`

Example prompts:
- "Show me OHLC data for Bitcoin over the past week"
- "Get the price candlesticks for Ethereum for the last 30 days"
- "What's the OHLC chart data for Solana in the past 24 hours?"
- "Show price candles for XRP over 14 days"
- "Give me OHLC information for DOT in USD for the past 7 days"

### Get Trending Coin Categories

**Tool:** `coingecko_get_trending_coin_categories`

Example prompts:
- "What are the top DeFi coins by market cap?"
- "Show me trending gaming tokens"
- "List the highest volume NFT-related cryptocurrencies"
- "What metaverse coins are popular right now?"
- "Show top 10 Web3 tokens by price increase"

### Get All Coin Categories

**Tool:** `coingecko_get_coin_categories`

Example prompts:
- "What cryptocurrency categories are available on CoinGecko?"
- "List all the token categories"
- "Show me all the different types of crypto categories"
- "What categories does CoinGecko use to classify coins?"
- "Get a complete list of cryptocurrency categories"

## API Response Examples

When getting coin prices, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "coingecko_get_coin_prices",
      "result": {
        "bitcoin": {
          "usd": 57245.83,
          "usd_market_cap": 1120000000000,
          "usd_24h_vol": 32500000000,
          "usd_24h_change": 2.3
        },
        "ethereum": {
          "usd": 3245.67,
          "usd_market_cap": 352800000000,
          "usd_24h_vol": 12400000000,
          "usd_24h_change": 1.5
        }
      }
    }
  ],
  "response": "Bitcoin (BTC) is currently trading at $57,245.83 USD (up 2.3% in the last 24h) with a market cap of $1.12T. Ethereum (ETH) is trading at $3,245.67 (up 1.5% in the last 24h) with a market cap of $352.8B."
}
```

When searching for coins, the response might show:

```json
{
  "toolResults": [
    {
      "name": "coingecko_search_coins",
      "result": {
        "coins": [
          {
            "id": "bitcoin-ai",
            "name": "Bitcoin AI",
            "symbol": "BTCAI",
            "market_cap_rank": 789
          },
          {
            "id": "artificial-intelligence",
            "name": "Artificial Intelligence",
            "symbol": "AI",
            "market_cap_rank": 952
          }
        ]
      }
    }
  ],
  "response": "I found 2 coins related to 'AI': Bitcoin AI (BTCAI) with market cap rank #789, and Artificial Intelligence (AI) with market cap rank #952."
}
```

## API Rate Limits

CoinGecko's API has different rate limits depending on your subscription:
- Free tier: 10-50 calls per minute
- Pro plans: Higher rate limits (varies by plan)

The Pro plans also offer additional endpoints and features not available in the free tier. 
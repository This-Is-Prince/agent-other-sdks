# CoinGecko Plugin

The CoinGecko plugin enables your AI agent to access cryptocurrency market data through the CoinGecko API. It allows you to retrieve information about cryptocurrency prices, market trends, and detailed token data.

## API Usage

To use the CoinGecko plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to cryptocurrency market data.

### Required Parameters

```json
{
  "prompt": "Your CoinGecko-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "coingeckoApiKey": "your-coingecko-api-key",
  "isCoingeckoPro": true,  // Optional: set to true if you have a CoinGecko Pro account
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o"
}
```

## Available Tools and Example Prompts

The CoinGecko plugin provides tools for accessing cryptocurrency market data:

### Get Trending Coins

**Tool:** `coingecko_get_trending_coins`

Description: Get a list of trending coins in the last 24 hours.

Example prompts:
- "What are the trending cryptocurrencies right now?"
- "Show me the most popular coins on CoinGecko today"
- "Which cryptocurrencies are trending in the last 24 hours?"
- "Get me the hottest coins on the market"
- "What coins are gaining popularity according to CoinGecko?"

### Get Coin Prices

**Tool:** `coingecko_get_coin_prices`

Description: Get current prices for specific cryptocurrencies in various fiat currencies.

Example prompts:
- "What is the current price of Bitcoin?"
- "Show me the prices of ETH, BTC, and SOL in USD"
- "How much is 1 Ethereum worth in EUR?"
- "Get the price of Dogecoin and Shiba Inu"
- "What's the current value of ADA in JPY?"

### Search Coins

**Tool:** `coingecko_search_coins`

Description: Search for coins by keyword or name.

Example prompts:
- "Search for coins related to AI"
- "Find cryptocurrencies with 'meta' in their name"
- "Look up tokens related to gaming"
- "Search for DeFi coins on CoinGecko"
- "Find coins related to privacy"

### Get Coin Price by Contract Address

**Tool:** `coingecko_get_coin_price_by_contract_address`

Description: Get the price of a token using its contract address.

Example prompts:
- "What's the price of token with contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 on Ethereum?"
- "Get the current value of the token at address 0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
- "Show me the price of the BNB token using its contract address"
- "Look up the token price for contract 0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0 on Polygon"
- "What's the current market price for the token at 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599?"

### Get Coin Data

**Tool:** `coingecko_get_coin_data`

Description: Get detailed data about a specific cryptocurrency.

Example prompts:
- "Give me detailed information about Bitcoin"
- "What's the market cap of Ethereum?"
- "Show me the 24h trading volume for Solana"
- "Tell me about the circulating supply of Cardano"
- "Get comprehensive data for Polkadot"

### Get Historical Data

**Tool:** `coingecko_get_historical_data`

Description: Get historical price data for a cryptocurrency.

Example prompts:
- "Show me Bitcoin's price history for the last month"
- "What was Ethereum's price last week?"
- "Get historical price data for SOL over the past 30 days"
- "How has the price of AVAX changed in the last 7 days?"
- "Give me BNB's price chart data for the last year"

### Get OHLC Data

**Tool:** `coingecko_get_ohlc_data`

Description: Get OHLC (Open, High, Low, Close) chart data for a coin.

Example prompts:
- "Show me the OHLC data for Bitcoin in the last week"
- "Get candlestick chart data for Ethereum"
- "What's the OHLC information for Solana over the past month?"
- "Get the high and low prices for AVAX in the last 14 days"
- "Show me candle data for DOT"

### Get Trending Coin Categories

**Tool:** `coingecko_get_trending_coin_categories`

Description: Get a list of trending cryptocurrency categories.

Example prompts:
- "What are the trending crypto categories?"
- "Which token categories are popular right now?"
- "Show me the most popular cryptocurrency sectors"
- "What types of crypto projects are trending on CoinGecko?"
- "Get the trending categories in the crypto market"

### Get Coin Categories

**Tool:** `coingecko_get_coin_categories`

Description: Get a list of all cryptocurrency categories.

Example prompts:
- "List all the cryptocurrency categories on CoinGecko"
- "What categories are used to classify cryptocurrencies?"
- "Show me all the sectors in the crypto market"
- "Get a complete list of crypto project categories"
- "What are the different types of tokens tracked by CoinGecko?"

## API Response Examples

When getting coin prices, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "coingecko_get_coin_prices",
      "result": {
        "bitcoin": {
          "usd": 63245.12,
          "eur": 58342.93,
          "jpy": 9765432.12
        },
        "ethereum": {
          "usd": 3102.47,
          "eur": 2856.21,
          "jpy": 478123.45
        }
      }
    }
  ],
  "response": "Bitcoin is currently trading at $63,245.12 (€58,342.93), while Ethereum is at $3,102.47 (€2,856.21)."
}
```

When getting trending coins, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "coingecko_get_trending_coins",
      "result": [
        {
          "id": "pepe",
          "name": "Pepe",
          "symbol": "PEPE",
          "market_cap_rank": 37,
          "price_btc": 0.00000000123
        },
        {
          "id": "bonk",
          "name": "Bonk",
          "symbol": "BONK",
          "market_cap_rank": 73,
          "price_btc": 0.000000000456
        }
      ]
    }
  ],
  "response": "The trending cryptocurrencies right now are Pepe (PEPE) ranked #37 and Bonk (BONK) ranked #73 by market cap."
}
```

## About CoinGecko

CoinGecko is one of the world's largest cryptocurrency data aggregators, providing comprehensive information on thousands of digital assets. Their API offers data on prices, trading volumes, market capitalization, developer activity, community growth, and more.

The CoinGecko plugin leverages both free and pro API endpoints depending on your configuration, with pro access offering higher rate limits and additional data points. 
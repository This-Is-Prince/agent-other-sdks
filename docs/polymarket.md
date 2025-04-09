# Polymarket Plugin

The Polymarket plugin enables your AI agent to interact with Polymarket, a popular prediction market platform. It allows for checking market information, placing bets, and managing positions on prediction markets.

## API Usage

To use the Polymarket plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to prediction markets.

### Required Parameters

```json
{
  "prompt": "Your Polymarket-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "polymarketApiKey": "your-polymarket-api-key",
  "polymarketSecret": "your-polymarket-secret",
  "polymarketPassphrase": "your-polymarket-passphrase",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o",
  
  // Optional: specify which chain to use (defaults to Base)
  "chain": "polygon" // Required for Polymarket
}
```

## Available Tools and Example Prompts

The Polymarket plugin provides tools for accessing and interacting with prediction markets:

### Get Polymarket Events

**Tool:** `get_polymarket_events`

Description: Get the events on Polymarket, including their markets, with optional filters.

Example prompts:
- "Show me the active prediction markets on Polymarket"
- "What are the trending events on Polymarket?"
- "Find prediction markets about the 2024 US election"
- "Show me markets with the highest liquidity on Polymarket"
- "Get a list of crypto-related prediction markets on Polymarket"

### Get Polymarket Market Info

**Tool:** `get_polymarket_market_info`

Description: Get the info of a specific market on Polymarket.

Example prompts:
- "Show me details about the 'Will Trump win the 2024 election?' market"
- "What are the current odds for Bitcoin reaching $100k by end of year?"
- "Get information about the market with ID 12345"
- "Tell me more about the market for 'Will Ethereum switch to PoS in 2023?'"
- "What's the liquidity in the Fed interest rate prediction market?"

### Create Order on Polymarket

**Tool:** `create_order_on_polymarket`

Description: Create an order on Polymarket.

Example prompts:
- "Bet $50 on 'Yes' for Trump winning the election"
- "Place an order to buy 100 shares of 'No' in the BTC reaching $100k market"
- "Create a GTC order to buy 25 shares at price 0.7 in the market about Ethereum's price"
- "Make a prediction that AI regulation will pass with $100"
- "Bet 50 USDC that the Fed will not raise rates"

### Get Active Polymarket Orders

**Tool:** `get_active_polymarket_orders`

Description: Get the active orders on Polymarket.

Example prompts:
- "Show me all my active orders on Polymarket"
- "What bets do I currently have open?"
- "List my pending Polymarket positions"
- "Check my active predictions on Polymarket"
- "Show my open orders for the election market"

### Cancel Polymarket Order

**Tool:** `cancel_polymarket_order`

Description: Cancel an order on Polymarket.

Example prompts:
- "Cancel my order with ID 12345"
- "Remove my bet on the Trump election market"
- "Cancel my pending prediction about Bitcoin price"
- "Withdraw my order from the Fed interest rate market"
- "Delete my unmatched bet from Polymarket"

### Cancel All Polymarket Orders

**Tool:** `cancel_all_polymarket_orders`

Description: Cancel all orders on Polymarket.

Example prompts:
- "Cancel all my orders on Polymarket"
- "Remove all my active bets"
- "Withdraw all my pending predictions"
- "Clear all my open positions on Polymarket"
- "Cancel every order I have active"

## API Response Examples

When getting Polymarket events, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "get_polymarket_events",
      "result": [
        {
          "title": "2024 US Presidential Election",
          "slug": "2024-us-election",
          "active": true,
          "liquidity": 1250000,
          "volume": 3500000,
          "markets": [
            {
              "slug": "will-trump-win-2024-election",
              "question": "Will Donald Trump win the 2024 US Presidential Election?",
              "outcomePrices": "0.48,0.52",
              "outcomes": "Yes,No",
              "volume": "1500000",
              "acceptingOrders": true
            }
          ]
        }
      ]
    }
  ],
  "response": "Here are the active prediction markets for the 2024 US Election. The market 'Will Donald Trump win the 2024 US Presidential Election?' shows Trump with a 48% chance of winning (Yes at $0.48, No at $0.52). The market has $1.5M in volume and is currently accepting orders."
}
```

When creating an order, the response might include:

```json
{
  "toolResults": [
    {
      "name": "create_order_on_polymarket",
      "result": {
        "status": "success",
        "orderId": "abc123def456",
        "market": "will-trump-win-2024-election",
        "side": "BUY",
        "outcome": "Yes",
        "price": "0.48",
        "size": 50,
        "totalCost": "24.00",
        "timestamp": "2023-06-15T09:30:00.000Z"
      }
    }
  ],
  "response": "Your order has been placed successfully! You've bet $24.00 to buy 50 shares of 'Yes' at $0.48 per share in the 'Will Trump win the 2024 election?' market. If the outcome is Yes, you'll receive $50 (for a profit of $26.00)."
}
```

## About Polymarket

Polymarket is a decentralized prediction market platform that allows users to bet on the outcome of future events. The platform uses blockchain technology to create transparent and efficient markets, with outcomes determined by real-world events.

The platform operates on Polygon (formerly Matic), an Ethereum scaling solution that allows for faster and cheaper transactions.

Note: Trading on Polymarket may be restricted in certain jurisdictions. Please ensure compliance with your local regulations before using this plugin. 
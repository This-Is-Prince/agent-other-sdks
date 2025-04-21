# Polymarket Plugin

The Polymarket plugin enables your AI agent to interact with Polymarket, a popular prediction market platform. It allows for checking market information, placing bets, and managing positions on prediction markets.

## API Usage

There are two ways to use the Polymarket plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to prediction market operations.

#### Required Parameters

```json
{
  "prompt": "Your Polymarket-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://polygon-mainnet.g.alchemy.com/v2/YourAlchemyKey",
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
  
  // Required chain setting - Polymarket only works on Polygon
  "chain": "polygon" // Polymarket only supports Polygon
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://polygon-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "polymarketApiKey": "your-polymarket-api-key",
  "polymarketSecret": "your-polymarket-secret",
  "polymarketPassphrase": "your-polymarket-passphrase",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o",
  "chain": "polygon" // Polymarket only supports Polygon
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your Polymarket-related query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Chain

The Polymarket plugin only supports the Polygon (137) chain, as the Polymarket platform operates exclusively on Polygon.

## Available Tools and Example Prompts

The Polymarket plugin provides tools for accessing and interacting with prediction markets:

### Get Polymarket Events

**Tool:** `get_polymarket_events`

Description: Get the events on Polymarket, including their markets, with optional filters.

Example prompts:
- "Show me the active prediction markets on Polymarket"
- "What are the trending events on Polymarket?"

### Get Polymarket Market Info

**Tool:** `get_polymarket_market_info`

Description: Get the info of a specific market on Polymarket.

Example prompts:
- "Show me details about the 'Will Trump win the 2024 election?' market"
- "What are the current odds for Bitcoin reaching $100k by end of year?"

### Create Order on Polymarket

**Tool:** `create_order_on_polymarket`

Description: Create an order on Polymarket.

Example prompts:
- "Bet $50 on 'Yes' for Trump winning the election"
- "Place an order to buy 100 shares of 'No' in the BTC reaching $100k market"

### Get Active Polymarket Orders

**Tool:** `get_active_polymarket_orders`

Description: Get the active orders on Polymarket.

Example prompts:
- "Show me all my active orders on Polymarket"
- "What bets do I currently have open?"

### Cancel Polymarket Order

**Tool:** `cancel_polymarket_order`

Description: Cancel an order on Polymarket.

Example prompts:
- "Cancel my order with ID 12345"
- "Remove my bet on the Trump election market"

### Cancel All Polymarket Orders

**Tool:** `cancel_all_polymarket_orders`

Description: Cancel all orders on Polymarket.

Example prompts:
- "Cancel all my orders on Polymarket"
- "Remove all my active bets"

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

The platform operates exclusively on Polygon (formerly Matic), an Ethereum scaling solution that allows for faster and cheaper transactions.

Note: Trading on Polymarket may be restricted in certain jurisdictions. Please ensure compliance with your local regulations before using this plugin. 
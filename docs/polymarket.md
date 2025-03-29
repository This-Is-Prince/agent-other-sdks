# Polymarket Plugin

The Polymarket plugin enables your AI agent to interact with Polymarket, a popular prediction market platform. It allows for checking market information, placing bets, and managing positions on prediction markets.

## Installation

```bash
pnpm add @goat-sdk/plugin-polymarket
```

## Configuration

To use the Polymarket plugin, you need to provide API credentials:

```typescript
import { polymarket } from "@goat-sdk/plugin-polymarket";

// Add the plugin to your GOAT SDK setup
const plugins = [
  polymarket({
    credentials: {
      key: "your-polymarket-api-key",
      secret: "your-polymarket-secret",
      passphrase: "your-polymarket-passphrase",
    },
  }),
  // other plugins...
];
```

## Usage Examples

Once configured, your AI agent can perform the following Polymarket operations through natural language:

### Market Information

Example prompts:
- "What are the top prediction markets on Polymarket?"
- "Show me markets about the 2024 US election"
- "What's the current probability for Trump winning the election?"

### Placing Bets

Example prompts:
- "Bet $50 on Trump winning the election"
- "Place $100 on the 'Yes' outcome for market XYZ"
- "Stake 200 USDC on 'No' for the question: Will BTC reach $100k by end of 2024?"

### Portfolio Management

Example prompts:
- "What's my current position on Polymarket?"
- "Show me all my active bets"
- "How much profit would I make if market XYZ resolves to 'Yes'?"

### Market Analysis

Example prompts:
- "What's the trading volume for the US election market?"
- "How has the probability for outcome XYZ changed over the last week?"
- "Which outcome is currently favored in the BTC price prediction market?"

## API Response

When checking market information, the agent might respond with:

```
Current probability for "Will Trump win the 2024 election?":
- Yes: 48.2%
- No: 51.8%
Total volume: $2.5M
```

For placing a bet:

```
Successfully placed a bet of $50 on "Yes" for the market "Will Trump win the 2024 election?".
Transaction hash: 0xabcd...
Your potential profit if outcome is Yes: $53.42
```

## Required Parameters

For the Polymarket plugin to work, ensure your API request includes:
- `walletPrivateKey`: To sign transactions
- `rpcProviderUrl`: To connect to the blockchain
- `polymarketApiKey`: Your Polymarket API key
- `polymarketSecret`: Your Polymarket API secret
- `polymarketPassphrase`: Your Polymarket API passphrase

## Obtaining Polymarket API Credentials

To get Polymarket API credentials:
1. Register on the [Polymarket platform](https://polymarket.com/)
2. Navigate to the API section in your account settings
3. Create API credentials and securely store the key, secret, and passphrase
4. Use these credentials in your configuration

## About Polymarket

Polymarket is a decentralized prediction market platform that allows users to bet on the outcome of future events. The platform uses blockchain technology to create transparent and efficient markets, with outcomes determined by real-world events.

For more information, visit the [Polymarket website](https://polymarket.com/). 
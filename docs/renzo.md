# Renzo Plugin

The Renzo plugin enables your AI agent to interact with Renzo, a liquid restaking protocol. It allows for ETH staking, rewards tracking, and participation in liquid staking.

## Installation

```bash
pnpm add @goat-sdk/plugin-renzo
```

## Configuration

To use the Renzo plugin, simply add it to your plugins array:

```typescript
import { renzo } from "@goat-sdk/plugin-renzo";

// Add the plugin to your GOAT SDK setup
const plugins = [
  renzo(),
  // other plugins...
];
```

## Usage Examples

Once configured, your AI agent can perform the following Renzo operations through natural language:

### Staking Operations

Example prompts:
- "Stake 0.5 ETH with Renzo"
- "Restake my ETH on Renzo"
- "Unstake 1 ETH from Renzo"

### Reward Tracking

Example prompts:
- "What are my Renzo staking rewards?"
- "How much have I earned from staking on Renzo?"
- "What's the current APR for ETH staking on Renzo?"

### Liquid Staking Tokens

Example prompts:
- "What is my ezETH balance?"
- "Convert my ezETH back to ETH"
- "What's the exchange rate between ETH and ezETH?"

### Protocol Information

Example prompts:
- "Tell me about Renzo protocol"
- "What validators does Renzo use?"
- "Is Renzo audited?"

## API Response

When staking ETH with Renzo, the agent might respond with:

```
Successfully staked 0.5 ETH with Renzo.
Transaction hash: 0xabcd...
You received 0.498 ezETH in return.
Current APR: 3.75%
```

For reward information:

```
Your Renzo staking rewards:
Total staked: 2.5 ETH
Total rewards: 0.075 ETH
Current APR: 3.75%
```

## Required Parameters

For the Renzo plugin to work, ensure your API request includes:
- `walletPrivateKey`: To sign transactions
- `rpcProviderUrl`: To connect to the blockchain

## About Renzo Protocol

Renzo is a liquid restaking protocol that allows users to stake their ETH and receive a liquid staking token (ezETH) in return. This token can be used in various DeFi applications while the underlying ETH continues to earn staking rewards. 

Renzo's key features include:
- Non-custodial staking
- Competitive APRs
- Liquid staking tokens usable across DeFi
- Protocol-owned validators

For more information, visit the [Renzo Protocol website](https://renzo.fi/). 
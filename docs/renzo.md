# Renzo Plugin

The Renzo plugin enables your AI agent to interact with the Renzo liquid staking protocol. It allows for depositing ETH or ERC20 tokens into Renzo and checking ezETH balances across supported chains.

## API Usage

There are two ways to use the Renzo plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to Renzo liquid staking operations.

#### Required Parameters

```json
{
  "prompt": "Your Renzo-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o",
  
  // Optional: specify which chain to use
  "chain": "base" // Options: "base", "mode", "arbitrum", "bsc", "linea"
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o",
  "chain": "base"  // Renzo is available on Base
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your Renzo-related query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Chains

The Renzo plugin supports the following chains:

| Chain Name | Chain ID | Description |
|------------|----------|-------------|
| Base | 8453 | Ethereum L2 scaling solution by Coinbase |
| Mode | 34443 | Ethereum L2 built on the OP Stack |
| Arbitrum | 42161 | Ethereum L2 using optimistic rollups |
| BNB Chain | 56 | Binance Smart Chain network |
| Linea | 59144 | Ethereum L2 by ConsenSys |

## Available Tools and Example Prompts

The Renzo plugin provides tools for staking ETH and managing ezETH:

### Deposit ETH into Renzo

**Tool:** `deposit_eth_into_renzo`

Description: Deposit ETH into Renzo to receive ezETH (liquid staked ETH).

Example prompts:
- "Stake 0.5 ETH on Renzo"
- "Deposit 1 ETH into Renzo protocol"

### Deposit ERC20 LST into Renzo

**Tool:** `deposit_erc20_LST_into_renzo`

Description: Deposit ERC20 Liquid Staking Tokens into Renzo (requires prior approval).

Example prompts:
- "Deposit 100 stETH to Renzo"
- "Convert my rETH tokens to ezETH via Renzo"

### Check ezETH Balance

**Tool:** `check_ezeth_balance_in_renzo`

Description: Check the ezETH balance of an address.

Example prompts:
- "What's my ezETH balance?"
- "Check how much ezETH I have in my wallet"
- "Show me the ezETH balance for address 0x123..."
- "How many ezETH tokens do I own on Base?"
- "Get my Renzo liquid staking token balance on Linea"

### Get Renzo Deposit Address

**Tool:** `renzo_get_deposit_address`

Description: Get the Renzo deposit contract address for the current chain.

Example prompts:
- "What's the Renzo deposit address on Base?"
- "Show me the contract address for depositing into Renzo"

## API Response Examples

When depositing ETH into Renzo, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "deposit_eth_into_renzo",
      "result": "0x123abc456def789ghi..."
    }
  ],
  "response": "I've deposited 1 ETH into Renzo for you. The transaction has been submitted with hash 0x123abc456def789ghi... You'll receive ezETH in your wallet once the transaction is confirmed."
}
```

When checking an ezETH balance, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "check_ezeth_balance_in_renzo",
      "result": "1000000000000000000"
    }
  ],
  "response": "Your ezETH balance is 1.0 ezETH."
}
```

## About Renzo

Renzo is a liquid staking protocol that allows users to stake their ETH and receive ezETH in return. ezETH is a liquid staking token that represents staked ETH and can be used in DeFi applications while continuing to earn staking rewards.

The protocol operates across multiple chains including Mode, Base, Arbitrum, BSC, and Linea, providing cross-chain liquidity for staked ETH.

Note: Before depositing ERC20 tokens into Renzo, you must first approve the Renzo contract to spend your tokens. 
# Uniswap Plugin

The Uniswap plugin enables your AI agent to interact with Uniswap, a leading decentralized exchange protocol. It allows for token swapping on supported EVM chains.

## API Usage

There are two ways to use the Uniswap plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to token swapping.

#### Required Parameters

```json
{
  "prompt": "Your Uniswap-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "uniswapBaseUrl": "https://api.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o",
  
  // Optional: specify which chain to use (defaults to Base)
  "chain": "base" // Options: "base", "polygon"
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "uniswapBaseUrl": "https://api.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o",
  "chain": "base"
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your Uniswap-related query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Chains and Tokens

The Uniswap plugin supports the following chains and tokens:

### Supported Chains
- Base (8453)
- Polygon (137)

### Supported Tokens
The plugin supports swapping between any of the following tokens on their respective chains:

| Token | Symbol | Base (8453) | Polygon (137) |
|-------|--------|------------|--------------|
| Ethereum | ETH | Native token | ✓ |
| Wrapped Ether | WETH | ✓ | ✓ |
| Wrapped Bitcoin | WBTC | ✓ | ✓ |
| Chainlink | LINK | ✓ | ✓ |
| Uniswap | UNI | ✓ | ✓ |
| Tether USD | USDT | ✓ | ✓ |
| USD Coin | USDC | ✓ | ✓ |
| Dai Stablecoin | DAI | ✓ | ✓ |

## Available Tools and Example Prompts

The Uniswap plugin provides tools for token swapping and approval management:

### Check Token Approval

**Tool:** `uniswap_check_approval`

Description: Check if the wallet has enough approval for a token and execute the approval transaction if needed. This must be done before swapping tokens.

Example prompts:
- "Check if I've approved USDC for trading on Uniswap"
- "Do I need to approve 100 DAI before swapping on Uniswap?"

### Get Swap Quote

**Tool:** `uniswap_get_quote`

Description: Get a quote for swapping tokens on Uniswap, showing expected output amount, price impact, and gas fees.

Example prompts:
- "How much ETH will I get for 1000 USDC on Uniswap?"
- "Get a quote for swapping 0.5 ETH to USDC"

### Swap Tokens

**Tool:** `uniswap_swap_tokens`

Description: Execute a token swap on Uniswap. This tool will automatically handle quotes and execute the transaction.

Example prompts:
- "Swap 100 USDC for ETH on Uniswap"
- "Trade 0.5 ETH for USDC using Uniswap"

## API Response Examples

When checking token approval, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "uniswap_check_approval",
      "result": {
        "status": "approved",
        "txHash": "0x123abc456def789ghi..."
      }
    }
  ],
  "response": "I've approved your USDC tokens for trading on Uniswap. The approval transaction has been submitted with hash 0x123abc456def789ghi... Now you can proceed with the swap."
}
```

When getting a quote, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "uniswap_get_quote",
      "result": {
        "routing": "CLASSIC",
        "quote": {
          "chainId": 8453,
          "swapper": "0xYourAddress",
          "input": {
            "token": "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
            "amount": "1000000000"
          },
          "output": {
            "token": "0x4200000000000000000000000000000000000006",
            "amount": "450000000000000000"
          },
          "priceImpact": 0.5,
          "gasFeeUSD": "5.23"
        }
      }
    }
  ],
  "response": "For 1000 USDC, you will receive approximately 0.45 ETH. The price impact is 0.5% and the gas fee is about $5.23."
}
```

When swapping tokens, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "uniswap_swap_tokens",
      "result": {
        "txHash": "0x456def789ghi123abc..."
      }
    }
  ],
  "response": "I've swapped 1000 USDC for approximately 0.45 ETH on Uniswap. The transaction has been submitted with hash 0x456def789ghi123abc... The tokens will be in your wallet once the transaction is confirmed."
}
```

## About Uniswap

Uniswap is a decentralized exchange protocol that enables automated, permissionless token swaps on Ethereum and other EVM-compatible blockchains. It uses automated market maker (AMM) technology to determine token prices based on the ratio of tokens in liquidity pools.

Note: Before swapping tokens on Uniswap, you must first approve the Uniswap router contract to spend your tokens. The plugin's check_approval tool handles this automatically. 
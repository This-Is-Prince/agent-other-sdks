# Uniswap Plugin

The Uniswap plugin enables your AI agent to interact with Uniswap, a leading decentralized exchange protocol. It allows for token swapping across multiple EVM chains, including Ethereum, Polygon, Arbitrum, Base, Optimism, and more.

## API Usage

To use the Uniswap plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to token swapping.

### Required Parameters

```json
{
  "prompt": "Your Uniswap-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "uniswapBaseUrl": "https://api.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key"
}
```

## Available Tools and Example Prompts

The Uniswap plugin provides tools for token swapping and approval management:

### Check Token Approval

**Tool:** `uniswap_check_approval`

Description: Check if the wallet has enough approval for a token and execute the approval transaction if needed. This must be done before swapping tokens.

Example prompts:
- "Check if I've approved USDC for trading on Uniswap"
- "Do I need to approve 100 DAI before swapping on Uniswap?"
- "Give Uniswap permission to use my UNI tokens"
- "Approve 50 LINK tokens for trading on Uniswap"
- "See if I need to set token allowance for Uniswap to trade my WETH"

### Get Swap Quote

**Tool:** `uniswap_get_quote`

Description: Get a quote for swapping tokens on Uniswap, showing expected output amount, price impact, and gas fees.

Example prompts:
- "How much ETH will I get for 1000 USDC on Uniswap?"
- "Get a quote for swapping 0.5 ETH to USDC"
- "What's the current exchange rate between DAI and WETH on Uniswap?"
- "Check the price impact for trading 100 UNI to ETH"
- "How much LINK can I get for 50 USDC on Optimism?"

### Swap Tokens

**Tool:** `uniswap_swap_tokens`

Description: Execute a token swap on Uniswap. This tool will automatically handle quotes and execute the transaction.

Example prompts:
- "Swap 100 USDC for ETH on Uniswap"
- "Trade 0.5 ETH for USDC using Uniswap"
- "Exchange my DAI for WETH on Uniswap"
- "Use Uniswap to convert 50 UNI tokens to ETH"
- "Swap 200 LINK for USDC on Base using Uniswap"

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
          "chainId": 1,
          "swapper": "0xYourAddress",
          "input": {
            "token": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "amount": "1000000000"
          },
          "output": {
            "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
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

The protocol is available on multiple chains including Ethereum, Polygon, Arbitrum, Base, Optimism, Avalanche, Celo, and Zora. Swaps can be performed within the same chain or across different chains when cross-chain functionality is supported.

Note: Before swapping tokens on Uniswap, you must first approve the Uniswap router contract to spend your tokens. The plugin's check_approval tool handles this automatically. 
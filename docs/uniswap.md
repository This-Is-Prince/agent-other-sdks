# Uniswap Plugin

The Uniswap plugin enables your AI agent to interact with the Uniswap protocol for decentralized token swaps, liquidity provision, and price checks.

## API Usage

To use the Uniswap plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to Uniswap operations.

### Required Parameters

```json
{
  "prompt": "Your Uniswap-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "uniswapBaseUrl": "https://trade-api.gateway.uniswap.org/v1",
  "uniswapApiKey": "your-uniswap-api-key"
}
```

## Available Tools and Example Prompts

The Uniswap plugin supports various DeFi operations. Here are the primary functions and example prompts:

### Price Quotes

**Tool:** `getQuote`

Example prompts:
- "What is the price of 1 ETH in USDC on Uniswap?"
- "How much USDC would I get for 10 ETH?"
- "Check the exchange rate between USDC and PEPE"
- "If I trade 100 USDC for ETH, how much ETH will I receive?"
- "What's the current swap rate for WETH to USDC with 0.5% slippage?"

### Token Swaps

**Tool:** `swap`

Example prompts:
- "Swap 0.1 ETH for USDC on Uniswap"
- "Trade 100 USDC for PEPE"
- "Exchange 50 USDC to ETH with 0.5% slippage"
- "Buy 100 PEPE tokens using USDC"
- "Convert 0.25 ETH to USDC and set max slippage to 1%"

### Liquidity Pool Information

**Tool:** `getPoolInfo`

Example prompts:
- "Show me information about the ETH/USDC pool on Uniswap"
- "What's the TVL of the PEPE/USDC pool?"
- "How much liquidity is in the ETH/USDC pool?"
- "What are the fees for the WETH/USDC pool?"
- "Show me the volume of the PEPE/ETH pool in the last 24 hours"

### Adding Liquidity

**Tool:** `addLiquidity`

Example prompts:
- "Add liquidity to the ETH/USDC pool on Uniswap"
- "Provide 0.1 ETH and equivalent USDC to the liquidity pool"
- "I want to become a liquidity provider for PEPE/USDC"
- "Add 500 USDC and matching ETH to Uniswap"
- "Contribute to the ETH/USDC pool with 1:1 ratio"

### Removing Liquidity

**Tool:** `removeLiquidity`

Example prompts:
- "Remove my liquidity from the PEPE/USDC pool"
- "Withdraw all my funds from the ETH/USDC pool"
- "Take out 50% of my liquidity from Uniswap"
- "Exit the WETH/USDC liquidity position"
- "Redeem my LP tokens for ETH and USDC"

## API Response Examples

When getting a price quote, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "getQuote",
      "result": {
        "inputToken": "ETH",
        "outputToken": "USDC",
        "inputAmount": "1000000000000000000",
        "formattedInputAmount": "1",
        "outputAmount": "3245670000",
        "formattedOutputAmount": "3245.67",
        "priceImpact": "0.05"
      }
    }
  ],
  "response": "1 ETH is currently worth 3,245.67 USDC on Uniswap. The price impact for this trade would be 0.05%."
}
```

When performing a swap, the response might include:

```json
{
  "toolResults": [
    {
      "name": "swap",
      "result": {
        "txHash": "0xabcd1234...",
        "inputToken": "ETH",
        "outputToken": "USDC",
        "inputAmount": "100000000000000000",
        "formattedInputAmount": "0.1",
        "outputAmount": "324567000",
        "formattedOutputAmount": "324.567",
        "slippage": "0.005"
      }
    }
  ],
  "response": "Successfully swapped 0.1 ETH for 324.567 USDC on Uniswap. Transaction hash: 0xabcd1234..."
}
``` 
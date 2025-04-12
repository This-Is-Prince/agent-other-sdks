# DeBridge Plugin

The DeBridge plugin enables your AI agent to interact with DeBridge's cross-chain infrastructure, allowing for token transfers and operations between different blockchain networks.

## API Usage

There are two ways to use the deBridge plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to cross-chain operations.

#### Required Parameters

```json
{
  "prompt": "Your DeBridge-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "debrigeBaseUrl": "https://your-debridge-api-endpoint.com", // Optional
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o",
  
  // Optional: specify which chain to use (defaults to Base)
  "chain": "base" // Options: "base", "polygon", "bnb"
}
```

### Option 2: Using Agent Registration (Recommended)

#### Step 1: Register an agent

Make a POST request to the `/goat/registerAgent` endpoint to create a reusable agent:

```json
{
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "debrigeBaseUrl": "https://your-debridge-api-endpoint.com", // Optional
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "modelName": "gpt-4o",
  "chain": "base" // Options: "base", "polygon", "bnb"
}
```

This will return an `agentId` that you can use for subsequent requests.

#### Step 2: Use the registered agent for queries

Make a POST request to the `/goat/generate` endpoint using just the agent ID:

```json
{
  "prompt": "Your cross-chain operation query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Chains and Tokens

The DeBridge plugin supports cross-chain operations between all the supported chains:

### Supported Chains
- Base (8453)
- Polygon (137)
- BNB Chain (56)

### Supported Tokens for Bridging

The following tokens can be bridged between the supported chains:

| Token | Symbol | Base (8453) | Polygon (137) | BNB Chain (56) |
|-------|--------|------------|--------------|----------------|
| USD Coin | USDC | ✓ | ✓ | ✓ |
| Tether USD | USDT | ✓ | ✓ | ✓ |
| Dai Stablecoin | DAI | ✓ | ✓ | ✓ |
| Ethereum | ETH | Native token | ✓ | ✓ |
| Wrapped Ether | WETH | ✓ | ✓ | - |
| Wrapped Bitcoin | WBTC | ✓ | ✓ | - |
| Chainlink | LINK | ✓ | ✓ | ✓ |
| Uniswap | UNI | ✓ | ✓ | ✓ |

## Available Tools and Example Prompts

The DeBridge plugin provides tools for cross-chain operations:

### Get Bridge Quote

**Tool:** `get_bridge_quote`

Description: Get a quote for bridging tokens between chains.

Example prompts:
- "How much will it cost to bridge 100 USDC from Base to Polygon?"
- "Get a quote for transferring 50 USDT from Polygon to BNB Chain"
- "What's the fee for bridging 25 DAI from Base to Polygon?"
- "Show me the gas cost for moving USDC from Base to BNB Chain"
- "Calculate fees for transferring 1000 LINK from Polygon to Base"

### Create Bridge Order

**Tool:** `create_bridge_order`

Description: Create a bridge order for transferring tokens between chains.

Example prompts:
- "Bridge 100 USDC from Base to Polygon"
- "Transfer 50 USDT from Polygon to BNB Chain"
- "Send 25 DAI from Base to Polygon"
- "Move 1000 LINK from Polygon to Base"
- "Bridge 10 WETH from Base to Polygon"

### Get Token Information

**Tool:** `get_token_info`

Description: Retrieve information about tokens on various chains.

Example prompts:
- "Show me information about USDC on Base"
- "What's the contract address of WETH on Polygon?"
- "Get token details for USDT on BNB Chain"
- "Show me LINK information across all supported chains"
- "What are the decimals for DAI on Base?"

### Get Supported Chains

**Tool:** `get_supported_chains`

Description: List all supported blockchain networks.

Example prompts:
- "Which blockchains does DeBridge support?"
- "What chains can I bridge tokens between?"
- "Show me all the networks supported by DeBridge"
- "List the available chains for cross-chain transfers"
- "What blockchains can I use with DeBridge?"

### Execute Bridge Transaction

**Tool:** `execute_bridge_transaction`

Description: Execute prepared bridge transactions.

Example prompts:
- "Execute the bridge transaction to send 100 USDC to Polygon"
- "Complete my token bridge from Base to BNB Chain"
- "Finalize the cross-chain transfer"
- "Submit my prepared bridge transaction"
- "Execute the pending bridge order"

### Check Transaction Status

**Tool:** `check_transaction_status`

Description: Check the status of executed transactions.

Example prompts:
- "Check the status of my bridge transaction"
- "Has my token transfer from Base to Polygon completed?"
- "Is my cross-chain transaction still pending?"
- "What's the status of my Polygon to BNB Chain bridge?"
- "Has my bridge transaction been confirmed yet?"

## API Response Examples

When getting a bridge quote, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "get_bridge_quote",
      "result": {
        "sourceTxFeeInUsd": 2.5,
        "destinationTxFeeInUsd": 0.8,
        "protocolFeeInUsd": 1.2,
        "totalFeeInUsd": 4.5,
        "amountToReceive": "99.25",
        "estimatedTimeInMinutes": 15
      }
    }
  ],
  "response": "To bridge 100 USDC from Base to Polygon, you'll pay approximately $4.50 in total fees. This includes $2.50 for the source chain transaction, $0.80 for the destination chain transaction, and $1.20 in protocol fees. You'll receive about 99.25 USDC on Polygon, and the process should take around 15 minutes to complete."
}
```

When creating a bridge order, the response might include:

```json
{
  "toolResults": [
    {
      "name": "create_bridge_order",
      "result": {
        "orderId": "deb-123456",
        "sourceChain": "base",
        "destinationChain": "polygon",
        "tokenSymbol": "USDC",
        "amount": "100",
        "txHash": "0xabcd1234...",
        "estimatedTimeInMinutes": 15
      }
    }
  ],
  "response": "I've created a bridge order to transfer 100 USDC from Base to Polygon. The transaction has been submitted with hash 0xabcd1234... and order ID deb-123456. The transfer should complete in approximately 15 minutes."
}
```

## About DeBridge

DeBridge is a cross-chain interoperability and liquidity transfer protocol that enables the decentralized transfer of arbitrary data and assets between various blockchains. The protocol provides a secure infrastructure for cross-chain exchanges and applications.

Key features include:
- Cross-chain token transfers
- Cross-chain messaging
- Arbitrary data transfer between blockchains
- Support for multiple EVM and non-EVM chains
- Decentralized validation for enhanced security
# DeBridge Plugin

The DeBridge plugin enables your AI agent to perform cross-chain operations and transfers between different blockchain networks.

## API Usage

To use the DeBridge plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to cross-chain operations.

### Required Parameters

```json
{
  "prompt": "Your cross-chain transfer query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  "debrigeBaseUrl": "https://your-debridge-api-endpoint.com" // Optional, default endpoint is used if not provided
}
```

## Available Tools and Example Prompts

The DeBridge plugin supports various cross-chain operations. Here are the primary functions and example prompts:

### Get Bridge Quote

**Tool:** `get_bridge_quote`

Description: Get a quote for bridging tokens between chains. Use get_token_info first to get correct token addresses.

Example prompts:
- "Get a quote for bridging 0.1 ETH from Ethereum to Solana"
- "How much USDC will I receive if I bridge 100 USDC from Base to Arbitrum?"
- "What are the fees to transfer 50 USDT from Base to Optimism?"
- "Calculate the estimated amount I'll get if I send 1 ETH to Polygon"
- "Show me an estimate for sending 25 USDC from Base to Ethereum"

### Create Bridge Order

**Tool:** `create_bridge_order`

Description: Create a bridge order to transfer tokens between chains. The tool handles cross-chain transfers between EVM chains and to/from Solana.

Example prompts:
- "Create an order to bridge 0.1 ETH from Base to Ethereum"
- "Transfer 100 USDC from Base to my address on Arbitrum"
- "Send 50 USDT to my wallet on Solana"
- "Bridge 200 USDC from Base to Optimism at address 0x1234..."
- "Create a transfer of 0.5 ETH to my Polygon wallet"

### Get Token Information

**Tool:** `get_token_info`

Description: Get token information from a chain. For EVM: use 0x-prefixed address. For Solana: use base58 token address.

Example prompts:
- "Show me the token information for USDC on Ethereum"
- "Get details about ETH on Base"
- "What tokens are available on Solana?"
- "Find information about the token at address 0x1234... on Arbitrum"
- "Search for tokens with 'USD' in their name on Base"

### Get Supported Chains

**Tool:** `get_supported_chains`

Description: Get a list of all chains supported by DeBridge protocol.

Example prompts:
- "What chains does DeBridge support?"
- "List all the blockchain networks available for bridging"
- "Is Solana supported by DeBridge?"
- "Show me the supported networks for cross-chain transfers"
- "What are the chain IDs for networks supported by DeBridge?"

### Execute Bridge Transaction

**Tool:** `execute_bridge_transaction`

Description: Execute a bridge transaction using tx data from create_bridge_order tool. Always asks for confirmation before proceeding.

Example prompts:
- "Execute the bridge transaction I just created"
- "Confirm and send my cross-chain transfer"
- "Process my bridge order to Arbitrum"
- "Complete my token transfer to Solana"
- "Submit the bridging transaction we just prepared"

### Check Transaction Status

**Tool:** `check_transaction_status`

Description: Check the status of bridge transactions using their transaction hash.

Example prompts:
- "What's the status of my bridge transaction with hash 0xabcd...?"
- "Has my transfer to Arbitrum been completed?"
- "Check if my cross-chain transaction went through"
- "Track my DeBridge transfer with transaction hash 0x1234..."
- "Is my token bridge to Solana done yet?"

## API Response Examples

When creating a bridge order, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "create_bridge_order",
      "result": {
        "tx": {
          "to": "0x663F3ad617193148711d28f5334eE4Ed07016602",
          "data": "0x12345...",
          "value": "1000000000000000"
        },
        "orderId": "0x67890...",
        "srcChain": "Base",
        "srcToken": {
          "symbol": "ETH",
          "decimals": 18
        },
        "dstChain": "Ethereum",
        "dstToken": {
          "symbol": "ETH",
          "decimals": 18
        },
        "amount": "0.1",
        "fee": "0.001",
        "estimatedGas": "250000"
      }
    }
  ],
  "response": "I've created a bridge order to transfer 0.1 ETH from Base to Ethereum. The gas fee is approximately 0.001 ETH. Would you like me to execute this transaction?"
}
```

When checking the status of a transaction, the response might include:

```json
{
  "toolResults": [
    {
      "name": "check_transaction_status",
      "result": [
        {
          "status": "Fulfilled",
          "orderId": "0x67890...",
          "orderLink": "https://app.debridge.finance/order?orderId=0x67890..."
        }
      ]
    }
  ],
  "response": "Your bridge transaction has been successfully completed! The tokens have been delivered to the destination chain. You can view the details at https://app.debridge.finance/order?orderId=0x67890..."
}
```

## Supported Chains

DeBridge supports numerous blockchain networks including but not limited to:
- Ethereum (Chain ID: 1)
- Arbitrum (Chain ID: 42161)
- Optimism (Chain ID: 10)
- Base (Chain ID: 8453)
- Polygon (Chain ID: 137)
- Avalanche (Chain ID: 43114)
- BNB Chain (Chain ID: 56)
- Solana (Chain ID: 7565164)

The exact list of supported chains may change as DeBridge expands its integrations. Use the `get_supported_chains` tool to get the most current list.
# ERC20 Plugin

The ERC20 plugin allows your AI agent to interact with ERC20 tokens on EVM-compatible chains. This includes checking balances, sending tokens, and viewing token information.

## API Usage

There are two ways to use the ERC20 plugin:

### Option 1: Direct Usage with generate endpoint

Make a POST request to the `/goat/generate` endpoint with a natural language prompt related to ERC20 token operations.

#### Required Parameters

```json
{
  "prompt": "Your ERC20-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  
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
  "prompt": "Your ERC20-related query here",
  "agentId": "your-registered-agent-id"
}
```

This approach is more efficient as you don't need to send your wallet keys and API keys with every request.

## Supported Tokens and Chains

The ERC20 plugin supports the following tokens across different chains:

| Token | Symbol | Base (8453) | Polygon (137) | BNB Chain (56) |
|-------|--------|------------|--------------|----------------|
| Ethereum | ETH | Native token | ✓ | ✓ |
| Wrapped Ether | WETH | ✓ | ✓ | - |
| Bitcoin | BTC | - | - | ✓ |
| Wrapped Bitcoin | WBTC | ✓ | ✓ | - |
| Chainlink | LINK | ✓ | ✓ | ✓ |
| Uniswap | UNI | ✓ | ✓ | ✓ |
| Solana | SOL | - | - | ✓ |
| Tether USD | USDT | ✓ | ✓ | ✓ |
| USD Coin | USDC | ✓ | ✓ | ✓ |
| Dai Stablecoin | DAI | ✓ | ✓ | ✓ |

## Available Tools and Example Prompts

The ERC20 plugin supports operations for the tokens listed above. Here are the primary functions and example prompts:

### Checking Token Balances

**Tool:** `getBalance`

Description: Check the balance of a specific ERC20 token in your wallet.

Example prompts:
- "What's my USDC balance?"
- "How much LINK do I have?"
- "Check my WETH balance"
- "Show all my ERC20 token balances"
- "What's my DAI balance on Polygon?"

### Sending Tokens

**Tool:** `transfer`

Description: Send ERC20 tokens to another address.

Example prompts:
- "Send 10 USDC to 0x1234..."
- "Transfer 5 LINK to 0xabcd..."
- "Send 0.5 WETH to vitalik.eth"
- "Send 100 USDT to my friend at 0x5678..."
- "Transfer 20 DAI to 0xabcd... on Polygon"

### Getting Token Information

**Tool:** `getMetadata`

Description: Retrieve metadata information about an ERC20 token.

Example prompts:
- "What's the total supply of USDC?"
- "What's the contract address for LINK on Base?"
- "How many decimals does WETH use?"
- "Tell me about the UNI token"
- "What's the contract address for USDT on BNB Chain?"

### Approving Tokens

**Tool:** `approve`

Description: Approve a contract or address to spend a specific amount of your tokens.

Example prompts:
- "Approve Uniswap to spend 100 USDC"
- "Give permission to 0x1234... to spend 50 LINK tokens"
- "Approve maximum WETH spending for contract 0xabcd..."
- "Allow Uniswap to use my DAI tokens"
- "Approve 1000 USDT for DeFi protocol 0x5678..."

### Checking Allowances

**Tool:** `getAllowance`

Description: Check how many tokens you've approved a specific address to spend.

Example prompts:
- "How much USDC did I approve for Uniswap?"
- "Check my token allowances for 0x1234..."
- "Do I have any existing approvals for LINK token?"
- "How much DAI can contract 0xabcd... spend on my behalf?"
- "Show me all my token approvals on Polygon"

## API Response Examples

When the agent checks a token balance, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "getBalance",
      "result": {
        "balance": "100500000",
        "tokenDecimals": 6,
        "formattedBalance": "100.5",
        "symbol": "USDC"
      }
    }
  ],
  "response": "Your USDC balance is 100.5 USDC."
}
```

When sending tokens, the response might include:

```json
{
  "toolResults": [
    {
      "name": "transfer",
      "result": {
        "txHash": "0xabcd1234...",
        "amount": "10000000",
        "formattedAmount": "10",
        "recipient": "0x1234...",
        "symbol": "USDC"
      }
    }
  ],
  "response": "Successfully sent 10 USDC to 0x1234... Transaction hash: 0xabcd1234..."
}
``` 
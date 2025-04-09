# ERC20 Plugin

The ERC20 plugin allows your AI agent to interact with ERC20 tokens on EVM-compatible chains. This includes checking balances, sending tokens, and viewing token information.

## API Usage

To use the ERC20 plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to ERC20 token operations.

### Required Parameters

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
  "chain": "base" // Options: "base", "baseSepolia", "mainnet", "sepolia", "polygon"
}
```

## Available Tools and Example Prompts

The ERC20 plugin supports operations for USDC, PEPE, and WETH tokens. Here are the primary functions and example prompts:

### Checking Token Balances

**Tool:** `getBalance`

Description: Check the balance of a specific ERC20 token in your wallet.

Example prompts:
- "What's my USDC balance?"
- "How much PEPE do I have?"
- "Check my WETH balance"
- "Show all my ERC20 token balances"
- "What tokens do I own on this wallet?"

### Sending Tokens

**Tool:** `transfer`

Description: Send ERC20 tokens to another address.

Example prompts:
- "Send 10 USDC to 0x1234..."
- "Transfer 5 PEPE to 0xabcd..."
- "Send 0.5 WETH to vitalik.eth"
- "Send 100 USDC to my friend at 0x5678... with a memo saying 'lunch payment'"

### Getting Token Information

**Tool:** `getMetadata`

Description: Retrieve metadata information about an ERC20 token.

Example prompts:
- "What's the total supply of USDC?"
- "What's the contract address for PEPE?"
- "How many decimals does WETH use?"
- "Tell me about the PEPE token"
- "Who is the owner of the USDC contract?"

### Approving Tokens

**Tool:** `approve`

Description: Approve a contract or address to spend a specific amount of your tokens.

Example prompts:
- "Approve Uniswap to spend 100 USDC"
- "Give permission to 0x1234... to spend 50 PEPE tokens"
- "Approve maximum WETH spending for contract 0xabcd..."

### Checking Allowances

**Tool:** `getAllowance`

Description: Check how many tokens you've approved a specific address to spend.

Example prompts:
- "How much USDC did I approve for Uniswap?"
- "Check my token allowances for 0x1234..."
- "Do I have any existing approvals for PEPE token?"

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
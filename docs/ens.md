# ENS Plugin

The ENS (Ethereum Name Service) plugin enables your AI agent to resolve ENS domain names to Ethereum addresses.

## API Usage

To use the ENS plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to ENS domain resolution.

### Required Parameters

```json
{
  "prompt": "Your ENS-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  
  // Choose ONE of the following model provider API keys
  "OPENAI_API_KEY": "YourOpenAIApiKey",
  // or any other supported model:
  // "ANTHROPIC_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "XAI_API_KEY", 
  // "DEEPSEEK_API_KEY", "PERPLEXITY_API_KEY"
  
  // Optional: specify which model to use
  "modelName": "gpt-4o"
}
```

## Available Tool and Example Prompts

The ENS plugin supports resolving ENS names to Ethereum addresses.

### Address Resolution (ENS to ETH Address)

**Tool:** `get_address_from_ens`

Description: Resolve an ENS domain name to its corresponding Ethereum address.

Example prompts:
- "What is the Ethereum address for vitalik.eth?"
- "Resolve the ENS name nick.eth"
- "Convert the ENS domain uniswap.eth to an Ethereum address"
- "Look up the wallet address for lens.eth"
- "Find the ETH address linked to opensea.eth"
- "What address does goat.eth point to?"
- "Get the wallet address for ethereum.eth"

## API Response Example

When resolving an ENS name to an address, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "get_address_from_ens",
      "result": {
        "ensName": "vitalik.eth",
        "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
      }
    }
  ],
  "response": "The Ethereum address for vitalik.eth is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
}
```

## About ENS

The Ethereum Name Service (ENS) is a distributed, open, and extensible naming system based on the Ethereum blockchain. It maps human-readable names to machine-readable identifiers such as Ethereum addresses, content hashes, and metadata.

ENS domains provide several benefits:
- Simplified cryptocurrency transfers (send to "name.eth" instead of "0x123...")
- Decentralized websites
- Consistent identity across web3 applications
- Integration with traditional DNS

For more information, visit the [ENS website](https://ens.domains/). 
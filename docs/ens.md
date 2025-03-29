# ENS Plugin

The ENS (Ethereum Name Service) plugin enables your AI agent to interact with ENS domains, resolving domain names to Ethereum addresses and vice versa, as well as retrieving ENS metadata.

## API Usage

To use the ENS plugin via the API, make a POST request to the `/goat/generate` endpoint with a natural language prompt related to ENS domain operations.

### Required Parameters

```json
{
  "prompt": "Your ENS-related query here",
  "walletPrivateKey": "0xYourPrivateKey",
  "rpcProviderUrl": "https://base-mainnet.g.alchemy.com/v2/YourAlchemyKey",
  "OPENAI_API_KEY": "YourOpenAIApiKey"
}
```

## Available Tools and Example Prompts

The ENS plugin supports various name service operations. Here are the primary functions and example prompts:

### Address Resolution (ENS to ETH Address)

**Tool:** `resolveENS`

Example prompts:
- "What is the Ethereum address for vitalik.eth?"
- "Resolve the ENS name nick.eth"
- "Convert the ENS domain uniswap.eth to an Ethereum address"
- "Look up the wallet address for lens.eth"
- "Find the ETH address linked to opensea.eth"

### Reverse Resolution (ETH Address to ENS)

**Tool:** `lookupAddress`

Example prompts:
- "What is the ENS name for 0x123456789abcdef...?"
- "Does 0xd8da6bf26964af9d7eed9e03e53415d37aa96045 have an ENS name?"
- "Find the ENS domain associated with this address: 0x123..."
- "Look up the ENS for this wallet: 0xabcd..."
- "Get the human-readable name for 0x1234..."

### ENS Records and Metadata

**Tool:** `getENSDetails`

Example prompts:
- "What is the avatar for vitalik.eth?"
- "Show me the content records for uniswap.eth"
- "Does nick.eth have a Twitter handle set?"
- "Get all the metadata for buterin.eth"
- "What's the email address linked to ens.eth?"

### ENS Ownership and Expiry

**Tool:** `getENSOwnership`

Example prompts:
- "Who owns the ENS domain ethereum.eth?"
- "When does vitalik.eth expire?"
- "Is the domain cryptopunks.eth available for registration?"
- "How long until ens.eth needs to be renewed?"
- "When was uniswap.eth registered?"

### Text Records

**Tool:** `getENSText`

Example prompts:
- "What is the Twitter handle for vitalik.eth?"
- "Get the description text record for uniswap.eth"
- "Does buterin.eth have a GitHub username set?"
- "What social media accounts are linked to ens.eth?"
- "Show all text records for ethereum.eth"

## API Response Examples

When resolving an ENS name to an address, the response might look like:

```json
{
  "toolResults": [
    {
      "name": "resolveENS",
      "result": {
        "ensName": "vitalik.eth",
        "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
      }
    }
  ],
  "response": "The Ethereum address for vitalik.eth is 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
}
```

When doing reverse resolution, the response might include:

```json
{
  "toolResults": [
    {
      "name": "lookupAddress",
      "result": {
        "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "ensName": "vitalik.eth"
      }
    }
  ],
  "response": "The ENS name for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 is vitalik.eth"
}
```

When getting ENS details, the response might show:

```json
{
  "toolResults": [
    {
      "name": "getENSDetails",
      "result": {
        "ensName": "vitalik.eth",
        "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "avatar": "https://ipfs.io/ipfs/QmSP4nq9fnN9dAiCj42ug9Wa79rqmQerZXZch82VqpiH7U/image.gif",
        "twitter": "vitalikbuterin",
        "github": "vbuterin",
        "email": "example@example.com",
        "url": "https://vitalik.ca"
      }
    }
  ],
  "response": "Here are the details for vitalik.eth: Address: 0xd8dA...6045, Avatar URL: https://ipfs.io/ipfs/QmSP...gif, Twitter: @vitalikbuterin, GitHub: vbuterin, Website: https://vitalik.ca"
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
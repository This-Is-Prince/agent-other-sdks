# Chain-Supported SDK Actions

This document provides information about which chains support various SDK actions/plugins. The table below shows compatibility across three major chains: Base, Polygon, and BNB Chain.

| Plugin/SDK Action | Base | Polygon | BNB Chain |
|------------------|------|---------|-----------|
| ERC20 | ✅ | ✅ | ✅ |
| Send ETH | ✅ | ✅ | ✅ |
| Uniswap | ✅ | ✅ | ❌ |
| DeBridge | ✅ | ✅ | ✅ |
| OpenSea | ✅ | ✅ | ❌ |
| Renzo | ✅ | ❌ | ❌ |
| Polymarket | ❌ | ✅ | ❌ |
| CoinMarketCap | ✅ | ✅ | ✅ |
| CoinGecko | ✅ | ✅ | ✅ |
| ENS | ✅ | ❌ | ❌ |
| Crossmint Headless Checkout | ✅ | ✅ | ❌ |

## Notes:

- **ERC20**: Supports operations for USDC, PEPE, and WETH tokens on all EVM-compatible chains.
- **DeBridge**: Supports cross-chain operations between various networks including Base, Polygon, and BNB Chain.
- **Polymarket**: Only supported on Polygon network.
- **Uniswap**: Available on multiple chains including Base and Polygon, but not directly on BNB Chain.
- **CoinGecko/CoinMarketCap**: These are data providers that support information for tokens on all chains.
- **ENS**: Primarily operates on Ethereum and Base, not directly supported on Polygon or BNB Chain.
- **OpenSea**: Supports NFT operations on Ethereum, Base, and Polygon.
- **Renzo**: Liquid staking protocol primarily on Base.
- **Crossmint**: Supports NFT checkout on various chains including Base and Polygon.

The chain support information is based on documentation and implementation details found in the codebase. Actual support may change as new features are added or platforms expand to additional chains. 
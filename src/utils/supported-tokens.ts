import { Token } from "@goat-sdk/plugin-erc20";

export const tokens: Token[] = [
  {
    decimals: 18,
    symbol: "ETH",
    name: "Ethereum",
    chains: {
      137: { contractAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" } /* Polygon WETH [oai_citation_attribution:0‡thirdweb.com](https://thirdweb.com/polygon/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/analytics#:~:text=Wrapped%20Ether) */,
      56:  { contractAddress: "0x2170ed0880ac9A755fd29B2688956BD959F933F8" } /* BNB Chain ETH (Binance-Peg) [oai_citation_attribution:1‡bscscan.com](https://bscscan.com/token/0x2170ed0880ac9a755fd29b2688956bd959f933f8#:~:text=Binance) [oai_citation_attribution:2‡bscscan.com](https://bscscan.com/token/0x2170ed0880ac9a755fd29b2688956bd959f933f8#:~:text=,18%20Decimals) */,
    }
  },
  {
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    chains: {
      8453: { contractAddress: "0x4200000000000000000000000000000000000006" } /* Base WETH [oai_citation_attribution:4‡docs.uniswap.org](https://docs.uniswap.org/contracts/v3/reference/deployments/base-deployments#:~:text=Network%20ChainId%20Wrapped%20Native%20Token,0x4200000000000000000000000000000000000006) */,
      137: { contractAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" } /* Polygon WETH [oai_citation_attribution:5‡thirdweb.com](https://thirdweb.com/polygon/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/analytics#:~:text=Wrapped%20Ether) */
    }
  },
  {
    decimals: 8,
    symbol: "BTC",
    name: "Bitcoin",
    chains: {
      56:  { contractAddress: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c" } /* BNB Chain BTC (BTCB) [oai_citation_attribution:6‡bscscan.com](https://bscscan.com/token/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c#:~:text=Binance) [oai_citation_attribution:7‡bscscan.com](https://bscscan.com/token/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c#:~:text=,18%20Decimals) */
      // (BTC is not issued on Base or Polygon; on Solana, see WBTC)
    }
  },
  {
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    chains: {
      8453: { contractAddress: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c" } /* Base WBTC [oai_citation_attribution:8‡basescan.org](https://basescan.org/token/0x0555E30da8f98308EdB960aa94C0Db47230d2B9c#:~:text=,8%20Decimals) */,
      137: { contractAddress: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6" } /* Polygon WBTC [oai_citation_attribution:9‡polygonscan.com](https://polygonscan.com/address/0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6#:~:text=The%20Contract%20Address%200x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6%20page,and%20analytics%20for%20the) */,
    }
  },
  {
    decimals: 18,
    symbol: "LINK",
    name: "Chainlink",
    chains: {
      8453: { contractAddress: "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196" } /* Base LINK [oai_citation_attribution:11‡docs.chain.link](https://docs.chain.link/resources/link-token-contracts#:~:text=Parameter%20Value%20Chain%20ID%20,org) */,
      137: { contractAddress: "0xb0897686c545045afc77cf20ec7a532e3120e0f1" } /* Polygon LINK (ERC-677) [oai_citation_attribution:12‡docs.chain.link](https://docs.chain.link/resources/link-token-contracts#:~:text=Parameter%20Value%20Chain%20ID%20,io) */,
      56:  { contractAddress: "0xf8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD" } /* BNB Chain LINK (Binance-Peg) [oai_citation_attribution:13‡bscscan.com](https://bscscan.com/token/0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd#:~:text=Binance) [oai_citation_attribution:14‡bscscan.com](https://bscscan.com/token/0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd#:~:text=,18%20Decimals) */
    }
  },
  {
    decimals: 18,
    symbol: "UNI",
    name: "Uniswap",
    chains: {
      8453: { contractAddress: "0xc3DE830ea07524A0761646A6A4E4Be0e114A3C83" } /* Base UNI [oai_citation_attribution:15‡basescan.org](https://basescan.org/token/0xc3de830ea07524a0761646a6a4e4be0e114a3c83#:~:text=,18%20Decimals) */,
      137: { contractAddress: "0xb33EaAd8d922B1083446DC23f610c2567fb5180f" } /* Polygon UNI [oai_citation_attribution:16‡polygonscan.com](https://polygonscan.com/address/0xb33eaad8d922b1083446dc23f610c2567fb5180f#:~:text=Uniswap%20Protocol%3A%20UNI%20Token%20,and%20analytics%20for%20the) */,
      56:  { contractAddress: "0xBF5140A22578168FD562DCcF235E5D43A02ce9B1" } /* BNB Chain UNI (Binance-Peg) [oai_citation_attribution:17‡bscscan.com](https://bscscan.com/token/0xbf5140a22578168fd562dccf235e5d43a02ce9b1#:~:text=Binance) [oai_citation_attribution:18‡bscscan.com](https://bscscan.com/token/0xbf5140a22578168fd562dccf235e5d43a02ce9b1#:~:text=,18%20Decimals) */
    }
  },
  {
    decimals: 9,
    symbol: "SOL",
    name: "Solana",
    chains: {
      56:  { contractAddress: "0x570A5D26f7765ECb712C0924E4DE545B89FD43dF" } /* BNB Chain SOL (Binance-Peg) [oai_citation_attribution:20‡reddit.com](https://www.reddit.com/r/solana/comments/qn751d/anyone_know_how_to_find_the_bep20_token_address/#:~:text=Reddit%20www,com%2Ftoken%2F0x570a5d26f7765ecb712c0924e4de545b89fd43df) [oai_citation_attribution:21‡coingecko.com](https://www.coingecko.com/en/coins/binance-peg-sol#:~:text=Contract) */
    }
  },
  {
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    chains: {
      8453: { contractAddress: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2" } /* Base Bridged USDT [oai_citation_attribution:22‡basescan.org](https://basescan.org/token/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2#:~:text=Bridged%20Tether%20USD%20) [oai_citation_attribution:23‡basescan.org](https://basescan.org/token/0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2#:~:text=,6%20Decimals) */,
      137: { contractAddress: "0xC2132D05D31c914A87C6611C10748AEb04B58e8F" } /* Polygon USDT (PoS) [oai_citation_attribution:24‡developers.bitgo.com](https://developers.bitgo.com/coins/polygon-erc20-tokens#:~:text=Coin%20Type%20Token%20Name%20Precision,com%2Faddress%2F0xc2132d05d31c914a8%207c6611c10748aeb04b58e8f) */,
      56:  { contractAddress: "0x55d398326f99059fF775485246999027B3197955" } /* BNB Chain USDT (Binance-Peg) [oai_citation_attribution:25‡opbnb.bscscan.com](https://opbnb.bscscan.com/address/0x55d398326f99059ff775485246999027b3197955#:~:text=Address%200x55d398326f99059ff775485246999027b3197955%20,Tether%20USD%20%28USDT) */,
    }
  },
  {
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    chains: {
      8453: { contractAddress: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA" } /* Base USDbC (Circle’s USDC on Base) [oai_citation_attribution:27‡basescan.org](https://basescan.org/token/0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA#:~:text=USD%20Base%20Coin%20) [oai_citation_attribution:28‡basescan.org](https://basescan.org/token/0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA#:~:text=,6%20Decimals) */,
      137: { contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" } /* Polygon USDC (Circle) [oai_citation_attribution:29‡developers.bitgo.com](https://developers.bitgo.com/coins/polygon-erc20-tokens#:~:text=Coin%20Type%20Token%20Name%20Precision,com%2Faddress%2F0xc2132d05d31c914a8%207c6611c10748aeb04b58e8f) */,
      56:  { contractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d" } /* BNB Chain USDC (Binance-Peg) [oai_citation_attribution:30‡bscscan.com](https://bscscan.com/token/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d#:~:text=Binance) [oai_citation_attribution:31‡bscscan.com](https://bscscan.com/token/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d#:~:text=,18%20Decimals) */,
    }
  },
  {
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    chains: {
      8453: { contractAddress: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb" } /* Base DAI (bridged) [oai_citation_attribution:33‡basescan.org](https://basescan.org/token/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb#:~:text=Dai%20Stablecoin%20) [oai_citation_attribution:34‡basescan.org](https://basescan.org/token/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb#:~:text=,18%20Decimals) */,
      137: { contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" } /* Polygon DAI (PoS) [oai_citation_attribution:35‡developers.bitgo.com](https://developers.bitgo.com/coins/polygon-erc20-tokens#:~:text=polygon%3Adai%20Dai%20Stablecoin%2018https%3A%2F%2Fpolygonscan,com%2Faddress%2F0x1b815d120b3%20ef02039ee11dc2d33de7aa4a8c603) */,
      56:  { contractAddress: "0x1AF3F329e8BE154074D8769D1FFA4EE058B1DBc3" } /* BNB Chain DAI (Binance-Peg) [oai_citation_attribution:36‡bscscan.com](https://bscscan.com/token/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3#:~:text=Binance) [oai_citation_attribution:37‡bscscan.com](https://bscscan.com/token/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3#:~:text=,18%20Decimals) */,
    }
  }
];
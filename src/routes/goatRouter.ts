import express, { Router } from 'express';
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, mainnet, sepolia, baseSepolia, polygon } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { PEPE, USDC, WETH, erc20 } from "@goat-sdk/plugin-erc20";
import { uniswap } from "@goat-sdk/plugin-uniswap";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { debridge } from "@goat-sdk/plugin-debridge";
import { opensea } from "@goat-sdk/plugin-opensea";
import { renzo } from "@goat-sdk/plugin-renzo";
import { polymarket } from "@goat-sdk/plugin-polymarket";
import { coinmarketcap } from '@goat-sdk/plugin-coinmarketcap';
import { coingecko } from "@goat-sdk/plugin-coingecko";
import { ens } from "@goat-sdk/plugin-ens";

const router: Router = express.Router();

// GOAT SDK API endpoint
router.post('/generate', async (req: express.Request, res: any) => {
    try {
        const {
            prompt,
            walletPrivateKey,
            rpcProviderUrl,
            uniswapBaseUrl,
            uniswapApiKey,
            OPENAI_API_KEY,
            debrigeBaseUrl,
            openseaApiKey,
            polymarketApiKey,
            polymarketSecret,
            polymarketPassphrase,
            coinmarketcapApiKey,
            coingeckoApiKey,
            isCoingeckoPro,
            chain,
        } = req.body;

        // Validate required parameters
        if (!prompt || !walletPrivateKey || !rpcProviderUrl) {
            return res.status(400).json({
                error: 'Missing required parameters'
            });
        }

        let _chain: any = base;

        if (chain === 'base') {
            _chain = base;
        } else if (chain === 'baseSepolia') {
            _chain = baseSepolia;
        } else if (chain === 'mainnet') {
            _chain = mainnet;
        } else if (chain === 'sepolia') {
            _chain = sepolia;
        } else if (chain === 'polygon') {
            _chain = polygon;
        }

        // Create wallet client
        const account = privateKeyToAccount(walletPrivateKey as `0x${string}`);
        const walletClient = createWalletClient({
            account: account,
            transport: http(rpcProviderUrl),
            chain: _chain,
        });

        const plugins: any[] = [
            sendETH(),
            erc20({ tokens: [USDC, PEPE, WETH] }),
            renzo(),
        ].filter(Boolean);

        if (uniswapBaseUrl && uniswapApiKey) {
            plugins.push(uniswap({
                baseUrl: uniswapBaseUrl,
                apiKey: uniswapApiKey,
            }));
        }

        if (debrigeBaseUrl) {
            plugins.push(debridge({
                baseUrl: debrigeBaseUrl
            }));
        } else {
            plugins.push(debridge());
        }

        if (openseaApiKey) {
            plugins.push(opensea(openseaApiKey));
        }


        if (polymarketApiKey && polymarketSecret && polymarketPassphrase) {
            plugins.push(polymarket({
                credentials: {
                    key: polymarketApiKey,
                    secret: polymarketSecret as string,
                    passphrase: polymarketPassphrase,
                },
            }));
        }

        if (coinmarketcapApiKey) {
            plugins.push(coinmarketcap({
                apiKey: coinmarketcapApiKey,
            }));
        }

        if (coingeckoApiKey) {
            plugins.push(coingecko({
                apiKey: coingeckoApiKey,
                isPro: !!isCoingeckoPro,
            }));
        }

        plugins.push(ens({}));

        // Get onchain tools
        const tools = await getOnChainTools({
            wallet: viem(walletClient),
            plugins: plugins,
        });

        // Store tool results
        const toolResults: any[] = [];

        const openai = createOpenAI({
            apiKey: OPENAI_API_KEY,
        });

        const result = await generateText({
            model: openai("gpt-4o-mini"),
            tools: tools,
            maxSteps: 10,
            prompt: prompt,
            onStepFinish: (event) => {
                console.log(event);
                toolResults.push(event.toolResults);
            },
        });

        // Send response
        res.json({
            toolResults,
            response: result.text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router; 
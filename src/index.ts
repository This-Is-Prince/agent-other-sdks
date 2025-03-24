import express from 'express';
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { PEPE, USDC, WETH, erc20 } from "@goat-sdk/plugin-erc20";
import { uniswap } from "@goat-sdk/plugin-uniswap";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";

const app = express();
app.use(express.json());

// API endpoint
app.post('/generate', async (req: any, res: any) => {
    try {
        const {
            prompt,
            walletPrivateKey,
            rpcProviderUrl,
            uniswapBaseUrl,
            uniswapApiKey,
            OPENAI_API_KEY,
        } = req.body;

        // Validate required parameters
        if (!prompt || !walletPrivateKey || !rpcProviderUrl) {
            return res.status(400).json({
                error: 'Missing required parameters'
            });
        }

        // Create wallet client
        const account = privateKeyToAccount(walletPrivateKey as `0x${string}`);
        const walletClient = createWalletClient({
            account: account,
            transport: http(rpcProviderUrl),
            chain: base,
        });

        const plugins: any[] = [
            sendETH(),
            erc20({ tokens: [USDC, PEPE, WETH] }),
        ].filter(Boolean);

        if (uniswapBaseUrl && uniswapApiKey) {
            plugins.push(uniswap({
                baseUrl: uniswapBaseUrl,
                apiKey: uniswapApiKey,
            }));
        }

        // Get onchain tools
        const tools = await getOnChainTools({
            wallet: viem(walletClient),
            plugins: plugins, // Remove null values from plugins array
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
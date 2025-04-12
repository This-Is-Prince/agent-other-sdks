import express, { Router } from 'express';
import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from '@ai-sdk/xai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGroq } from '@ai-sdk/groq';
import { createMistral } from '@ai-sdk/mistral';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createPerplexity } from '@ai-sdk/perplexity';
import { generateText, LanguageModelV1 } from "ai";
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, mainnet, sepolia, baseSepolia, polygon } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { erc20 } from "@goat-sdk/plugin-erc20";
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
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";
import { tokens } from '../utils/supported-tokens';
import { randomUUID } from 'crypto';

const router: Router = express.Router();

// Map to store registered agents
interface Agent {
    walletPrivateKey: string;
    rpcProviderUrl: string;
    uniswapBaseUrl?: string;
    uniswapApiKey?: string;
    OPENAI_API_KEY?: string;
    XAI_API_KEY?: string;
    ANTHROPIC_API_KEY?: string;
    GROQ_API_KEY?: string;
    MISTRAL_API_KEY?: string;
    DEEPSEEK_API_KEY?: string;
    PERPLEXITY_API_KEY?: string;
    modelName?: string;
    debrigeBaseUrl?: string;
    openseaApiKey?: string;
    polymarketApiKey?: string;
    polymarketSecret?: string;
    polymarketPassphrase?: string;
    coinmarketcapApiKey?: string;
    coingeckoApiKey?: string;
    isCoingeckoPro?: boolean;
    chain?: string;
    crossmintApiKey?: string;
    tools?: any;
    model?: LanguageModelV1;
}

const agentsMap = new Map<string, Agent>();

// Register a new agent
router.post('/registerAgent', async (req: express.Request, res: any) => {
    try {
        const {
            walletPrivateKey,
            rpcProviderUrl,
            uniswapBaseUrl,
            uniswapApiKey,
            OPENAI_API_KEY,
            XAI_API_KEY,
            ANTHROPIC_API_KEY,
            GROQ_API_KEY,
            MISTRAL_API_KEY,
            DEEPSEEK_API_KEY,
            PERPLEXITY_API_KEY,
            modelName,
            debrigeBaseUrl,
            openseaApiKey,
            polymarketApiKey,
            polymarketSecret,
            polymarketPassphrase,
            coinmarketcapApiKey,
            coingeckoApiKey,
            isCoingeckoPro,
            chain,
            crossmintApiKey,
        } = req.body;

        // Validate required parameters
        if (!walletPrivateKey || !rpcProviderUrl) {
            return res.status(400).json({
                error: 'Missing required parameters: walletPrivateKey and rpcProviderUrl are required'
            });
        }

        // Create a unique ID for the agent
        const agentId = randomUUID();

        // Initialize agent
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
            erc20({ tokens: tokens }),
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

        if (crossmintApiKey) {
            plugins.push(crossmintHeadlessCheckout({
                apiKey: crossmintApiKey,
            }));
        }

        plugins.push(ens({}));

        // Get onchain tools
        const tools = await getOnChainTools({
            wallet: viem(walletClient),
            plugins: plugins,
        });

        // Create model
        let model: LanguageModelV1 | null = null;

        if (OPENAI_API_KEY) {
            const openai = createOpenAI({
                apiKey: OPENAI_API_KEY,
            });
            model = openai(modelName || 'gpt-4o-mini')
        } else if (XAI_API_KEY) {
            const xai = createXai({
                apiKey: XAI_API_KEY,
            });
            model = xai(modelName || 'grok-2-1212')
        } else if (ANTHROPIC_API_KEY) {
            const anthropic = createAnthropic({
                apiKey: ANTHROPIC_API_KEY,
            });
            model = anthropic(modelName || 'claude-3-5-sonnet-20240620')
        } else if (GROQ_API_KEY) {
            const groq = createGroq({
                apiKey: GROQ_API_KEY,
            });
            model = groq(modelName || 'llama3-8b-8192')
        } else if (MISTRAL_API_KEY) {
            const mistral = createMistral({
                apiKey: MISTRAL_API_KEY,
            });
            model = mistral(modelName || 'mistral-large-latest')
        } else if (DEEPSEEK_API_KEY) {
            const deepseek = createDeepSeek({
                apiKey: DEEPSEEK_API_KEY,
            });
            model = deepseek(modelName || 'sonar-pro')
        } else if (PERPLEXITY_API_KEY) {
            const perplexity = createPerplexity({
                apiKey: PERPLEXITY_API_KEY,
            });
            model = perplexity(modelName || 'mistral-large-latest')
        }

        if (!model) {
            return res.status(400).json({
                error: 'No language model available - please provide an API key for at least one of the supported models'
            });
        }

        // Store agent in map
        const agent: Agent = {
            walletPrivateKey,
            rpcProviderUrl,
            uniswapBaseUrl,
            uniswapApiKey,
            OPENAI_API_KEY,
            XAI_API_KEY,
            ANTHROPIC_API_KEY,
            GROQ_API_KEY,
            MISTRAL_API_KEY,
            DEEPSEEK_API_KEY,
            PERPLEXITY_API_KEY,
            modelName,
            debrigeBaseUrl,
            openseaApiKey,
            polymarketApiKey,
            polymarketSecret,
            polymarketPassphrase,
            coinmarketcapApiKey,
            coingeckoApiKey,
            isCoingeckoPro,
            chain,
            crossmintApiKey,
            tools,
            model
        };

        agentsMap.set(agentId, agent);

        // Send response
        res.json({
            agentId,
            message: 'Agent registered successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// GOAT SDK API endpoint
router.post('/generate', async (req: express.Request, res: any) => {
    try {
        const {
            prompt,
            agentId,
            // Keep other parameters for backward compatibility or to create a temporary agent
            walletPrivateKey,
            rpcProviderUrl,
            uniswapBaseUrl,
            uniswapApiKey,
            OPENAI_API_KEY,
            XAI_API_KEY,
            ANTHROPIC_API_KEY,
            GROQ_API_KEY,
            MISTRAL_API_KEY,
            DEEPSEEK_API_KEY,
            PERPLEXITY_API_KEY,
            modelName,
            debrigeBaseUrl,
            openseaApiKey,
            polymarketApiKey,
            polymarketSecret,
            polymarketPassphrase,
            coinmarketcapApiKey,
            coingeckoApiKey,
            isCoingeckoPro,
            chain,
            crossmintApiKey,
        } = req.body;

        // Validate prompt
        if (!prompt) {
            return res.status(400).json({
                error: 'Missing required parameter: prompt'
            });
        }

        let tools;
        let model: LanguageModelV1;

        // Check if using a registered agent or creating a temporary one
        if (agentId) {
            // Use registered agent
            const agent = agentsMap.get(agentId);
            if (!agent) {
                return res.status(404).json({
                    error: 'Agent not found. Please provide a valid agent ID or register a new agent.'
                });
            }
            tools = agent.tools;
            model = agent.model!;
        } else {
            // For backward compatibility, create a temporary agent
            if (!walletPrivateKey || !rpcProviderUrl) {
                return res.status(400).json({
                    error: 'Missing required parameters: either provide an agentId or (walletPrivateKey and rpcProviderUrl)'
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
                erc20({ tokens: tokens }),
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

            if (crossmintApiKey) {
                plugins.push(crossmintHeadlessCheckout({
                    apiKey: crossmintApiKey,
                }));
            }

            plugins.push(ens({}));

            // Get onchain tools
            tools = await getOnChainTools({
                wallet: viem(walletClient),
                plugins: plugins,
            });

            // Create model
            if (OPENAI_API_KEY) {
                const openai = createOpenAI({
                    apiKey: OPENAI_API_KEY,
                });
                model = openai(modelName || 'gpt-4o-mini')
            } else if (XAI_API_KEY) {
                const xai = createXai({
                    apiKey: XAI_API_KEY,
                });
                model = xai(modelName || 'grok-2-1212')
            } else if (ANTHROPIC_API_KEY) {
                const anthropic = createAnthropic({
                    apiKey: ANTHROPIC_API_KEY,
                });
                model = anthropic(modelName || 'claude-3-5-sonnet-20240620')
            } else if (GROQ_API_KEY) {
                const groq = createGroq({
                    apiKey: GROQ_API_KEY,
                });
                model = groq(modelName || 'llama3-8b-8192')
            } else if (MISTRAL_API_KEY) {
                const mistral = createMistral({
                    apiKey: MISTRAL_API_KEY,
                });
                model = mistral(modelName || 'mistral-large-latest')
            } else if (DEEPSEEK_API_KEY) {
                const deepseek = createDeepSeek({
                    apiKey: DEEPSEEK_API_KEY,
                });
                model = deepseek(modelName || 'sonar-pro')
            } else if (PERPLEXITY_API_KEY) {
                const perplexity = createPerplexity({
                    apiKey: PERPLEXITY_API_KEY,
                });
                model = perplexity(modelName || 'mistral-large-latest')
            } else {
                return res.status(400).json({
                    error: 'No language model available - please provide an API key for at least one of the supported models'
                });
            }
        }

        // Store tool results
        const toolResults: any[] = [];

        const result = await generateText({
            model: model,
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
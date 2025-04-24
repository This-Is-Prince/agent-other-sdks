import express, { Router } from 'express';
import { createOpenAI } from "@ai-sdk/openai";
import { createXai } from '@ai-sdk/xai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGroq } from '@ai-sdk/groq';
import { createMistral } from '@ai-sdk/mistral';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createPerplexity } from '@ai-sdk/perplexity';
import { generateText, LanguageModelV1 } from "ai";
import { Keypair } from "@solana/web3.js";
import { SolanaAgentKit, KeypairWallet, createVercelAITools } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import NFTPlugin from "@solana-agent-kit/plugin-nft";
import DefiPlugin from "@solana-agent-kit/plugin-defi";
import MiscPlugin from "@solana-agent-kit/plugin-misc";
import BlinksPlugin from "@solana-agent-kit/plugin-blinks";
import bs58 from "bs58";
import { randomUUID } from 'crypto';
import { SecretVaultService } from '../secret-vault/secretVaultService';

const router: Router = express.Router();
const secretVaultService = new SecretVaultService();

// Initialize the secret vault service
secretVaultService.init().catch(err => {
    console.error('Failed to initialize SecretVaultService:', err.message);
});

// Map to store registered agents
interface SolanaAgent {
    walletPrivateKeyId: string; // Stores ID instead of actual private key
    rpcProviderUrl: string;
    OPENAI_API_KEY?: string;
    XAI_API_KEY?: string;
    ANTHROPIC_API_KEY?: string;
    GROQ_API_KEY?: string;
    MISTRAL_API_KEY?: string;
    DEEPSEEK_API_KEY?: string;
    PERPLEXITY_API_KEY?: string;
    modelName?: string;
    jupiterApiKey?: string;
    openseaApiKey?: string;
    polymarketApiKey?: string;
    polymarketSecret?: string;
    polymarketPassphrase?: string;
    coinmarketcapApiKey?: string;
    coingeckoApiKey?: string;
    isCoingeckoPro?: boolean;
    heliusApiKey?: string;
    crossmintApiKey?: string;
    debridgeBaseUrl?: string;
    tools?: any;
    model?: LanguageModelV1;
    agent?: SolanaAgentKit;
}

const solanaAgentsMap = new Map<string, SolanaAgent>();

// Store a private key in the secret vault
router.post('/storePrivateKey', async (req: express.Request, res: any) => {
    try {
        const { walletPrivateKey, description } = req.body;

        if (!walletPrivateKey) {
            return res.status(400).json({
                error: 'Missing required parameter: walletPrivateKey'
            });
        }

        const result = await secretVaultService.storePrivateKey(walletPrivateKey, description);

        res.json({
            walletPrivateKeyId: result.id,
            message: 'Private key stored successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// List all stored private keys (metadata only, not the actual keys)
router.get('/listPrivateKeys', async (req: express.Request, res: any) => {
    try {
        const keys = await secretVaultService.listPrivateKeys();
        
        res.json({
            keys,
            count: keys.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Register a new Solana agent
router.post('/registerAgent', async (req: express.Request, res: any) => {
    try {
        const {
            walletPrivateKeyId,
            rpcProviderUrl,
            OPENAI_API_KEY,
            XAI_API_KEY,
            ANTHROPIC_API_KEY,
            GROQ_API_KEY,
            MISTRAL_API_KEY,
            DEEPSEEK_API_KEY,
            PERPLEXITY_API_KEY,
            modelName,
        } = req.body;

        // Validate required parameters
        if (!walletPrivateKeyId || !rpcProviderUrl) {
            return res.status(400).json({
                error: 'Missing required parameters: walletPrivateKeyId and rpcProviderUrl are required'
            });
        }

        // Retrieve the private key from the secret vault
        const privateKeyResponse = await secretVaultService.retrievePrivateKey(walletPrivateKeyId);
        const walletPrivateKey = privateKeyResponse.privateKey;

        // Create a unique ID for the agent
        const agentId = randomUUID();

        // Initialize agent
        // Create Solana wallet from private key
        const keyPair = Keypair.fromSecretKey(bs58.decode(walletPrivateKey.startsWith('0x') ? walletPrivateKey.slice(2) : walletPrivateKey));
        const wallet = new KeypairWallet(keyPair, rpcProviderUrl);

        // Create Solana Agent Kit instance with LLM API key
        const apiKeys: any = {};
        
        if (OPENAI_API_KEY) apiKeys.OPENAI_API_KEY = OPENAI_API_KEY;
        if (XAI_API_KEY) apiKeys.XAI_API_KEY = XAI_API_KEY;
        if (ANTHROPIC_API_KEY) apiKeys.ANTHROPIC_API_KEY = ANTHROPIC_API_KEY;
        if (GROQ_API_KEY) apiKeys.GROQ_API_KEY = GROQ_API_KEY;
        if (MISTRAL_API_KEY) apiKeys.MISTRAL_API_KEY = MISTRAL_API_KEY;
        if (DEEPSEEK_API_KEY) apiKeys.DEEPSEEK_API_KEY = DEEPSEEK_API_KEY;
        if (PERPLEXITY_API_KEY) apiKeys.PERPLEXITY_API_KEY = PERPLEXITY_API_KEY;
        
        // Initialize Solana Agent Kit
        const solanaAgent = new SolanaAgentKit(
            wallet,
            rpcProviderUrl,
            apiKeys
        );

        // Add plugins
        solanaAgent.use(TokenPlugin);
        solanaAgent.use(NFTPlugin);
        solanaAgent.use(DefiPlugin);
        solanaAgent.use(MiscPlugin);
        solanaAgent.use(BlinksPlugin);

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

        const tools = createVercelAITools(solanaAgent, solanaAgent.actions);

        // Store agent in map
        const agent: SolanaAgent = {
            walletPrivateKeyId,
            rpcProviderUrl,
            OPENAI_API_KEY,
            XAI_API_KEY,
            ANTHROPIC_API_KEY,
            GROQ_API_KEY,
            MISTRAL_API_KEY,
            DEEPSEEK_API_KEY,
            PERPLEXITY_API_KEY,
            modelName,
            tools,
            model,
            agent: solanaAgent
        };

        solanaAgentsMap.set(agentId, agent);

        // Send response
        res.json({
            agentId,
            message: 'Solana Agent registered successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Solana Agent Kit API endpoint
router.post('/generate', async (req: express.Request, res: any) => {
    try {
        const {
            prompt,
            agentId,
            // Keep other parameters for backward compatibility or to create a temporary agent
            walletPrivateKeyId,
            rpcProviderUrl,
            OPENAI_API_KEY,
            XAI_API_KEY,
            ANTHROPIC_API_KEY,
            GROQ_API_KEY,
            MISTRAL_API_KEY,
            DEEPSEEK_API_KEY,
            PERPLEXITY_API_KEY,
            modelName,
        } = req.body;

        // Validate prompt
        if (!prompt) {
            return res.status(400).json({
                error: 'Missing required parameter: prompt'
            });
        }

        let tools;
        let model: LanguageModelV1;
        let solanaAgentKit;

        // Check if using a registered agent or creating a temporary one
        if (agentId) {
            // Use registered agent
            const agent = solanaAgentsMap.get(agentId);
            if (!agent) {
                return res.status(404).json({
                    error: 'Agent not found. Please provide a valid agent ID or register a new agent.'
                });
            }
            tools = agent.tools;
            model = agent.model!;
            solanaAgentKit = agent.agent;
        } else {
            // For backward compatibility, create a temporary agent
            if (!walletPrivateKeyId || !rpcProviderUrl) {
                return res.status(400).json({
                    error: 'Missing required parameters: either provide an agentId or (walletPrivateKeyId and rpcProviderUrl)'
                });
            }

            // Retrieve the private key from the secret vault
            const privateKeyResponse = await secretVaultService.retrievePrivateKey(walletPrivateKeyId);
            const walletPrivateKey = privateKeyResponse.privateKey;

            // Create Solana wallet from private key
            const keyPair = Keypair.fromSecretKey(bs58.decode(walletPrivateKey.startsWith('0x') ? walletPrivateKey.slice(2) : walletPrivateKey));
            const wallet = new KeypairWallet(keyPair, rpcProviderUrl);

            // Create Solana Agent Kit instance with LLM API key
            const apiKeys: any = {};
            
            if (OPENAI_API_KEY) apiKeys.OPENAI_API_KEY = OPENAI_API_KEY;
            if (XAI_API_KEY) apiKeys.XAI_API_KEY = XAI_API_KEY;
            if (ANTHROPIC_API_KEY) apiKeys.ANTHROPIC_API_KEY = ANTHROPIC_API_KEY;
            if (GROQ_API_KEY) apiKeys.GROQ_API_KEY = GROQ_API_KEY;
            if (MISTRAL_API_KEY) apiKeys.MISTRAL_API_KEY = MISTRAL_API_KEY;
            if (DEEPSEEK_API_KEY) apiKeys.DEEPSEEK_API_KEY = DEEPSEEK_API_KEY;
            if (PERPLEXITY_API_KEY) apiKeys.PERPLEXITY_API_KEY = PERPLEXITY_API_KEY;
            
            // Initialize Solana Agent Kit
            solanaAgentKit = new SolanaAgentKit(
                wallet,
                rpcProviderUrl,
                apiKeys
            );

            // Add plugins
            solanaAgentKit.use(TokenPlugin);
            solanaAgentKit.use(NFTPlugin);
            solanaAgentKit.use(DefiPlugin);
            solanaAgentKit.use(MiscPlugin);
            solanaAgentKit.use(BlinksPlugin);

            // Get the tools from the Solana Agent Kit
            tools = solanaAgentKit.actions;

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
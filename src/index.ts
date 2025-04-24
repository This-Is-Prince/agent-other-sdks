import express from 'express';
import goatRouter from './routes/goatRouter';
import solanaAgentKitRouter from './routes/solanaAgentKitRouter';

const app = express();
app.use(express.json());

// Use the GOAT SDK router
app.use('/goat', goatRouter);

// Use the Solana Agent Kit router
app.use('/solana-agent-kit', solanaAgentKitRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
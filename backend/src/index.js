import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

app.use('/api/chat', messageRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
})
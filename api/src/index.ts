import express from 'express';
import cors from 'cors';
import produtoRoutes from './domains/produto/infrastructure/routes/produtoRoutes';
import authRoutes from './domains/auth/infrastructure/routes/authRoutes';
import userRoutes from './domains/auth/infrastructure/routes/userRoutes';
import { authMiddleware } from './infrastructure/security/AuthMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

// Rota pública
app.use('/auth', authRoutes);

// Middleware p/ rotas protegidas
app.use(authMiddleware);

// Rotas protegidas
app.use('/produtos', produtoRoutes);
app.use('/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend operando na porta ${PORT}. Aguardando requisicoes!`);
});

import express from 'express';
import cors from 'cors';
import produtoRoutes from './domains/produto/infrastructure/routes/produtoRoutes';
import authRoutes from './domains/auth/infrastructure/routes/authRoutes';
import userRoutes from './domains/auth/infrastructure/routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da aplicação
app.use('/produtos', produtoRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend operando na porta ${PORT}. Aguardando requisicoes!`);
});

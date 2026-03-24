import express from 'express';
import cors from 'cors';
import produtoRoutes from './domains/produto/infrastructure/routes/produtoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Registrando o entrypoint de rotas dos produtos.
app.use('/produtos', produtoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend operando na porta ${PORT}. Aguardando requisicoes!`);
});

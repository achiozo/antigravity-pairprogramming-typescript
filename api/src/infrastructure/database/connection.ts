// Typescript/Node: Gerenciamento da conexao com o banco via mysql2.
// Em arquitetura hexagonal, isso pertence a camada de 'infrastructure', pois lida com
// um detalhe de implementacao externo (o banco de dados MySQL).
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const dbOptions = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'meu-pedido'
};

const pool = mysql.createPool(dbOptions);

export default pool;

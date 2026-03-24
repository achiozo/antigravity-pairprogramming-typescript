// Typescript/Node: Gerenciamento da conexao com o banco via mysql2.
// Em arquitetura hexagonal, isso pertence a camada de 'infrastructure', pois lida com
// um detalhe de implementacao externo (o banco de dados MySQL).
import mysql from 'mysql2/promise';

export const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'meu-pedido'
};

const pool = mysql.createPool(dbOptions);

export default pool;

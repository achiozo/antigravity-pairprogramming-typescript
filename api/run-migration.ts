import fs from 'fs';
import path from 'path';
import pool from './src/infrastructure/database/connection';

const run = async () => {
    try {
        const sqlPath = path.join(__dirname, 'src/infrastructure/database/migrations/01_create_users_table.sql');
        const sql = fs.readFileSync(sqlPath, 'utf-8');
        await pool.query(sql);
        console.log('Migration executada com sucesso!');
    } catch (e) {
        console.error('Falha ao rodar migration:', e);
    } finally {
        pool.end();
    }
};

run();

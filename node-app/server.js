const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'postgres',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});

app.get('/', (req, res) => {
    res.json({
        status: 'API funcionando'
    });
});

app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado');
});


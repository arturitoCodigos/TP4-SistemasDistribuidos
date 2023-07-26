const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json())
const port = 3000;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Rota para obter todos os registros do banco de dados
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM funcionarios');
    console.log("Pesquisa realizada com sucesso. ")
    res.json(rows);
  } catch (error) {
    console.error('Erro ao obter dados do banco:', error);
    res.status(500).send('Erro ao obter dados do banco.');
  }
});

// Rota para adicionar um novo registro ao banco de dados
app.post('/dados', async (req, res) => {
  try {
    const { nome, idade, salario} = req.body;
    await pool.query('INSERT INTO funcionarios (nome, idade, salario) VALUES ($1, $2, $3)', [nome, idade, salario]);
    console.log("Registro adicionado com sucesso. ")
    res.send('Registro adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar registro:', error);
    res.status(500).send('Erro ao adicionar registro.');
  }
});

// Rota para atualizar um registro no banco de dados
app.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const { rows } = await pool.query('SELECT * FROM funcionarios WHERE nome = $1', [name]);
    console.log("Pesquisa realizada com sucesso. ")
    res.json(rows);
  } catch (error) {
    console.error('Erro ao obter dados do banco:', error);
    res.status(500).send('Erro ao obter dados do banco:');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
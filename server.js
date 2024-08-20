require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/database');
const port = 3000;

app.use(cors());
app.use(express.json());

// Rota para obter todos os clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM cliente', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter clientes');
    }
    res.json(results);
  });
});

// Rota para adicionar um novo cliente
app.post('/clientes', (req, res) => {
  const { nome_cliente, email, endereco } = req.body;
  db.query(
    'INSERT INTO cliente (nome_cliente, email, endereco) VALUES (?, ?, ?)',
    [nome_cliente, email, endereco],
    (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao adicionar cliente');
      }
      res.status(201).send('Cliente adicionado com sucesso');
    }
  );
});

// **Rota para deletar um cliente**
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cliente WHERE id_cliente = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao deletar cliente');
    }
    res.status(200).send('Cliente deletado com sucesso');
  });
});

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter produtos');
    }
    res.json(results);
  });
});

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const { nome_produto, preco, categoria } = req.body;
  db.query(
    'INSERT INTO produto (nome_produto, preco, categoria) VALUES (?, ?, ?)',
    [nome_produto, preco, categoria],
    (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao adicionar produto');
      }
      res.status(201).send('Produto adicionado com sucesso');
    }
  );
});

// **Rota para deletar um produto**
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM produto WHERE id_produto = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao deletar produto');
    }
    res.status(200).send('Produto deletado com sucesso');
  });
});

// Rota para obter todos os pedidos
app.get('/pedidos', (req, res) => {
  db.query('SELECT * FROM pedido', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter pedidos');
    }
    res.json(results);
  });
});

// Rota para criar um novo pedido
app.post('/pedidos', (req, res) => {
  const { data_pedido, id_produto, id_cliente } = req.body;
  db.query(
    'INSERT INTO pedido (data_pedido, id_produto, id_cliente) VALUES (?, ?, ?)',
    [data_pedido, id_produto, id_cliente],
    (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao criar pedido');
      }
      res.status(201).send('Pedido criado com sucesso');
    }
  );
});

// **Rota para deletar um pedido**
app.delete('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM pedido WHERE id_pedido = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao deletar pedido');
    }
    res.status(200).send('Pedido deletado com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

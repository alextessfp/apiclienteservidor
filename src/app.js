const express = require('express');
const { pool } = require('./db');

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({ name: 'API de productos y maestros', version: '1.1.0', endpoints: ['/health', '/api/products', '/api/products/:id', '/api/maestros', '/api/maestros/:id'] });
});

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

app.get('/api/products', async (_req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    res.json({ data: rows, count: rows.length });
  } catch (error) { next(error); }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    if (!/^\d+$/.test(req.params.id)) return res.status(400).json({ error: 'El id debe ser un número entero positivo.' });
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json({ data: rows[0] });
  } catch (error) { next(error); }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const { name, description = '', price, stock = 0, category = 'General' } = req.body ?? {};
    if (typeof name !== 'string' || !name.trim() || !Number.isFinite(Number(price)) || Number(price) < 0 || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ error: 'Se requieren name, price no negativo y stock entero no negativo.' });
    }
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name.trim(), description, Number(price), Number(stock), category]
    );
    res.status(201).json({ data: rows[0] });
  } catch (error) { next(error); }
});

app.get('/api/maestros', async (_req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM maestros ORDER BY id');
    res.json({ data: rows, count: rows.length });
  } catch (error) { next(error); }
});

app.get('/api/maestros/:id', async (req, res, next) => {
  try {
    if (!/^\d+$/.test(req.params.id)) return res.status(400).json({ error: 'El id debe ser un número entero positivo.' });
    const { rows } = await pool.query('SELECT * FROM maestros WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Maestro no encontrado.' });
    res.json({ data: rows[0] });
  } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

module.exports = app;

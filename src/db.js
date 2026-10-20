const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' && process.env.PGSSLMODE !== 'disable'
    ? { rejectUnauthorized: false }
    : undefined,
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(160) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
      stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
      category VARCHAR(100) NOT NULL DEFAULT 'General',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const { rows } = await pool.query('SELECT COUNT(*)::int AS total FROM products');
  if (rows[0].total === 0) {
    await pool.query(`
      INSERT INTO products (name, description, price, stock, category) VALUES
        ('Teclado mecánico', 'Teclado compacto con switches táctiles', 1299.00, 18, 'Computación'),
        ('Audífonos inalámbricos', 'Audífonos Bluetooth con cancelación de ruido', 1899.00, 12, 'Audio'),
        ('Soporte para laptop', 'Soporte ajustable de aluminio', 549.00, 30, 'Accesorios')
    `);
  }
}

module.exports = { pool, initializeDatabase };

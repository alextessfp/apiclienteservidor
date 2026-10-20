require('dotenv').config();

const app = require('./app');
const { initializeDatabase, pool } = require('./db');

const port = Number(process.env.PORT) || 3000;

initializeDatabase()
  .then(() => {
    app.listen(port, '0.0.0.0', () => console.log(`API de productos escuchando en el puerto ${port}`));
  })
  .catch((error) => {
    console.error('No se pudo inicializar PostgreSQL:', error);
    process.exit(1);
  });

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});

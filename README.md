# API de productos

API REST construida con Node.js, Express y PostgreSQL.

## Requisitos

- Node.js 20 o superior
- PostgreSQL 14 o superior

## Ejecutar localmente

1. Inicia PostgreSQL local: `docker compose up -d`.
2. Copia `.env.example` a `.env`. El archivo usa la base local y se carga automáticamente.
3. Instala dependencias: `npm install`
4. Compila/verifica sintaxis: `npm run build`
5. Inicia la API: `npm start` (o `npm run dev`)

La API local queda disponible en `http://localhost:3000`. Para apagar PostgreSQL usa `docker compose down`; los datos persisten en un volumen de Docker.

Al iniciar, la API crea las tablas `products` y `maestros`. También agrega tres productos de ejemplo y los siete maestros solicitados; las inserciones de maestros son idempotentes.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado de la API y conexión a PostgreSQL |
| GET | `/api/products` | Lista los productos |
| GET | `/api/products/:id` | Recupera un producto por ID |
| POST | `/api/products` | Crea un producto |
| GET | `/api/maestros` | Lista los maestros |
| GET | `/api/maestros/:id` | Recupera un maestro por ID |

Ejemplo para crear un producto:

```json
{
  "name": "Mouse inalámbrico",
  "description": "Mouse Bluetooth recargable",
  "price": 699,
  "stock": 20,
  "category": "Accesorios"
}
```

## Despliegue en Render

El archivo `render.yaml` define un Web Service Node y una base PostgreSQL en el plan gratuito. Puedes desplegar el Blueprint desde el Dashboard de Render conectado al repositorio. Render inyecta `DATABASE_URL` usando la conexión interna de la base.

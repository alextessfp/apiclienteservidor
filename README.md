# API de productos

API REST construida con Node.js, Express y PostgreSQL.

## Requisitos

- Node.js 20 o superior
- PostgreSQL 14 o superior

## Ejecutar localmente

1. Copia `.env.example` a `.env` y configura `DATABASE_URL` con tu base PostgreSQL.
2. Instala dependencias: `npm install`
3. Compila/verifica sintaxis: `npm run build`
4. Inicia la API: `npm start` (o `npm run dev`)

Al iniciar, la API crea la tabla `products` y agrega tres productos de ejemplo si está vacía.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado de la API y conexión a PostgreSQL |
| GET | `/api/products` | Lista los productos |
| GET | `/api/products/:id` | Recupera un producto por ID |
| POST | `/api/products` | Crea un producto |

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

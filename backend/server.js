import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' with { type: 'json' };

import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import inventoryRoutes from './src/routes/inventoryRoutes.js';
import propertyRoutes from './src/routes/propertyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ----------------------------------------
   CORS FIXED (CREDENTIALS + MULTI ORIGIN)
----------------------------------------- */

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
//   "http://localhost:3003",
//   "http://127.0.0.1:3000",
//   "http://127.0.0.1:3001",
//   "http://127.0.0.1:3002",
//   "http://127.0.0.1:3003",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS: " + origin));
//     },
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );
app.use(cors());
app.use(express.json());

/* ----------------------------------------
   ROUTES
----------------------------------------- */
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/properties', propertyRoutes);

/* ----------------------------------------
   SWAGGER
----------------------------------------- */
swaggerDocument.servers = [
  {
    url: `http://localhost:${PORT}/api`,
    description: "Local server"
  }
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ----------------------------------------
   START SERVER
----------------------------------------- */
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📘 Swagger UI: http://localhost:${port}/api-docs`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} in use → trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(PORT);


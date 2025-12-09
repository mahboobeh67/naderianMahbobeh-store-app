
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
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

app.use((req, res, next) => {
  const originalSet = res.setHeader.bind(res);

  res.setHeader = (key, value) => {
    if (key.toLowerCase().includes("access-control")) {
      console.log("👀 CORS SET:", key, "=", value, "| Route:", req.method, req.originalUrl);
    }
    return originalSet(key, value);
  };

  next();
});
/* ----------------------------------------
   CORS FIXED (CREDENTIALS + MULTI ORIGIN)
----------------------------------------- */

app.use(
  cors({
    origin: [
      "http://localhost:3001", // vite dev
      "http://127.0.0.1:3001",
      "http://localhost:4173", // vite preview
      "http://localhost:3003", // گاهی vite خودش تغییر پورت میده
    ],
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser()); // اضافه کردن cookie-parser

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



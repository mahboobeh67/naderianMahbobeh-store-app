import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' with { type: 'json' };

// Routes
import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import inventoryRoutes from './src/routes/inventoryRoutes.js';
import propertyRoutes from './src/routes/propertyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ----------------------------------------
   CORS CONFIG (Clean + Correct)
----------------------------------------- */
app.use(cors({
  origin: [
    "http://localhost:3000",  // Swagger
    "http://localhost:3002",  // React (Vite)
    "http://localhost:5173"   // React (mode dev)
  ],
  credentials: true,
}));

// Handle OPTIONS preflight
app.options("*", cors());

/* ----------------------------------------
   Middlewares
----------------------------------------- */
app.use(express.json());
app.use(cookieParser());

/* ----------------------------------------
   Routes
----------------------------------------- */
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/properties', propertyRoutes);

/* ----------------------------------------
   Swagger Docs
----------------------------------------- */
swaggerDocument.servers = [
  {
    url: `http://localhost:${PORT}/api`,
    description: "Local server",
  },
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ----------------------------------------
   Dynamic Port Start (auto retry)
----------------------------------------- */
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📘 Swagger UI: http://localhost:${port}/api-docs`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} in use → trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(PORT);


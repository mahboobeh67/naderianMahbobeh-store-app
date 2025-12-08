// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../../src/routes/authRoutes.js";

const app = express();


app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Esprit Auth System is running 🚀");
});

export default app;

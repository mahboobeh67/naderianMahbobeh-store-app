import express from "express";
import { login, refresh, logout } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Protected Route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
});

export default router;
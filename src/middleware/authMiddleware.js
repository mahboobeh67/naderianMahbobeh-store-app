// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // باید header به شکل Bearer token باشد
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "دسترسی امکان‌پذیر نیست. توکن ارسال نشده است." });
  }

  // بررسی اعتبار Access Token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "توکن نامعتبر یا منقضی است. لطفاً Refresh کنید." });
    }

    // ذخیره اطلاعات کاربر داخل req
    req.user = user;

    next(); // ادامه مسیر
  });
};

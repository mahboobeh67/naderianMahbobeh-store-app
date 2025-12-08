// src/services/tokenService.js
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refreshTokenDBPath = path.join(__dirname, "..", "data", "refreshTokens.json");

// Helper: خواندن دیتابیس ساده‌ی refresh token ها
function readDB() {
  try {
    const data = fs.readFileSync(refreshTokenDBPath, "utf-8");
    return JSON.parse(data || "{}");
  } catch {
    return {};
  }
}

// Helper: نوشتن فایل دیتابیس
function writeDB(data) {
  fs.writeFileSync(refreshTokenDBPath, JSON.stringify(data, null, 2), "utf-8");
}

export const tokenService = {
  // ساخت Access Token کوتاه مدت
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m", // می‌تونی تنظیمش کنی
    });
  },

  // ساخت Refresh Token بلندمدت
  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  },

  // ذخیره‌سازی Refresh Token در دیتابیس (Dev Mode)
  saveRefreshToken(userId, refreshToken) {
    const db = readDB();
    db[userId] = refreshToken;
    writeDB(db);
  },

  // بررسی معتبر بودن Refresh Token + اینکه در دیتابیس ذخیره شده باشد
  verifyRefreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const db = readDB();
      const saved = db[decoded.id];

      if (!saved || saved !== refreshToken) return null;

      return decoded; // معتبره
    } catch {
      return null; // نامعتبر یا منقضی
    }
  },

  // Rotate Refresh Token: امنیت حرفه‌ای 🔐✨
  rotateRefreshToken(userId, oldRefreshToken) {
    const db = readDB();
    if (db[userId] !== oldRefreshToken) return null; // یعنی دستکاری شده!

    // ساخت Refresh Token جدید
    const newRefreshToken = this.generateRefreshToken({ id: userId });

    // جایگزینی
    db[userId] = newRefreshToken;
    writeDB(db);

    return newRefreshToken;
  },

  // حذف Refresh Token در logout
  deleteRefreshToken(userId) {
    const db = readDB();
    delete db[userId];
    writeDB(db);
  },
};

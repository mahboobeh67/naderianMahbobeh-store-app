// src/controllers/authController.js

import { tokenService } from "../../../src/services/tokenService.js";

// یک دیتابیس فیک برای کاربر
// در پروژه واقعی → میره DB
const fakeUser = {
  id: "1",
  username: "test",
  password: "1234", // فقط برای تست، در واقعی bcrypt
};

// ----------------------
// LOGIN
// ----------------------
export const login = (req, res) => {
  const { username, password } = req.body;

  // چک ساده کاربر
  if (username !== fakeUser.username || password !== fakeUser.password) {
    return res.status(401).json({ message: "نام کاربری یا رمز اشتباه است" });
  }

  // ساخت access token
  const accessToken = tokenService.generateAccessToken({
    id: fakeUser.id,
    username: fakeUser.username,
  });

  // ساخت refresh token
  const refreshToken = tokenService.generateRefreshToken({
    id: fakeUser.id,
    username: fakeUser.username,
  });

  // ذخیره در فایل
  tokenService.saveRefreshToken(fakeUser.id, refreshToken);

  // ارسال refresh token در کوکی
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // ارسال access token به کلاینت
  res.json({
    accessToken,
    user: { id: fakeUser.id, username: fakeUser.username },
  });
};

// ----------------------
// REFRESH TOKEN
// ----------------------
export const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token یافت نشد" });
  }

  // بررسی معتبر بودن
  const decoded = tokenService.verifyRefreshToken(refreshToken);

  if (!decoded) {
    return res.status(403).json({ message: "Refresh Token نامعتبر است" });
  }

  // چرخش (Rotate)
  const newRefreshToken = tokenService.rotateRefreshToken(
    decoded.id,
    refreshToken
  );

  if (!newRefreshToken) {
    return res.status(403).json({ message: "عدم تطابق Refresh Token" });
  }

  // ساخت access token جدید
  const newAccessToken = tokenService.generateAccessToken({
    id: decoded.id,
    username: decoded.username,
  });

  // ارسال refresh جدید داخل cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken: newAccessToken,
  });
};

// ----------------------
// LOGOUT
// ----------------------
export const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const decoded = tokenService.verifyRefreshToken(refreshToken);
    if (decoded) {
      tokenService.deleteRefreshToken(decoded.id);
    }
  }

  // حذف cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({ message: "خروج با موفقیت انجام شد" });
};

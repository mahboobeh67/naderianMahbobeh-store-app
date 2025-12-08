import axios from "axios";
import { apiUrl } from "@/config/api";

export async function refreshAccessToken(refreshToken) {
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(apiUrl("/auth/refresh"), {
    refreshToken,
  });

  return response.data.accessToken; // فقط Access Token جدید
}

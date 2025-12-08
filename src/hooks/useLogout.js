// src/hooks/useLogout.js
import { authStorage } from "@/lib/authStorage";

export function useLogout() {
  return () => authStorage.clear();
}

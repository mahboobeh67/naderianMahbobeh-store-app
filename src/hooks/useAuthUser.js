// src/hooks/useAuthUser.js
import { useEffect, useState } from "react";
import  {authStorage}  from "../../backend/authStorage";

export function useAuthUser() {
  const [auth, setAuth] = useState(authStorage.load());

  useEffect(() => {
    const stored = authStorage.load();
    setAuth(stored);
  }, []);

  return {
    user: auth?.user || null,
    token: auth?.token || null,
  };
}

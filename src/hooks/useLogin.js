// src/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { authStorage } from "@/lib/authStorage";

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,

    onSuccess(data) {
      authStorage.save({
        token: data.token,
        user: data.user,
      });
    },
  });
}

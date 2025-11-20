import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth';
import { setTokens } from '../services/authService';
import { useSessionStore } from '../state/sessionStore';
import type { LoginRequest, RegisterRequest } from '../types/api';

export function useLogin() {
  const setUser = useSessionStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: async (data) => {
      await setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      setUser(data.user);
    },
  });
}

export function useRegister() {
  const setUser = useSessionStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: async (response) => {
      await setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      setUser(response.user);
    },
  });
}


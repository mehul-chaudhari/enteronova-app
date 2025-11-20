import { apiClient } from './client';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/api';

/**
 * Login with email and password
 * TODO: Replace with actual API endpoint
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  // TODO: Replace with actual API call
  // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  // return response.data;
  
  // Mock response for now
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        user: {
          id: '1',
          email: credentials.email,
          name: 'Test User',
        },
      });
    }, 1000);
  });
}

/**
 * Register a new user
 * TODO: Replace with actual API endpoint
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  // TODO: Replace with actual API call
  // const response = await apiClient.post<AuthResponse>('/auth/register', data);
  // return response.data;
  
  // Mock response for now
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        user: {
          id: '1',
          email: data.email,
          name: data.name,
        },
      });
    }, 1000);
  });
}

/**
 * Get current authenticated user
 * TODO: Replace with actual API endpoint
 */
export async function getCurrentUser(): Promise<User> {
  // TODO: Replace with actual API call
  // const response = await apiClient.get<User>('/auth/me');
  // return response.data;
  
  // Mock response for now
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const token = 'mock_token_check';
      if (token) {
        resolve({
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
        });
      } else {
        reject(new Error('Not authenticated'));
      }
    }, 500);
  });
}

import { create } from 'zustand';
import type { User } from '../types/api';
import { getAccessToken } from '../services/authService';
import { getCurrentUser } from '../api/auth';

interface SessionState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  bootstrapSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  setUser: (user) => {
    set({ 
      user, 
      isAuthenticated: !!user,
      isLoading: false 
    });
  },
  
  clearUser: () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      isLoading: false 
    });
  },
  
  bootstrapSession: async () => {
    set({ isLoading: true });
    
    try {
      const token = await getAccessToken();
      
      if (!token) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }
      
      // Fetch current user to validate token
      const user = await getCurrentUser();
      set({ 
        user, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error bootstrapping session:', error);
      // Token is invalid or expired
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
    }
  },
}));


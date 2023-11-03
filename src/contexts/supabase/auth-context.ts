import { createContext } from 'react';
import type { User } from '@/types/user';

export interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export interface AuthContextType extends State {
  signInWithGoogle: (redirectTo: string) => Promise<any>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signInWithGoogle: (redirectTo: string) => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

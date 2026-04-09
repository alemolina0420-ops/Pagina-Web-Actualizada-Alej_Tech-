import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import type { User, StoredUser, Session, LoginCredentials, RegisterData, UserRole } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { hashPassword, verifyPassword, createSession, isSessionValid, sanitizeUserForOutput } from '@/lib/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDeveloper: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  promoteUser: (userId: string, role: UserRole) => void;
  getAllUsers: () => User[];
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define default developer details (password will be hashed below)
const DEFAULT_DEV_PLAIN_PASSWORD = 'DevAdmin2024!';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useLocalStorage<Session | null>('userSession', null);
  const [users, setUsers] = useLocalStorage<StoredUser[]>('users', []);
  const [error, setError] = useLocalStorage<string | null>('authError', null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize the default developer if no users exist
  useEffect(() => {
    const initDevAccount = async () => {
      if (users.length === 0) {
        const passwordHash = await hashPassword(DEFAULT_DEV_PLAIN_PASSWORD);
        const defaultDeveloper: StoredUser = {
          id: 'dev-001',
          firstName: 'Desarrollador',
          lastName: 'Principal',
          phone: '04120000000',
          email: 'dev@tecnostore.com',
          passwordHash,
          role: 'developer',
          createdAt: new Date().toISOString(),
        };
        setUsers([defaultDeveloper]);
      }
      setIsInitializing(false);
    };
    initDevAccount();
  }, [users, setUsers]);

  // Validate session expiration automatically
  useEffect(() => {
    if (session && !isSessionValid(session)) {
      setSession(null);
    }
  }, [session, setSession]);

  const clearError = useCallback(() => setError(null), [setError]);

  // Derived state
  const currentUserObj = session ? users.find(u => u.id === session.userId) : null;
  const user = currentUserObj ? sanitizeUserForOutput(currentUserObj) : null;
  
  const isAuthenticated = !!session && isSessionValid(session);
  const isAdmin = isAuthenticated && (session.role === 'admin' || session.role === 'developer');
  const isDeveloper = isAuthenticated && session.role === 'developer';

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    clearError();
    const foundUser = users.find((u) => u.email === credentials.email);
    
    if (foundUser) {
      const isValid = await verifyPassword(credentials.password, foundUser.passwordHash);
      if (isValid) {
        const publicUser = sanitizeUserForOutput(foundUser);
        const newSession = createSession(publicUser);
        setSession(newSession);
        return true;
      }
    }
    
    // Generic error message for both wrong email and wrong password to prevent user enumeration
    setError('Credenciales incorrectas');
    return false;
  }, [users, setSession, setError, clearError]);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    clearError();
    
    if (users.some((u) => u.email === data.email)) {
      setError('Este correo electrónico ya está registrado');
      return false;
    }

    if (users.some((u) => u.phone === data.phone)) {
      setError('Este número telefónico ya está registrado');
      return false;
    }

    const passwordHash = await hashPassword(data.password);

    const newUser: StoredUser = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      passwordHash,
      role: 'user', // Default role for new registrations
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    
    // Auto-login
    const publicUser = sanitizeUserForOutput(newUser);
    const newSession = createSession(publicUser);
    setSession(newSession);
    
    return true;
  }, [users, setUsers, setSession, setError, clearError]);

  const logout = useCallback(() => {
    setSession(null);
    clearError();
  }, [setSession, clearError]);

  const promoteUser = useCallback((userId: string, role: UserRole) => {
    // Only developers can promote users
    if (!isDeveloper) {
      console.warn('Unauthorized attempt to promote user');
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
    
    // If the developer promotes themselves (e.g. demotes), update their session accordingly
    if (userId === session?.userId) {
      setSession(prev => prev ? { ...prev, role } : null);
    }
  }, [setUsers, isDeveloper, session, setSession]);

  const getAllUsers = useCallback(() => {
    // Return sanitized users (no password hashes)
    return users.map(sanitizeUserForOutput);
  }, [users]);

  // Wait for initial default user generation if database is empty
  if (isInitializing) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isAdmin,
        isDeveloper,
        login,
        register,
        logout,
        promoteUser,
        getAllUsers,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { useState, useEffect, useCallback } from 'react';
import { encryptObject, decryptObject } from '@/lib/crypto';

interface SecureStorageOptions {
  encrypt?: boolean;
}

/**
 * Hook mejorado de localStorage con soporte para cifrado.
 * 
 * @param key - Clave de localStorage
 * @param initialValue - Valor inicial
 * @param options - Opciones de configuración (encrypt: true para cifrar)
 * 
 * @example
 * // Sin cifrado (datos públicos)
 * const [theme, setTheme] = useSecureStorage('theme', 'dark');
 * 
 * // Con cifrado (datos sensibles)
 * const [users, setUsers] = useSecureStorage('users', [], { encrypt: true });
 */
export function useSecureStorage<T>(
  key: string,
  initialValue: T,
  options: SecureStorageOptions = {}
): [T, (value: T | ((prev: T) => T)) => void] {
  const { encrypt: shouldEncrypt = false } = options;

  // Get initial value from localStorage or use initialValue
  const readValue = useCallback(async (): Promise<T> => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      try {
        if (shouldEncrypt) {
          // Try to decrypt
          const decrypted = await decryptObject<T>(item);
          return decrypted ?? initialValue;
        } else {
          // Parse as JSON
          return JSON.parse(item) as T;
        }
      } catch {
        // If parsing/decryption fails, remove corrupted data and return initial value
        window.localStorage.removeItem(key);
        return initialValue;
      }
    } catch (error) {
      console.warn(`[SecureStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key, shouldEncrypt]);

  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize value from localStorage
  useEffect(() => {
    readValue().then((value) => {
      setStoredValue(value);
      setIsInitialized(true);
    });
  }, [readValue]);

  // Update localStorage when state changes
  const setValue = useCallback(
    async (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          if (shouldEncrypt) {
            // Encrypt before storing
            const encrypted = await encryptObject(valueToStore);
            window.localStorage.setItem(key, encrypted);
          } else {
            // Store as JSON
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        }
      } catch (error) {
        console.warn(`[SecureStorage] Error setting key "${key}":`, error);
      }
    },
    [key, storedValue, shouldEncrypt]
  );

  // Listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          if (shouldEncrypt) {
            const decrypted = await decryptObject<T>(event.newValue);
            if (decrypted) setStoredValue(decrypted);
          } else {
            setStoredValue(JSON.parse(event.newValue));
          }
        } catch {
          // Ignore parsing errors
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, shouldEncrypt]);

  // Return initial value until initialized
  return [isInitialized ? storedValue : initialValue, setValue];
}

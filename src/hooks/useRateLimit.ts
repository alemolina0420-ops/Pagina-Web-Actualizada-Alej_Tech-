import { useState, useCallback, useEffect } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

interface RateLimitState {
  attempts: number;
  firstAttemptTime: number;
  blockedUntil: number | null;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutos
  blockDurationMs: 30 * 60 * 1000, // 30 minutos de bloqueo
};

/**
 * Hook para implementar rate limiting en acciones sensibles (login, registro, etc.)
 * Almacena el estado en localStorage para persistir entre recargas.
 * 
 * @param key - Identificador único para el rate limit (ej: 'login', 'register')
 * @param config - Configuración personalizada (opcional)
 * 
 * @example
 * const { isBlocked, remainingAttempts, blockTimeRemaining, recordAttempt, reset } = useRateLimit('login');
 * 
 * if (isBlocked) {
 *   alert(`Bloqueado por ${Math.ceil(blockTimeRemaining / 60000)} minutos`);
 *   return;
 * }
 * 
 * const success = await login(credentials);
 * if (!success) {
 *   recordAttempt();
 * } else {
 *   reset();
 * }
 */
export function useRateLimit(
  key: string,
  config: Partial<RateLimitConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const storageKey = `rateLimit_${key}`;

  const getState = useCallback((): RateLimitState => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        return { attempts: 0, firstAttemptTime: 0, blockedUntil: null };
      }
      return JSON.parse(stored);
    } catch {
      return { attempts: 0, firstAttemptTime: 0, blockedUntil: null };
    }
  }, [storageKey]);

  const setState = useCallback((state: RateLimitState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('[RateLimit] Error saving state:', error);
    }
  }, [storageKey]);

  const [state, setStateInternal] = useState<RateLimitState>(getState);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second when blocked
  useEffect(() => {
    if (state.blockedUntil && state.blockedUntil > currentTime) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.blockedUntil, currentTime]);

  // Check if currently blocked
  const isBlocked = state.blockedUntil !== null && state.blockedUntil > currentTime;

  // Calculate remaining block time in milliseconds
  const blockTimeRemaining = isBlocked && state.blockedUntil
    ? Math.max(0, state.blockedUntil - currentTime)
    : 0;

  // Calculate remaining attempts
  const remainingAttempts = Math.max(0, finalConfig.maxAttempts - state.attempts);

  /**
   * Records a failed attempt and updates the rate limit state.
   * If max attempts exceeded, blocks the user.
   */
  const recordAttempt = useCallback(() => {
    const now = Date.now();
    let newState = { ...state };

    // If blocked, don't record new attempts
    if (isBlocked) {
      return;
    }

    // Reset if window expired
    if (state.firstAttemptTime && now - state.firstAttemptTime > finalConfig.windowMs) {
      newState = {
        attempts: 1,
        firstAttemptTime: now,
        blockedUntil: null,
      };
    } else {
      // Increment attempts
      newState = {
        attempts: state.attempts + 1,
        firstAttemptTime: state.firstAttemptTime || now,
        blockedUntil: null,
      };

      // Block if max attempts exceeded
      if (newState.attempts >= finalConfig.maxAttempts) {
        newState.blockedUntil = now + finalConfig.blockDurationMs;
      }
    }

    setState(newState);
    setStateInternal(newState);
    setCurrentTime(now);
  }, [state, isBlocked, finalConfig, setState]);

  /**
   * Resets the rate limit state (call on successful action).
   */
  const reset = useCallback(() => {
    const newState: RateLimitState = {
      attempts: 0,
      firstAttemptTime: 0,
      blockedUntil: null,
    };
    setState(newState);
    setStateInternal(newState);
  }, [setState]);

  /**
   * Manually unblock (use with caution, for admin override).
   */
  const unblock = useCallback(() => {
    const newState: RateLimitState = {
      ...state,
      blockedUntil: null,
    };
    setState(newState);
    setStateInternal(newState);
  }, [state, setState]);

  return {
    isBlocked,
    remainingAttempts,
    blockTimeRemaining,
    recordAttempt,
    reset,
    unblock,
  };
}

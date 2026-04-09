import bcrypt from 'bcryptjs';
import type { StoredUser, User, Session } from '@/types';

const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password asynchronously using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

/**
 * Verifies a plain text password against a bcrypt hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Generates a random session token.
 */
export function generateSessionToken(): string {
  // Use Crypto.randomUUID for a secure unique token if available
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Creates a new session object for a validated user, valid for 24 hours.
 */
export function createSession(user: User): Session {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour session

  return {
    token: generateSessionToken(),
    userId: user.id,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    expiresAt: expiresAt.toISOString(),
  };
}

/**
 * Checks if a session is still valid based on its expiration date.
 */
export function isSessionValid(session: Session | null): boolean {
  if (!session) return false;
  try {
    const expirationDate = new Date(session.expiresAt);
    return expirationDate > new Date(); // True if not expired
  } catch (error) {
    return false;
  }
}

/**
 * Helper to strip the password hash from a StoredUser to create a public User profile.
 */
export function sanitizeUserForOutput(storedUser: StoredUser): User {
  const { passwordHash, ...userWithoutPassword } = storedUser;
  return userWithoutPassword;
}

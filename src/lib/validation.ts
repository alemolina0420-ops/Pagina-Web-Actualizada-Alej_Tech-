/**
 * validation.ts
 * 
 * Funciones de validación para formularios y datos de usuario.
 * Incluye validación de contraseñas, emails, teléfonos, etc.
 */

export interface PasswordStrength {
  score: number; // 0-4 (0=muy débil, 4=muy fuerte)
  feedback: string[];
  isValid: boolean;
}

/**
 * Valida la fortaleza de una contraseña según criterios de seguridad.
 * 
 * Criterios:
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 * 
 * @param password - Contraseña a validar
 * @returns Objeto con score, feedback y validez
 */
export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Check length
  if (password.length < 8) {
    feedback.push('Debe tener al menos 8 caracteres');
  } else if (password.length >= 8) {
    score++;
  }

  if (password.length >= 12) {
    score++;
  }

  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    feedback.push('Debe incluir al menos una letra minúscula');
  } else {
    score++;
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    feedback.push('Debe incluir al menos una letra mayúscula');
  } else {
    score++;
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    feedback.push('Debe incluir al menos un número');
  } else {
    score++;
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Debe incluir al menos un carácter especial (!@#$%^&*...)');
  } else {
    score++;
  }

  // Check for common patterns
  const commonPatterns = [
    /^123456/,
    /^password/i,
    /^qwerty/i,
    /^abc123/i,
    /^111111/,
    /^admin/i,
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      feedback.push('Evita patrones comunes como "123456", "password", etc.');
      score = Math.max(0, score - 2);
      break;
    }
  }

  // Normalize score to 0-4
  score = Math.min(4, Math.max(0, score));

  const isValid = score >= 3 && feedback.length === 0;

  return {
    score,
    feedback,
    isValid,
  };
}

/**
 * Obtiene el texto descriptivo del nivel de fortaleza.
 */
export function getPasswordStrengthLabel(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return 'Muy débil';
    case 2:
      return 'Débil';
    case 3:
      return 'Aceptable';
    case 4:
      return 'Fuerte';
    default:
      return 'Desconocido';
  }
}

/**
 * Obtiene el color asociado al nivel de fortaleza (para UI).
 */
export function getPasswordStrengthColor(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return 'text-red-500';
    case 2:
      return 'text-orange-500';
    case 3:
      return 'text-yellow-500';
    case 4:
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
}

/**
 * Valida formato de email.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida formato de teléfono venezolano.
 * Acepta formatos: 04121234567, 0412-1234567, +58-412-1234567
 */
export function validateVenezuelanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Venezuelan mobile: 04XX-XXXXXXX (11 digits starting with 04)
  // Or international: +58-4XX-XXXXXXX (12 digits starting with 584)
  if (cleaned.startsWith('58')) {
    return cleaned.length === 12 && cleaned.startsWith('584');
  }
  
  return cleaned.length === 11 && cleaned.startsWith('04');
}

/**
 * Sanitiza un string para prevenir XSS básico.
 * NOTA: Para sanitización completa, usar una librería como DOMPurify.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Valida que un string no esté vacío después de trim.
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valida longitud de string.
 */
export function validateLength(
  value: string,
  min: number,
  max: number
): { isValid: boolean; error?: string } {
  const length = value.trim().length;
  
  if (length < min) {
    return { isValid: false, error: `Debe tener al menos ${min} caracteres` };
  }
  
  if (length > max) {
    return { isValid: false, error: `No puede exceder ${max} caracteres` };
  }
  
  return { isValid: true };
}

/**
 * Valida que un número esté en un rango.
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number
): { isValid: boolean; error?: string } {
  if (value < min) {
    return { isValid: false, error: `Debe ser al menos ${min}` };
  }
  
  if (value > max) {
    return { isValid: false, error: `No puede exceder ${max}` };
  }
  
  return { isValid: true };
}

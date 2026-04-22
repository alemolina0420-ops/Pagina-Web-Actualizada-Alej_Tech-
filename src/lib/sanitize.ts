/**
 * sanitize.ts
 * 
 * Funciones de sanitización para prevenir ataques XSS.
 * Limpia inputs de usuario antes de almacenarlos o mostrarlos.
 */

/**
 * Sanitiza HTML básico escapando caracteres peligrosos.
 * Previene inyección de scripts y tags HTML.
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitiza un objeto completo recursivamente.
 * Útil para limpiar datos de formularios antes de guardarlos.
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeHtml(value) as T[Extract<keyof T, string>];
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map((item: any) => 
          typeof item === 'string' ? sanitizeHtml(item) : item
        ) as T[Extract<keyof T, string>];
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
}

/**
 * Limpia un string eliminando caracteres de control y espacios múltiples.
 */
export function cleanString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

/**
 * Sanitiza un nombre (permite solo letras, espacios, guiones y apóstrofes).
 */
export function sanitizeName(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitiza un email (elimina espacios y convierte a minúsculas).
 */
export function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .toLowerCase()
    .replace(/\s/g, '')
    .trim();
}

/**
 * Sanitiza un número de teléfono (elimina todo excepto dígitos, +, - y paréntesis).
 */
export function sanitizePhone(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input.replace(/[^0-9+\-()]/g, '').trim();
}

/**
 * Sanitiza una URL verificando que sea válida y segura.
 */
export function sanitizeUrl(input: string): string {
  if (typeof input !== 'string') return '';
  
  try {
    const url = new URL(input);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }
    
    return url.toString();
  } catch {
    return '';
  }
}

/**
 * Sanitiza un precio (permite solo números y punto decimal).
 */
export function sanitizePrice(input: string | number): number {
  if (typeof input === 'number') {
    return Math.max(0, Math.round(input * 100) / 100);
  }
  
  if (typeof input !== 'string') return 0;
  
  const cleaned = input.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : Math.max(0, Math.round(parsed * 100) / 100);
}

/**
 * Sanitiza texto largo (descripción, comentarios) manteniendo saltos de línea.
 */
export function sanitizeText(input: string, maxLength = 5000): string {
  if (typeof input !== 'string') return '';
  
  return sanitizeHtml(input)
    .replace(/\r\n/g, '\n') // Normalize line breaks
    .replace(/\n{3,}/g, '\n\n') // Max 2 consecutive line breaks
    .slice(0, maxLength)
    .trim();
}

/**
 * Verifica si un string contiene potenciales ataques XSS.
 */
export function containsXss(input: string): boolean {
  if (typeof input !== 'string') return false;
  
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick, onerror, etc.
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitiza un array de strings.
 */
export function sanitizeArray(input: string[]): string[] {
  if (!Array.isArray(input)) return [];
  
  return input
    .filter(item => typeof item === 'string')
    .map(item => sanitizeHtml(item))
    .filter(item => item.length > 0);
}

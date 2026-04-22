/**
 * crypto.ts
 * 
 * Funciones de cifrado/descifrado para proteger datos sensibles en localStorage.
 * Usa Web Crypto API (AES-GCM) para cifrado simétrico.
 * 
 * NOTA: La clave de cifrado se deriva del navegador (no es 100% segura contra
 * ataques locales, pero protege contra lectura casual de localStorage).
 */

/**
 * Genera una clave de cifrado derivada de un identificador único del navegador.
 * Esta clave se mantiene consistente para el mismo navegador.
 */
async function getDerivedKey(): Promise<CryptoKey> {
  // Use a combination of factors to create a browser-specific key
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const screenResolution = `${screen.width}x${screen.height}`;
  
  // Create a deterministic seed from browser characteristics
  const seed = `${userAgent}-${language}-${platform}-${screenResolution}`;
  
  // Hash the seed to create key material
  const encoder = new TextEncoder();
  const data = encoder.encode(seed);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Import the hash as a key
  return await crypto.subtle.importKey(
    'raw',
    hashBuffer,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Cifra un string usando AES-GCM.
 * 
 * @param plaintext - Texto a cifrar
 * @returns String cifrado en formato base64 con IV incluido
 */
export async function encrypt(plaintext: string): Promise<string> {
  try {
    const key = await getDerivedKey();
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    // Generate a random IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);
    
    // Convert to base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('[Crypto] Encryption failed:', error);
    // Fallback: return plaintext (not ideal, but prevents data loss)
    return plaintext;
  }
}

/**
 * Descifra un string cifrado con AES-GCM.
 * 
 * @param ciphertext - String cifrado en formato base64
 * @returns Texto descifrado
 */
export async function decrypt(ciphertext: string): Promise<string> {
  try {
    const key = await getDerivedKey();
    
    // Convert from base64
    const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);
    
    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );
    
    // Convert to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    console.error('[Crypto] Decryption failed:', error);
    // Fallback: return ciphertext (might be unencrypted legacy data)
    return ciphertext;
  }
}

/**
 * Cifra un objeto convirtiéndolo a JSON primero.
 */
export async function encryptObject<T>(obj: T): Promise<string> {
  const json = JSON.stringify(obj);
  return await encrypt(json);
}

/**
 * Descifra un string y lo parsea como JSON.
 */
export async function decryptObject<T>(ciphertext: string): Promise<T | null> {
  try {
    const json = await decrypt(ciphertext);
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('[Crypto] Failed to decrypt object:', error);
    return null;
  }
}

/**
 * Verifica si un string está cifrado (heurística simple).
 */
export function isEncrypted(value: string): boolean {
  // Check if it looks like base64 and is long enough to contain IV + data
  const base64Regex = /^[A-Za-z0-9+/]+=*$/;
  return base64Regex.test(value) && value.length > 20;
}

/**
 * Hash de un string usando SHA-256 (para comparaciones, no reversible).
 */
export async function hash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

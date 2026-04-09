/**
 * whatsapp.ts
 * 
 * Utilidades para generar enlaces de WhatsApp de forma segura.
 * Sanitiza inputs para prevenir inyección XSS en URLs.
 */

import { getWhatsAppNumber } from '@/config/site.config';

/**
 * Sanitiza un string para uso seguro en URLs.
 * Elimina caracteres potencialmente peligrosos y limita longitud.
 */
function sanitizeForUrl(text: string, maxLength = 500): string {
  return text
    .replace(/<[^>]*>/g, '')        // Elimina tags HTML
    .replace(/[<>"'`]/g, '')        // Elimina caracteres peligrosos
    .trim()
    .slice(0, maxLength);
}

/**
 * Limpia un número de teléfono dejando solo dígitos.
 */
function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Construye un enlace de WhatsApp seguro.
 * @param message - Mensaje pre-llenado (será sanitizado)
 * @param phoneOverride - Número de teléfono (si no se provee, usa el de env)
 */
export function buildWhatsAppLink(message: string, phoneOverride?: string): string {
  const phone = cleanPhoneNumber(phoneOverride || getWhatsAppNumber());
  const safeMessage = sanitizeForUrl(message);
  return `https://wa.me/${phone}?text=${encodeURIComponent(safeMessage)}`;
}

/**
 * Genera un enlace de WhatsApp para consulta de compra de producto.
 */
export function buildProductInquiryLink(productName: string, phoneOverride?: string): string {
  const safeName = sanitizeForUrl(productName, 200);
  return buildWhatsAppLink(
    `Hola, deseo comprar el ${safeName} visto en la web`,
    phoneOverride,
  );
}

/**
 * Genera un enlace de WhatsApp para solicitar presupuesto de reparación.
 */
export function buildRepairInquiryLink(
  model: string,
  fault: string,
  phone: string,
  phoneOverride?: string,
): string {
  const safeModel = sanitizeForUrl(model, 100);
  const safeFault = sanitizeForUrl(fault, 300);
  const safePhone = sanitizeForUrl(phone, 20);

  return buildWhatsAppLink(
    `Hola, solicito presupuesto técnico.\nModelo: ${safeModel}\nFalla: ${safeFault}\nTeléfono: ${safePhone}`,
    phoneOverride,
  );
}

/**
 * Genera un enlace genérico de WhatsApp con un saludo.
 */
export function buildGeneralWhatsAppLink(phoneOverride?: string): string {
  return buildWhatsAppLink(
    'Hola, estoy interesado en sus productos',
    phoneOverride,
  );
}

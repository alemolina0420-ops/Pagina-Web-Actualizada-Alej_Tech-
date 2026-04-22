/**
 * site.config.ts
 * 
 * Configuración centralizada del sitio ALEJ_TECH / TecnoStore.
 * Lee variables de entorno con fallbacks seguros.
 * Principio: Single Source of Truth para datos sensibles y constantes globales.
 */

/** Número de WhatsApp leído desde env, con fallback al número del negocio */
export function getWhatsAppNumber(): string {
  return import.meta.env.VITE_WHATSAPP_NUMBER || '584123979581';
}

/** URL canónica del sitio */
export function getSiteUrl(): string {
  return import.meta.env.VITE_SITE_URL ?? 'https://tecnostore.vercel.app';
}

/** Metadatos SEO por defecto */
export const DEFAULT_SEO = {
  siteName: 'ALEJ_TECH | TecnoStore',
  titleSuffix: ' | ALEJ_TECH — Santa Lucía del Tuy',
  defaultTitle: 'ALEJ_TECH | TecnoStore — Tienda y Servicio Técnico — Santa Lucía del Tuy, Valles del Tuy',
  defaultDescription:
    'Tienda de accesorios de calidad y servicio técnico de reparación de dispositivos móviles. Cargadores, cables, audífonos con garantía. Diagnóstico y reparación profesional. Santa Lucía del Tuy, Charallave, Cúa, Valles del Tuy.',
  defaultOgImage: '/perfil-tecnico.jpg', // TODO: Cambiar a /mesa-tecnica.jpg cuando esté disponible
  locale: 'es_VE',
  geoRegion: 'VE-MI',
  geoPlacename: 'Santa Lucía del Tuy, Miranda, Venezuela',
  geoPosition: '10.2533;-66.6597',
} as const;

/** Colores de la marca para referencia programática */
export const BRAND_COLORS = {
  primary: '#3b82f6',       // blue-500
  primaryDark: '#1e40af',   // blue-800
  accent: '#f59e0b',        // amber-500
  success: '#10b981',       // emerald-500
  cyan: '#06b6d4',          // cyan-500
  purple: '#8b5cf6',        // violet-500
  background: '#020617',    // slate-950
  surface: '#0f172a',       // slate-900
} as const;

/** Secciones del sitio */
export const SITE_SECTIONS = {
  home: '/',
  tienda: '/tienda',
  servicios: '/servicios',
} as const;

/**
 * SeoHead.tsx
 * 
 * Componente para gestionar meta tags SEO dinámicos por página.
 * Usa DOM API para evitar dependencias extra (react-helmet).
 * Se autolimpia al desmontar restaurando valores originales.
 */

import { useEffect } from 'react';
import { DEFAULT_SEO, getSiteUrl } from '@/config/site.config';

interface SeoHeadProps {
  /** Título de la página (se concatena con sufijo del sitio) */
  title?: string;
  /** Descripción para meta description y OG */
  description?: string;
  /** Imagen para Open Graph (ruta relativa o URL completa) */
  ogImage?: string;
  /** Path canónico (ej: '/productos') */
  canonicalPath?: string;
}

export function SeoHead({
  title,
  description,
  ogImage,
  canonicalPath,
}: SeoHeadProps) {
  useEffect(() => {
    const previousTitle = document.title;

    // Title
    document.title = title
      ? `${title}${DEFAULT_SEO.titleSuffix}`
      : DEFAULT_SEO.defaultTitle;

    // Meta description
    updateMetaTag('name', 'description', description || DEFAULT_SEO.defaultDescription);

    // Open Graph
    updateMetaTag('property', 'og:title', title || DEFAULT_SEO.defaultTitle);
    updateMetaTag('property', 'og:description', description || DEFAULT_SEO.defaultDescription);
    updateMetaTag('property', 'og:image', resolveImageUrl(ogImage || DEFAULT_SEO.defaultOgImage));
    updateMetaTag('property', 'og:url', canonicalPath ? `${getSiteUrl()}${canonicalPath}` : getSiteUrl());
    updateMetaTag('property', 'og:locale', DEFAULT_SEO.locale);
    updateMetaTag('property', 'og:site_name', DEFAULT_SEO.siteName);

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title || DEFAULT_SEO.defaultTitle);
    updateMetaTag('name', 'twitter:description', description || DEFAULT_SEO.defaultDescription);
    updateMetaTag('name', 'twitter:image', resolveImageUrl(ogImage || DEFAULT_SEO.defaultOgImage));

    // Canonical link
    if (canonicalPath) {
      updateCanonicalLink(`${getSiteUrl()}${canonicalPath}`);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, ogImage, canonicalPath]);

  return null; // Este componente no renderiza nada visible
}

/** Crea o actualiza un meta tag */
function updateMetaTag(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string,
) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/** Crea o actualiza el link canonical */
function updateCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

/** Resuelve URL de imagen (relativa → absoluta) */
function resolveImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) return imagePath;
  return `${getSiteUrl()}${imagePath}`;
}

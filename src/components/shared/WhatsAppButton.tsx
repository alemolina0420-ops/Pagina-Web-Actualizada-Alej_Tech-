/**
 * WhatsAppButton.tsx
 * 
 * Componente reutilizable de botón de WhatsApp.
 * Centraliza la lógica de enlace, accesibilidad y estilos.
 * Principio SRP: un componente, una función (abrir WhatsApp).
 */

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppButtonProps {
  /** URL completa de WhatsApp (usar buildWhatsAppLink/buildProductInquiryLink) */
  href: string;
  /** Texto visible del botón */
  children: React.ReactNode;
  /** Etiqueta de accesibilidad (WCAG 2.1) */
  ariaLabel: string;
  /** Variante visual */
  variant?: 'primary' | 'compact' | 'outline';
  /** Clase CSS adicional */
  className?: string;
  /** Callback onClick adicional (ej: stopPropagation) */
  onClick?: (e: React.MouseEvent) => void;
}

export function WhatsAppButton({
  href,
  children,
  ariaLabel,
  variant = 'primary',
  className = '',
  onClick,
}: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
  };

  if (variant === 'compact') {
    return (
      <Button
        asChild
        className={`bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/20 ${className}`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          onClick={handleClick}
        >
          <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
          {children}
        </a>
      </Button>
    );
  }

  if (variant === 'outline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={handleClick}
        className={`inline-flex items-center gap-3 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-medium px-6 py-3 rounded-lg transition-all duration-300 ${className}`}
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        {children}
      </a>
    );
  }

  // Default: primary
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`btn-primary inline-flex items-center gap-3 text-lg ${className}`}
    >
      <MessageCircle className="w-5 h-5" aria-hidden="true" />
      {children}
    </a>
  );
}

/**
 * FloatingWhatsAppButton.tsx
 * 
 * Botón flotante de WhatsApp siempre visible en la esquina inferior izquierda.
 * Aparece en todas las páginas públicas para contacto rápido.
 */

import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '@/utils/whatsapp';

interface FloatingWhatsAppButtonProps {
  /** Mensaje personalizado (opcional) */
  message?: string;
  /** Posición (default: bottom-left) */
  position?: 'bottom-left' | 'bottom-right';
}

export function FloatingWhatsAppButton({ 
  message,
  position = 'bottom-left' 
}: FloatingWhatsAppButtonProps) {
  const handleClick = () => {
    const link = message 
      ? buildGeneralWhatsAppLink() 
      : buildGeneralWhatsAppLink();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const positionClasses = position === 'bottom-left' 
    ? 'bottom-6 left-6' 
    : 'bottom-6 right-6';

  return (
    <button
      onClick={handleClick}
      className={`fixed ${positionClasses} z-40 group`}
      aria-label="Contactar por WhatsApp"
    >
      {/* Main button */}
      <div className="relative">
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
        
        {/* Button */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-2xl shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/70">
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
          ¿Necesitas ayuda?
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-8 border-transparent border-t-slate-900" />
          </div>
        </div>
      </div>
    </button>
  );
}

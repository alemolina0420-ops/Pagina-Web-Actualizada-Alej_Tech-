/**
 * UrgentRepairButton.tsx
 * 
 * Botón flotante sticky para reparaciones urgentes.
 * Visible en toda la sección de servicios para acceso rápido.
 */

import { Wrench, X } from 'lucide-react';
import { useState } from 'react';
import { buildWhatsAppLink } from '@/utils/whatsapp';

export function UrgentRepairButton() {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleClick = () => {
    const message = '🚨 REPARACIÓN URGENTE - Necesito asistencia técnica inmediata';
    const link = buildWhatsAppLink(message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-pulse"
        aria-label="Abrir botón de reparación urgente"
      >
        <Wrench className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-fade-in-scale">
      {/* Close button */}
      <button
        onClick={() => setIsMinimized(true)}
        className="w-8 h-8 rounded-full bg-slate-800/90 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200 flex items-center justify-center"
        aria-label="Minimizar botón de reparación urgente"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Main button */}
      <button
        onClick={handleClick}
        className="group relative bg-gradient-to-br from-red-600 to-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
        aria-label="Solicitar reparación urgente por WhatsApp"
      >
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full" />

        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <Wrench className="w-5 h-5" />
        </div>

        {/* Text */}
        <div className="text-left">
          <div className="font-bold text-sm leading-tight">Reparación</div>
          <div className="font-bold text-lg leading-tight">URGENTE</div>
          <div className="text-xs text-red-100 mt-0.5">Respuesta en &lt; 30 min</div>
        </div>
      </button>

      {/* Info tooltip */}
      <div className="bg-slate-900/95 backdrop-blur-sm text-slate-300 text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px] text-center">
        ¿Dispositivo dañado? Contáctanos ahora para diagnóstico inmediato
      </div>
    </div>
  );
}

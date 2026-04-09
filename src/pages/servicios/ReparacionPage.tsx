/**
 * ReparacionPage.tsx
 *
 * Página dedicada a reparación de dispositivos móviles.
 * Detalla tipos de reparación, marcas compatibles y proceso.
 * Acento: Púrpura.
 */

import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Monitor,
  Battery,
  Zap,
  Cpu,
  Wifi,
  Camera,
  Volume2,
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeoHead } from '@/components/shared/SeoHead';
import { buildWhatsAppLink } from '@/utils/whatsapp';
import { getWhatsAppNumber } from '@/config/site.config';

/** Lista completa de tipos de reparación */
const REPAIR_TYPES = [
  {
    icon: Monitor,
    title: 'Pantalla / Display',
    items: ['LCD, OLED, AMOLED', 'Digitalizador táctil', 'Cristal templado', 'Calibración post-reparación'],
    color: 'purple',
  },
  {
    icon: Battery,
    title: 'Batería',
    items: ['Diagnóstico de salud', 'Reemplazo de celda', 'Calibración de ciclos', 'Test de duración'],
    color: 'amber',
  },
  {
    icon: Zap,
    title: 'Puerto de Carga',
    items: ['USB-C / Lightning / Micro-USB', 'Limpieza profesional', 'Soldadura de precisión', 'Test de corriente'],
    color: 'cyan',
  },
  {
    icon: Cpu,
    title: 'Software',
    items: ['Eliminación de virus', 'Restauración de sistema', 'Recuperación de datos', 'Optimización de rendimiento'],
    color: 'emerald',
  },
  {
    icon: Camera,
    title: 'Cámara',
    items: ['Cámara frontal y trasera', 'Módulo de enfoque', 'Flash LED', 'Sensor de proximidad'],
    color: 'blue',
  },
  {
    icon: Volume2,
    title: 'Audio',
    items: ['Altavoz principal', 'Auricular de llamada', 'Micrófono', 'Jack de audio'],
    color: 'rose',
  },
  {
    icon: Wifi,
    title: 'Conectividad',
    items: ['WiFi y Bluetooth', 'Antena de señal', 'GPS', 'NFC'],
    color: 'violet',
  },
  {
    icon: Smartphone,
    title: 'Carcasa / Estructura',
    items: ['Tapa trasera', 'Marco / Chasis', 'Botones físicos', 'Bandeja SIM'],
    color: 'orange',
  },
];

/** Marcas compatibles */
const COMPATIBLE_BRANDS = [
  'Samsung', 'iPhone (Apple)', 'Xiaomi', 'Poco', 'Redmi',
  'Motorola', 'Huawei', 'Honor', 'Oppo', 'Realme',
  'OnePlus', 'ZTE', 'LG', 'Nokia', 'Otros',
];

const colorClasses: Record<string, { iconBg: string; iconText: string; border: string }> = {
  purple: { iconBg: 'bg-purple-500/10', iconText: 'text-purple-400', border: 'border-purple-500/20' },
  amber: { iconBg: 'bg-amber-500/10', iconText: 'text-amber-400', border: 'border-amber-500/20' },
  cyan: { iconBg: 'bg-cyan-500/10', iconText: 'text-cyan-400', border: 'border-cyan-500/20' },
  emerald: { iconBg: 'bg-emerald-500/10', iconText: 'text-emerald-400', border: 'border-emerald-500/20' },
  blue: { iconBg: 'bg-blue-500/10', iconText: 'text-blue-400', border: 'border-blue-500/20' },
  rose: { iconBg: 'bg-rose-500/10', iconText: 'text-rose-400', border: 'border-rose-500/20' },
  violet: { iconBg: 'bg-violet-500/10', iconText: 'text-violet-400', border: 'border-violet-500/20' },
  orange: { iconBg: 'bg-orange-500/10', iconText: 'text-orange-400', border: 'border-orange-500/20' },
};

export function ReparacionPage() {
  const navigate = useNavigate();
  const whatsappLink = buildWhatsAppLink(
    'Hola, necesito reparar mi dispositivo móvil',
    getWhatsAppNumber(),
  );

  return (
    <>
      <SeoHead
        title="Reparación de Dispositivos Móviles"
        description="Reparación profesional de celulares en Santa Lucía del Tuy. Cambio de pantalla, batería, puerto de carga, software. Samsung, iPhone, Xiaomi, Motorola y más. Diagnóstico gratuito. Valles del Tuy."
        canonicalPath="/servicios/reparacion"
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <Smartphone className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <span className="text-sm font-medium text-purple-400">REPARACIÓN PROFESIONAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Reparación de <span className="text-purple-400">Dispositivos Móviles</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Diagnóstico gratuito y reparación con garantía para todas las marcas.
            Herramientas de laboratorio y técnico certificado.
          </p>
        </div>
      </div>

      {/* ── Repair Types Grid ── */}
      <section className="py-20 bg-slate-950" aria-labelledby="repair-types-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 id="repair-types-title" className="text-3xl font-bold text-white mb-4">
              Tipos de <span className="text-purple-400">Reparación</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Cubrimos todo tipo de problemas en dispositivos móviles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REPAIR_TYPES.map((repair) => {
              const colors = colorClasses[repair.color];
              return (
                <article
                  key={repair.title}
                  className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:${colors.border} transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.iconBg}`}>
                    <repair.icon className={`w-6 h-6 ${colors.iconText}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{repair.title}</h3>
                  <ul className="space-y-1.5">
                    {repair.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compatible Brands ── */}
      <section className="py-20 bg-slate-900 border-t border-slate-800" aria-labelledby="brands-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="brands-title" className="text-3xl font-bold text-white mb-4">
              Marcas <span className="text-purple-400">Compatibles</span>
            </h2>
            <p className="text-slate-400">
              Trabajamos con todas las marcas principales del mercado.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {COMPATIBLE_BRANDS.map((brand) => (
              <span
                key={brand}
                className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 hover:border-purple-500/30 hover:text-purple-300 transition-all duration-200"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-950 border-t border-slate-800" aria-labelledby="reparacion-cta-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="reparacion-cta-title" className="text-3xl font-bold text-white mb-6">
            ¿Listo para <span className="text-purple-400">reparar tu equipo</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Diagnóstico gratuito. Presupuesto sin compromiso. Garantía incluida.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-servicios inline-flex items-center justify-center gap-3 text-lg"
              aria-label="Contactar por WhatsApp para reparación"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Contactar por WhatsApp
            </a>
            <Button
              onClick={() => navigate('/servicios/presupuesto')}
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/10 px-8 py-4 text-lg"
            >
              Solicitar Presupuesto
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

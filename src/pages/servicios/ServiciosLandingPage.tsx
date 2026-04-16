/**
 * ServiciosLandingPage.tsx
 *
 * Página principal de Servicios Técnicos — reparación de dispositivos móviles.
 * Incluye: tipos de reparación, marcas compatibles, proceso de trabajo,
 * sección de confianza y CTA final.
 * Acento: Púrpura/Violet.
 * SEO: Santa Lucía del Tuy, Valles del Tuy.
 */

import {
  Smartphone,
  Wrench,

  Shield,
  Zap,
  Battery,
  Monitor,
  Camera,
  Volume2,
  Wifi,
  CheckCircle,
  Clock,
  Award,
  MessageCircle,
} from 'lucide-react';
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

/** Proceso de trabajo */
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Contacto',
    description: 'Describe tu problema por WhatsApp o visita el taller. Te respondemos en minutos.',
  },
  {
    step: '02',
    title: 'Diagnóstico',
    description: 'Revisión profesional. Identificamos la falla exacta con herramientas especializadas.',
  },
  {
    step: '03',
    title: 'Presupuesto',
    description: 'Te enviamos el costo detallado. Sin sorpresas, sin costos ocultos. Tú decides.',
  },
  {
    step: '04',
    title: 'Reparación',
    description: 'Trabajo profesional con garantía. Te notificamos cuando tu equipo esté listo.',
  },
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

export function ServiciosLandingPage() {
  const whatsappLink = buildWhatsAppLink(
    'Hola, necesito un diagnóstico para mi dispositivo',
    getWhatsAppNumber(),
  );

  return (
    <>
      <SeoHead
        title="Servicio Técnico — Reparación de Dispositivos Móviles"
        description="Servicio técnico profesional de reparación de dispositivos móviles en Santa Lucía del Tuy. Diagnóstico de fallas, cambio de pantalla, batería, puerto de carga. Técnico especialista certificado. Valles del Tuy."
        canonicalPath="/servicios"
      />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        aria-labelledby="servicios-hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" aria-hidden="true" />
        <div className="absolute inset-0 circuit-pattern opacity-40" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8 text-center flex-wrap justify-center">
              <Wrench className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-purple-400 tracking-wide">
                TÉCNICO ESPECIALISTA CERTIFICADO | TALLER SANTA LUCÍA DEL TUY
              </span>
            </div>

            {/* Headline */}
            <h1
              id="servicios-hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Reparación <span className="gradient-text-purple">Profesional</span> de Dispositivos Móviles
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Diagnóstico de fallas y reparación con garantía para todas las marcas.
            </p>

            {/* Credential badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <Award className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span className="text-sm text-slate-300">Especialista Certificado</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <Shield className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-sm text-slate-300">Diagnóstico de Fallas</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <Clock className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span className="text-sm text-slate-300">Entrega Rápida</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-servicios inline-flex items-center justify-center gap-3 text-lg"
                aria-label="Solicitar diagnóstico por WhatsApp"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden="true" />
      </section>

      {/* ── REPAIR TYPES GRID ── */}
      <section className="py-24 bg-slate-950" aria-labelledby="repair-types-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 id="repair-types-title" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tipos de <span className="text-purple-400">Reparación</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Cubrimos todo tipo de problemas en dispositivos móviles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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

      {/* ── COMPATIBLE BRANDS ── */}
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

      {/* ── PROCESS ── */}
      <section className="py-24 bg-slate-950 border-t border-slate-800" aria-labelledby="process-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="process-title" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Cómo <span className="text-purple-400">funciona</span>?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Un proceso simple, transparente y sin complicaciones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((pStep, index) => (
              <div key={pStep.step} className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {/* Connector line */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-purple-500/30" aria-hidden="true" />
                )}

                <span className="text-4xl font-bold text-purple-500/20 mb-4 block">{pStep.step}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{pStep.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{pStep.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST / WHY US ── */}
      <section className="py-24 bg-slate-900 border-t border-slate-800" aria-labelledby="trust-servicios-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                <Award className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span className="text-sm font-medium text-purple-400">FORMACIÓN TÉCNICA</span>
              </div>

              <h2 id="trust-servicios-title" className="text-3xl sm:text-4xl font-bold text-white">
                ¿Por qué confiar en <span className="text-purple-400">nuestro taller</span>?
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed">
                No somos un puesto de celulares improvisado. Somos un taller técnico con formación profesional,
                herramientas de laboratorio y un proceso de diagnóstico riguroso.
              </p>

              <ul className="space-y-3">
                {[
                  'Técnico especialista certificado',
                  'Estación de soldadura de precisión',
                  'Diagnóstico con multímetro y osciloscopio',
                  'Garantía post-reparación incluida',
                  'Repuestos de calidad verificada',
                  'Atención personalizada',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '✓', label: 'Especialista Certificado', color: 'text-purple-400' },
                { value: '100%', label: 'Diagnóstico de Fallas', color: 'text-emerald-400' },
                { value: '24/7', label: 'Atención por WhatsApp', color: 'text-cyan-400' },
                { value: '⚡', label: 'Entrega Rápida', color: 'text-amber-400' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-center"
                >
                  <p className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-slate-950 border-t border-slate-800" aria-labelledby="servicios-cta-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-8">
            <Smartphone className="w-8 h-8 text-purple-400" aria-hidden="true" />
          </div>

          <h2 id="servicios-cta-title" className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ¿Listo para <span className="text-purple-400">reparar tu equipo</span>?
          </h2>

          <p className="text-xl text-slate-300 mb-8">
            Diagnóstico de fallas. Presupuesto sin compromiso. Garantía incluida.
          </p>

          <div className="flex justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-servicios inline-flex items-center justify-center gap-3 text-lg"
              aria-label="Contactar por WhatsApp ahora"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

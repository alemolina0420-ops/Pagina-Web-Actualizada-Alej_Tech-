/**
 * HomePage.tsx
 *
 * Portal de entrada principal de ALEJ_TECH.
 * Presenta dos rutas claras: Tienda Virtual y Servicios Técnicos.
 * Estilo industrial tecnológico con modo oscuro.
 * SEO optimizado para Santa Lucía del Tuy y Valles del Tuy.
 */

import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Wrench,
  Cpu,
  Zap,
  Shield,
  Smartphone,
  BatteryCharging,
  ArrowRight,
} from 'lucide-react';
import { SeoHead } from '@/components/shared/SeoHead';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <SeoHead
        title="Tienda y Servicio Técnico"
        description="ALEJ_TECH — Tienda de accesorios de calidad para dispositivos móviles y servicio técnico de reparación en Santa Lucía del Tuy, Valles del Tuy. Técnico especialista certificado."
        canonicalPath="/"
      />

      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
        aria-labelledby="home-hero-title"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" aria-hidden="true" />
        <div className="absolute inset-0 circuit-pattern opacity-40" aria-hidden="true" />

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-float" aria-hidden="true" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-float delay-300" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 mb-8 animate-fade-in-up">
              <Cpu className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-300 tracking-wide">
                TÉCNICO ESPECIALISTA CERTIFICADO
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-400">
                SANTA LUCÍA DEL TUY
              </span>
            </div>

            {/* Profile Avatar */}
            <div className="flex justify-center mb-4 sm:mb-6 animate-fade-in-up [animation-delay:50ms]">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] group">
                <img 
                  src="/perfil-tecnico.jpg" 
                  alt="Alejandro - ALEJ_TECH Técnico Especialista" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 mix-blend-overlay" aria-hidden="true" />
              </div>
            </div>

            {/* Main Title */}
            <h1
              id="home-hero-title"
              className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 animate-fade-in-up delay-100"
            >
              <span className="gradient-text-brand">ALEJ_TECH</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-3 sm:mb-4 animate-fade-in-up delay-200">
              Tecnología con respaldo técnico profesional
            </p>

            <p className="text-base text-slate-500 max-w-xl mx-auto animate-fade-in-up delay-300">
              Dos soluciones, un mismo estándar de calidad.
              Elige tu camino.
            </p>
          </div>

          {/* ── TWO MAIN CTAs ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto animate-fade-in-up delay-400">

            {/* TIENDA CARD */}
            <button
              onClick={() => navigate('/tienda')}
              className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 text-left overflow-hidden card-hover-cyan"
              aria-label="Ir a la Tienda Virtual — TecnoStore"
              id="cta-tienda"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
                    <ShoppingCart className="w-7 h-7 text-cyan-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-50 transition-colors">
                  Tienda Virtual
                </h2>
                <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                  Accesorios de calidad para dispositivos móviles, revisados y aprobados por el técnico.
                  Cargadores, cables, audífonos y más con garantía real.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-medium">
                    <Zap className="w-3 h-3" />
                    Calidad Garantizada
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-medium">
                    <Shield className="w-3 h-3" />
                    Garantía 15 días
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-medium">
                    <BatteryCharging className="w-3 h-3" />
                    PD 3.0
                  </span>
                </div>
              </div>
            </button>

            {/* SERVICIOS CARD */}
            <button
              onClick={() => navigate('/servicios')}
              className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all duration-500 text-left overflow-hidden card-hover-purple"
              aria-label="Ir a Servicio Técnico — Reparación de dispositivos móviles"
              id="cta-servicios"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/40 transition-colors">
                    <Wrench className="w-7 h-7 text-purple-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-50 transition-colors">
                  Servicio Técnico
                </h2>
                <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                  Reparación profesional de smartphones, tablets y dispositivos móviles.
                  Diagnóstico completo con herramientas especializadas.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium">
                    <Smartphone className="w-3 h-3" />
                    Reparación Móvil
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium">
                    <Cpu className="w-3 h-3" />
                    Diagnóstico Profesional
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium">
                    <Wrench className="w-3 h-3" />
                    Presupuesto de Reparación
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Trust bar */}
          <div className="mt-10 sm:mt-16 text-center animate-fade-in-up delay-500">
            <p className="text-sm text-slate-600 mb-4">Servicio profesional en</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Santa Lucía del Tuy', 'Charallave', 'Cúa', 'Santa Teresa', 'Ocumare del Tuy'].map(
                (zone) => (
                  <span
                    key={zone}
                    className="px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/60 text-xs text-slate-500"
                  >
                    {zone}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden="true" />
      </section>
    </>
  );
}

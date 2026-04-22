/**
 * HeroSection.tsx
 * 
 * Sección hero de la landing page.
 * Principio SRP: solo renderiza el hero con CTA.
 */

import { useNavigate } from 'react-router-dom';
import { Cpu, Zap, BatteryCharging } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { useProducts } from '@/contexts/ProductsContext';
import { buildGeneralWhatsAppLink } from '@/utils/whatsapp';

export function HeroSection() {
  const navigate = useNavigate();
  const { siteConfig } = useProducts();
  const whatsappLink = buildGeneralWhatsAppLink(siteConfig.whatsappNumber);

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8 text-center flex-wrap justify-center">
            <Cpu className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-blue-400 tracking-wide">
              {siteConfig.technicianTitle.toUpperCase()} | TALLER {siteConfig.location.split(',')[0].toUpperCase()}
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {siteConfig.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            {siteConfig.heroSubtitle}
          </p>

          {/* Technical specs badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10" role="list" aria-label="Características técnicas">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700" role="listitem">
              <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span className="tech-term text-sm">Calidad Garantizada</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700" role="listitem">
              <Cpu className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="tech-term text-sm">IC Inteligente</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700" role="listitem">
              <BatteryCharging className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span className="tech-term text-sm">PD 3.0</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <WhatsAppButton
              href={whatsappLink}
              ariaLabel={`${siteConfig.ctaText} — Contactar por WhatsApp`}
            >
              {siteConfig.ctaText}
            </WhatsAppButton>
            <Button
              onClick={() => navigate('/productos')}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 px-8 py-4 text-lg"
              aria-label="Ver catálogo de productos"
            >
              Ver Productos
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Garantía de {siteConfig.warrantyDays} días respaldada por taller técnico
          </p>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden="true" />
    </section>
  );
}

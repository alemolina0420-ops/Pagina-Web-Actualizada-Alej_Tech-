/**
 * TiendaLandingPage.tsx
 *
 * Landing page de la Tienda Virtual — enfocada en CONVERSIÓN.
 * Muestra: Hero de productos → TrustFeatures → FeaturedProducts → WarrantyBanner → CTA.
 * SIN formulario de reparación (eso vive en /servicios/presupuesto).
 */

import { useNavigate } from 'react-router-dom';
import { Cpu, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeoHead } from '@/components/shared/SeoHead';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { TrustFeatures } from '@/components/landing/TrustFeatures';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { WarrantyBanner } from '@/components/landing/WarrantyBanner';
import { useProducts } from '@/contexts/ProductsContext';
import { buildGeneralWhatsAppLink } from '@/utils/whatsapp';

export function TiendaLandingPage() {
  const navigate = useNavigate();
  const { siteConfig } = useProducts();
  const whatsappLink = buildGeneralWhatsAppLink(siteConfig.whatsappNumber);

  return (
    <>
      <SeoHead
        title="Tienda — Accesorios de Calidad Validados por el Técnico"
        description="Tienda de accesorios de calidad para dispositivos móviles. Cargadores, cables, audífonos con garantía de 15 días. Entregas en Santa Lucía del Tuy, Charallave, Cúa y Valles del Tuy."
        canonicalPath="/tienda"
      />

      {/* ── HERO TIENDA ── */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        aria-labelledby="tienda-hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-cyan-500/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8 text-center flex-wrap justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-cyan-400 tracking-wide">
                {siteConfig.technicianTitle.toUpperCase()} | TALLER {siteConfig.location.split(',')[0].toUpperCase()}
              </span>
            </div>

            {/* Headline */}
            <h1
              id="tienda-hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Accesorios de <span className="gradient-text-cyan">Calidad</span> y Validados por el Técnico
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Cada producto ha sido revisado y aprobado por nuestro técnico antes de llegar a tus manos.
              Calidad certificada con garantía real.
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <WhatsAppButton
                href={whatsappLink}
                ariaLabel={`${siteConfig.ctaText} — Contactar por WhatsApp`}
              >
                {siteConfig.ctaText}
              </WhatsAppButton>
              <Button
                onClick={() => navigate('/tienda/productos')}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 px-8 py-4 text-lg"
                aria-label="Ver catálogo de productos"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ver Productos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Garantía de {siteConfig.warrantyDays} días respaldada por taller técnico
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden="true" />
      </section>

      {/* Sections */}
      <TrustFeatures />
      <FeaturedProducts />
      <WarrantyBanner />
    </>
  );
}

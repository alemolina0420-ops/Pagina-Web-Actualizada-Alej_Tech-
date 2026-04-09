/**
 * LandingPage.tsx
 * 
 * Página de inicio — compone secciones individuales.
 * Reducida de 438 líneas a ~30 gracias a Clean Architecture.
 * No necesita ProductsProvider (lo provee PublicLayout).
 */

import { SeoHead } from '@/components/shared/SeoHead';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustFeatures } from '@/components/landing/TrustFeatures';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { RepairForm } from '@/components/landing/RepairForm';
import { WarrantyBanner } from '@/components/landing/WarrantyBanner';
import { CtaSection } from '@/components/landing/CtaSection';

export function LandingPage() {
  return (
    <>
      <SeoHead
        title="Accesorios de Calidad Validados por el Técnico"
        description="Accesorios de calidad para dispositivos móviles. Cargadores, cables, audífonos con garantía de 15 días. Entregas en Santa Lucía, Charallave, Cúa y Valles del Tuy."
        canonicalPath="/"
      />

      <main className="min-h-screen">
        <HeroSection />
        <TrustFeatures />
        <FeaturedProducts />
        <RepairForm />
        <WarrantyBanner />
        <CtaSection />
      </main>
    </>
  );
}

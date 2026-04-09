/**
 * CtaSection.tsx
 * 
 * Sección CTA final de la landing page.
 */

import { Shield } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import { buildGeneralWhatsAppLink } from '@/utils/whatsapp';

export function CtaSection() {
  const { siteConfig } = useProducts();
  const whatsappLink = buildGeneralWhatsAppLink(siteConfig.whatsappNumber);

  return (
    <section className="py-24 bg-slate-900" aria-labelledby="cta-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 mb-8">
          <Shield className="w-8 h-8 text-blue-400" aria-hidden="true" />
        </div>

        <h2 id="cta-title" className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Tu dispositivo merece accesorios <span className="text-blue-400">de calidad garantizada</span>
        </h2>

        <p className="text-xl text-slate-300 mb-8">
          No expongas tu inversión a accesorios de dudosa procedencia.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center justify-center text-lg"
          aria-label={`${siteConfig.ctaText} — Contactar por WhatsApp ahora`}
        >
          {siteConfig.ctaText}
        </a>
      </div>
    </section>
  );
}

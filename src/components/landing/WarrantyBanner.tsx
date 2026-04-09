/**
 * WarrantyBanner.tsx
 * 
 * Sección de garantía en la landing page.
 * Diferente de WarrantyPage (esta es un banner resumido).
 */

import { CheckCircle } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';

export function WarrantyBanner() {
  const { siteConfig } = useProducts();

  return (
    <section className="py-24 bg-slate-950" aria-labelledby="warranty-banner-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="text-sm font-medium text-emerald-400">GARANTÍA REAL</span>
            </div>

            <h2 id="warranty-banner-title" className="text-3xl sm:text-4xl font-bold text-white">
              Garantía de <span className="text-emerald-400">{siteConfig.warrantyDays} días</span> respaldada por taller técnico
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed">
              No estás comprando a un desconocido de internet. Estás adquiriendo un producto validado por un técnico especializado, con respaldo local real.
            </p>

            <p className="text-slate-400 leading-relaxed">
              Si hay cualquier comportamiento anómalo en el funcionamiento, tienes contacto directo con el técnico. Cada producto es una validación de nuestra reputación profesional.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-slate-300 text-sm">Validación técnica</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-slate-300 text-sm">
                  Taller en {siteConfig.location.split(',')[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Zonas de entrega">
            {siteConfig.deliveryZones.map((zone, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800"
                role="listitem"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                <span className="text-slate-300">{zone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

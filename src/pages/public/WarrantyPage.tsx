/**
 * WarrantyPage.tsx
 * 
 * Página de información de garantía.
 * Semántica: <article> para contenido principal.
 * No necesita ProductsProvider (lo provee PublicLayout).
 */

import { Shield, CheckCircle, Clock, MapPin } from 'lucide-react';
import { SeoHead } from '@/components/shared/SeoHead';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { useProducts } from '@/contexts/ProductsContext';
import { buildWhatsAppLink } from '@/utils/whatsapp';

export function WarrantyPage() {
  const { siteConfig } = useProducts();
  const whatsappLink = buildWhatsAppLink(
    'Hola, tengo una consulta sobre la garantía',
    siteConfig.whatsappNumber,
  );

  return (
    <>
      <SeoHead
        title="Garantía"
        description={`Garantía de ${siteConfig.warrantyDays} días respaldada por técnico especializado en ${siteConfig.location}. Cobertura de defectos de fábrica y fallas de funcionamiento.`}
        canonicalPath="/garantia"
      />

      <article className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Shield className="w-8 h-8 text-emerald-400" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Nuestra Garantía</h1>
            <p className="text-xl text-slate-400">
              Respaldada por {siteConfig.technicianTitle}
            </p>
          </header>

          {/* Main warranty info */}
          <section className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mb-8" aria-labelledby="warranty-days">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <h2 id="warranty-days" className="text-2xl font-bold text-white">
                  {siteConfig.warrantyDays} Días de Garantía
                </h2>
                <p className="text-slate-400">Desde la fecha de entrega</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-6">
              Todos nuestros productos cuentan con garantía real respaldada por taller técnico.
              No estás comprando a un desconocido de internet: estás adquiriendo productos validados
              por un {siteConfig.technicianTitle} con respaldo local en {siteConfig.location}.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Cobertura completa', desc: 'Defectos de fábrica y fallas de funcionamiento' },
                { title: 'Reemplazo inmediato', desc: 'Si el producto falla, lo reemplazamos' },
                { title: 'Sin complicaciones', desc: 'Proceso simple y directo' },
                { title: 'Soporte técnico', desc: 'Asesoría directa con el técnico' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Coverage details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6" aria-labelledby="coverage-yes">
              <h2 id="coverage-yes" className="text-xl font-bold text-white mb-4">¿Qué cubre?</h2>
              <ul className="space-y-3">
                {['Defectos de fabricación', 'Fallas de funcionamiento', 'Problemas de carga (cargadores)', 'Incompatibilidad declarada'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </section>

            <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6" aria-labelledby="coverage-no">
              <h2 id="coverage-no" className="text-xl font-bold text-white mb-4">¿Qué NO cubre?</h2>
              <ul className="space-y-3">
                {['Daños por mal uso', 'Daños por agua o líquidos', 'Desgaste normal por uso', 'Modificaciones no autorizadas'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm flex-shrink-0" aria-hidden="true">
                        ×
                      </span>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </div>

          {/* Location */}
          <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8" aria-labelledby="warranty-location">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-400" aria-hidden="true" />
              <h2 id="warranty-location" className="text-xl font-bold text-white">
                Ubicación y Zonas de Entrega
              </h2>
            </div>
            <p className="text-slate-300 mb-4">
              <span className="font-medium text-white">Taller principal:</span> {siteConfig.location}
            </p>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Zonas de entrega">
              {siteConfig.deliveryZones.map((zone, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-slate-800 text-slate-300"
                  role="listitem"
                >
                  {zone}
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">¿Tienes dudas sobre nuestra garantía?</p>
            <WhatsAppButton
              href={whatsappLink}
              ariaLabel="Consultar sobre la garantía por WhatsApp"
            >
              Consultar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </article>
    </>
  );
}

/**
 * ContactPage.tsx
 * 
 * Página de contacto.
 * Semántica: <address> para info de contacto, <section> para áreas.
 * No necesita ProductsProvider (lo provee PublicLayout).
 */

import { MapPin, Mail, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SeoHead } from '@/components/shared/SeoHead';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { useProducts } from '@/contexts/ProductsContext';
import { buildWhatsAppLink } from '@/utils/whatsapp';

export function ContactPage() {
  const { siteConfig } = useProducts();
  const whatsappLink = buildWhatsAppLink(
    'Hola, tengo una consulta',
    siteConfig.whatsappNumber,
  );

  return (
    <>
      <SeoHead
        title="Contacto"
        description={`Contacta a ${siteConfig.brandName} en ${siteConfig.location}. WhatsApp, correo y ubicación del taller. Horario de atención y zonas de entrega.`}
        canonicalPath="/contacto"
      />

      <div className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Contacto</h1>
            <p className="text-xl text-slate-400">
              Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
            </p>
          </header>

          {/* Contact cards */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" aria-label="Medios de contacto">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-white mb-2">WhatsApp</h2>
                <p className="text-slate-400 text-sm mb-4">Respuesta rápida garantizada</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                  aria-label="Contactar por WhatsApp"
                >
                  {siteConfig.whatsappNumber || 'No configurado'}
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-amber-400" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-white mb-2">Correo Electrónico</h2>
                <p className="text-slate-400 text-sm mb-4">Para consultas detalladas</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-amber-400 hover:text-amber-300 font-medium"
                  aria-label={`Enviar correo a ${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-400" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-white mb-2">Ubicación</h2>
                <p className="text-slate-400 text-sm mb-4">Taller principal</p>
                <address className="not-italic text-blue-400 font-medium">
                  {siteConfig.location}
                </address>
              </CardContent>
            </Card>
          </section>

          {/* Hours */}
          <section className="mb-12" aria-labelledby="hours-title">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-amber-400" aria-hidden="true" />
                  <h2 id="hours-title" className="text-xl font-bold text-white">Horario de Atención</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { day: 'Lunes - Viernes', hours: '8:00 AM - 6:00 PM', highlight: true },
                    { day: 'Sábados', hours: '9:00 AM - 2:00 PM', highlight: true },
                    { day: 'Domingos', hours: 'Cerrado', highlight: false },
                    { day: 'WhatsApp', hours: '24/7', highlight: true, isWhatsApp: true },
                  ].map((schedule) => (
                    <div key={schedule.day} className="flex justify-between p-3 rounded-lg bg-slate-800/50">
                      <span className="text-slate-300">{schedule.day}</span>
                      <span className={schedule.isWhatsApp ? 'text-emerald-400 font-medium' : schedule.highlight ? 'text-white font-medium' : 'text-slate-500'}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Delivery zones */}
          <section className="mb-12" aria-labelledby="delivery-title">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-400" aria-hidden="true" />
                  <h2 id="delivery-title" className="text-xl font-bold text-white">Zonas de Entrega</h2>
                </div>
                <p className="text-slate-400 mb-4">
                  Realizamos entregas personales en las siguientes zonas:
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Zonas de entrega disponibles">
                  {siteConfig.deliveryZones.map((zone, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-slate-800 text-slate-300"
                      role="listitem"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">¿Listo para hacer tu pedido?</p>
            <WhatsAppButton
              href={whatsappLink}
              ariaLabel="Escribir consulta por WhatsApp"
            >
              Escribir por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </>
  );
}

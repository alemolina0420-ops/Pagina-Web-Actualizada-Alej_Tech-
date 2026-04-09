/**
 * ContactoServiciosPage.tsx
 *
 * Página de contacto para la sección de servicios técnicos.
 * Información de ubicación, horarios y zonas de cobertura.
 * Acento: Púrpura.
 */

import { MapPin, Clock, MessageCircle, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SeoHead } from '@/components/shared/SeoHead';
import { buildWhatsAppLink } from '@/utils/whatsapp';
import { getWhatsAppNumber } from '@/config/site.config';

export function ContactoServiciosPage() {
  const whatsappNumber = getWhatsAppNumber();
  const whatsappLink = buildWhatsAppLink(
    'Hola, necesito información sobre el servicio técnico',
    whatsappNumber,
  );

  return (
    <>
      <SeoHead
        title="Contacto — Servicio Técnico"
        description="Contacta al taller de reparación ALEJ_TECH en Santa Lucía del Tuy. WhatsApp, horarios de atención y zonas de cobertura en Valles del Tuy."
        canonicalPath="/servicios/contacto"
      />

      <div className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Contacto</h1>
            <p className="text-xl text-slate-400">
              Estamos aquí para ayudarte con la reparación de tu equipo.
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
                  {whatsappNumber || 'No configurado'}
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-purple-400" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-white mb-2">Teléfono</h2>
                <p className="text-slate-400 text-sm mb-4">Llamadas directas al taller</p>
                <span className="text-purple-400 font-medium">
                  {whatsappNumber || 'No configurado'}
                </span>
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
                  Santa Lucía del Tuy, Miranda
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
                  <MapPin className="w-6 h-6 text-purple-400" aria-hidden="true" />
                  <h2 id="delivery-title" className="text-xl font-bold text-white">Zonas de Cobertura</h2>
                </div>
                <p className="text-slate-400 mb-4">
                  Atendemos dispositivos de las siguientes zonas (entrega y recogida):
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Zonas de cobertura del servicio técnico">
                  {['Santa Lucía del Tuy', 'Charallave', 'Cúa', 'Santa Teresa', 'Ocumare del Tuy', 'San Francisco de Yare'].map((zone) => (
                    <span
                      key={zone}
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
            <p className="text-slate-400 mb-4">¿Necesitas reparar tu dispositivo?</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-servicios inline-flex items-center justify-center gap-3 text-lg"
              aria-label="Escribir por WhatsApp para reparación"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

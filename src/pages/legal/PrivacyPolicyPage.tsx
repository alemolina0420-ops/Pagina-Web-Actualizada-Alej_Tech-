/**
 * PrivacyPolicyPage.tsx
 * 
 * Página de Política de Privacidad.
 * Cumple con requisitos legales de protección de datos personales.
 */

import { Shield, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { SeoHead } from '@/components/shared/SeoHead';

export function PrivacyPolicyPage() {
  const lastUpdated = 'Abril 21, 2026';

  return (
    <>
      <SeoHead
        title="Política de Privacidad"
        description="Política de privacidad y protección de datos personales de ALEJ_TECH | TecnoStore. Conoce cómo manejamos tu información."
      />

      <div className="min-h-screen bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Política de Privacidad
            </h1>
            <p className="text-slate-400 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Última actualización: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-8">
            
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
              <p className="text-slate-300 leading-relaxed">
                En <strong className="text-white">ALEJ_TECH</strong> (en adelante, "nosotros", "nuestro" o "la empresa"), 
                nos comprometemos a proteger la privacidad y seguridad de los datos personales de nuestros usuarios. 
                Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos tu información 
                cuando utilizas nuestro sitio web y servicios.
              </p>
            </section>

            {/* Datos que recopilamos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Datos que Recopilamos</h2>
              <p className="text-slate-300 mb-4">Recopilamos los siguientes tipos de información:</p>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">2.1. Información de Registro</h3>
                  <ul className="text-slate-300 space-y-2 list-disc list-inside">
                    <li>Nombre completo (nombre y apellido)</li>
                    <li>Correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Contraseña (almacenada de forma cifrada)</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">2.2. Información de Navegación</h3>
                  <ul className="text-slate-300 space-y-2 list-disc list-inside">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador y dispositivo</li>
                    <li>Páginas visitadas y tiempo de permanencia</li>
                    <li>Preferencias de usuario (almacenadas localmente)</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">2.3. Información de Transacciones</h3>
                  <ul className="text-slate-300 space-y-2 list-disc list-inside">
                    <li>Historial de consultas de productos</li>
                    <li>Solicitudes de reparación</li>
                    <li>Comunicaciones por WhatsApp (externas a nuestro sitio)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cómo usamos tus datos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Cómo Usamos tus Datos</h2>
              <p className="text-slate-300 mb-4">Utilizamos tu información personal para:</p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside ml-4">
                <li>Crear y gestionar tu cuenta de usuario</li>
                <li>Procesar tus consultas sobre productos y servicios</li>
                <li>Comunicarnos contigo sobre tus solicitudes de reparación</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Enviar notificaciones importantes sobre tu cuenta</li>
                <li>Cumplir con obligaciones legales</li>
                <li>Prevenir fraudes y garantizar la seguridad del sitio</li>
              </ul>
            </section>

            {/* Almacenamiento de datos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Almacenamiento y Seguridad</h2>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
                <p className="text-amber-200 text-sm">
                  <strong>Importante:</strong> Tus datos se almacenan localmente en tu navegador (localStorage) 
                  y están protegidos mediante cifrado. No utilizamos servidores externos para almacenar 
                  información personal.
                </p>
              </div>
              <p className="text-slate-300 mb-4">Medidas de seguridad implementadas:</p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside ml-4">
                <li>Cifrado de contraseñas con bcrypt (10 salt rounds)</li>
                <li>Cifrado AES-GCM para datos sensibles en localStorage</li>
                <li>Sesiones con expiración automática (24 horas)</li>
                <li>Protección contra ataques XSS y CSRF</li>
                <li>Headers de seguridad (CSP, HSTS, X-Frame-Options)</li>
                <li>Rate limiting para prevenir ataques de fuerza bruta</li>
              </ul>
            </section>

            {/* Compartir información */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Compartir Información</h2>
              <p className="text-slate-300 mb-4">
                <strong className="text-white">No vendemos, alquilamos ni compartimos</strong> tu información 
                personal con terceros, excepto en los siguientes casos:
              </p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside ml-4">
                <li>Cuando nos des tu consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales o requerimientos judiciales</li>
                <li>Para proteger nuestros derechos, propiedad o seguridad</li>
                <li>Con proveedores de servicios que nos ayudan a operar el sitio (ej: hosting en Vercel)</li>
              </ul>
            </section>

            {/* Tus derechos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Tus Derechos</h2>
              <p className="text-slate-300 mb-4">Como usuario, tienes derecho a:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Acceso</h3>
                  <p className="text-slate-300 text-sm">
                    Solicitar una copia de los datos personales que tenemos sobre ti.
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Rectificación</h3>
                  <p className="text-slate-300 text-sm">
                    Corregir datos inexactos o incompletos.
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Eliminación</h3>
                  <p className="text-slate-300 text-sm">
                    Solicitar la eliminación de tus datos personales.
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Portabilidad</h3>
                  <p className="text-slate-300 text-sm">
                    Recibir tus datos en un formato estructurado y legible.
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mt-4">
                Para ejercer cualquiera de estos derechos, contáctanos a través de los medios indicados al final 
                de este documento.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies y Tecnologías Similares</h2>
              <p className="text-slate-300 mb-4">
                Utilizamos localStorage (almacenamiento local del navegador) para guardar tus preferencias y 
                mantener tu sesión activa. No utilizamos cookies de terceros para rastreo publicitario.
              </p>
              <p className="text-slate-300">
                Puedes limpiar el localStorage de tu navegador en cualquier momento desde la configuración 
                del mismo, aunque esto cerrará tu sesión y eliminará tus preferencias guardadas.
              </p>
            </section>

            {/* Menores de edad */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Menores de Edad</h2>
              <p className="text-slate-300">
                Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
                intencionalmente información de menores de edad. Si descubrimos que hemos recopilado 
                datos de un menor sin el consentimiento parental, eliminaremos esa información de inmediato.
              </p>
            </section>

            {/* Cambios a esta política */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Cambios a esta Política</h2>
              <p className="text-slate-300">
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación en esta página. 
                Te notificaremos sobre cambios significativos mediante un aviso destacado en nuestro sitio web.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contacto</h2>
              <p className="text-slate-300 mb-4">
                Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, 
                puedes contactarnos a través de:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>dev@tecnostore.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+58 412 397 9581</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Santa Lucía del Tuy, Miranda, Venezuela</span>
                </div>
              </div>
            </section>

            {/* Footer legal */}
            <div className="text-center pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} ALEJ_TECH. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

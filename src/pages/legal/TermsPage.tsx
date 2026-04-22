/**
 * TermsPage.tsx
 * 
 * Página de Términos y Condiciones.
 * Define las reglas de uso del sitio, venta de productos y servicios técnicos.
 */

import { FileText, ShoppingCart, Wrench, Shield, AlertTriangle, Calendar } from 'lucide-react';
import { SeoHead } from '@/components/shared/SeoHead';

export function TermsPage() {
  const lastUpdated = 'Abril 21, 2026';

  return (
    <>
      <SeoHead
        title="Términos y Condiciones"
        description="Términos y condiciones de uso de ALEJ_TECH | TecnoStore. Conoce las reglas de venta de productos y servicios técnicos."
      />

      <div className="min-h-screen bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-slate-400 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Última actualización: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-8">
            
            {/* Aceptación */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
              <p className="text-slate-300 leading-relaxed">
                Al acceder y utilizar el sitio web de <strong className="text-white">ALEJ_TECH</strong> 
                (en adelante, "el sitio", "nosotros" o "la empresa"), aceptas estar sujeto a estos 
                Términos y Condiciones, todas las leyes y regulaciones aplicables, y aceptas que eres 
                responsable del cumplimiento de las leyes locales aplicables.
              </p>
              <p className="text-slate-300 mt-4">
                Si no estás de acuerdo con alguno de estos términos, no debes usar este sitio.
              </p>
            </section>

            {/* Servicios ofrecidos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Servicios Ofrecidos</h2>
              <p className="text-slate-300 mb-4">ALEJ_TECH ofrece dos tipos de servicios:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <ShoppingCart className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-cyan-400">Tienda Virtual</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Venta de accesorios tecnológicos (cargadores, cables, audífonos, etc.) 
                    validados térmicamente por un técnico especializado.
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-purple-400">Servicio Técnico</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Reparación profesional de dispositivos móviles con diagnóstico, 
                    reparación y garantía de servicio.
                  </p>
                </div>
              </div>
            </section>

            {/* Venta de productos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Venta de Productos</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">3.1. Precios</h3>
                  <p className="text-slate-300">
                    Todos los precios están expresados en dólares estadounidenses (USD) y pueden estar 
                    sujetos a cambios sin previo aviso. Los precios publicados no incluyen costos de 
                    envío o entrega, los cuales se acordarán directamente con el cliente.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">3.2. Disponibilidad</h3>
                  <p className="text-slate-300">
                    La disponibilidad de productos está sujeta a existencias. Nos reservamos el derecho 
                    de limitar las cantidades de cualquier producto que ofrezcamos. Todas las descripciones 
                    de productos son aproximadas y pueden variar ligeramente.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">3.3. Proceso de Compra</h3>
                  <p className="text-slate-300 mb-2">
                    Las compras se realizan a través de WhatsApp. El proceso es el siguiente:
                  </p>
                  <ol className="text-slate-300 space-y-2 list-decimal list-inside ml-4">
                    <li>El cliente consulta el producto de interés</li>
                    <li>Confirmamos disponibilidad y precio final</li>
                    <li>Acordamos método de pago y entrega</li>
                    <li>Procesamos el pedido una vez confirmado el pago</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">3.4. Métodos de Pago</h3>
                  <p className="text-slate-300">
                    Aceptamos diversos métodos de pago que se acordarán directamente con cada cliente. 
                    Los pagos deben completarse antes de la entrega del producto.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">3.5. Entrega</h3>
                  <p className="text-slate-300">
                    Realizamos entregas personales en Santa Lucía del Tuy, Charallave, Santa Teresa y 
                    zonas aledañas. Los tiempos y costos de entrega se acordarán con cada cliente según 
                    la ubicación.
                  </p>
                </div>
              </div>
            </section>

            {/* Garantía de productos */}
            <section className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">4. Garantía de Productos</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">4.1. Cobertura</h3>
                  <p className="text-slate-300">
                    Todos nuestros productos cuentan con una garantía de <strong className="text-white">15 días</strong> 
                    contra defectos de fabricación. Esta garantía cubre únicamente fallas atribuibles al 
                    producto y no cubre daños por mal uso, accidentes o desgaste normal.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">4.2. Exclusiones</h3>
                  <p className="text-slate-300 mb-2">La garantía NO cubre:</p>
                  <ul className="text-slate-300 space-y-1 list-disc list-inside ml-4">
                    <li>Daños físicos causados por caídas o golpes</li>
                    <li>Daños por líquidos o humedad</li>
                    <li>Uso inadecuado o fuera de especificaciones</li>
                    <li>Modificaciones o reparaciones no autorizadas</li>
                    <li>Desgaste normal por uso</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">4.3. Proceso de Garantía</h3>
                  <p className="text-slate-300">
                    Para hacer válida la garantía, el cliente debe contactarnos dentro del período de 15 días 
                    con evidencia del defecto. Evaluaremos el caso y, si aplica, procederemos con el reemplazo 
                    o reparación del producto.
                  </p>
                </div>
              </div>
            </section>

            {/* Servicio técnico */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Servicio Técnico de Reparación</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">5.1. Diagnóstico</h3>
                  <p className="text-slate-300">
                    Ofrecemos diagnóstico profesional de dispositivos móviles. El diagnóstico inicial 
                    es gratuito y se realiza para determinar la falla y el costo de reparación.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">5.2. Presupuesto</h3>
                  <p className="text-slate-300">
                    Una vez realizado el diagnóstico, proporcionamos un presupuesto detallado que incluye 
                    el costo de repuestos (si aplica) y mano de obra. El cliente debe aprobar el presupuesto 
                    antes de proceder con la reparación.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">5.3. Garantía de Servicio</h3>
                  <p className="text-slate-300">
                    Las reparaciones realizadas cuentan con una garantía de <strong className="text-white">15 días</strong> 
                    sobre la mano de obra. Los repuestos instalados tienen la garantía del fabricante o proveedor.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">5.4. Responsabilidad</h3>
                  <p className="text-slate-300">
                    Nos comprometemos a realizar las reparaciones con el mayor cuidado profesional. Sin embargo, 
                    no nos hacemos responsables por daños preexistentes no detectados en el diagnóstico inicial, 
                    ni por pérdida de datos. Recomendamos realizar respaldos antes de entregar el dispositivo.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">5.5. Dispositivos No Reclamados</h3>
                  <p className="text-slate-300">
                    Los dispositivos no reclamados después de 30 días de notificada la finalización de la 
                    reparación podrán ser dispuestos por la empresa para recuperar los costos de servicio.
                  </p>
                </div>
              </div>
            </section>

            {/* Propiedad intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Propiedad Intelectual</h2>
              <p className="text-slate-300">
                Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes y software, 
                es propiedad de ALEJ_TECH o de sus proveedores de contenido y está protegido por las leyes 
                de propiedad intelectual de Venezuela y tratados internacionales.
              </p>
            </section>

            {/* Limitación de responsabilidad */}
            <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">7. Limitación de Responsabilidad</h2>
              </div>
              <p className="text-slate-300 mb-4">
                En ningún caso ALEJ_TECH será responsable por daños indirectos, incidentales, especiales, 
                consecuentes o punitivos, incluyendo sin limitación, pérdida de beneficios, datos, uso, 
                fondo de comercio u otras pérdidas intangibles.
              </p>
              <p className="text-slate-300">
                Nuestra responsabilidad total no excederá el monto pagado por el producto o servicio en cuestión.
              </p>
            </section>

            {/* Modificaciones */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Modificaciones</h2>
              <p className="text-slate-300">
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación en esta página. 
                Es tu responsabilidad revisar periódicamente estos términos.
              </p>
            </section>

            {/* Ley aplicable */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Ley Aplicable y Jurisdicción</h2>
              <p className="text-slate-300">
                Estos Términos y Condiciones se rigen por las leyes de la República Bolivariana de Venezuela. 
                Cualquier disputa relacionada con estos términos será sometida a la jurisdicción exclusiva 
                de los tribunales competentes de Miranda, Venezuela.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contacto</h2>
              <p className="text-slate-300 mb-4">
                Para cualquier pregunta sobre estos Términos y Condiciones, puedes contactarnos:
              </p>
              <div className="space-y-2 text-slate-300">
                <p>📧 Email: dev@tecnostore.com</p>
                <p>📱 WhatsApp: +58 412 397 9581</p>
                <p>📍 Ubicación: Santa Lucía del Tuy, Miranda, Venezuela</p>
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

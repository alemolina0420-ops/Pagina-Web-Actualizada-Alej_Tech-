/**
 * Footer.tsx
 *
 * Footer global del sitio — actualizado para Separación de Intereses.
 * Incluye links a ambas secciones: Tienda y Servicios.
 * Usa <footer>, <nav>, <address> para semántica W3C.
 * Links con <Link> de react-router (SEO-friendly).
 */

import { Link, useLocation } from 'react-router-dom';
import { Cpu, Wrench } from 'lucide-react';

interface FooterProps {
  brandName?: string;
  tagline?: string;
  whatsappNumber?: string;
  email?: string;
  location?: string;
}

export function Footer({
  brandName = 'ALEJ_TECH',
  tagline = 'TECH_SHOP',
  whatsappNumber,
  email,
  location: locationStr,
}: FooterProps) {
  const { pathname } = useLocation();
  const isServicios = pathname.startsWith('/servicios');

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${isServicios ? 'bg-purple-500/10' : 'bg-blue-500/10'} flex items-center justify-center`}>
                {isServicios ? (
                  <Wrench className="w-5 h-5 text-purple-400" aria-hidden="true" />
                ) : (
                  <Cpu className="w-5 h-5 text-blue-400" aria-hidden="true" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{brandName}</h3>
                <p className="text-xs text-slate-400">{tagline}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Tienda de accesorios validados y servicio técnico de reparación de dispositivos móviles.
            </p>
          </div>

          {/* Tienda nav */}
          <nav aria-label="Enlaces de tienda">
            <h4 className="font-semibold text-white mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/tienda" className="hover:text-cyan-400 transition-colors">
                  Inicio Tienda
                </Link>
              </li>
              <li>
                <Link to="/tienda/productos" className="hover:text-cyan-400 transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/tienda/garantia" className="hover:text-cyan-400 transition-colors">
                  Garantía
                </Link>
              </li>
            </ul>
          </nav>

          {/* Servicios nav */}
          <nav aria-label="Enlaces de servicios">
            <h4 className="font-semibold text-white mb-4">Servicio Técnico</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/servicios" className="hover:text-purple-400 transition-colors">
                  Inicio Servicios
                </Link>
              </li>
              <li>
                <Link to="/servicios/reparacion" className="hover:text-purple-400 transition-colors">
                  Reparación Móvil
                </Link>
              </li>
              <li>
                <Link to="/servicios/presupuesto" className="hover:text-purple-400 transition-colors">
                  Solicitar Presupuesto
                </Link>
              </li>
              <li>
                <Link to="/servicios/contacto" className="hover:text-purple-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ubicación y Contacto</h4>
            <address className="not-italic space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5" aria-hidden="true">📍</span>
                <span>
                  Operamos desde <strong className="text-slate-300">Santa Lucía del Tuy</strong>, con entregas personales en{' '}
                  <strong className="text-slate-300">Charallave</strong> y{' '}
                  <strong className="text-slate-300">Santa Teresa</strong>.
                </span>
              </p>
              {whatsappNumber && <p>{whatsappNumber}</p>}
              {email && <p>{email}</p>}
              {locationStr && <p className="text-slate-500 text-xs">{locationStr}</p>}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {brandName}. {tagline}
          </p>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400 shadow-sm"
            title="Ghost Signature - Sello de Validez"
          >
            <span>Sello de Garantía Técnica</span>
            <span className="text-lg drop-shadow-md pb-1 animate-pulse" aria-hidden="true">👻</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

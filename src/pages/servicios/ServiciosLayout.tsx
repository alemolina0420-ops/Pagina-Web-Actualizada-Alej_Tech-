/**
 * ServiciosLayout.tsx
 *
 * Layout wrapper para la sección de Servicios Técnicos.
 * Acento visual: Púrpura/Violet.
 * No necesita ProductsProvider.
 */

import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function ServiciosLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        brandName="ALEJ_TECH"
        tagline="Servicio Técnico"
      />

      <main>
        <Outlet />
      </main>

      <Footer
        brandName="ALEJ_TECH"
        tagline="Servicio Técnico"
      />
    </div>
  );
}

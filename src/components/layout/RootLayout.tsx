/**
 * RootLayout.tsx
 *
 * Shell compartido de la aplicación pública.
 * Provee Navbar + Footer + <Outlet /> para sub-rutas.
 * No incluye ProductsProvider — eso pertenece al TiendaLayout.
 */

import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

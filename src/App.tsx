/**
 * App.tsx
 *
 * Enrutador principal de la aplicación ALEJ_TECH / TecnoStore.
 * Arquitectura de Separación de Intereses (SoC):
 *   - / → Portal de entrada (Home)
 *   - /tienda/* → Tienda Virtual (con ProductsProvider)
 *   - /servicios/* → Servicios Técnicos (reparación móvil)
 *   - /admin/* → Panel de administración (lazy loaded)
 *
 * Rutas admin cargadas con React.lazy (code splitting).
 * Las rutas públicas se cargan normalmente para mejor FCP.
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

// ── Layout ──
import { RootLayout } from '@/components/layout/RootLayout';

// ── Home ──
import { HomePage } from '@/pages/home/HomePage';

// ── Tienda (eager load for fast initial paint) ──
import { TiendaLayout } from '@/pages/tienda/TiendaLayout';
import { TiendaLandingPage } from '@/pages/tienda/TiendaLandingPage';
import { ProductsPage } from '@/pages/tienda/ProductsPage';
import { ProductDetailPage } from '@/pages/tienda/ProductDetailPage';
import { WarrantyPage } from '@/pages/tienda/WarrantyPage';

// ── Servicios (eager load) ──
import { ServiciosLayout } from '@/pages/servicios/ServiciosLayout';
import { ServiciosLandingPage } from '@/pages/servicios/ServiciosLandingPage';
import { ContactoServiciosPage } from '@/pages/servicios/ContactoServiciosPage';

// ── Auth pages ──
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';

// ── Admin pages (lazy loaded — code splitting for performance) ──
const AdminLayout = lazy(() =>
  import('@/pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const DashboardPage = lazy(() =>
  import('@/pages/admin/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const AdminProductsPage = lazy(() =>
  import('@/pages/admin/ProductsPage').then((m) => ({ default: m.ProductsPage })),
);
const CategoriesPage = lazy(() =>
  import('@/pages/admin/CategoriesPage').then((m) => ({ default: m.CategoriesPage })),
);
const SettingsPage = lazy(() =>
  import('@/pages/admin/SettingsPage').then((m) => ({ default: m.SettingsPage })),
);
const DeveloperPage = lazy(() =>
  import('@/pages/admin/DeveloperPage').then((m) => ({ default: m.DeveloperPage })),
);

// ── Context ──
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

/** Fallback de carga para rutas lazy */
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando...</p>
      </div>
    </div>
  );
}

/** Admin Route Guard — requires admin or developer role */
function AdminRouteGuard() {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return <Outlet />;
}

/** Developer Route Guard — requires developer role */
function DeveloperRouteGuard() {
  const { isDeveloper } = useAuth();
  return isDeveloper ? <Outlet /> : <Navigate to="/admin" />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ══════════════════════════════════════════
          HOME — Portal de Entrada con Navbar/Footer
         ══════════════════════════════════════════ */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* ══════════════════════════════════════════
          TIENDA — Tienda Virtual con ProductsProvider
         ══════════════════════════════════════════ */}
      <Route element={<TiendaLayout />}>
        <Route path="/tienda" element={<TiendaLandingPage />} />
        <Route path="/tienda/productos" element={<ProductsPage />} />
        <Route path="/tienda/categoria/:categoryId" element={<ProductsPage />} />
        <Route path="/tienda/producto/:productId" element={<ProductDetailPage />} />
        <Route path="/tienda/garantia" element={<WarrantyPage />} />
      </Route>

      {/* ══════════════════════════════════════════
          SERVICIOS — Servicio Técnico (Reparación)
         ══════════════════════════════════════════ */}
      <Route element={<ServiciosLayout />}>
        <Route path="/servicios" element={<ServiciosLandingPage />} />
        <Route path="/servicios/reparacion" element={<Navigate to="/servicios" replace />} />
        <Route path="/servicios/presupuesto" element={<Navigate to="/servicios" replace />} />
        <Route path="/servicios/contacto" element={<ContactoServiciosPage />} />
      </Route>

      {/* ══════════════════════════════════════════
          LEGACY REDIRECTS — mantiene compatibilidad
         ══════════════════════════════════════════ */}
      <Route path="/productos" element={<Navigate to="/tienda/productos" replace />} />
      <Route path="/categoria/:categoryId" element={<Navigate to="/tienda/productos" replace />} />
      <Route path="/producto/:productId" element={<Navigate to="/tienda" replace />} />
      <Route path="/garantia" element={<Navigate to="/tienda/garantia" replace />} />
      <Route path="/contacto" element={<Navigate to="/servicios/contacto" replace />} />

      {/* ══════════════════════════════════════════
          AUTH ROUTES
         ══════════════════════════════════════════ */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ══════════════════════════════════════════
          ADMIN — Protected + Lazy Loaded
         ══════════════════════════════════════════ */}
      <Route element={<AdminRouteGuard />}>
        <Route
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />

          {/* Developer Only Routes */}
          <Route element={<DeveloperRouteGuard />}>
            <Route path="/admin/developer" element={<DeveloperPage />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

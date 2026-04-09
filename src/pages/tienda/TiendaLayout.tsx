/**
 * TiendaLayout.tsx
 *
 * Layout wrapper para la sección de Tienda Virtual.
 * Provee ProductsProvider y props al Navbar con categorías.
 * Renderiza Navbar + Footer + <Outlet />.
 */

import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductsProvider, useProducts } from '@/contexts/ProductsContext';

function TiendaLayoutContent() {
  const { categories, products, siteConfig } = useProducts();

  const getCategoryProductCount = (categoryId: string) => {
    return products.filter((p) => p.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        categories={categories}
        getCategoryProductCount={getCategoryProductCount}
        brandName={siteConfig.brandName}
        tagline={siteConfig.tagline}
      />

      <main>
        <Outlet />
      </main>

      <Footer
        brandName={siteConfig.brandName}
        tagline={siteConfig.tagline}
        whatsappNumber={siteConfig.whatsappNumber}
        email={siteConfig.email}
        location={siteConfig.location}
      />
    </div>
  );
}

export function TiendaLayout() {
  return (
    <ProductsProvider>
      <TiendaLayoutContent />
    </ProductsProvider>
  );
}

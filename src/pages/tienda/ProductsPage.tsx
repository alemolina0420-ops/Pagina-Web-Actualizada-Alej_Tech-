/**
 * ProductsPage.tsx (Tienda)
 * 
 * Página de catálogo de productos — ahora bajo /tienda/productos.
 * Usa componentes reutilizables: ProductCard, ProductListItem, ProductFilters.
 * ProductsProvider provisto por TiendaLayout.
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SeoHead } from '@/components/shared/SeoHead';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductListItem } from '@/components/products/ProductListItem';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useProducts } from '@/contexts/ProductsContext';
import { buildProductInquiryLink } from '@/utils/whatsapp';

export function ProductsPage() {
  const { categoryId } = useParams();
  const { products, categories, siteConfig } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  // Filter products
  let filteredProducts = products;

  if (categoryId) {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryId);
  }

  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch),
    );
  }

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const pageTitle = currentCategory ? currentCategory.name : 'Todos los Productos';
  const pageDescription = currentCategory
    ? currentCategory.description
    : `Catálogo completo de productos validados por ${siteConfig.technicianTitle}`;

  /** Handler centralizado para compra por WhatsApp */
  const handleBuyClick = (e: React.MouseEvent, product: { name: string }) => {
    e.stopPropagation();
    window.open(
      buildProductInquiryLink(product.name, siteConfig.whatsappNumber),
      '_blank',
    );
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={categoryId ? `/tienda/categoria/${categoryId}` : '/tienda/productos'}
      />

      <div className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{pageTitle}</h1>
            <p className="text-slate-400">{pageDescription}</p>
          </header>

          {/* Filters */}
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            categories={categories}
            activeCategoryId={categoryId}
          />

          {/* Product grid/list */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) =>
                viewMode === 'grid' ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuyClick={handleBuyClick}
                  />
                ) : (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    onBuyClick={handleBuyClick}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="text-center py-16" role="status">
              <p className="text-slate-400">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

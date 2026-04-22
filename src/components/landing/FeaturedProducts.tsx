/**
 * FeaturedProducts.tsx
 * 
 * Grid de productos destacados para la landing page.
 * Usa ProductCard internamente (pendiente de crear, usa inline por ahora).
 */

import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductsContext';
import { buildProductInquiryLink } from '@/utils/whatsapp';

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { products, siteConfig } = useProducts();

  const featuredProducts = products.filter((p) => p.isBestseller || p.isNew).slice(0, 4);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-900" aria-labelledby="featured-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 id="featured-title" className="text-3xl font-bold text-white mb-2">
              Productos Destacados
            </h2>
            <p className="text-slate-400">Los más solicitados por nuestros clientes</p>
          </div>
          <Button
            onClick={() => navigate('/tienda/productos')}
            variant="outline"
            className="hidden sm:flex border-slate-700 text-slate-300"
            aria-label="Ver todos los productos disponibles"
          >
            Ver todos
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => navigate(`/tienda/producto/${product.id}`)}
              className="group cursor-pointer rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all"
              role="link"
              tabIndex={0}
              aria-label={`Ver detalles de ${product.name}`}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/tienda/producto/${product.id}`)}
            >
              <div className="aspect-square bg-slate-700 relative overflow-hidden">
                <img
                  src={product.images?.[0] || '/placeholder-product.jpg'}
                  alt={`${product.name} — ${product.shortDescription || 'Accesorio de calidad'}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                  decoding="async"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-emerald-500 text-white shadow-md">
                    Nuevo
                  </span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-amber-500 text-white shadow-md">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col min-h-[140px] justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-lg font-bold text-amber-400">${product.price}</p>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium mt-2 shadow-lg shadow-emerald-900/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(buildProductInquiryLink(product.name, siteConfig.whatsappNumber), '_blank');
                  }}
                  aria-label={`Comprar ${product.name} por WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Comprar por WhatsApp
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

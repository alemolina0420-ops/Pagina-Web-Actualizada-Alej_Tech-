/**
 * ProductDetailPage.tsx (Tienda)
 * 
 * Página de detalle de producto — ahora bajo /tienda/producto/:id.
 * Usa ProductImageGallery y WhatsAppButton.
 * ProductsProvider provisto por TiendaLayout.
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Package, Shield, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeoHead } from '@/components/shared/SeoHead';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { useProducts } from '@/contexts/ProductsContext';
import { buildProductInquiryLink } from '@/utils/whatsapp';

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, categories, siteConfig, getProductById } = useProducts();

  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" role="alert">
        <div className="text-center">
          <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-white mb-2">Producto no encontrado</h1>
          <p className="text-slate-400 mb-6">El producto que buscas no existe o ha sido eliminado</p>
          <button
            onClick={() => navigate('/tienda/productos')}
            className="btn-primary"
            aria-label="Ir al catálogo de productos"
          >
            Ver todos los productos
          </button>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const whatsappLink = buildProductInquiryLink(product.name, siteConfig.whatsappNumber);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <SeoHead
        title={product.name}
        description={product.description}
        ogImage={product.images?.[0]}
        canonicalPath={`/tienda/producto/${product.id}`}
      />

      <div className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            aria-label="Volver a la página anterior"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <ProductImageGallery
              images={product.images || []}
              productName={product.name}
              isNew={product.isNew}
              isBestseller={product.isBestseller}
              inStock={product.inStock}
            />

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {category && <p className="text-sm text-slate-400 mb-2">{category.name}</p>}
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{product.name}</h1>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-amber-400">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="space-y-3">
                  <h2 className="font-semibold text-white">Características</h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs */}
              {product.specs.length > 0 && (
                <div className="space-y-3">
                  <h2 className="font-semibold text-white">Especificaciones Técnicas</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">{spec.label}</p>
                        <p className="text-sm font-medium text-white">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warranty */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  <span className="font-semibold text-emerald-400">
                    Garantía de {siteConfig.warrantyDays} días
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  Respaldada por {siteConfig.technicianTitle} en {siteConfig.location}
                </p>
              </div>

              {/* Buy CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium inline-flex items-center justify-center py-4 rounded-xl gap-3 text-lg transition-colors shadow-lg shadow-emerald-900/20"
                  aria-label={`Comprar ${product.name} por WhatsApp`}
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Comprar por WhatsApp
                </a>
              </div>

              {/* Delivery zones */}
              <div className="pt-6 border-t border-slate-800">
                <p className="text-sm text-slate-400 mb-3">Zonas de entrega disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.deliveryZones.map((zone, index) => (
                    <span key={index} className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20" aria-labelledby="related-title">
              <h2 id="related-title" className="text-2xl font-bold text-white mb-8">
                Productos Relacionados
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <article
                    key={relatedProduct.id}
                    onClick={() => navigate(`/tienda/producto/${relatedProduct.id}`)}
                    className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all"
                    role="link"
                    tabIndex={0}
                    aria-label={`Ver ${relatedProduct.name}`}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/tienda/producto/${relatedProduct.id}`)}
                  >
                    <div className="aspect-square bg-slate-800 relative overflow-hidden">
                      <img
                        src={relatedProduct.images?.[0] || '/placeholder-product.jpg'}
                        alt={`${relatedProduct.name} — producto relacionado`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-semibold text-white mb-1 line-clamp-1">{relatedProduct.name}</h3>
                        <p className="text-lg font-bold text-amber-400 mb-2">${relatedProduct.price}</p>
                      </div>
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/20"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          window.open(
                            buildProductInquiryLink(relatedProduct.name, siteConfig.whatsappNumber),
                            '_blank',
                          );
                        }}
                        aria-label={`Comprar ${relatedProduct.name} por WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                        Comprar
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

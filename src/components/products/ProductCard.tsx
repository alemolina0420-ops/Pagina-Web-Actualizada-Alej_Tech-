/**
 * ProductCard.tsx
 * 
 * Card de producto individual (vista grid).
 * Principio SRP: renderiza UN producto en formato card.
 * Accesibilidad: alt descriptivo, aria-labels, keyboard nav.
 */

import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  /** Callback para el botón de compra por WhatsApp */
  onBuyClick: (e: React.MouseEvent, product: Product) => void;
}

export function ProductCard({ product, onBuyClick }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/tienda/producto/${product.id}`)}
      className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all"
      role="link"
      tabIndex={0}
      aria-label={`Ver detalles de ${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/tienda/producto/${product.id}`)}
    >
      <div className="aspect-square bg-slate-800 relative overflow-hidden">
        <img
          src={product.images?.[0] || '/placeholder-product.jpg'}
          alt={`${product.name} — ${product.shortDescription || 'Accesorio validado'}`}
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

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-white mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{product.shortDescription}</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-lg font-bold text-amber-400">${product.price}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-slate-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.inStock
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {product.inStock ? 'En stock' : 'Agotado'}
            </span>
          </div>
        </div>
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/20"
          onClick={(e) => onBuyClick(e, product)}
          aria-label={`Comprar ${product.name} por WhatsApp`}
        >
          <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
          Comprar por WhatsApp
        </Button>
      </div>
    </article>
  );
}

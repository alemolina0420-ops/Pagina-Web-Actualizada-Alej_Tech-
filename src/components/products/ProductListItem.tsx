/**
 * ProductListItem.tsx
 * 
 * Card de producto en formato lista horizontal.
 * Principio SRP: renderiza UN producto en formato lista.
 */

import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

interface ProductListItemProps {
  product: Product;
  /** Callback para el botón de compra por WhatsApp */
  onBuyClick: (e: React.MouseEvent, product: Product) => void;
}

export function ProductListItem({ product, onBuyClick }: ProductListItemProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/tienda/producto/${product.id}`)}
      className="group cursor-pointer flex gap-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all"
      role="link"
      tabIndex={0}
      aria-label={`Ver detalles de ${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/tienda/producto/${product.id}`)}
    >
      <div className="w-32 h-32 flex-shrink-0 rounded-xl bg-slate-800 overflow-hidden">
        <img
          src={product.images?.[0] || '/placeholder-product.jpg'}
          alt={`${product.name} — ${product.shortDescription || 'Accesorio validado'}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white mb-1">{product.name}</h3>
            <p className="text-sm text-slate-400 mb-2">{product.shortDescription}</p>
            <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
          </div>
          <div className="text-right ml-4">
            <span className="text-xl font-bold text-amber-400">${product.price}</span>
            {product.originalPrice && (
              <p className="text-sm text-slate-500 line-through">${product.originalPrice}</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-default">
          <div className="flex items-center gap-2">
            {product.isNew && (
              <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400">
                Nuevo
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400">
                Popular
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.inStock
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {product.inStock ? 'En stock' : 'Agotado'}
            </span>
          </div>
          <Button
            size="sm"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/20"
            onClick={(e) => onBuyClick(e, product)}
            aria-label={`Comprar ${product.name} por WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            Comprar
          </Button>
        </div>
      </div>
    </article>
  );
}

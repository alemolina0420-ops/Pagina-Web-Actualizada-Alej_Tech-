/**
 * ProductImageGallery.tsx
 * 
 * Galería de imágenes de producto con thumbnails y navegación.
 * Principio SRP: solo maneja la visualización de imágenes.
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock?: boolean;
}

export function ProductImageGallery({
  images,
  productName,
  isNew,
  isBestseller,
  inStock = true,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative">
        <img
          src={images[currentImageIndex] || '/placeholder-product.jpg'}
          alt={`${productName} — imagen ${currentImageIndex + 1} de ${images.length || 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center disabled:opacity-30 hover:bg-slate-900 transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={handleNextImage}
              disabled={currentImageIndex === images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center disabled:opacity-30 hover:bg-slate-900 transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 text-white text-sm" aria-live="polite">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Miniaturas de imágenes">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                index === currentImageIndex ? 'border-blue-400' : 'border-slate-800'
              }`}
              aria-label={`Ver imagen ${index + 1} de ${productName}`}
              aria-current={index === currentImageIndex ? 'true' : undefined}
            >
              <img
                src={img}
                alt={`${productName} — miniatura ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        {isNew && (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            Nuevo
          </Badge>
        )}
        {isBestseller && (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
            Popular
          </Badge>
        )}
        <Badge
          className={
            inStock
              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
              : 'bg-red-500/10 text-red-400 border-red-500/30'
          }
        >
          {inStock ? 'En stock' : 'Agotado'}
        </Badge>
        {images.length > 1 && (
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 flex items-center gap-1">
            <ImageIcon className="w-3 h-3" aria-hidden="true" />
            {images.length} fotos
          </Badge>
        )}
      </div>
    </div>
  );
}

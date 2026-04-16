/**
 * ProductFilters.tsx
 * 
 * Barra de filtros de productos (búsqueda, orden, vista, categorías).
 * Principio SRP: solo maneja la UI de filtrado, delega estado al padre.
 */

import { useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/types';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  categories: Category[];
  activeCategoryId?: string;
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  categories,
  activeCategoryId,
}: ProductFiltersProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 mb-8">
      {/* Search and sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
            aria-label="Buscar productos por nombre o descripción"
          />
        </div>

        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger
              className="w-full sm:w-40 bg-slate-800 border-slate-700 text-white"
              aria-label="Ordenar productos"
            >
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-slate-800 rounded-lg p-1 flex-shrink-0" role="group" aria-label="Modo de visualización">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
              aria-label="Vista de cuadrícula"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid3X3 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
              aria-label="Vista de lista"
              aria-pressed={viewMode === 'list'}
            >
              <List className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        <Button
          variant={!activeCategoryId ? 'default' : 'outline'}
          onClick={() => navigate('/tienda/productos')}
          className={!activeCategoryId ? 'btn-primary' : 'border-slate-700 text-slate-300'}
          size="sm"
          aria-pressed={!activeCategoryId}
        >
          Todos
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategoryId === cat.id ? 'default' : 'outline'}
            onClick={() => navigate(`/tienda/categoria/${cat.id}`)}
            className={
              activeCategoryId === cat.id ? 'btn-primary' : 'border-slate-700 text-slate-300'
            }
            size="sm"
            aria-pressed={activeCategoryId === cat.id}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

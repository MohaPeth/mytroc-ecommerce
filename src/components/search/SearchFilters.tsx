
import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  categoryFilter: string | null;
  onCategoryFilterChange: (category: string | null) => void;
  minPrice: number | null;
  onMinPriceChange: (price: number | null) => void;
  maxPrice: number | null;
  onMaxPriceChange: (price: number | null) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  onReset: () => void;
  categories?: Array<{ id: string; name: string }>;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  categoryFilter,
  onCategoryFilterChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onReset,
  categories = []
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleReset = () => {
    onReset();
    setIsOpen(false);
  };

  const hasActiveFilters = categoryFilter || minPrice || maxPrice || searchTerm;

  return (
    <div className="space-y-4">
      {/* Barre de recherche principale */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des produits..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-10 pr-12"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={() => onSearchTermChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filtres avancés */}
      <div className="flex items-center justify-between">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtres avancés
              {hasActiveFilters && (
                <span className="ml-1 bg-mytroc-primary text-white text-xs rounded-full px-2 py-0.5">
                  Actifs
                </span>
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card">
              {/* Catégorie */}
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={categoryFilter || 'all'} onValueChange={(value) => 
                  onCategoryFilterChange(value === 'all' ? null : value)
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prix minimum */}
              <div className="space-y-2">
                <Label>Prix minimum (€)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minPrice || ''}
                  onChange={(e) => onMinPriceChange(
                    e.target.value ? Number(e.target.value) : null
                  )}
                />
              </div>

              {/* Prix maximum */}
              <div className="space-y-2">
                <Label>Prix maximum (€)</Label>
                <Input
                  type="number"
                  placeholder="Aucune limite"
                  value={maxPrice || ''}
                  onChange={(e) => onMaxPriceChange(
                    e.target.value ? Number(e.target.value) : null
                  )}
                />
              </div>

              {/* Tri */}
              <div className="space-y-2">
                <Label>Trier par</Label>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={onSortByChange}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Date</SelectItem>
                      <SelectItem value="price">Prix</SelectItem>
                      <SelectItem value="name">Nom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortOrder} onValueChange={onSortOrderChange}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DESC">↓</SelectItem>
                      <SelectItem value="ASC">↑</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="md:col-span-2 lg:col-span-4 flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={handleReset}>
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Tri rapide */}
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground">Trier :</Label>
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
            const [field, order] = value.split('-');
            onSortByChange(field);
            onSortOrderChange(order);
          }}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-DESC">Plus récents</SelectItem>
              <SelectItem value="price-ASC">Prix croissant</SelectItem>
              <SelectItem value="price-DESC">Prix décroissant</SelectItem>
              <SelectItem value="name-ASC">Nom A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

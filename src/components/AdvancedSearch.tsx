import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface SearchFilters {
  productSearch: string;
  ingredientSearch: string;
  searchType: 'product' | 'ingredient';
}

interface SearchResults {
  totalProducts: number;
  totalRecipes: number;
  totalIngredients?: number;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  results?: SearchResults;
}

export const AdvancedSearch = ({ onSearch, onClear, results }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    productSearch: "",
    ingredientSearch: "",
    searchType: 'product'
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      productSearch: "",
      ingredientSearch: "",
      searchType: 'product'
    });
    onClear();
  };

  const hasActiveSearch = filters.productSearch.trim() || filters.ingredientSearch.trim();

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Search Type Selector */}
        <div className="flex items-center gap-4">
          <Label className="text-sm font-medium">Search Type:</Label>
          <Select 
            value={filters.searchType} 
            onValueChange={(value: 'product' | 'ingredient') => 
              setFilters(prev => ({ ...prev, searchType: value }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product">Product Search</SelectItem>
              <SelectItem value="ingredient">Ingredient Search</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Search */}
        {filters.searchType === 'product' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-search">Product Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="product-search"
                    placeholder="Enter Menu Code or Product Description (e.g., 'Farmhouse', 'PIZ0119')"
                    className="pl-10"
                    value={filters.productSearch}
                    onChange={(e) => setFilters(prev => ({ ...prev, productSearch: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Search for products by name or menu code to see all variants
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="variant-search">Variant Search (Optional)</Label>
                <Input
                  id="variant-search"
                  placeholder="Size Code or Size Description (e.g., 'HT07', 'Reg HT')"
                  value={filters.ingredientSearch}
                  onChange={(e) => setFilters(prev => ({ ...prev, ingredientSearch: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <p className="text-xs text-muted-foreground">
                  Combine with product search to find specific variants
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ingredient Search */}
        {filters.searchType === 'ingredient' && (
          <div className="space-y-2">
            <Label htmlFor="ingredient-search">Ingredient Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="ingredient-search"
                placeholder="Enter Ingredient name or Inventory Code (e.g., 'Mozzarella', '10000721')"
                className="pl-10"
                value={filters.ingredientSearch}
                onChange={(e) => setFilters(prev => ({ ...prev, ingredientSearch: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Find all recipes that contain this ingredient
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSearch} className="gap-2">
            <Search className="w-4 h-4" />
            Search Recipes
          </Button>
          {hasActiveSearch && (
            <Button variant="outline" onClick={handleClear} className="gap-2">
              <X className="w-4 h-4" />
              Clear Search
            </Button>
          )}
        </div>

        {/* Search Results Summary */}
        {results && hasActiveSearch && (
          <div className="flex items-center gap-3 pt-2 border-t">
            <span className="text-sm font-medium">Results:</span>
            {filters.searchType === 'product' ? (
              <>
                <Badge variant="secondary" className="gap-1">
                  <span className="font-bold">{results.totalProducts}</span>
                  <span>Products Found</span>
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <span className="font-bold">{results.totalRecipes}</span>
                  <span>Recipes Found</span>
                </Badge>
              </>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <span className="font-bold">{results.totalRecipes}</span>
                <span>Recipes with this ingredient</span>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
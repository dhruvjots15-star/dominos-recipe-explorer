import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Filter } from "lucide-react";
import { VersionSelector } from "./VersionSelector";
import { FilterPanel, ActiveFilters } from "./FilterPanel";
import { AdvancedSearch } from "./AdvancedSearch";
import { ProductRecipeTable } from "./ProductRecipeTable";
import { mockRecipeData, RecipeItem, searchRecipes } from "@/data/recipeData";


export const RecipeMaster = () => {
  const [selectedVersion, setSelectedVersion] = useState("v5.2");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [searchResults, setSearchResults] = useState<RecipeItem[]>(mockRecipeData);
  const [hasSearched, setHasSearched] = useState(false);
  const [view, setView] = useState<'products' | 'recipes'>('products');
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleSearch = (filters: { productSearch: string; ingredientSearch: string; searchType: 'product' | 'ingredient' }) => {
    let results = mockRecipeData;
    
    if (filters.searchType === 'product') {
      if (filters.productSearch.trim()) {
        results = searchRecipes(results, filters.productSearch, 'product');
      }
      if (filters.ingredientSearch.trim()) {
        // Filter by size code/description as well
        results = results.filter(item =>
          item.sizeCode.toLowerCase().includes(filters.ingredientSearch.toLowerCase()) ||
          item.sizeDescription.toLowerCase().includes(filters.ingredientSearch.toLowerCase())
        );
      }
    } else {
      if (filters.ingredientSearch.trim()) {
        results = searchRecipes(results, filters.ingredientSearch, 'ingredient');
      }
    }
    
    // Apply active filters
    results = applyFilters(results, activeFilters);
    
    setSearchResults(results);
    setHasSearched(true);
    setView('products');
  };

  const handleClearSearch = () => {
    setSearchResults(mockRecipeData);
    setHasSearched(false);
    setView('products');
  };

  const applyFilters = (data: RecipeItem[], filters: ActiveFilters): RecipeItem[] => {
    let filtered = [...data];
    
    if (filters.category) {
      filtered = filtered.filter(item => item.menuCategoryCode === filters.category);
    }
    
    if (filters.sizeCode) {
      filtered = filtered.filter(item => item.sizeCode === filters.sizeCode);
    }
    
    if (filters.sizeDescription) {
      filtered = filtered.filter(item => item.sizeDescription === filters.sizeDescription);
    }
    
    if (filters.type) {
      const isVegFilter = filters.type === 'VG';
      filtered = filtered.filter(item => {
        const isVeg = item.description.includes('VG') || !item.description.includes('NV');
        return isVegFilter ? isVeg : !isVeg;
      });
    }
    
    return filtered;
  };

  const handleFiltersChange = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    const filteredData = applyFilters(mockRecipeData, filters);
    setSearchResults(filteredData);
  };

  const getSearchResultsStats = () => {
    const uniqueProducts = new Set(searchResults.map(item => item.description)).size;
    return {
      totalProducts: uniqueProducts,
      totalRecipes: searchResults.length
    };
  };

  const handleViewRecipe = (menuCode: string, sizeCode: string) => {
    console.log(`View recipe: ${menuCode} - ${sizeCode}`);
    // TODO: Implement recipe detail view
  };

  const handleEditRecipe = (menuCode: string, sizeCode: string) => {
    console.log(`Edit recipe: ${menuCode} - ${sizeCode}`);
    // TODO: Implement recipe edit functionality
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Recipe Master</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all active product recipes across Dominos stores
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Version Selector */}
      <VersionSelector 
        selectedVersion={selectedVersion}
        onVersionChange={setSelectedVersion}
      />

      {/* Advanced Search */}
      <AdvancedSearch 
        onSearch={handleSearch}
        onClear={handleClearSearch}
        results={hasSearched ? getSearchResultsStats() : undefined}
      />

      {/* Filter Panel */}
      <div className="flex items-center gap-4">
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
          {Object.keys(activeFilters).length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {Object.keys(activeFilters).length}
            </Badge>
          )}
        </Button>
      </div>

      <FilterPanel 
        isVisible={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={handleFiltersChange}
        activeFilters={activeFilters}
      />

      {/* Recipe Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{searchResults.length}</div>
            <p className="text-xs text-muted-foreground">Total Recipes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">
              {new Set(searchResults.map(item => item.description)).size}
            </div>
            <p className="text-xs text-muted-foreground">Active Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-dominos-blue">
              {new Set(searchResults.map(item => item.sizeCode)).size}
            </div>
            <p className="text-xs text-muted-foreground">Size Variants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">
              {new Set(searchResults.map(item => item.menuCode)).size}
            </div>
            <p className="text-xs text-muted-foreground">Menu Codes</p>
          </CardContent>
        </Card>
      </div>

      {/* Product/Recipe Table */}
      <ProductRecipeTable 
        data={searchResults}
        searchTerm=""
        view={view}
        onViewChange={setView}
        selectedProduct={selectedProduct}
        onProductSelect={setSelectedProduct}
        onViewRecipe={handleViewRecipe}
        onEditRecipe={handleEditRecipe}
      />
    </div>
  );
};
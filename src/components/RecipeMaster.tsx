import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, RefreshCw, Filter, Package, FileText, Utensils, Building2, Search, GitCompare, Edit, ChevronDown } from "lucide-react";
import { VersionSelector } from "./VersionSelector";
import { FilterPanel, ActiveFilters } from "./FilterPanel";
import { AdvancedSearch } from "./AdvancedSearch";
import { RecipeView } from "./RecipeView";
import { RecipeTable } from "./RecipeTable";
import { DatabaseFilters } from "./DatabaseFilters";
import { VersionComparison } from "./VersionComparison";
import { ExtendVersionForm } from "./ExtendVersionForm";
import { RollbackVersionForm } from "./RollbackVersionForm";
import { RequestsTable } from "./RequestsTable";
import type { DatabaseFilters as DatabaseFiltersType } from "./DatabaseFilters";
import { mockRecipeData, RecipeItem, searchRecipes } from "@/data/recipeData";
import { useToast } from "@/hooks/use-toast";


export const RecipeMaster = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedVersion, setSelectedVersion] = useState("v1.0");
  const [showLegacyFilters, setShowLegacyFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [databaseFilters, setDatabaseFilters] = useState<DatabaseFiltersType>({});
  const [searchResults, setSearchResults] = useState<RecipeItem[]>(mockRecipeData);
  const [filteredResults, setFilteredResults] = useState<RecipeItem[]>(mockRecipeData);
  const [hasSearched, setHasSearched] = useState(false);
  const [view, setView] = useState<'table' | 'recipe'>('table');
  const [selectedRecipe, setSelectedRecipe] = useState<{ menuCode: string; sizeCode: string } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showVersionComparison, setShowVersionComparison] = useState(false);
  const [showExtendForm, setShowExtendForm] = useState(false);
  const [showRollbackForm, setShowRollbackForm] = useState(false);

  const handleSearch = (filters: { 
    productSearch: string; 
    ingredientSearch: string; 
    searchType: 'product' | 'ingredient';
  }) => {
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
    
    // Apply database filters
    results = applyDatabaseFilters(results, databaseFilters);
    
    setSearchResults(results);
    setFilteredResults(results);
    setHasSearched(true);
    setView('table');
  };

  const handleClearSearch = () => {
    const filtered = applyDatabaseFilters(mockRecipeData, databaseFilters);
    setSearchResults(mockRecipeData);
    setFilteredResults(filtered);
    setHasSearched(false);
    setView('table');
  };

  const applyDatabaseFilters = (data: RecipeItem[], filters: DatabaseFiltersType): RecipeItem[] => {
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

  const handleDatabaseFiltersChange = (filters: DatabaseFiltersType) => {
    setDatabaseFilters(filters);
    const baseData = hasSearched ? searchResults : mockRecipeData;
    const filteredData = applyDatabaseFilters(baseData, filters);
    setFilteredResults(filteredData);
  };

  const handleClearDatabaseFilters = () => {
    setDatabaseFilters({});
    const baseData = hasSearched ? searchResults : mockRecipeData;
    setFilteredResults(baseData);
  };

  const getSearchResultsStats = () => {
    const uniqueProducts = new Set(searchResults.map(item => item.description)).size;
    return {
      totalProducts: uniqueProducts,
      totalRecipes: searchResults.length
    };
  };

  const getFilteredResultsStats = () => {
    const uniqueProducts = new Set(filteredResults.map(item => item.description)).size;
    return {
      totalProducts: uniqueProducts,
      totalRecipes: filteredResults.length
    };
  };

  const handleViewRecipe = (menuCode: string, sizeCode: string) => {
    setSelectedRecipe({ menuCode, sizeCode });
    setView('recipe');
  };

  const handleEditRecipe = (menuCode: string, sizeCode: string) => {
    console.log(`Edit recipe: ${menuCode} - ${sizeCode}`);
    // TODO: Implement recipe edit functionality
  };

  const handleBackToTable = () => {
    setView('table');
    setSelectedRecipe(null);
  };

  const handleRequestSubmitted = (requestId: string) => {
    setShowExtendForm(false);
    setShowRollbackForm(false);
    // Navigate to the new route instead of showing inline
    navigate(`/recipe-request/${requestId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-8">
        {/* SECTION 1: RECIPE BANK VERSION & INFO */}
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                Recipe Bank Version
              </h1>
              <p className="text-muted-foreground mt-1">
                Select a recipe bank version to view its snapshot and manage recipes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowVersionComparison(true)}>
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowExtendForm(true)}>
                    Extend Recipe version to more stores
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowRollbackForm(true)}>
                    Rollback Recipe Version
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Version Selector */}
          <VersionSelector 
            key={selectedVersion}
            selectedVersion={selectedVersion}
            onVersionChange={setSelectedVersion}
          />

          {/* Recipe Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover-scale group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Total Products</p>
                        <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">687</div>
                      </div>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Active across all channels</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 hover-scale group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors">
                        <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Total Recipes</p>
                        <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">4,811</div>
                      </div>
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">For all product variants</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 hover-scale group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-500/20 rounded-xl group-hover:bg-orange-500/30 transition-colors">
                        <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide">Unique Ingredients</p>
                        <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">1,553</div>
                      </div>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Across all Recipes in this Version</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 hover-scale group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                        <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Stores</p>
                        <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">1,876</div>
                      </div>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Stores using this Version</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests Section */}
          <RequestsTable />
        </div>

        {/* SECTION 2: SEARCH/FILTERS & RECIPE DATABASE */}
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-950/30 dark:to-gray-950/30 rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">Search & Browse Recipes</h2>
                <p className="text-muted-foreground">Find specific recipes using product or ingredient search</p>
              </div>
            </div>

            <AdvancedSearch 
              onSearch={handleSearch}
              onClear={handleClearSearch}
              results={hasSearched ? getSearchResultsStats() : undefined}
            />
          </div>

          {/* Recipe Database */}
          {view === 'table' ? (
            <div className="space-y-4">
              {/* Database Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Recipe Database</h2>
                  <p className="text-muted-foreground">
                    {hasSearched 
                      ? `${getFilteredResultsStats().totalProducts} Products, ${getFilteredResultsStats().totalRecipes} Recipes Found`
                      : "687 Products, 4,811 Recipes"
                    }
                  </p>
                </div>
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                  size="sm"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {Object.values(databaseFilters).filter(v => v && v !== "all").length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {Object.values(databaseFilters).filter(v => v && v !== "all").length}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <DatabaseFilters
                  filters={databaseFilters}
                  onFiltersChange={handleDatabaseFiltersChange}
                  onClearFilters={handleClearDatabaseFilters}
                  resultStats={getFilteredResultsStats()}
                />
              )}

              {/* Recipe Table */}
              <RecipeTable 
                data={filteredResults}
                onViewRecipe={handleViewRecipe}
                onEditRecipe={handleEditRecipe}
              />
            </div>
          ) : (
            <RecipeView 
              menuCode={selectedRecipe?.menuCode || ""}
              sizeCode={selectedRecipe?.sizeCode || ""}
              onBack={handleBackToTable}
            />
          )}
        </div>
      </div>

      {/* Version Comparison Modal */}
      <VersionComparison
        isOpen={showVersionComparison}
        onClose={() => setShowVersionComparison(false)}
        currentVersion={selectedVersion}
      />

      {/* Extend Version Form */}
      <ExtendVersionForm
        isOpen={showExtendForm}
        onClose={() => setShowExtendForm(false)}
        selectedVersion={selectedVersion}
        onRequestSubmitted={handleRequestSubmitted}
      />

      {/* Rollback Version Form */}
      <RollbackVersionForm
        isOpen={showRollbackForm}
        onClose={() => setShowRollbackForm(false)}
        selectedVersion={selectedVersion}
        onRequestSubmitted={handleRequestSubmitted}
      />

    </div>
  );
};
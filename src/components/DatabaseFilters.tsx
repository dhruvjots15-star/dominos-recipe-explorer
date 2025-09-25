import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { mockRecipeData } from "@/data/recipeData";

export interface DatabaseFilters {
  category?: string;
  sizeCode?: string;
  sizeDescription?: string;
  type?: string;
}

interface DatabaseFiltersProps {
  filters: DatabaseFilters;
  onFiltersChange: (filters: DatabaseFilters) => void;
  onClearFilters: () => void;
  resultStats: {
    totalProducts: number;
    totalRecipes: number;
  };
}

export const DatabaseFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  resultStats 
}: DatabaseFiltersProps) => {
  // Extract unique values from data
  const categories = [...new Set(mockRecipeData.map(item => item.menuCategoryCode))].filter(Boolean).sort();
  const sizeCodes = [...new Set(mockRecipeData.map(item => item.sizeCode))].filter(Boolean).sort();
  const sizeDescriptions = [...new Set(mockRecipeData.map(item => item.sizeDescription))].filter(Boolean).sort();

  const hasActiveFilters = filters.category && filters.category !== "all" ||
    filters.sizeCode && filters.sizeCode !== "all" ||
    filters.sizeDescription && filters.sizeDescription !== "all" ||
    filters.type && filters.type !== "all";

  const updateFilter = (key: keyof DatabaseFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === "all" ? undefined : value
    });
  };

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Recipe Database Filters</Label>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {Object.values(filters).filter(v => v && v !== "all").length} active
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="gap-2">
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select 
            value={filters.category || "all"} 
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Size Code</Label>
          <Select 
            value={filters.sizeCode || "all"} 
            onValueChange={(value) => updateFilter('sizeCode', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {sizeCodes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Size Description</Label>
          <Select 
            value={filters.sizeDescription || "all"} 
            onValueChange={(value) => updateFilter('sizeDescription', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Descriptions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Descriptions</SelectItem>
              {sizeDescriptions.map((desc) => (
                <SelectItem key={desc} value={desc}>{desc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Type</Label>
          <Select 
            value={filters.type || "all"} 
            onValueChange={(value) => updateFilter('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="VG">Vegetarian</SelectItem>
              <SelectItem value="NV">Non-Vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result Stats */}
      <div className="flex items-center gap-4 pt-2 border-t">
        <span className="text-sm font-medium text-muted-foreground">Current View:</span>
        <Badge variant="outline" className="gap-1">
          <span className="font-bold text-blue-600">{resultStats.totalProducts}</span>
          <span>Products</span>
        </Badge>
        <Badge variant="outline" className="gap-1">
          <span className="font-bold text-emerald-600">{resultStats.totalRecipes}</span>
          <span>Recipes</span>
        </Badge>
      </div>
    </div>
  );
};
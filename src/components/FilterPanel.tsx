import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X, Filter } from "lucide-react";
import { filterOptions } from "@/data/recipeData";

export interface ActiveFilters {
  category?: string;
  sizeCode?: string;
  sizeDescription?: string;
  type?: string;
}

interface FilterPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onFiltersChange: (filters: ActiveFilters) => void;
  activeFilters: ActiveFilters;
}

export const FilterPanel = ({ isVisible, onClose, onFiltersChange, activeFilters }: FilterPanelProps) => {
  const handleFilterChange = (filterType: keyof ActiveFilters, value: string | undefined) => {
    const newFilters = { ...activeFilters };
    if (value) {
      newFilters[filterType] = value;
    } else {
      delete newFilters[filterType];
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const removeFilter = (filterType: keyof ActiveFilters) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterType];
    onFiltersChange(newFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;
  const getFilterLabel = (filterType: keyof ActiveFilters, value: string) => {
    switch (filterType) {
      case 'category':
        return filterOptions.categories.find(cat => cat.value === value)?.label || value;
      case 'sizeCode':
        return filterOptions.sizeCodes.find(size => size.value === value)?.label || value;
      case 'sizeDescription':
        return filterOptions.sizeDescriptions.find(size => size.value === value)?.label || value;
      case 'type':
        return filterOptions.types.find(type => type.value === value)?.label || value;
      default:
        return value;
    }
  };

  if (!isVisible) return null;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
            {activeFilterCount > 0 && (
              <Badge variant="secondary">{activeFilterCount} active</Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Category</Label>
          <Select 
            value={activeFilters.category || ""} 
            onValueChange={(value) => handleFilterChange('category', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {filterOptions.categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size Codes */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Size Code</Label>
          <Select 
            value={activeFilters.sizeCode || ""} 
            onValueChange={(value) => handleFilterChange('sizeCode', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size code..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Size Codes</SelectItem>
              {filterOptions.sizeCodes.map(size => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size Description */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Size Description</Label>
          <Select 
            value={activeFilters.sizeDescription || ""} 
            onValueChange={(value) => handleFilterChange('sizeDescription', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size description..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Size Descriptions</SelectItem>
              {filterOptions.sizeDescriptions.map(size => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Type</Label>
          <Select 
            value={activeFilters.type || ""} 
            onValueChange={(value) => handleFilterChange('type', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {filterOptions.types.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([filterType, value]) => (
                <Badge key={filterType} variant="secondary" className="gap-1">
                  {getFilterLabel(filterType as keyof ActiveFilters, value)}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeFilter(filterType as keyof ActiveFilters)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={clearAllFilters}
            disabled={activeFilterCount === 0}
          >
            Clear All
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
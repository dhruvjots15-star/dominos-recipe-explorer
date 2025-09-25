import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, ArrowLeft, ChevronRight } from "lucide-react";
import { RecipeItem, getIngredientCount, getCategoryName } from "@/data/recipeData";

interface ProductSummary {
  description: string;
  menuCodes: string[];
  totalRecipes: number;
  category: string;
  isVeg: boolean;
  sizeCodes: string[];
  sizeDescriptions: string[];
}

interface ProductRecipeTableProps {
  data: RecipeItem[];
  searchTerm: string;
  view: 'products' | 'recipes';
  onViewChange: (view: 'products' | 'recipes') => void;
  selectedProduct?: string;
  onProductSelect: (productDescription: string) => void;
  onViewRecipe: (menuCode: string, sizeCode: string) => void;
  onEditRecipe: (menuCode: string, sizeCode: string) => void;
}

export const ProductRecipeTable = ({ 
  data, 
  searchTerm, 
  view, 
  onViewChange, 
  selectedProduct,
  onProductSelect,
  onViewRecipe,
  onEditRecipe 
}: ProductRecipeTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get unique products
  const getProductSummaries = (): ProductSummary[] => {
    const productMap = new Map<string, ProductSummary>();
    
    data.forEach(item => {
      const key = item.description;
      if (!productMap.has(key)) {
        productMap.set(key, {
          description: item.description,
          menuCodes: [],
          totalRecipes: 0,
          category: getCategoryName(item.menuCategoryCode),
          isVeg: item.description.includes('VG') || !item.description.includes('NV'),
          sizeCodes: [],
          sizeDescriptions: []
        });
      }
      
      const summary = productMap.get(key)!;
      if (!summary.menuCodes.includes(item.menuCode)) {
        summary.menuCodes.push(item.menuCode);
      }
      if (!summary.sizeCodes.includes(item.sizeCode)) {
        summary.sizeCodes.push(item.sizeCode);
      }
      if (!summary.sizeDescriptions.includes(item.sizeDescription)) {
        summary.sizeDescriptions.push(item.sizeDescription);
      }
      summary.totalRecipes++;
    });
    
    return Array.from(productMap.values());
  };

  // Get recipe variants for selected product
  const getRecipeVariants = () => {
    if (!selectedProduct) return [];
    
    const productRecipes = data.filter(item => item.description === selectedProduct);
    const variantMap = new Map<string, { menuCode: string; sizeCode: string; sizeDescription: string; ingredientCount: number; category: string; }>();
    
    productRecipes.forEach(item => {
      const key = `${item.menuCode}-${item.sizeCode}`;
      if (!variantMap.has(key)) {
        variantMap.set(key, {
          menuCode: item.menuCode,
          sizeCode: item.sizeCode,
          sizeDescription: item.sizeDescription,
          ingredientCount: getIngredientCount(data, item.menuCode, item.sizeCode),
          category: getCategoryName(item.menuCategoryCode)
        });
      }
    });
    
    return Array.from(variantMap.values());
  };

  const products = getProductSummaries();
  const recipeVariants = getRecipeVariants();
  
  // Filter data based on view and search
  const filteredData = view === 'products' 
    ? products.filter(product =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.menuCodes.some(code => code.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : recipeVariants.filter(variant =>
        variant.menuCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variant.sizeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variant.sizeDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleProductClick = (productDescription: string) => {
    onProductSelect(productDescription);
    onViewChange('recipes');
    setCurrentPage(1);
  };

  const handleBackToProducts = () => {
    onViewChange('products');
    onProductSelect('');
    setCurrentPage(1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {view === 'recipes' && selectedProduct && (
              <Button variant="outline" size="sm" onClick={handleBackToProducts} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Button>
            )}
            <CardTitle>
              {view === 'products' ? 'Products' : `Recipes - ${selectedProduct}`}
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} {view}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {view === 'products' ? (
                  <>
                    <TableHead className="font-semibold">Product</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Menu Codes</TableHead>
                    <TableHead className="font-semibold">Size Variants</TableHead>
                    <TableHead className="font-semibold text-right">Total Recipes</TableHead>
                    <TableHead className="font-semibold w-24">Actions</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead className="font-semibold">Menu Code</TableHead>
                    <TableHead className="font-semibold">Size Code</TableHead>
                    <TableHead className="font-semibold">Size Description</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold text-right">Ingredients</TableHead>
                    <TableHead className="font-semibold w-32">Actions</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={view === 'products' ? 7 : 6} className="text-center py-8 text-muted-foreground">
                    No {view} found matching your search criteria
                  </TableCell>
                </TableRow>
              ) : view === 'products' ? (
                (paginatedData as ProductSummary[]).map((product, index) => (
                  <TableRow key={`${product.description}-${index}`} className="hover:bg-muted/25">
                    <TableCell>
                      <div className="cursor-pointer hover:text-primary" onClick={() => handleProductClick(product.description)}>
                        <div className="font-medium flex items-center gap-2">
                          {product.description}
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.isVeg ? "secondary" : "destructive"} className="text-xs">
                        {product.isVeg ? "VEG" : "NON-VEG"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.menuCodes.slice(0, 2).map(code => (
                          <Badge key={code} variant="outline" className="text-xs font-mono">
                            {code}
                          </Badge>
                        ))}
                        {product.menuCodes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.menuCodes.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {product.sizeCodes.length} variants
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {product.totalRecipes}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleProductClick(product.description)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                paginatedData.map((variant: any, index) => (
                  <TableRow key={`${variant.menuCode}-${variant.sizeCode}-${index}`} className="hover:bg-muted/25">
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {variant.menuCode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">
                        {variant.sizeCode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {variant.sizeDescription}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{variant.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {variant.ingredientCount} ingredients
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onViewRecipe(variant.menuCode, variant.sizeCode)}
                          className="gap-1 px-2"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onEditRecipe(variant.menuCode, variant.sizeCode)}
                          className="gap-1 px-2"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { RecipeItem, getIngredientCount } from "@/data/recipeData";

interface RecipeTableProps {
  data: RecipeItem[];
  onViewRecipe: (menuCode: string, sizeCode: string) => void;
  onEditRecipe: (menuCode: string, sizeCode: string) => void;
}

export const RecipeTable = ({ data, onViewRecipe }: RecipeTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Get unique recipes (one row per recipe, not per ingredient)
  const getUniqueRecipes = () => {
    const recipeMap = new Map();
    
    data.forEach(item => {
      const key = `${item.menuCode}-${item.sizeCode}`;
      if (!recipeMap.has(key)) {
        recipeMap.set(key, {
          menuCode: item.menuCode,
          category: item.menuCategoryCode,
          channel: item.channel,
          description: item.description,
          sizeCode: item.sizeCode,
          sizeDescription: item.sizeDescription,
          ingredientCount: getIngredientCount(data, item.menuCode, item.sizeCode)
        });
      }
    });
    
    return Array.from(recipeMap.values());
  };

  const recipes = getUniqueRecipes();
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = recipes.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Menu Code</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Channel</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Size Code</TableHead>
                <TableHead className="font-semibold">Size Description</TableHead>
                <TableHead className="font-semibold text-center">Ingredients</TableHead>
                <TableHead className="font-semibold w-32 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecipes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No recipes found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRecipes.map((recipe, index) => (
                  <TableRow key={`${recipe.menuCode}-${recipe.sizeCode}-${index}`} className="hover:bg-muted/25">
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {recipe.menuCode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {recipe.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {recipe.channel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm" title={recipe.description}>
                        {recipe.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {recipe.sizeCode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{recipe.sizeDescription}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-xs">{recipe.ingredientCount}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-center">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onViewRecipe(recipe.menuCode, recipe.sizeCode)}
                          className="h-8 px-3"
                          title="View Recipe"
                        >
                          View
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
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, recipes.length)} of {recipes.length} recipes
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
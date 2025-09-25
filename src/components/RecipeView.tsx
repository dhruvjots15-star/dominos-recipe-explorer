import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";

interface RecipeViewProps {
  menuCode: string;
  sizeCode: string;
  onBack: () => void;
}

export const RecipeView = ({ menuCode, sizeCode, onBack }: RecipeViewProps) => {
  // Mock recipe data
  const recipe = {
    menuCode,
    sizeCode,
    productName: "Chicken Caesar Salad",
    sizeDescription: "Regular",
    category: "SALADS",
    prepTime: "15 mins",
    servingSize: "1 portion",
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: "485 kcal",
      protein: "32g",
      carbs: "18g",
      fat: "32g"
    },
    ingredients: [
      { name: "Chicken Breast (Grilled)", quantity: "120g", cost: "$3.50" },
      { name: "Romaine Lettuce", quantity: "80g", cost: "$0.75" },
      { name: "Caesar Dressing", quantity: "30ml", cost: "$0.45" },
      { name: "Parmesan Cheese (Grated)", quantity: "15g", cost: "$0.80" },
      { name: "Croutons", quantity: "20g", cost: "$0.30" },
      { name: "Cherry Tomatoes", quantity: "40g", cost: "$0.40" },
      { name: "Bacon Bits", quantity: "10g", cost: "$0.60" }
    ],
    instructions: [
      "Grill chicken breast until fully cooked (internal temp 165°F)",
      "Wash and chop romaine lettuce into bite-sized pieces",
      "Halve cherry tomatoes",
      "Arrange lettuce in serving bowl",
      "Slice grilled chicken and place on top of lettuce",
      "Add cherry tomatoes and croutons",
      "Drizzle with Caesar dressing",
      "Top with grated Parmesan cheese and bacon bits",
      "Serve immediately"
    ]
  };

  const totalCost = recipe.ingredients.reduce((sum, ingredient) => 
    sum + parseFloat(ingredient.cost.replace('$', '')), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Recipe Database
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">{recipe.productName}</h1>
          <p className="text-muted-foreground">Recipe Details for {menuCode} - {sizeCode}</p>
        </div>
      </div>

      {/* Recipe Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                Recipe Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Menu Code</p>
                  <Badge variant="outline" className="font-mono">{recipe.menuCode}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size Code</p>
                  <Badge variant="secondary" className="font-mono">{recipe.sizeCode}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge variant="outline">{recipe.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size Description</p>
                  <span className="text-sm font-medium">{recipe.sizeDescription}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{recipe.servingSize}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients ({recipe.ingredients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Ingredient</TableHead>
                      <TableHead className="font-semibold">Quantity</TableHead>
                      <TableHead className="font-semibold text-right">Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipe.ingredients.map((ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{ingredient.name}</TableCell>
                        <TableCell>{ingredient.quantity}</TableCell>
                        <TableCell className="text-right font-mono">{ingredient.cost}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/25">
                      <TableCell className="font-bold">Total Cost</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right font-bold font-mono">${totalCost.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Preparation Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm">{instruction}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nutritional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Calories</span>
                <span className="font-medium">{recipe.nutritionalInfo.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Protein</span>
                <span className="font-medium">{recipe.nutritionalInfo.protein}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Carbohydrates</span>
                <span className="font-medium">{recipe.nutritionalInfo.carbs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fat</span>
                <span className="font-medium">{recipe.nutritionalInfo.fat}</span>
              </div>
            </CardContent>
          </Card>

          {/* Allergens */}
          <Card>
            <CardHeader>
              <CardTitle>Allergens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recipe.allergens.map((allergen) => (
                  <Badge key={allergen} variant="destructive" className="text-xs">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
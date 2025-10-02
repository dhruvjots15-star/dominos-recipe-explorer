import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { mockRecipeData } from "@/data/recipeData";

interface RecipeViewProps {
  menuCode: string;
  sizeCode: string;
  onBack: () => void;
}

// Complete ingredient details for a recipe
const getRecipeDetails = (menuCode: string, sizeCode: string) => {
  const recipeItem = mockRecipeData.find(
    item => item.menuCode === menuCode && item.sizeCode === sizeCode
  );

  if (!recipeItem) return null;

  // Mock full recipe data with all ingredients
  return {
    menuCode: recipeItem.menuCode,
    category: recipeItem.menuCategoryCode,
    description: recipeItem.description,
    sizeCode: recipeItem.sizeCode,
    sizeDescription: recipeItem.sizeDescription,
    ingredients: [
      { inventoryDescription: "BOX_PKG- Box Regular", inventoryCode: "BOX0001", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
      { inventoryDescription: "BOX_Lidless Regular - IHOP", inventoryCode: "20001596", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "0", applyDelivery: "0", applyDineIn: "1", applyPickUp: "0" },
      { inventoryDescription: "PKG_Regular Corrugated Sheet", inventoryCode: "POT0052", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
      { inventoryDescription: "PIE_New Hand-Tossed Dough Reg (165gm)", inventoryCode: "80000161", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "PRS_Round Sticker", inventoryCode: "PRS0014", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "PKG_Napkins", inventoryCode: "POT0006", portionUnit: "NOS", amount: "2.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "PRS_Safe And Hygienic Veg - per Roll", inventoryCode: "20001031", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "SES_Pepper & Herb Seasoning (70gm)", inventoryCode: "10000640", portionUnit: "GMS", amount: "0.80", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "OTH_ Oil", inventoryCode: "DOI0001", portionUnit: "GMS", amount: "4.20", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "SES_Oregano Seasoning", inventoryCode: "SES0007", portionUnit: "NOS", amount: "2.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "SES_Chilli Flakes", inventoryCode: "SES0005", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "OTH_ Corn Meal", inventoryCode: "VCN0001", portionUnit: "GMS", amount: "7.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", portionUnit: "GMS", amount: "48.00", extraTopping: "Y", applyCarryOut: "", applyDelivery: "", applyDineIn: "", applyPickUp: "" },
      { inventoryDescription: "SAU_Tomato Blend", inventoryCode: "SPI0001", portionUnit: "GMS", amount: "40.00", extraTopping: "Y", applyCarryOut: "", applyDelivery: "", applyDineIn: "", applyPickUp: "" },
      { inventoryDescription: "VG TOP_Onion", inventoryCode: "VFF0001", portionUnit: "GMS", amount: "35.00", extraTopping: "Y", applyCarryOut: "", applyDelivery: "", applyDineIn: "", applyPickUp: "" },
      { inventoryDescription: "VG TOP_Green Pepper", inventoryCode: "VFF0002", portionUnit: "GMS", amount: "20.00", extraTopping: "Y", applyCarryOut: "", applyDelivery: "", applyDineIn: "", applyPickUp: "" },
      { inventoryDescription: "VG TOP_Tomato", inventoryCode: "VFF0003", portionUnit: "GMS", amount: "25.00", extraTopping: "Y", applyCarryOut: "", applyDelivery: "", applyDineIn: "", applyPickUp: "" },
      { inventoryDescription: "VG TOP_Mushroom", inventoryCode: "VFF0010", portionUnit: "GMS", amount: "36.00", extraTopping: "Y", applyCarryOut: "", applyDelivery: "", applyDineIn: "", applyPickUp: "" },
      { inventoryDescription: "OTH_ K-Cuisine", inventoryCode: "CMP0016", portionUnit: "GMS", amount: "1.40", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" },
      { inventoryDescription: "SES_Bake Sprinkle", inventoryCode: "SES0010", portionUnit: "GMS", amount: "0.56", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "1", applyPickUp: "1" }
    ]
  };
};

export const RecipeView = ({ menuCode, sizeCode, onBack }: RecipeViewProps) => {
  const recipe = getRecipeDetails(menuCode, sizeCode);

  if (!recipe) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Recipe Database
        </Button>
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Recipe not found
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Recipe Database
        </Button>
      </div>

      <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-950/30 dark:to-gray-950/30 rounded-xl p-6 border border-slate-200/50 dark:border-slate-800/50">
        <h1 className="text-3xl font-bold text-primary mb-2">Recipe Details for {recipe.description}</h1>
        <p className="text-lg text-muted-foreground">
          <span className="font-semibold">Menu Code:</span> {recipe.menuCode}, <span className="font-semibold">Size:</span> {recipe.sizeCode} {recipe.sizeDescription}
        </p>
      </div>

      {/* Recipe Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Menu Code</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Size Code</TableHead>
                  <TableHead className="font-semibold">Size Description</TableHead>
                  <TableHead className="font-semibold">Inventory Description</TableHead>
                  <TableHead className="font-semibold">Inventory Code</TableHead>
                  <TableHead className="font-semibold">Portion Unit</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Extra Topping</TableHead>
                  <TableHead className="font-semibold">Apply_CarryOut</TableHead>
                  <TableHead className="font-semibold">Apply_Delivery</TableHead>
                  <TableHead className="font-semibold">Apply_DineIn</TableHead>
                  <TableHead className="font-semibold">Apply_PickUp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipe.ingredients.map((ingredient, index) => (
                  <TableRow key={index} className="hover:bg-muted/25">
                    <TableCell className="font-mono text-xs">{recipe.menuCode}</TableCell>
                    <TableCell className="text-xs">{recipe.category}</TableCell>
                    <TableCell className="text-sm">{recipe.description}</TableCell>
                    <TableCell className="font-mono text-xs">{recipe.sizeCode}</TableCell>
                    <TableCell className="text-sm">{recipe.sizeDescription}</TableCell>
                    <TableCell className="text-sm">{ingredient.inventoryDescription}</TableCell>
                    <TableCell className="font-mono text-xs">{ingredient.inventoryCode}</TableCell>
                    <TableCell className="text-xs">{ingredient.portionUnit}</TableCell>
                    <TableCell className="text-xs">{ingredient.amount}</TableCell>
                    <TableCell className="text-xs">{ingredient.extraTopping}</TableCell>
                    <TableCell className="text-xs text-center">{ingredient.applyCarryOut}</TableCell>
                    <TableCell className="text-xs text-center">{ingredient.applyDelivery}</TableCell>
                    <TableCell className="text-xs text-center">{ingredient.applyDineIn}</TableCell>
                    <TableCell className="text-xs text-center">{ingredient.applyPickUp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { RecipeSelectionForm } from "@/components/RecipeSelectionForm";
import { RecipeEditTable } from "@/components/RecipeEditTable";

const RecipeEditorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, productIndex, requestId, requestDescription } = location.state || {};
  
  const [showRecipeTable, setShowRecipeTable] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("v5 All India Stores");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleBack = () => {
    navigate(`/recipe-request/${requestId}/update-recipe`);
  };

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "recipe-bank") {
      navigate("/recipe-bank");
    } else if (tab === "size-codes") {
      navigate("/size-codes");
    }
  };

  const handleShowRecipe = (version: string, productCode: string, size: string) => {
    setSelectedVersion(version);
    setSelectedProduct(productCode);
    setSelectedSize(size);
    setShowRecipeTable(true);
  };

  const handleRecipeSubmit = () => {
    navigate(`/recipe-request/${requestId}/update-recipe`, {
      state: { productIndex, recipeSubmitted: true }
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigation activeTab="dashboard" onTabChange={handleTabChange} />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">Unable to load product information.</p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab="dashboard" onTabChange={handleTabChange} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Adding Recipe for {product.description}, {product.sizeCode}, {product.sizeDescription}
          </h1>
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {!showRecipeTable ? (
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <Button variant="outline">
                Create Recipe from Scratch
              </Button>
              <Button variant="default">
                Create Recipe using an Existing product
              </Button>
            </div>

            <RecipeSelectionForm onShowRecipe={handleShowRecipe} />
          </Card>
        ) : (
          <RecipeEditTable
            product={selectedProduct}
            size={selectedSize}
            onSubmit={handleRecipeSubmit}
            onBack={() => setShowRecipeTable(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeEditorPage;

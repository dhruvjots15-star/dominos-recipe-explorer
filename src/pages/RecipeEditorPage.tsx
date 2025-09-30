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
  const [selectedPath, setSelectedPath] = useState<"scratch" | "existing" | null>(null);
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

  const handleCreateFromScratch = () => {
    setSelectedPath("scratch");
    setShowRecipeTable(true);
  };

  const handleBackToSelection = () => {
    setSelectedPath(null);
    setShowRecipeTable(false);
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

        {!showRecipeTable && !selectedPath ? (
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6 text-center">How would you like to create this recipe?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={handleCreateFromScratch}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Create Recipe from Scratch</h3>
                  <p className="text-sm text-muted-foreground">
                    Start with an empty recipe and add ingredients manually
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => setSelectedPath("existing")}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Create Recipe using Existing Product</h3>
                  <p className="text-sm text-muted-foreground">
                    Select an existing recipe as a template and modify it
                  </p>
                </div>
              </Card>
            </div>
          </Card>
        ) : !showRecipeTable && selectedPath === "existing" ? (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Select Existing Product</h2>
              <Button variant="outline" onClick={handleBackToSelection}>
                Change Method
              </Button>
            </div>
            <RecipeSelectionForm onShowRecipe={handleShowRecipe} />
          </Card>
        ) : (
          <RecipeEditTable
            product={selectedProduct || product.description}
            size={selectedSize || product.sizeCode}
            onSubmit={handleRecipeSubmit}
            onBack={handleBackToSelection}
            startFromScratch={selectedPath === "scratch"}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeEditorPage;

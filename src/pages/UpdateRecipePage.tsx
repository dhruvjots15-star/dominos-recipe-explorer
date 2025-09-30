import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface Product {
  menuCode: string;
  menuCategoryCode: string;
  description: string;
  sizeCode: string;
  sizeDescription: string;
  recipeSubmitted?: boolean;
}

const UpdateRecipePage = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [products, setProducts] = useState<Product[]>([
    { menuCode: "PIZ0901", menuCategoryCode: "MCT0001", description: "OA_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
    { menuCode: "PIZ0901", menuCategoryCode: "MCT0001", description: "OA_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
    { menuCode: "PIZ0901", menuCategoryCode: "MCT0001", description: "OA_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" },
    { menuCode: "PIZ0902", menuCategoryCode: "MCT0001", description: "IR_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
    { menuCode: "PIZ0902", menuCategoryCode: "MCT0001", description: "IR_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
    { menuCode: "PIZ0902", menuCategoryCode: "MCT0001", description: "IR_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" },
    { menuCode: "PIZ0903", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
    { menuCode: "PIZ0903", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
    { menuCode: "PIZ0903", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" },
    { menuCode: "PIZ0904", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
    { menuCode: "PIZ0904", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
    { menuCode: "PIZ0904", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" }
  ]);

  const handleBack = () => {
    navigate(`/recipe-request/${requestId}?source=dashboard`);
  };

  const handleEdit = (product: Product, index: number) => {
    navigate(`/recipe-request/${requestId}/update-recipe/editor`, {
      state: { 
        product,
        productIndex: index,
        requestId,
        requestDescription: "New Sourdough Pizza Recipes creation"
      }
    });
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

  // Update product status when returning from editor
  const updateProductStatus = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].recipeSubmitted = true;
    setProducts(updatedProducts);
  };

  // Check location state for recipe submission
  useEffect(() => {
    if (location.state?.productIndex !== undefined && location.state?.recipeSubmitted) {
      updateProductStatus(location.state.productIndex);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const allRecipesSubmitted = products.every(p => p.recipeSubmitted);

  const handleFinalSubmit = () => {
    toast({
      title: "Success",
      description: `Recipes Submitted for ${requestId}`,
      duration: 3000,
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeTab="dashboard" onTabChange={handleTabChange} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Updating Recipe for {requestId} (New Sourdough Pizza Recipes creation)
          </h1>
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Request
          </Button>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu Code</TableHead>
                  <TableHead>Menu Category Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Size Code</TableHead>
                  <TableHead>Size Description</TableHead>
                  <TableHead className="w-[80px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow 
                    key={`${product.menuCode}-${product.sizeCode}-${index}`}
                    className={product.recipeSubmitted ? "bg-success/20 hover:bg-success/30" : ""}
                  >
                    <TableCell className="font-medium">{product.menuCode}</TableCell>
                    <TableCell>{product.menuCategoryCode}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.sizeCode}</TableCell>
                    <TableCell>{product.sizeDescription}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product, index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-6 flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    size="lg"
                    onClick={handleFinalSubmit}
                    disabled={!allRecipesSubmitted}
                    className="min-w-[200px]"
                  >
                    SUBMIT
                  </Button>
                </div>
              </TooltipTrigger>
              {!allRecipesSubmitted && (
                <TooltipContent>
                  <p>Complete updating recipes for All items</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipePage;

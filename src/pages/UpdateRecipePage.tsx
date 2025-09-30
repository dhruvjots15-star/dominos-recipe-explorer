import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Pencil, MoreVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  
  // Initialize products state with persisted submission status from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const initialProducts: Product[] = [
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
    ];

    // Load persisted submission status from localStorage
    const storageKey = `recipe-submission-${requestId}`;
    const savedStatus = localStorage.getItem(storageKey);
    if (savedStatus) {
      try {
        const submittedIndices = JSON.parse(savedStatus) as number[];
        return initialProducts.map((product, index) => ({
          ...product,
          recipeSubmitted: submittedIndices.includes(index)
        }));
      } catch (e) {
        console.error("Failed to parse saved submission status", e);
      }
    }
    return initialProducts;
  });

  const handleBack = () => {
    navigate(`/recipe-request/${requestId}?source=dashboard`);
  };

  const handleEdit = (product: Product, index: number) => {
    // Rows with dropdowns should show dropdown via the table rendering
    // This function is only called when "Continue to Enter a Fresh Recipe" is selected
    navigate(`/recipe-request/${requestId}/update-recipe/editor`, {
      state: { 
        product,
        productIndex: index,
        requestId,
        requestDescription: "New Sourdough Pizza Recipes creation"
      }
    });
  };

  const handleReplicateRecipe = (index: number, replicateFrom: string) => {
    // Mark the row as green (recipe submitted)
    updateProductStatus(index);
    toast({
      title: "Recipe Replicated",
      description: `Recipe from ${replicateFrom} has been replicated successfully`,
      duration: 2000,
    });
  };

  const getReplicateText = (index: number): string => {
    // Rows 4, 7, 10 (indices 3, 6, 9) → Reg Sourdough
    if ([3, 6, 9].includes(index)) {
      return "Reg Sourdough - OA_Sourdough Corn Pizza";
    }
    // Rows 5, 8, 11 (indices 4, 7, 10) → Med Sourdough
    if ([4, 7, 10].includes(index)) {
      return "Med Sourdough - OA_Sourdough Corn Pizza";
    }
    // Rows 6, 9, 12 (indices 5, 8, 11) → Lar Sourdough
    if ([5, 8, 11].includes(index)) {
      return "Lar Sourdough - OA_Sourdough Corn Pizza";
    }
    return "";
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

  // Update product status and persist to localStorage
  const updateProductStatus = (index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map((product, i) => 
        i === index ? { ...product, recipeSubmitted: true } : product
      );
      
      // Save to localStorage
      const storageKey = `recipe-submission-${requestId}`;
      const submittedIndices = updatedProducts
        .map((product, i) => product.recipeSubmitted ? i : -1)
        .filter(i => i !== -1);
      localStorage.setItem(storageKey, JSON.stringify(submittedIndices));
      
      return updatedProducts;
    });
  };

  // Check location state for recipe submission
  useEffect(() => {
    const state = location.state as any;
    if (state?.productIndex !== undefined && state?.recipeSubmitted) {
      updateProductStatus(state.productIndex);
      // Clear the state to prevent re-triggering
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const allRecipesSubmitted = products.every(p => p.recipeSubmitted);

  const handleFinalSubmit = () => {
    // Clear localStorage after successful submission
    const storageKey = `recipe-submission-${requestId}`;
    localStorage.removeItem(storageKey);
    
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
                    className={product.recipeSubmitted ? "bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30" : ""}
                  >
                    <TableCell className="font-medium">{product.menuCode}</TableCell>
                    <TableCell>{product.menuCategoryCode}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.sizeCode}</TableCell>
                    <TableCell>{product.sizeDescription}</TableCell>
                    <TableCell>
                      {/* Show dropdown for rows 4-6, 7-9, and 10-12 (indices 3-5, 6-8, 9-11) */}
                      {[3, 4, 5, 6, 7, 8, 9, 10, 11].includes(index) ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-80 bg-popover z-50">
                            <DropdownMenuItem
                              onClick={() => handleReplicateRecipe(index, getReplicateText(index))}
                              className="cursor-pointer"
                            >
                              Replicate Recipe of {getReplicateText(index)}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(product, index)}
                              className="cursor-pointer"
                            >
                              Continue to Enter a Fresh Recipe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-6 flex justify-center">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-block">
                  <Button
                    size="lg"
                    onClick={handleFinalSubmit}
                    disabled={!allRecipesSubmitted}
                    className="min-w-[200px]"
                  >
                    SUBMIT
                  </Button>
                </span>
              </TooltipTrigger>
              {!allRecipesSubmitted && (
                <TooltipContent side="top">
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

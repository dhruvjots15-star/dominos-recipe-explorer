import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, AlertCircle, ChevronRight, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { generateNextRequestId } from "@/utils/requestIdUtils";
import { StoreSelector } from "@/components/StoreSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExtendVersionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedVersion = searchParams.get("version") || "v1.0";
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    requestDesc: "",
    remarks: ""
  });
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [currentDialogData, setCurrentDialogData] = useState<any>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requestDesc.trim()) {
      toast({
        title: "Error",
        description: "Request description is required",
        variant: "destructive"
      });
      return;
    }
    if (selectedStores.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one store",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const requestId = generateNextRequestId();
    
    // Navigate to request landing page with success toast
    navigate(`/recipe-request/${requestId}?source=recipe-bank&showToast=true`);
  };

  const mockStoreMapping = {
    "v2": 60,
    "v3": 40
  };

  const mockDifferences = {
    productsInOldNotNew: 8,
    productsInNewNotOld: 5,
    commonProductsWithDifferences: 12,
    productsInV2NotInVX: 15,
    productsInV3NotInVX: 8,
    commonWithV2Differences: 12,
    commonWithV3Differences: 7
  };

  const mockProductsV2NotInVX = [
    { menuCode: "PZ012", productDesc: "Veggie Deluxe Classic", category: "Pizza", sizeCode: "HT07", sizeDesc: "Half Thick", ingredients: 8 },
    { menuCode: "PZ018", productDesc: "Chicken Tikka Special", category: "Pizza", sizeCode: "HT95", sizeDesc: "Half Thick XL", ingredients: 12 },
    { menuCode: "PZ032", productDesc: "Mediterranean Garden", category: "Pizza", sizeCode: "RT12", sizeDesc: "Regular Thin", ingredients: 10 },
    { menuCode: "SD005", productDesc: "Caesar Salad", category: "Sides", sizeCode: "REG", sizeDesc: "Regular", ingredients: 6 },
    { menuCode: "BV003", productDesc: "Pepsi 600ml", category: "Beverage", sizeCode: "600", sizeDesc: "600ml", ingredients: 1 }
  ];

  const mockProductsV3NotInVX = [
    { menuCode: "PZ025", productDesc: "BBQ Chicken Supreme", category: "Pizza", sizeCode: "MT45", sizeDesc: "Medium Thick", ingredients: 11 },
    { menuCode: "PZ047", productDesc: "Truffle Delight", category: "Pizza", sizeCode: "LT88", sizeDesc: "Large Thin", ingredients: 9 },
    { menuCode: "PZ051", productDesc: "Spicy Jalapeño", category: "Pizza", sizeCode: "ST23", sizeDesc: "Small Thick", ingredients: 7 },
    { menuCode: "DS002", productDesc: "Choco Lava Cake", category: "Dessert", sizeCode: "REG", sizeDesc: "Regular", ingredients: 5 }
  ];

  const mockCommonWithV2Differences = [
    { menuCode: "PZ001", productDesc: "Margherita Pizza Regular", category: "Pizza", sizeCode: "RT12", sizeDesc: "Regular Thin", differenceType: "Ingredient change" },
    { menuCode: "PZ008", productDesc: "Pepperoni Feast", category: "Pizza", sizeCode: "LT88", sizeDesc: "Large Thin", differenceType: "Grammage change" },
    { menuCode: "PZ015", productDesc: "Chicken Supreme", category: "Pizza", sizeCode: "MT45", sizeDesc: "Medium Thick", differenceType: "Ingredient change" },
    { menuCode: "SD001", productDesc: "Garlic Breadsticks", category: "Sides", sizeCode: "REG", sizeDesc: "Regular", differenceType: "Grammage change" }
  ];

  const mockCommonWithV3Differences = [
    { menuCode: "PZ002", productDesc: "Veggie Paradise", category: "Pizza", sizeCode: "MT45", sizeDesc: "Medium Thick", differenceType: "Grammage change" },
    { menuCode: "PZ009", productDesc: "Mexican Fiesta", category: "Pizza", sizeCode: "LT88", sizeDesc: "Large Thin", differenceType: "Ingredient change" },
    { menuCode: "DS001", productDesc: "Brownie", category: "Dessert", sizeCode: "REG", sizeDesc: "Regular", differenceType: "Ingredient change" }
  ];

  const mockRecipeDetails: Record<string, any[]> = {
    "PZ012": [
      { ingredient: "Pizza Base", grammage: "120g" },
      { ingredient: "Tomato Sauce", grammage: "80g" },
      { ingredient: "Mozzarella Cheese", grammage: "45g" },
      { ingredient: "Bell Peppers", grammage: "25g" },
      { ingredient: "Onions", grammage: "20g" },
      { ingredient: "Mushrooms", grammage: "20g" },
      { ingredient: "Oregano", grammage: "2g" },
      { ingredient: "Olive Oil", grammage: "5ml" }
    ],
    "PZ001": [
      { ingredient: "Pizza Base", grammage: "120g" },
      { ingredient: "Tomato Sauce", grammage: "75g" },
      { ingredient: "Premium Mozzarella", grammage: "45g" },
      { ingredient: "Oregano", grammage: "2g" },
      { ingredient: "Olive Oil", grammage: "5ml" },
      { ingredient: "Basil", grammage: "3g" }
    ]
  };

  const handleViewProducts = (type: string) => {
    let data;
    if (type === 'v2NotInVX') {
      data = { title: `${mockDifferences.productsInV2NotInVX} Products in v2 but not in ${selectedVersion}`, products: mockProductsV2NotInVX, version: 'v2' };
    } else if (type === 'v3NotInVX') {
      data = { title: `${mockDifferences.productsInV3NotInVX} Products in v3 but not in ${selectedVersion}`, products: mockProductsV3NotInVX, version: 'v3' };
    }
    setCurrentDialogData(data);
    setProductDialogOpen(true);
  };

  const handleViewRecipeDifferences = (type: string) => {
    let data;
    if (type === 'v2Differences') {
      data = { title: `${mockDifferences.commonWithV2Differences} Common Products with v2 having different recipes`, products: mockCommonWithV2Differences, version: 'v2' };
    } else if (type === 'v3Differences') {
      data = { title: `${mockDifferences.commonWithV3Differences} Common Products with v3 having different recipes`, products: mockCommonWithV3Differences, version: 'v3' };
    }
    setCurrentDialogData(data);
    setRecipeDialogOpen(true);
  };

  const handleViewRecipe = (menuCode: string) => {
    setExpandedRecipe(expandedRecipe === menuCode ? null : menuCode);
  };

  // SEO title
  if (typeof document !== "undefined") {
    document.title = "Extend Recipe Version | Recipe System";
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setShowConfirmation(false)}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center gap-3">
              <AlertCircle className="w-9 h-9 text-amber-500" />
              Confirm Version Extension
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Review the changes before submitting your extension request
            </p>
          </div>

          {/* Store Mapping Summary */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Store Mapping Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(mockStoreMapping).map(([version, count]) => (
                <div key={version} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                  <span className="font-medium">{count} stores currently on {version}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    will be remapped to
                    <ChevronRight className="w-4 h-4" />
                    <Badge variant="outline" className="text-base px-3 py-1">{selectedVersion}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Version Comparison Snapshot */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Version Comparison Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">Product Differences:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <span className="font-medium">{mockDifferences.productsInV2NotInVX} Products in v2 but not in {selectedVersion}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Will be Deactivated</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewProducts('v2NotInVX')}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <span className="font-medium">{mockDifferences.productsInV3NotInVX} Products in v3 but not in {selectedVersion}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 hover:bg-green-700">Will be Activated</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewProducts('v3NotInVX')}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-3">Recipe Differences:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                    <span className="font-medium">{mockDifferences.commonWithV2Differences} Common Products with v2 having different recipes</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">Will be Modified</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewRecipeDifferences('v2Differences')}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                    <span className="font-medium">{mockDifferences.commonWithV3Differences} Common Products with v3 having different recipes</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">Will be Modified</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewRecipeDifferences('v3Differences')}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="link" className="p-0 h-auto">
                View Full Comparison
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-6">
            <Button 
              onClick={handleConfirm} 
              size="lg"
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
            >
              Yes, Confirm & Extend
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)} 
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

          {/* Product Dialog */}
          <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{currentDialogData?.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Menu Code</TableHead>
                      <TableHead>Product Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size Code</TableHead>
                      <TableHead>Size Description</TableHead>
                      <TableHead>Ingredients</TableHead>
                      <TableHead className="text-center">View Recipe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDialogData?.products?.map((product: any) => (
                      <>
                        <TableRow key={product.menuCode}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {product.menuCode}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.productDesc}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {product.sizeCode}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.sizeDesc}</TableCell>
                          <TableCell>{product.ingredients}</TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleViewRecipe(product.menuCode)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRecipe === product.menuCode && mockRecipeDetails[product.menuCode] && (
                          <TableRow>
                            <TableCell colSpan={7} className="p-0">
                              <div className="bg-gray-50 p-4 border-t">
                                <h6 className="font-semibold mb-3">Recipe Details - {product.menuCode}</h6>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-gray-100">
                                        <TableHead>Ingredient</TableHead>
                                        <TableHead>Grammage</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {mockRecipeDetails[product.menuCode].map((item: any, idx: number) => (
                                        <TableRow key={idx}>
                                          <TableCell>{item.ingredient}</TableCell>
                                          <TableCell>{item.grammage}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>

          {/* Recipe Differences Dialog */}
          <Dialog open={recipeDialogOpen} onOpenChange={setRecipeDialogOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{currentDialogData?.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Menu Code</TableHead>
                      <TableHead>Product Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size Code</TableHead>
                      <TableHead>Size Description</TableHead>
                      <TableHead>Difference Type</TableHead>
                      <TableHead className="text-center">View Recipe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDialogData?.products?.map((product: any) => (
                      <>
                        <TableRow key={product.menuCode}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {product.menuCode}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.productDesc}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {product.sizeCode}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.sizeDesc}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">
                              {product.differenceType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleViewRecipe(product.menuCode)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRecipe === product.menuCode && mockRecipeDetails[product.menuCode] && (
                          <TableRow>
                            <TableCell colSpan={7} className="p-0">
                              <div className="bg-gray-50 p-4 border-t">
                                <h6 className="font-semibold mb-3">Recipe Details - {product.menuCode}</h6>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-gray-100">
                                        <TableHead>Ingredient</TableHead>
                                        <TableHead>Grammage</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {mockRecipeDetails[product.menuCode].map((item: any, idx: number) => (
                                        <TableRow key={idx}>
                                          <TableCell>{item.ingredient}</TableCell>
                                          <TableCell>{item.grammage}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/recipe-bank")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipe Bank
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Extend Recipe Version
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Extend selected recipe version to additional stores
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Extension Request Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requestDesc" className="text-base font-semibold">
                  Request Description <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="requestDesc"
                  value={formData.requestDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestDesc: e.target.value }))}
                  placeholder="e.g., Extend v5 to 100 more stores"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Selected Version</Label>
                <Input value={selectedVersion} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetStores" className="text-base font-semibold">Target Stores *</Label>
                <div className="p-4 border rounded-lg bg-muted/50">
                  {selectedStores.length === 0 ? (
                    <p className="text-sm text-muted-foreground mb-3">No stores selected</p>
                  ) : (
                    <p className="text-sm mb-3"><span className="font-medium">{selectedStores.length}</span> stores selected</p>
                  )}
                  <Button type="button" variant="secondary" onClick={() => setStoreDialogOpen(true)}>
                    Select Stores
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks" className="text-base font-semibold">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="e.g., Extending the BBP Doughball change to 100 more stores due to success in experiment"
                  rows={4}
                />
              </div>

              {/* Store Selection Dialog */}
              <Dialog open={storeDialogOpen} onOpenChange={setStoreDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Select Stores</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <StoreSelector selectedStores={selectedStores} onStoresChange={setSelectedStores} />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" type="button" onClick={() => setStoreDialogOpen(false)}>Close</Button>
                      <Button type="button" onClick={() => setStoreDialogOpen(false)}>Apply</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
                >
                  Submit Request
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/recipe-bank")} 
                  size="lg"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExtendVersionPage;

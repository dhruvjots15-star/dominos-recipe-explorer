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

  // Mock recipe details for Product Differences section (basic recipe view)
  const mockRecipeDetailsBasic: Record<string, any[]> = {
    "PZ012": [
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "PIE_New Hand-Tossed Dough Reg (165gm)", inventoryCode: "80000161", portionUnit: "NOS", amount: "1.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "SAU_Tomato Blend", inventoryCode: "SPI0001", portionUnit: "GMS", amount: "80.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", portionUnit: "GMS", amount: "45.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "VG TOP_Green Pepper", inventoryCode: "VFF0002", portionUnit: "GMS", amount: "25.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "VG TOP_Onion", inventoryCode: "VFF0001", portionUnit: "GMS", amount: "20.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "VG TOP_Mushroom", inventoryCode: "VFF0010", portionUnit: "GMS", amount: "20.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "SES_Oregano Seasoning", inventoryCode: "SES0007", portionUnit: "GMS", amount: "2.00" },
      { menuCode: "PIZ0ABCD", category: "Pizza", description: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDescription: "Half Thick", inventoryDescription: "OTH_ Oil", inventoryCode: "DOI0001", portionUnit: "GMS", amount: "5.00" }
    ],
    "PZ018": [
      { menuCode: "PIZ0EFGH", category: "Pizza", description: "Chicken Tikka Special", sizeCode: "HT95", sizeDescription: "Half Thick XL", inventoryDescription: "PIE_New Hand-Tossed Dough XL (220gm)", inventoryCode: "80000162", portionUnit: "NOS", amount: "1.00" },
      { menuCode: "PIZ0EFGH", category: "Pizza", description: "Chicken Tikka Special", sizeCode: "HT95", sizeDescription: "Half Thick XL", inventoryDescription: "SAU_Tikka Sauce", inventoryCode: "SPI0005", portionUnit: "GMS", amount: "60.00" },
      { menuCode: "PIZ0EFGH", category: "Pizza", description: "Chicken Tikka Special", sizeCode: "HT95", sizeDescription: "Half Thick XL", inventoryDescription: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", portionUnit: "GMS", amount: "55.00" },
      { menuCode: "PIZ0EFGH", category: "Pizza", description: "Chicken Tikka Special", sizeCode: "HT95", sizeDescription: "Half Thick XL", inventoryDescription: "MT_Chicken Tikka", inventoryCode: "MT0015", portionUnit: "GMS", amount: "40.00" },
      { menuCode: "PIZ0EFGH", category: "Pizza", description: "Chicken Tikka Special", sizeCode: "HT95", sizeDescription: "Half Thick XL", inventoryDescription: "VG TOP_Onion", inventoryCode: "VFF0001", portionUnit: "GMS", amount: "25.00" },
      { menuCode: "PIZ0EFGH", category: "Pizza", description: "Chicken Tikka Special", sizeCode: "HT95", sizeDescription: "Half Thick XL", inventoryDescription: "VG TOP_Green Pepper", inventoryCode: "VFF0002", portionUnit: "GMS", amount: "20.00" }
    ]
  };

  // Mock recipe details for Recipe Differences section (comparison view)
  const mockRecipeDifferencesDetails: Record<string, any> = {
    "PZ001-ingredient": {
      type: "ingredient",
      ingredients: [
        { menuCode: "PIZ0WXYZ", category: "Pizza", description: "Margherita Pizza Regular", sizeCode: "RT12", sizeDescription: "Regular Thin", inventoryDescV2: "SAU_Tomato Blend", inventoryCodeV2: "SPI0001", inventoryDescVX: "SAU_Premium Tomato Sauce", inventoryCodeVX: "SPI0010", portionUnit: "GMS", amount: "75.00", highlight: true },
        { menuCode: "PIZ0WXYZ", category: "Pizza", description: "Margherita Pizza Regular", sizeCode: "RT12", sizeDescription: "Regular Thin", inventoryDescV2: "CH_Diced Mozzarella - New Specs", inventoryCodeV2: "10000721", inventoryDescVX: "CH_Premium Mozzarella Blend", inventoryCodeVX: "10000725", portionUnit: "GMS", amount: "45.00", highlight: true },
        { menuCode: "PIZ0WXYZ", category: "Pizza", description: "Margherita Pizza Regular", sizeCode: "RT12", sizeDescription: "Regular Thin", inventoryDescV2: "PIE_New Hand-Tossed Dough Reg (165gm)", inventoryCodeV2: "80000161", inventoryDescVX: "PIE_New Hand-Tossed Dough Reg (165gm)", inventoryCodeVX: "80000161", portionUnit: "NOS", amount: "1.00", highlight: false },
        { menuCode: "PIZ0WXYZ", category: "Pizza", description: "Margherita Pizza Regular", sizeCode: "RT12", sizeDescription: "Regular Thin", inventoryDescV2: "SES_Oregano Seasoning", inventoryCodeV2: "SES0007", inventoryDescVX: "SES_Oregano Seasoning", inventoryCodeVX: "SES0007", portionUnit: "GMS", amount: "2.00", highlight: false }
      ]
    },
    "PZ008-grammage": {
      type: "grammage",
      ingredients: [
        { menuCode: "PIZ0MNOP", category: "Pizza", description: "Pepperoni Feast", sizeCode: "LT88", sizeDescription: "Large Thin", inventoryDescription: "MT_Pepperoni", inventoryCode: "MT0008", portionUnit: "GMS", amountV2: "50.00", amountVX: "45.00", highlight: true },
        { menuCode: "PIZ0MNOP", category: "Pizza", description: "Pepperoni Feast", sizeCode: "LT88", sizeDescription: "Large Thin", inventoryDescription: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", portionUnit: "GMS", amountV2: "60.00", amountVX: "55.00", highlight: true },
        { menuCode: "PIZ0MNOP", category: "Pizza", description: "Pepperoni Feast", sizeCode: "LT88", sizeDescription: "Large Thin", inventoryDescription: "SAU_Tomato Blend", inventoryCode: "SPI0001", portionUnit: "GMS", amountV2: "80.00", amountVX: "80.00", highlight: false },
        { menuCode: "PIZ0MNOP", category: "Pizza", description: "Pepperoni Feast", sizeCode: "LT88", sizeDescription: "Large Thin", inventoryDescription: "PIE_Thin Crust Dough Large (200gm)", inventoryCode: "80000165", portionUnit: "NOS", amountV2: "1.00", amountVX: "1.00", highlight: false }
      ]
    },
    "PZ015-ingredient": {
      type: "ingredient",
      ingredients: [
        { menuCode: "PIZ0QRST", category: "Pizza", description: "Chicken Supreme", sizeCode: "MT45", sizeDescription: "Medium Thick", inventoryDescV2: "MT_Grilled Chicken", inventoryCodeV2: "MT0012", inventoryDescVX: "MT_Chicken Tikka", inventoryCodeVX: "MT0015", portionUnit: "GMS", amount: "35.00", highlight: true },
        { menuCode: "PIZ0QRST", category: "Pizza", description: "Chicken Supreme", sizeCode: "MT45", sizeDescription: "Medium Thick", inventoryDescV2: "CH_Diced Mozzarella - New Specs", inventoryCodeV2: "10000721", inventoryDescVX: "CH_Diced Mozzarella - New Specs", inventoryCodeVX: "10000721", portionUnit: "GMS", amount: "50.00", highlight: false },
        { menuCode: "PIZ0QRST", category: "Pizza", description: "Chicken Supreme", sizeCode: "MT45", sizeDescription: "Medium Thick", inventoryDescV2: "VG TOP_Onion", inventoryCodeV2: "VFF0001", inventoryDescVX: "VG TOP_Onion", inventoryCodeVX: "VFF0001", portionUnit: "GMS", amount: "25.00", highlight: false }
      ]
    }
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

  const handleViewRecipe = (menuCode: string, isProductDialog: boolean = false) => {
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
                        {expandedRecipe === product.menuCode && mockRecipeDetailsBasic[product.menuCode] && (
                          <TableRow>
                            <TableCell colSpan={7} className="p-0">
                              <div className="bg-muted/30 dark:bg-muted/10 p-4 border-t">
                                <h6 className="font-semibold mb-3">Recipe Details - {product.menuCode}</h6>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-muted/50">
                                        <TableHead>Menu Code</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Size Code</TableHead>
                                        <TableHead>Size Description</TableHead>
                                        <TableHead>Inventory Description</TableHead>
                                        <TableHead>Inventory Code</TableHead>
                                        <TableHead>Portion Unit</TableHead>
                                        <TableHead>Amount</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {mockRecipeDetailsBasic[product.menuCode].map((item: any, idx: number) => (
                                        <TableRow key={idx}>
                                          <TableCell>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                              {item.menuCode}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="outline" className="text-xs">
                                              {item.category}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-sm">{item.description}</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                              {item.sizeCode}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-sm">{item.sizeDescription}</TableCell>
                                          <TableCell className="text-sm">{item.inventoryDescription}</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                              {item.inventoryCode}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="outline" className="text-xs">
                                              {item.portionUnit}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-sm">{item.amount}</TableCell>
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
                        {expandedRecipe === product.menuCode && mockRecipeDifferencesDetails[`${product.menuCode}-${product.differenceType === 'Ingredient change' ? 'ingredient' : 'grammage'}`] && (
                          <TableRow>
                            <TableCell colSpan={6} className="p-0">
                              <div className="bg-muted/30 dark:bg-muted/10 p-4 border-t">
                                <h6 className="font-semibold mb-3">Recipe Comparison - {product.menuCode}</h6>
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-muted/50">
                                        <TableHead>Menu Code</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Size Code</TableHead>
                                        <TableHead>Size Description</TableHead>
                                        {mockRecipeDifferencesDetails[`${product.menuCode}-${product.differenceType === 'Ingredient change' ? 'ingredient' : 'grammage'}`].type === 'ingredient' ? (
                                          <>
                                            <TableHead>Inventory Description in {currentDialogData?.version}</TableHead>
                                            <TableHead>Inventory Code in {currentDialogData?.version}</TableHead>
                                            <TableHead>Inventory Description in {selectedVersion}</TableHead>
                                            <TableHead>Inventory Code in {selectedVersion}</TableHead>
                                            <TableHead>Portion Unit</TableHead>
                                            <TableHead>Amount</TableHead>
                                          </>
                                        ) : (
                                          <>
                                            <TableHead>Inventory Description</TableHead>
                                            <TableHead>Inventory Code</TableHead>
                                            <TableHead>Portion Unit</TableHead>
                                            <TableHead>Amount in {currentDialogData?.version}</TableHead>
                                            <TableHead>Amount in {selectedVersion}</TableHead>
                                          </>
                                        )}
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {mockRecipeDifferencesDetails[`${product.menuCode}-${product.differenceType === 'Ingredient change' ? 'ingredient' : 'grammage'}`].ingredients.map((item: any, idx: number) => (
                                        <TableRow key={idx} className={item.highlight ? 'bg-amber-50 dark:bg-amber-950/30' : ''}>
                                          <TableCell>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                              {item.menuCode}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="outline" className="text-xs">
                                              {item.category}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-sm">{item.description}</TableCell>
                                          <TableCell>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                              {item.sizeCode}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-sm">{item.sizeDescription}</TableCell>
                                          {mockRecipeDifferencesDetails[`${product.menuCode}-${product.differenceType === 'Ingredient change' ? 'ingredient' : 'grammage'}`].type === 'ingredient' ? (
                                            <>
                                              <TableCell className="text-sm">{item.inventoryDescV2}</TableCell>
                                              <TableCell>
                                                <Badge variant="secondary" className="font-mono text-xs">
                                                  {item.inventoryCodeV2}
                                                </Badge>
                                              </TableCell>
                                              <TableCell className="text-sm">{item.inventoryDescVX}</TableCell>
                                              <TableCell>
                                                <Badge variant="secondary" className="font-mono text-xs">
                                                  {item.inventoryCodeVX}
                                                </Badge>
                                              </TableCell>
                                              <TableCell>
                                                <Badge variant="outline" className="text-xs">
                                                  {item.portionUnit}
                                                </Badge>
                                              </TableCell>
                                              <TableCell className="text-sm">{item.amount}</TableCell>
                                            </>
                                          ) : (
                                            <>
                                              <TableCell className="text-sm">{item.inventoryDescription}</TableCell>
                                              <TableCell>
                                                <Badge variant="secondary" className="font-mono text-xs">
                                                  {item.inventoryCode}
                                                </Badge>
                                              </TableCell>
                                              <TableCell>
                                                <Badge variant="outline" className="text-xs">
                                                  {item.portionUnit}
                                                </Badge>
                                              </TableCell>
                                              <TableCell className="text-sm">{item.amountV2}</TableCell>
                                              <TableCell className="text-sm">{item.amountVX}</TableCell>
                                            </>
                                          )}
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

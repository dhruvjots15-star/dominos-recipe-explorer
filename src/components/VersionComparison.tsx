import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GitCompare, Package, FileText, AlertTriangle, CheckCircle, Users, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Version {
  id: string;
  name: string;
  description: string;
  stores: number;
  status: string;
  lastUpdated: string;
  products: number;
  recipes: number;
  ingredients: number;
}

interface VersionComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion: string;
}

const mockVersions: Version[] = [
  {
    id: "v1.0",
    name: "Version 1.0 - Base Launch",
    description: "Initial recipe bank with core product portfolio",
    stores: 1876,
    status: "Active",
    lastUpdated: "2024-01-15",
    products: 687,
    recipes: 4811,
    ingredients: 1553
  },
  {
    id: "v1.1",
    name: "Version 1.1 - Q1 Update",
    description: "Addition of new seasonal items and recipe optimization",
    stores: 1945,
    status: "Active",
    lastUpdated: "2024-03-20",
    products: 712,
    recipes: 4956,
    ingredients: 1602
  },
  {
    id: "v1.2",
    name: "Version 1.2 - Summer Special",
    description: "Summer menu additions and ingredient cost optimization",
    stores: 2012,
    status: "Active",
    lastUpdated: "2024-06-15",
    products: 745,
    recipes: 5134,
    ingredients: 1687
  },
  {
    id: "v2.0",
    name: "Version 2.0 - Major Overhaul",
    description: "Complete recipe restructuring with new categorization",
    stores: 2156,
    status: "Draft",
    lastUpdated: "2024-08-30",
    products: 823,
    recipes: 5789,
    ingredients: 1843
  }
];

const mockDifferences = {
  summary: {
    productsOnlyInV1: 45,
    productsOnlyInV2: 81,
    productsWithDifferentRecipes: 123,
    ingredientChanges: 89,
    grammageChanges: 78
  },
  productsOnlyInV1: [
    { menuCode: "PZ012", category: "Pizza", productName: "Veggie Deluxe Classic", sizeCode: "REG", sizeDesc: "Regular", ingredients: 8 },
    { menuCode: "PZ018", category: "Pizza", productName: "Chicken Tikka Special", sizeCode: "LRG", sizeDesc: "Large", ingredients: 12 },
    { menuCode: "PZ032", category: "Pizza", productName: "Mediterranean Garden", sizeCode: "REG", sizeDesc: "Regular", ingredients: 10 }
  ],
  productsOnlyInV2: [
    { menuCode: "PZ025", category: "Pizza", productName: "BBQ Chicken Supreme", sizeCode: "REG", sizeDesc: "Regular", ingredients: 11 },
    { menuCode: "PZ047", category: "Pizza", productName: "Truffle Delight", sizeCode: "LRG", sizeDesc: "Large", ingredients: 9 },
    { menuCode: "PZ051", category: "Pizza", productName: "Spicy Jalapeño", sizeCode: "REG", sizeDesc: "Regular", ingredients: 7 }
  ],
  productsWithDifferentRecipes: [
    {
      menuCode: "PZ001",
      category: "Pizza", 
      productName: "Margherita Pizza Regular",
      sizeCode: "REG",
      sizeDesc: "Regular",
      v1Ingredients: 6,
      v2Ingredients: 6,
      changes: [
        { type: "ingredient", description: "Mozzarella cheese replaced with Premium Mozzarella", impact: "Quality upgrade" },
        { type: "grammage", description: "Tomato sauce reduced from 80g to 75g", impact: "Cost optimization" }
      ]
    },
    {
      menuCode: "PZ008",
      category: "Pizza",
      productName: "Pepperoni Feast", 
      sizeCode: "LRG",
      sizeDesc: "Large",
      v1Ingredients: 8,
      v2Ingredients: 8,
      changes: [
        { type: "grammage", description: "Pepperoni increased from 45g to 50g", impact: "Portion enhancement" }
      ]
    },
    {
      menuCode: "PZ015",
      category: "Pizza",
      productName: "Chicken Supreme",
      sizeCode: "REG", 
      sizeDesc: "Regular",
      v1Ingredients: 9,
      v2Ingredients: 10,
      changes: [
        { type: "ingredient", description: "Added Bell Peppers", impact: "Menu enhancement" },
        { type: "grammage", description: "Chicken increased from 60g to 65g", impact: "Portion enhancement" }
      ]
    }
  ]
};

export const VersionComparison = ({ isOpen, onClose, currentVersion }: VersionComparisonProps) => {
  const [compareVersion, setCompareVersion] = useState<string>("");
  const [showComparison, setShowComparison] = useState(false);

  const currentVersionData = mockVersions.find(v => v.id === currentVersion);
  const compareVersionData = mockVersions.find(v => v.id === compareVersion);
  const availableVersions = mockVersions.filter(v => v.id !== currentVersion);

  const handleVersionSelect = (versionId: string) => {
    setCompareVersion(versionId);
    setShowComparison(true);
  };

  const handleBack = () => {
    setShowComparison(false);
    setCompareVersion("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "recipe_changed":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "only_in_v2":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "only_in_v1":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "grammage_changed":
        return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recipe_changed":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Recipe Changed</Badge>;
      case "only_in_v2":
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">New in {compareVersionData?.name}</Badge>;
      case "only_in_v1":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Removed in {compareVersionData?.name}</Badge>;
      case "grammage_changed":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Grammage Changed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {showComparison && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <GitCompare className="w-6 h-6 text-primary" />
            Compare Recipe Bank Versions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Version Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Version */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Current Version
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{currentVersionData?.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentVersionData?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{currentVersionData?.stores.toLocaleString()} stores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(currentVersionData?.lastUpdated || "").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>{currentVersionData?.products} products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{currentVersionData?.recipes.toLocaleString()} recipes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compare Version Selection */}
            <Card className={compareVersion ? "border-2 border-emerald-200" : "border-dashed border-2 border-muted-foreground/30"}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-emerald-600" />
                  Compare With
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!compareVersion ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Select a version to compare</p>
                    <Select onValueChange={handleVersionSelect}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose version to compare" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVersions.map((version) => (
                          <SelectItem key={version.id} value={version.id}>
                            {version.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-semibold text-lg">{compareVersionData?.name}</h3>
                      <p className="text-sm text-muted-foreground">{compareVersionData?.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{compareVersionData?.stores.toLocaleString()} stores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(compareVersionData?.lastUpdated || "").toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span>{compareVersionData?.products} products</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{compareVersionData?.recipes.toLocaleString()} recipes</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCompareVersion("")}
                      className="w-full mt-2"
                    >
                      Change Version
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Comparison Results */}
          {showComparison && compareVersionData && (
            <div className="space-y-6">
              <Separator />

              {/* Comparison Summary */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GitCompare className="w-5 h-5" />
                  Comparison Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {mockDifferences.summary.productsOnlyInV1}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Products only in {currentVersionData.name.split(' - ')[0]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          {mockDifferences.summary.productsOnlyInV2}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          New products in {compareVersionData.name.split(' - ')[0]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600 mb-1">
                          {mockDifferences.summary.productsWithDifferentRecipes}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Products with different recipes
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {mockDifferences.summary.ingredientChanges} ingredient changes, {mockDifferences.summary.grammageChanges} grammage changes
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Detailed Comparison */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Detailed Comparison
                </h3>
                <div className="space-y-8">
                  {/* Products only in V1 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-red-600">
                      {mockDifferences.summary.productsOnlyInV1} Products in {currentVersionData.name} not in {compareVersionData.name}
                    </h4>
                    <div className="space-y-2">
                      {mockDifferences.productsOnlyInV1.map((product, index) => (
                        <Card key={index}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="grid grid-cols-6 gap-4 flex-1 text-sm">
                                <span className="font-medium">{product.menuCode}</span>
                                <span>{product.category}</span>
                                <span>{product.productName}</span>
                                <span>{product.sizeCode}</span>
                                <span>{product.sizeDesc}</span>
                                <span>{product.ingredients} ingredients</span>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Products only in V2 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-emerald-600">
                      {mockDifferences.summary.productsOnlyInV2} New products in {compareVersionData.name}
                    </h4>
                    <div className="space-y-2">
                      {mockDifferences.productsOnlyInV2.map((product, index) => (
                        <Card key={index}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="grid grid-cols-6 gap-4 flex-1 text-sm">
                                <span className="font-medium">{product.menuCode}</span>
                                <span>{product.category}</span>
                                <span>{product.productName}</span>
                                <span>{product.sizeCode}</span>
                                <span>{product.sizeDesc}</span>
                                <span>{product.ingredients} ingredients</span>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Products with different recipes */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-amber-600">
                      {mockDifferences.summary.productsWithDifferentRecipes} Products with different recipes
                    </h4>
                    <div className="space-y-4">
                      {mockDifferences.productsWithDifferentRecipes.map((product, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <span className="font-semibold">{product.menuCode} - {product.productName}</span>
                                <Badge variant="secondary">{product.sizeCode} ({product.sizeDesc})</Badge>
                              </div>
                              <Button variant="outline" size="sm">
                                View Full Recipe
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <h5 className="font-medium text-red-800 mb-2">{currentVersionData.name}</h5>
                                <p className="text-sm text-red-700">{product.v1Ingredients} ingredients</p>
                              </div>
                              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <h5 className="font-medium text-emerald-800 mb-2">{compareVersionData.name}</h5>
                                <p className="text-sm text-emerald-700">{product.v2Ingredients} ingredients</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h6 className="font-medium text-sm">Changes:</h6>
                              {product.changes.map((change, changeIndex) => (
                                <div key={changeIndex} className="bg-muted/50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                      {change.type === 'ingredient' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                                      {change.type === 'grammage' && <AlertTriangle className="w-4 h-4 text-blue-600" />}
                                      <p className="text-sm font-medium">{change.description}</p>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                      {change.impact}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
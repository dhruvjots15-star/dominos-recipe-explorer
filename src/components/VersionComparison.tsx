import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GitCompare, Package, FileText, AlertTriangle, CheckCircle, Users, Calendar, ChevronDown, ChevronUp } from "lucide-react";
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

const mockRecipeDetails = {
  "PZ001": {
    v1: [
      { ingredient: "Pizza Base", grammage: "120g" },
      { ingredient: "Tomato Sauce", grammage: "80g" },
      { ingredient: "Mozzarella Cheese", grammage: "45g" },
      { ingredient: "Oregano", grammage: "2g" },
      { ingredient: "Olive Oil", grammage: "5ml" },
      { ingredient: "Basil", grammage: "3g" }
    ],
    v2: [
      { ingredient: "Pizza Base", grammage: "120g" },
      { ingredient: "Tomato Sauce", grammage: "75g" },
      { ingredient: "Premium Mozzarella", grammage: "45g" },
      { ingredient: "Oregano", grammage: "2g" },
      { ingredient: "Olive Oil", grammage: "5ml" },
      { ingredient: "Basil", grammage: "3g" }
    ]
  },
  "PZ008": {
    v1: [
      { ingredient: "Pizza Base", grammage: "140g" },
      { ingredient: "Tomato Sauce", grammage: "90g" },
      { ingredient: "Mozzarella Cheese", grammage: "55g" },
      { ingredient: "Pepperoni", grammage: "45g" },
      { ingredient: "Bell Peppers", grammage: "20g" },
      { ingredient: "Onions", grammage: "15g" },
      { ingredient: "Oregano", grammage: "2g" },
      { ingredient: "Olive Oil", grammage: "5ml" }
    ],
    v2: [
      { ingredient: "Pizza Base", grammage: "140g" },
      { ingredient: "Tomato Sauce", grammage: "90g" },
      { ingredient: "Mozzarella Cheese", grammage: "55g" },
      { ingredient: "Pepperoni", grammage: "50g" },
      { ingredient: "Bell Peppers", grammage: "20g" },
      { ingredient: "Onions", grammage: "15g" },
      { ingredient: "Oregano", grammage: "2g" },
      { ingredient: "Olive Oil", grammage: "5ml" }
    ]
  }
};

interface ProductComparisonRowProps {
  product: any;
  currentVersionData: any;
  compareVersionData: any;
  differenceType: string;
}

const ProductComparisonRow = ({ product, currentVersionData, compareVersionData, differenceType }: ProductComparisonRowProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const v1Recipe = mockRecipeDetails[product.menuCode]?.v1 || [];
  const v2Recipe = mockRecipeDetails[product.menuCode]?.v2 || [];
  
  const getRowHighlight = (v1Ingredient: string, v1Grammage: string, v2Ingredient: string, v2Grammage: string) => {
    if (v1Ingredient !== v2Ingredient) return "bg-orange-100 border-orange-200";
    if (v1Grammage !== v2Grammage) return "bg-red-50 border-red-200";
    return "bg-gray-50 text-muted-foreground";
  };

  return (
    <>
      <tr className="border-b hover:bg-amber-25">
        <td className="p-3 font-medium">{product.menuCode}</td>
        <td className="p-3">{product.productName}</td>
        <td className="p-3">{product.category}</td>
        <td className="p-3">{product.sizeCode}</td>
        <td className="p-3">{product.sizeDesc}</td>
        <td className="p-3">
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            {differenceType}
          </Badge>
        </td>
        <td className="p-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1"
          >
            View 
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </Button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7} className="p-0">
            <div className="bg-gray-50 p-4 border-t">
              <h6 className="font-semibold mb-3">Recipe Comparison - {product.menuCode}</h6>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2 font-medium">Ingredient ({currentVersionData.name.split(' - ')[0]})</th>
                      <th className="text-left p-2 font-medium">Grammage ({currentVersionData.name.split(' - ')[0]})</th>
                      <th className="text-left p-2 font-medium">Ingredient ({compareVersionData.name.split(' - ')[0]})</th>
                      <th className="text-left p-2 font-medium">Grammage ({compareVersionData.name.split(' - ')[0]})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Math.max(v1Recipe.length, v2Recipe.length) && Array.from({ length: Math.max(v1Recipe.length, v2Recipe.length) }).map((_, index) => {
                      const v1Item = v1Recipe[index];
                      const v2Item = v2Recipe[index];
                      const v1Ingredient = v1Item?.ingredient || "";
                      const v1Grammage = v1Item?.grammage || "";
                      const v2Ingredient = v2Item?.ingredient || "";
                      const v2Grammage = v2Item?.grammage || "";
                      
                      return (
                        <tr key={index} className={`border ${getRowHighlight(v1Ingredient, v1Grammage, v2Ingredient, v2Grammage)}`}>
                          <td className="p-2">{v1Ingredient}</td>
                          <td className="p-2">{v1Grammage}</td>
                          <td className="p-2">
                            {v2Ingredient && v1Ingredient !== v2Ingredient && (
                              <span className="font-bold text-red-600">{v2Ingredient}</span>
                            )}
                            {v2Ingredient && v1Ingredient === v2Ingredient && v2Ingredient}
                          </td>
                          <td className="p-2">
                            {v2Grammage && v1Grammage !== v2Grammage && (
                              <span className="font-bold text-red-600">{v1Grammage} → {v2Grammage}</span>
                            )}
                            {v2Grammage && v1Grammage === v2Grammage && v2Grammage}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
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
                  {/* Table 1 - Products only in V1 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-red-600">
                      Products found in {currentVersionData.name.split(' - ')[0]} but not in {compareVersionData.name.split(' - ')[0]}
                    </h4>
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-red-50 border-b">
                              <tr>
                                <th className="text-left p-3 font-medium text-red-800">Menu Code</th>
                                <th className="text-left p-3 font-medium text-red-800">Product Description</th>
                                <th className="text-left p-3 font-medium text-red-800">Category</th>
                                <th className="text-left p-3 font-medium text-red-800">Size Code</th>
                                <th className="text-left p-3 font-medium text-red-800">Size Description</th>
                                <th className="text-left p-3 font-medium text-red-800">View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockDifferences.productsOnlyInV1.map((product, index) => (
                                <tr key={index} className="border-b hover:bg-red-25">
                                  <td className="p-3 font-medium">{product.menuCode}</td>
                                  <td className="p-3">{product.productName}</td>
                                  <td className="p-3">{product.category}</td>
                                  <td className="p-3">{product.sizeCode}</td>
                                  <td className="p-3">{product.sizeDesc}</td>
                                  <td className="p-3">
                                    <Button variant="outline" size="sm">
                                      View
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Table 2 - Products only in V2 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-emerald-600">
                      Products found in {compareVersionData.name.split(' - ')[0]} but not in {currentVersionData.name.split(' - ')[0]}
                    </h4>
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-emerald-50 border-b">
                              <tr>
                                <th className="text-left p-3 font-medium text-emerald-800">Menu Code</th>
                                <th className="text-left p-3 font-medium text-emerald-800">Product Description</th>
                                <th className="text-left p-3 font-medium text-emerald-800">Category</th>
                                <th className="text-left p-3 font-medium text-emerald-800">Size Code</th>
                                <th className="text-left p-3 font-medium text-emerald-800">Size Description</th>
                                <th className="text-left p-3 font-medium text-emerald-800">View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockDifferences.productsOnlyInV2.map((product, index) => (
                                <tr key={index} className="border-b hover:bg-emerald-25">
                                  <td className="p-3 font-medium">{product.menuCode}</td>
                                  <td className="p-3">{product.productName}</td>
                                  <td className="p-3">{product.category}</td>
                                  <td className="p-3">{product.sizeCode}</td>
                                  <td className="p-3">{product.sizeDesc}</td>
                                  <td className="p-3">
                                    <Button variant="outline" size="sm">
                                      View
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Table 3 - Common Products with Recipe Differences */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-amber-600">
                      Products found in both versions but with recipe differences
                    </h4>
                    
                    {/* Table 3a - Products with Ingredient Differences */}
                    <div className="mb-6">
                      <h5 className="text-md font-semibold mb-3 text-amber-700">
                        Products with Ingredient Differences
                      </h5>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-amber-50 border-b">
                                <tr>
                                  <th className="text-left p-3 font-medium text-amber-800">Menu Code</th>
                                  <th className="text-left p-3 font-medium text-amber-800">Product Description</th>
                                  <th className="text-left p-3 font-medium text-amber-800">Category</th>
                                  <th className="text-left p-3 font-medium text-amber-800">Size Code</th>
                                  <th className="text-left p-3 font-medium text-amber-800">Size Description</th>
                                  <th className="text-left p-3 font-medium text-amber-800">Difference Type</th>
                                  <th className="text-left p-3 font-medium text-amber-800">View</th>
                                </tr>
                              </thead>
                              <tbody>
                                {mockDifferences.productsWithDifferentRecipes
                                  .filter(product => product.changes.some(change => change.type === 'ingredient'))
                                  .map((product, index) => (
                                    <ProductComparisonRow 
                                      key={`ingredient-${index}`} 
                                      product={product} 
                                      currentVersionData={currentVersionData}
                                      compareVersionData={compareVersionData}
                                      differenceType="Ingredient Change"
                                    />
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Table 3b - Products with Grammage Differences */}
                    <div>
                      <h5 className="text-md font-semibold mb-3 text-blue-700">
                        Products with Grammage Differences
                      </h5>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-blue-50 border-b">
                                <tr>
                                  <th className="text-left p-3 font-medium text-blue-800">Menu Code</th>
                                  <th className="text-left p-3 font-medium text-blue-800">Product Description</th>
                                  <th className="text-left p-3 font-medium text-blue-800">Category</th>
                                  <th className="text-left p-3 font-medium text-blue-800">Size Code</th>
                                  <th className="text-left p-3 font-medium text-blue-800">Size Description</th>
                                  <th className="text-left p-3 font-medium text-blue-800">Difference Type</th>
                                  <th className="text-left p-3 font-medium text-blue-800">View</th>
                                </tr>
                              </thead>
                              <tbody>
                                {mockDifferences.productsWithDifferentRecipes
                                  .filter(product => product.changes.some(change => change.type === 'grammage'))
                                  .map((product, index) => (
                                    <ProductComparisonRow 
                                      key={`grammage-${index}`} 
                                      product={product} 
                                      currentVersionData={currentVersionData}
                                      compareVersionData={compareVersionData}
                                      differenceType="Grammage Change"
                                    />
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
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
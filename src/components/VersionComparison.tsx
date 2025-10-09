import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GitCompare, Package, FileText, AlertTriangle, CheckCircle, Users, Calendar, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    id: "v5",
    name: "v5 All India Master",
    description: "Default for All India stores",
    stores: 1560,
    status: "Active",
    lastUpdated: "2025-03-25",
    products: 558,
    recipes: 2307,
    ingredients: 206
  },
  {
    id: "v6",
    name: "v6 PM Changeover",
    description: "Delhi NCR + Selection of Beta stores",
    stores: 432,
    status: "Active",
    lastUpdated: "2025-04-20",
    products: 543,
    recipes: 2286,
    ingredients: 206
  },
  {
    id: "v7",
    name: "v7 Maharshtra Only",
    description: "All Mahashtra stores",
    stores: 330,
    status: "Active",
    lastUpdated: "2025-04-27",
    products: 563,
    recipes: 2433,
    ingredients: 210
  },
  {
    id: "v8",
    name: "v8 Mozz + Cheddar for CHD",
    description: "All Stores mapped to CHD SCC",
    stores: 155,
    status: "Active",
    lastUpdated: "2025-08-04",
    products: 558,
    recipes: 2307,
    ingredients: 211
  },
  {
    id: "v9",
    name: "v9 BBP Doughball change only",
    description: "125 Beta stores across India",
    stores: 125,
    status: "Active",
    lastUpdated: "2025-08-14",
    products: 543,
    recipes: 2307,
    ingredients: 207
  }
];

const mockDifferences = {
  summary: {
    productsIdentical: 359,
    productsOnlyInV1: 45,
    productsOnlyInV2: 81,
    productsWithDifferentRecipes: 123,
    ingredientChanges: 89,
    grammageChanges: 78
  },
  productsOnlyInV1: [
    { menuCode: "PZ012", category: "Pizza", productName: "Veggie Deluxe Classic", sizeCode: "HT07", sizeDesc: "Half Thick", ingredients: 8 },
    { menuCode: "PZ018", category: "Pizza", productName: "Chicken Tikka Special", sizeCode: "HT95", sizeDesc: "Half Thick XL", ingredients: 12 },
    { menuCode: "PZ032", category: "Pizza", productName: "Mediterranean Garden", sizeCode: "RT12", sizeDesc: "Regular Thin", ingredients: 10 }
  ],
  productsOnlyInV2: [
    { menuCode: "PZ025", category: "Pizza", productName: "BBQ Chicken Supreme", sizeCode: "MT45", sizeDesc: "Medium Thick", ingredients: 11 },
    { menuCode: "PZ047", category: "Pizza", productName: "Truffle Delight", sizeCode: "LT88", sizeDesc: "Large Thin", ingredients: 9 },
    { menuCode: "PZ051", category: "Pizza", productName: "Spicy Jalapeño", sizeCode: "ST23", sizeDesc: "Small Thick", ingredients: 7 }
  ],
  productsWithDifferentRecipes: [
    {
      menuCode: "PZ001",
      category: "Pizza", 
      productName: "Margherita Pizza Regular",
      sizeCode: "RT12",
      sizeDesc: "Regular Thin",
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
      sizeCode: "LT88",
      sizeDesc: "Large Thin",
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
      sizeCode: "MT45", 
      sizeDesc: "Medium Thick",
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
      <TableRow className="hover:bg-amber-25">
        <TableCell>
          <Badge variant="outline" className="font-mono text-xs">
            {product.menuCode}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="font-medium text-sm max-w-xs truncate" title={product.productName}>
            {product.productName}
          </div>
        </TableCell>
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
        <TableCell>
          <span className="text-sm">{product.sizeDesc}</span>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            {differenceType}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex justify-center">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setExpanded(!expanded)}
              className="h-8 w-8 p-0"
              title="View Recipe Comparison"
            >
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={7} className="p-0">
            <div className="bg-gray-50 p-4 border-t">
              <h6 className="font-semibold mb-3">Recipe Comparison - {product.menuCode}</h6>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-semibold">Ingredient ({currentVersionData.name.split(' - ')[0]})</TableHead>
                      <TableHead className="font-semibold">Grammage ({currentVersionData.name.split(' - ')[0]})</TableHead>
                      <TableHead className="font-semibold">Ingredient ({compareVersionData.name.split(' - ')[0]})</TableHead>
                      <TableHead className="font-semibold">Grammage ({compareVersionData.name.split(' - ')[0]})</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Math.max(v1Recipe.length, v2Recipe.length) && Array.from({ length: Math.max(v1Recipe.length, v2Recipe.length) }).map((_, index) => {
                      const v1Item = v1Recipe[index];
                      const v2Item = v2Recipe[index];
                      const v1Ingredient = v1Item?.ingredient || "";
                      const v1Grammage = v1Item?.grammage || "";
                      const v2Ingredient = v2Item?.ingredient || "";
                      const v2Grammage = v2Item?.grammage || "";
                      
                      return (
                        <TableRow key={index} className={`${getRowHighlight(v1Ingredient, v1Grammage, v2Ingredient, v2Grammage)}`}>
                          <TableCell className="p-2">{v1Ingredient}</TableCell>
                          <TableCell className="p-2">{v1Grammage}</TableCell>
                          <TableCell className="p-2">
                            {v2Ingredient && v1Ingredient !== v2Ingredient && (
                              <span className="font-bold text-red-600">{v2Ingredient}</span>
                            )}
                            {v2Ingredient && v1Ingredient === v2Ingredient && v2Ingredient}
                          </TableCell>
                          <TableCell className="p-2">
                            {v2Grammage && v1Grammage !== v2Grammage && (
                              <span className="font-bold text-red-600">{v1Grammage} → {v2Grammage}</span>
                            )}
                            {v2Grammage && v1Grammage === v2Grammage && v2Grammage}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TableCell>
        </TableRow>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          {mockDifferences.summary.productsIdentical}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Products Identical in both versions
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {mockDifferences.summary.productsOnlyInV1}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Products Only in {currentVersionData.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {mockDifferences.summary.productsOnlyInV2}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Products Only in {compareVersionData.name}
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
                      {mockDifferences.summary.productsOnlyInV1} Products found in {currentVersionData.name} but not in {compareVersionData.name}
                    </h4>
                    <Card>
                      <CardContent className="p-0">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-red-50">
                                <TableHead className="font-semibold text-red-800">Menu Code</TableHead>
                                <TableHead className="font-semibold text-red-800">Product Description</TableHead>
                                <TableHead className="font-semibold text-red-800">Category</TableHead>
                                <TableHead className="font-semibold text-red-800">Size Code</TableHead>
                                <TableHead className="font-semibold text-red-800">Size Description</TableHead>
                                <TableHead className="font-semibold text-red-800 text-center">Ingredients</TableHead>
                                <TableHead className="font-semibold text-red-800 w-20 text-center">View</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockDifferences.productsOnlyInV1.map((product, index) => (
                                <TableRow key={index} className="hover:bg-red-25">
                                  <TableCell>
                                    <Badge variant="outline" className="font-mono text-xs">
                                      {product.menuCode}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium text-sm max-w-xs truncate" title={product.productName}>
                                      {product.productName}
                                    </div>
                                  </TableCell>
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
                                  <TableCell>
                                    <span className="text-sm">{product.sizeDesc}</span>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline" className="text-xs">
                                      {product.ingredients}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex justify-center">
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 w-8 p-0"
                                        title="View Recipe"
                                      >
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="p-3 text-center text-sm text-muted-foreground border-t">
                          ...{mockDifferences.summary.productsOnlyInV1 - 3} more products
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Table 2 - Products only in V2 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-600">
                      {mockDifferences.summary.productsOnlyInV2} Products found in {compareVersionData.name} but not in {currentVersionData.name}
                    </h4>
                    <Card>
                      <CardContent className="p-0">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-emerald-50">
                                <TableHead className="font-semibold text-emerald-800">Menu Code</TableHead>
                                <TableHead className="font-semibold text-emerald-800">Product Description</TableHead>
                                <TableHead className="font-semibold text-emerald-800">Category</TableHead>
                                <TableHead className="font-semibold text-emerald-800">Size Code</TableHead>
                                <TableHead className="font-semibold text-emerald-800">Size Description</TableHead>
                                <TableHead className="font-semibold text-emerald-800 text-center">Ingredients</TableHead>
                                <TableHead className="font-semibold text-emerald-800 w-20 text-center">View</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockDifferences.productsOnlyInV2.map((product, index) => (
                                <TableRow key={index} className="hover:bg-emerald-25">
                                  <TableCell>
                                    <Badge variant="outline" className="font-mono text-xs">
                                      {product.menuCode}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium text-sm max-w-xs truncate" title={product.productName}>
                                      {product.productName}
                                    </div>
                                  </TableCell>
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
                                  <TableCell>
                                    <span className="text-sm">{product.sizeDesc}</span>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline" className="text-xs">
                                      {product.ingredients}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex justify-center">
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 w-8 p-0"
                                        title="View Recipe"
                                      >
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="p-3 text-center text-sm text-muted-foreground border-t">
                          ...{mockDifferences.summary.productsOnlyInV2 - 3} more products
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
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-amber-50">
                                  <TableHead className="font-semibold text-amber-800">Menu Code</TableHead>
                                  <TableHead className="font-semibold text-amber-800">Product Description</TableHead>
                                  <TableHead className="font-semibold text-amber-800">Category</TableHead>
                                  <TableHead className="font-semibold text-amber-800">Size Code</TableHead>
                                  <TableHead className="font-semibold text-amber-800">Size Description</TableHead>
                                  <TableHead className="font-semibold text-amber-800">Difference Type</TableHead>
                                  <TableHead className="font-semibold text-amber-800 w-20 text-center">View</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
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
                              </TableBody>
                            </Table>
                          </div>
                          <div className="p-3 text-center text-sm text-muted-foreground border-t">
                            ...more products with ingredient differences
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
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-blue-50">
                                  <TableHead className="font-semibold text-blue-800">Menu Code</TableHead>
                                  <TableHead className="font-semibold text-blue-800">Product Description</TableHead>
                                  <TableHead className="font-semibold text-blue-800">Category</TableHead>
                                  <TableHead className="font-semibold text-blue-800">Size Code</TableHead>
                                  <TableHead className="font-semibold text-blue-800">Size Description</TableHead>
                                  <TableHead className="font-semibold text-blue-800">Difference Type</TableHead>
                                  <TableHead className="font-semibold text-blue-800 w-20 text-center">View</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
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
                              </TableBody>
                            </Table>
                          </div>
                          <div className="p-3 text-center text-sm text-muted-foreground border-t">
                            ...more products with grammage differences
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
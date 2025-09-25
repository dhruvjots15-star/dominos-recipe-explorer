import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { VersionSelector } from "./VersionSelector";
import { FilterPanel } from "./FilterPanel";
import { RecipeTable } from "./RecipeTable";

// Mock data for demonstration
const mockRecipeData = [
  {
    menuCode: "PIZ0119",
    menuCategory: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "BOX_PKG- Box Regular",
    inventoryCode: "BOX0001",
    portionUnit: "NOS",
    amount: "1.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategory: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "Cold Dough Regular (140 Gm)",
    inventoryCode: "80001097",
    portionUnit: "NOS",
    amount: "1.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategory: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "CH_Diced Mozzarella - New Specs",
    inventoryCode: "10000721",
    portionUnit: "GMS",
    amount: "48.00"
  }
];

export const RecipeMaster = () => {
  const [selectedVersion, setSelectedVersion] = useState("v5.2");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Recipe Master</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all active product recipes across Dominos stores
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Version Selector */}
      <VersionSelector 
        selectedVersion={selectedVersion}
        onVersionChange={setSelectedVersion}
      />

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by product name, menu code, or ingredient..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters && <Badge variant="secondary" className="ml-1">On</Badge>}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel onClose={() => setShowFilters(false)} />
      )}

      {/* Recipe Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">Total Recipes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">387</div>
            <p className="text-xs text-muted-foreground">Active Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-dominos-blue">48</div>
            <p className="text-xs text-muted-foreground">Size Variants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">4</div>
            <p className="text-xs text-muted-foreground">Active Channels</p>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Table */}
      <RecipeTable data={mockRecipeData} searchTerm={searchTerm} />
    </div>
  );
};
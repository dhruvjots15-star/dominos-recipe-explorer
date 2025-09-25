import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  onClose: () => void;
}

export const FilterPanel = ({ onClose }: FilterPanelProps) => {
  return (
    <Card className="border-accent/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Advanced Filters</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Product Categories</Label>
            <div className="space-y-2">
              {["Pizza", "Sides", "Beverages", "Desserts", "Combos"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label 
                    htmlFor={`category-${category}`} 
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Size Codes */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Size Codes</Label>
            <div className="space-y-2">
              {["Regular", "Medium", "Large", "Personal"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label 
                    htmlFor={`size-${size}`} 
                    className="text-sm cursor-pointer"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Crust Types */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Crust Types</Label>
            <div className="space-y-2">
              {["Hand Tossed", "Cheese Burst", "Wheat Thin", "Ragi Crust"].map((crust) => (
                <div key={crust} className="flex items-center space-x-2">
                  <Checkbox id={`crust-${crust}`} />
                  <Label 
                    htmlFor={`crust-${crust}`} 
                    className="text-sm cursor-pointer"
                  >
                    {crust}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Channels</Label>
            <div className="space-y-2">
              {[
                { code: "OA", name: "Own Apps" },
                { code: "DI", name: "Dine In" },
                { code: "AG", name: "Aggregator" },
                { code: "IR", name: "IRCTC" }
              ].map((channel) => (
                <div key={channel.code} className="flex items-center space-x-2">
                  <Checkbox id={`channel-${channel.code}`} />
                  <Label 
                    htmlFor={`channel-${channel.code}`} 
                    className="text-sm cursor-pointer"
                  >
                    {channel.name} ({channel.code})
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="border-t pt-4">
          <Label className="text-sm font-semibold mb-3 block">Quick Filters</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Veg Only
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Non-Veg Only
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Pizza Products
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              High Volume Items
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              New Products
            </Badge>
          </div>
        </div>

        {/* Apply Filters */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
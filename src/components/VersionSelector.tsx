import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface VersionSelectorProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

const versions = [
  {
    id: "v5.2",
    name: "Version 5.2",
    description: "Maharashtra stores - Dairy Blend for all pizza products",
    stores: "All Maharashtra stores (247 stores)",
    status: "active",
    lastUpdated: "2024-01-15"
  },
  {
    id: "v5.1",
    name: "Version 5.1", 
    description: "All India except Maharashtra - Seasoned Cheese Blend",
    stores: "All India except Maharashtra (1,823 stores)",
    status: "active",
    lastUpdated: "2024-01-10"
  },
  {
    id: "v4.8",
    name: "Version 4.8",
    description: "Regional variant for North East stores",
    stores: "North East region (156 stores)",
    status: "active",
    lastUpdated: "2023-12-28"
  },
  {
    id: "v4.7",
    name: "Version 4.7",
    description: "Metro cities premium variant",
    stores: "Delhi, Mumbai, Bangalore, Chennai (89 stores)",
    status: "active",
    lastUpdated: "2023-12-20"
  },
  {
    id: "v4.6",
    name: "Version 4.6",
    description: "Standard variant for Tier 2/3 cities",
    stores: "Tier 2/3 cities (967 stores)",
    status: "active",
    lastUpdated: "2023-12-15"
  }
];

export const VersionSelector = ({ selectedVersion, onVersionChange }: VersionSelectorProps) => {
  const currentVersion = versions.find(v => v.id === selectedVersion);

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="version-select" className="text-sm font-semibold">
              Recipe Bank Version
            </Label>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div>
              <Select value={selectedVersion} onValueChange={onVersionChange}>
                <SelectTrigger id="version-select" className="w-full">
                  <SelectValue placeholder="Select recipe bank version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex items-center gap-2">
                        {version.name}
                        <Badge 
                          variant={version.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {version.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentVersion && (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {currentVersion.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentVersion.stores}
                  </p>
                </div>
                
                <div className="text-right space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(currentVersion.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
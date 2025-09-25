import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface VersionSelectorProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

const versions = [
  {
    id: "v1.0",
    name: "Version 1.0",
    description: "All India, Except Maharashtra",
    stores: 1876,
    status: "active",
    lastUpdated: "2025-09-05",
    regionalCoverage: "All India except Maharashtra",
    keyDifferences: "Standard cheese blend for all Pizza products"
  },
  {
    id: "v2.0",
    name: "Version 2.0", 
    description: "All Maharashtra Stores",
    stores: 247,
    status: "active",
    lastUpdated: "2025-08-28",
    regionalCoverage: "Maharashtra region",
    keyDifferences: "Dairy Blend instead of Seasoned cheese blend for all Pizza products"
  },
  {
    id: "v3.0",
    name: "Version 3.0",
    description: "Mozz + Cheddar for CHD",
    stores: 89,
    status: "active",
    lastUpdated: "2025-08-15",
    regionalCoverage: "Chandigarh region",
    keyDifferences: "Mozzarella + Cheddar cheese combination for premium products"
  },
  {
    id: "v4.0",
    name: "Version 4.0",
    description: "BBP Doughball change",
    stores: 156,
    status: "active",
    lastUpdated: "2025-07-20",
    regionalCoverage: "Select metro stores",
    keyDifferences: "Updated doughball specifications for BBP products"
  }
];

export const VersionSelector = ({ selectedVersion, onVersionChange }: VersionSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentVersion = versions.find(v => v.id === selectedVersion);

  return (
    <Card className="bg-card border">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recipe Bank Version</h3>
            <p className="text-sm text-muted-foreground">Select Recipe Bank Version</p>
          </div>
          
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <Select value={selectedVersion} onValueChange={onVersionChange}>
                <SelectTrigger className="w-full max-w-sm">
                  <SelectValue placeholder="Select recipe bank version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{version.name}</span>
                          <Badge 
                            variant={version.status === "active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {version.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {version.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentVersion && (
              <>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-foreground">
                    {currentVersion.description}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{currentVersion.stores} stores</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Updated: {currentVersion.lastUpdated}</span>
                  </div>
                </div>
                
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="gap-2"
                  >
                    Show Details
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>

          {isExpanded && currentVersion && (
            <div className="pt-4 border-t space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Regional Coverage</h5>
                  <p className="text-sm text-muted-foreground">
                    {currentVersion.regionalCoverage} ({currentVersion.stores} stores)
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Key Differences</h5>
                  <p className="text-sm text-muted-foreground">
                    {currentVersion.keyDifferences}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
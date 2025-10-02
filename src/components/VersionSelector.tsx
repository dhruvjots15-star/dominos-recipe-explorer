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
    id: "v5",
    name: "v5",
    description: "All India Master",
    stores: 1560,
    status: "active",
    lastUpdated: "by Kshitij, 25th Mar 2025",
    regionalCoverage: "Default for All India stores",
    keyDifferences: "Default master",
    totalMenuItems: 558,
    totalRecipes: 2307,
    uniqueIngredients: 206
  },
  {
    id: "v6",
    name: "v6", 
    description: "PM Changeover",
    stores: 432,
    status: "active",
    lastUpdated: "by Varun, 20th Apr 2025",
    regionalCoverage: "Delhi NCR + Selection of Beta stores",
    keyDifferences: "Reduced MOZ from 40g->30g in all Pizza Mania recipes (cost reduction experiment)",
    totalMenuItems: 543,
    totalRecipes: 2286,
    uniqueIngredients: 206
  },
  {
    id: "v7",
    name: "v7",
    description: "Maharshtra Only",
    stores: 330,
    status: "active",
    lastUpdated: "by Varun, 27th Apr 2025",
    regionalCoverage: "All Mahashtra stores",
    keyDifferences: "All Pizza items having Pizza Dairy blend instead of Seasoned cheese blend",
    totalMenuItems: 563,
    totalRecipes: 2433,
    uniqueIngredients: 210
  },
  {
    id: "v8",
    name: "v8",
    description: "Mozz + Cheddar for CHD",
    stores: 155,
    status: "active",
    lastUpdated: "by Varun, 4th Aug 2025",
    regionalCoverage: "All Stores mapped to CHD SCC",
    keyDifferences: "Reduced MOZ to MOZ+CHEDDAR blend (cost reduction experiment)",
    totalMenuItems: 558,
    totalRecipes: 2307,
    uniqueIngredients: 211
  },
  {
    id: "v9",
    name: "v9",
    description: "BBP Doughball change only",
    stores: 125,
    status: "active",
    lastUpdated: "by Varun, 14th Aug 2025",
    regionalCoverage: "125 Beta stores across India",
    keyDifferences: "Experiment for BBP, changing Dough from 3 MED balls to 1 LAR ball",
    totalMenuItems: 543,
    totalRecipes: 2307,
    uniqueIngredients: 207
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
                <SelectTrigger className="w-full max-w-sm h-12">
                  <SelectValue placeholder="Select recipe bank version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex items-center justify-between gap-4 w-full min-w-[300px]">
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-medium">{version.name} {version.description}</span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {version.stores} stores
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
                    <span>Last updated: {currentVersion.lastUpdated}</span>
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
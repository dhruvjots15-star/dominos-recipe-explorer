import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "recipe-bank", label: "Recipe Bank" },
  { id: "size-codes", label: "Size Codes Master" },
  { id: "extra-toppings", label: "Extra Toppings Master" },
  { id: "inventory-codes", label: "Inventory Codes Master" },
  { id: "profile", label: "My Profile" }
];

export const TopNavigation = ({ activeTab, onTabChange }: TopNavigationProps) => {
  const [viewAs, setViewAs] = useState("Category Team");

  return (
    <div className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View as:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {viewAs}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setViewAs("Category Team")}>
                Category Team
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewAs("Chef Team")}>
                Chef Team
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewAs("MDM (POS) Team")}>
                MDM (POS) Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
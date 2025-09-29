import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="flex items-center px-6 py-4">
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
      </div>
    </div>
  );
};
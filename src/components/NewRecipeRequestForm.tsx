import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateNewVersionForm } from "./CreateNewVersionForm";
import { StoreSelector } from "./StoreSelector";
import { MenuItemRow } from "./MenuItemRow";

interface NewRecipeRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  categoryCode: string;
  vegNonVeg: string;
  menuCode: string;
  menuItemName: string;
  sizeCodes: string[];
  channels: string[];
  isLocked: boolean;
}

export const NewRecipeRequestForm = ({ open, onOpenChange }: NewRecipeRequestFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requestDesc, setRequestDesc] = useState("");
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Mock recipe bank versions
  const recipeBankVersions = [
    { id: "v5", name: "v5 All India Stores" },
    { id: "v6", name: "v6 Maharashtra stores" },
    { id: "v7", name: "v7 Moz + Cheddar for CHD" },
    { id: "v8", name: "v8 BBP Doughball change" },
  ];

  const handleVersionChange = (versionId: string, checked: boolean) => {
    if (checked) {
      setSelectedVersions([...selectedVersions, versionId]);
    } else {
      setSelectedVersions(selectedVersions.filter(id => id !== versionId));
    }
  };

  const addNewMenuItem = () => {
    const newItem: MenuItem = {
      id: `item_${Date.now()}`,
      categoryCode: "",
      vegNonVeg: "",
      menuCode: "",
      menuItemName: "",
      sizeCodes: [],
      channels: [],
      isLocked: false
    };
    setMenuItems([...menuItems, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(items => items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (!requestDesc.trim()) {
      toast({
        title: "Error",
        description: "Please enter a request description",
        variant: "destructive"
      });
      return;
    }

    if (selectedVersions.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one recipe bank version",
        variant: "destructive"
      });
      return;
    }

    if (menuItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one menu item",
        variant: "destructive"
      });
      return;
    }

    // Generate request ID
    const requestId = `REQ_${Math.floor(Math.random() * 900) + 100}`;
    
    // Navigate to request landing page with success toast
    navigate(`/recipe-request/${requestId}?source=dashboard&showToast=true`);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              New Recipe Creation Request Form
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Recipe Request Description */}
            <div className="space-y-2">
              <Label htmlFor="requestDesc">Recipe Request Description *</Label>
              <Textarea
                id="requestDesc"
                placeholder="Enter a brief description of the Recipe request (e.g., Create Recipes for launch of sourdough pizzas)"
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Recipe Bank Version */}
            <div className="space-y-3">
              <Label>Recipe Bank Version *</Label>
              <p className="text-sm text-muted-foreground">
                Select Recipe bank version(s) where you wish to add the new recipes to. Multiple selections possible
              </p>
              <div className="border rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto">
                {recipeBankVersions.map((version) => (
                  <div key={version.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={version.id}
                      checked={selectedVersions.includes(version.id)}
                      onCheckedChange={(checked) => 
                        handleVersionChange(version.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={version.id} className="text-sm font-normal">
                      {version.name}
                    </Label>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary"
                    onClick={() => setShowCreateVersion(true)}
                  >
                    Create New Recipe Bank version
                  </Button>
                </div>
              </div>
            </div>

            {/* Store Selection */}
            <div className="space-y-2">
              <Label>Select Stores *</Label>
              <StoreSelector
                selectedStores={selectedStores}
                onStoresChange={setSelectedStores}
              />
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Menu Item Details</Label>
                <Button
                  onClick={addNewMenuItem}
                  className="gap-2"
                  disabled={menuItems.some(item => !item.isLocked)}
                >
                  <Plus className="h-4 w-4" />
                  Add New Item Details
                </Button>
              </div>

              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdate={(updates) => updateMenuItem(item.id, updates)}
                    onDelete={() => deleteMenuItem(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button onClick={handleSubmit} size="lg">
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CreateNewVersionForm
        open={showCreateVersion}
        onOpenChange={setShowCreateVersion}
        onVersionCreated={(version) => {
          setSelectedVersions([...selectedVersions, version.id]);
        }}
      />
    </>
  );
};
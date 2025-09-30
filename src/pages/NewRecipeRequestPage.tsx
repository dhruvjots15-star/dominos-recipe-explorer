import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreateNewVersionForm } from "@/components/CreateNewVersionForm";
import { MenuItemRow } from "@/components/MenuItemRow";

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

const NewRecipeRequestPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requestDesc, setRequestDesc] = useState("");
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [newVersionMessage, setNewVersionMessage] = useState("");
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
      setSelectedVersions(prev => [...prev, versionId]);
    } else {
      setSelectedVersions(prev => prev.filter(id => id !== versionId));
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
      isLocked: false,
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(items => items.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(items => items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (!requestDesc.trim()) {
      toast({ title: "Error", description: "Please enter a request description", variant: "destructive" });
      return;
    }
    if (selectedVersions.length === 0) {
      toast({ title: "Error", description: "Please select at least one recipe bank version", variant: "destructive" });
      return;
    }
    if (menuItems.length === 0) {
      toast({ title: "Error", description: "Please add at least one menu item", variant: "destructive" });
      return;
    }

    const requestId = `REQ_${Math.floor(Math.random() * 900) + 100}`;
    navigate(`/recipe-request/${requestId}?source=dashboard&showToast=true`);
  };

  // SEO title
  if (typeof document !== "undefined") {
    document.title = "New Recipe Creation Request | Recipe System";
  }

  return (
    <main className="w-full">
      <header className="border-b">
        <div className="mx-auto w-full max-w-none px-6 py-6">
          <h1 className="text-2xl font-bold text-primary">New Recipe Creation Request Form</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-none px-6 py-6">
        <div className="space-y-6">
          {/* Recipe Request Description */}
          <section className="space-y-2">
            <Label htmlFor="requestDesc">Recipe Request Description *</Label>
            <Textarea
              id="requestDesc"
              placeholder="Enter a brief description of the Recipe request (e.g., Create Recipes for launch of sourdough pizzas)"
              value={requestDesc}
              onChange={(e) => setRequestDesc(e.target.value)}
              className="min-h-[80px]"
            />
          </section>

          {/* Recipe Bank Version */}
          <section className="space-y-3">
            <Label>Recipe Bank Version *</Label>
            <p className="text-sm text-muted-foreground">
              Select Recipe bank version(s) where you wish to add the new recipes to. Multiple selections possible
            </p>
            <Select>
              <SelectTrigger className="w-full max-w-xl">
                <SelectValue
                  placeholder={
                    selectedVersions.length > 0
                      ? `${selectedVersions.length} version(s) selected`
                      : "Select recipe bank versions"
                  }
                />
              </SelectTrigger>
              <SelectContent className="z-50">
                <div className="p-2 space-y-2">
                  {recipeBankVersions.map((version) => (
                    <div key={version.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={version.id}
                        checked={selectedVersions.includes(version.id)}
                        onCheckedChange={(checked) => handleVersionChange(version.id, checked as boolean)}
                      />
                      <Label htmlFor={version.id} className="text-sm font-normal">
                        {version.name}
                      </Label>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <Button variant="link" className="h-auto p-0 text-primary" onClick={() => setShowCreateVersion(true)}>
                      Create New Recipe Bank version
                    </Button>
                  </div>
                </div>
              </SelectContent>
            </Select>
            {newVersionMessage && <p className="text-sm text-green-600">{newVersionMessage}</p>}
          </section>

          {/* Menu Items */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Menu Item Details</Label>
              <Button onClick={addNewMenuItem} className="gap-2" disabled={menuItems.some((it) => !it.isLocked)}>
                + Add New Item Details
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
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleSubmit} size="lg">
              Submit Request
            </Button>
          </div>
        </div>
      </div>

      <CreateNewVersionForm
        open={showCreateVersion}
        onOpenChange={setShowCreateVersion}
        onVersionCreated={(version) => {
          setSelectedVersions((prev) => [...prev, version.id]);
          setNewVersionMessage(`Recipe Bank version ${version.name} will be created when this Form is submitted`);
        }}
      />
    </main>
  );
};

export default NewRecipeRequestPage;

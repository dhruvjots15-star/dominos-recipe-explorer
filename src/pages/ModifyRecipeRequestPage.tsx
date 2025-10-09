import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateNewVersionForm } from "@/components/CreateNewVersionForm";
import { ModifyMenuItemRow } from "@/components/ModifyMenuItemRow";
import { ArrowLeft } from "lucide-react";
import { generateNextRequestId } from "@/utils/requestIdUtils";

interface MenuItem {
  id: string;
  categoryCode: string;
  vegNonVeg: string;
  selectedMenuItems: string[]; // Array of menu codes
  sizeCodes: string[];
  channels: string[];
  isLocked: boolean;
}

const ModifyRecipeRequestPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requestDesc, setRequestDesc] = useState("");
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [newVersionMessage, setNewVersionMessage] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [lastUsedCategory, setLastUsedCategory] = useState("");

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
      categoryCode: lastUsedCategory,
      vegNonVeg: "",
      selectedMenuItems: [],
      sizeCodes: [],
      channels: [],
      isLocked: false,
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(items => items.map(item => (item.id === id ? { ...item, ...updates } : item)));
    if (updates.categoryCode) {
      setLastUsedCategory(updates.categoryCode);
    }
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

    // Generate next request ID
    const requestId = generateNextRequestId();
    
    // Navigate to request landing page with success toast
    navigate(`/recipe-request/${requestId}?source=dashboard&showToast=true`);
  };

  const hasFormData = () => {
    return requestDesc.trim() !== "" || selectedVersions.length > 0 || menuItems.length > 0;
  };

  const handleBackToDashboard = () => {
    if (hasFormData()) {
      return; // Let the alert dialog handle this
    }
    navigate("/dashboard");
  };


  // SEO title
  if (typeof document !== "undefined") {
    document.title = "Modify Existing Recipe Request | Recipe System";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          {hasFormData() ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your form is not submitted yet. It will be discarded if you continue to Dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay on Form</AlertDialogCancel>
                  <AlertDialogAction onClick={() => navigate("/dashboard")}>
                    Continue to Dashboard
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Modify Existing Recipe Request
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Submit recipe modification requests for approval and processing
          </p>
        </div>

        <div className="space-y-6">
          {/* Recipe Request Description */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requestDesc" className="text-base font-semibold">Recipe Request Description <span className="text-destructive">*</span></Label>
              <Textarea
                id="requestDesc"
                placeholder="Enter a brief description of the Recipe request (e.g., Modify Recipes for updated nutritional specifications)"
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Recipe Bank Version */}
            <div className="space-y-3 pt-4">
              <Label className="text-base font-semibold">Recipe Bank Version <span className="text-destructive">*</span></Label>
              <p className="text-sm text-muted-foreground">
                Select Recipe bank version(s) where you wish to modify the recipes. Multiple selections possible
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
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Menu Item Details</h2>
              {menuItems.filter(item => !item.isLocked).length === 0 && (
                <Button 
                  onClick={addNewMenuItem} 
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                >
                  + Add New Item Details
                </Button>
              )}
            </div>

            {/* Headers for locked items */}
            {menuItems.some(item => item.isLocked) && (
              <div className="grid grid-cols-6 gap-4 p-4 border rounded-lg bg-muted font-semibold text-sm">
                <div>Category</div>
                <div>Menu Code</div>
                <div>Item Name</div>
                <div>Size Code</div>
                <div>Channel</div>
                <div>Actions</div>
              </div>
            )}

            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <ModifyMenuItemRow
                  key={item.id}
                  item={item}
                  index={index}
                  onUpdate={(updates) => updateMenuItem(item.id, updates)}
                  onDelete={() => deleteMenuItem(item.id)}
                />
              ))}
            </div>

            {/* Add button at bottom if there are locked items */}
            {menuItems.some(item => item.isLocked) && (
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={addNewMenuItem} 
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                >
                  + Add New Item Details
                </Button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSubmit} 
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
            >
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
    </div>
  );
};

export default ModifyRecipeRequestPage;

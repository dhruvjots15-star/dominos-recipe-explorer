import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface InventoryItemRow {
  id: string;
  inventoryCode: string;
  inventoryDescription: string;
  portionUnit: string;
  orderUnit: string;
  countUnit: string;
  isLocked: boolean;
}

export const AddNewInventoryItemForm = () => {
  const navigate = useNavigate();
  const [requestDesc, setRequestDesc] = useState("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItemRow[]>([
    {
      id: crypto.randomUUID(),
      inventoryCode: "",
      inventoryDescription: "",
      portionUnit: "",
      orderUnit: "",
      countUnit: "",
      isLocked: false,
    },
  ]);

  const portionUnitOptions = ["GMS", "ML", "NOS", "STICK"];
  const orderUnitOptions = ["BOX", "EA", "KGS", "NOS", "PKT", "TRAY"];
  const countUnitOptions = ["BOX", "EA", "KGS", "NOS", "PKT"];

  const handleUpdateItem = (id: string, field: keyof InventoryItemRow, value: string) => {
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleLockRow = (id: string) => {
    const item = inventoryItems.find((item) => item.id === id);
    if (!item) return;

    // Validation
    if (!item.inventoryCode.trim()) {
      toast.error("Please enter Inventory Code");
      return;
    }
    if (!item.inventoryDescription.trim()) {
      toast.error("Please enter Inventory Description");
      return;
    }
    if (!item.portionUnit) {
      toast.error("Please select Portion Unit");
      return;
    }
    if (!item.orderUnit) {
      toast.error("Please select Order Unit");
      return;
    }
    if (!item.countUnit) {
      toast.error("Please select Count Unit");
      return;
    }

    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLocked: true } : item
      )
    );
    toast.success("Inventory item locked successfully");
  };

  const handleAddNewItem = () => {
    setInventoryItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        inventoryCode: "",
        inventoryDescription: "",
        portionUnit: "",
        orderUnit: "",
        countUnit: "",
        isLocked: false,
      },
    ]);
  };

  const handleSubmit = () => {
    // Validation
    if (!requestDesc.trim()) {
      toast.error("Please enter Request Description");
      return;
    }

    const unlockedItems = inventoryItems.filter((item) => !item.isLocked);
    if (unlockedItems.length > 0) {
      toast.error("Please lock all inventory items before submitting");
      return;
    }

    if (inventoryItems.length === 0) {
      toast.error("Please add at least one inventory item");
      return;
    }

    // Generate request ID
    const requestId = `INV-ADD-${Date.now().toString().slice(-6)}`;

    toast.success(`Request ${requestId} created successfully`);
    navigate(`/recipe-request/${requestId}?source=inventory-codes&showToast=false`);
  };

  const allItemsLocked = inventoryItems.every((item) => item.isLocked);

  // SEO title
  if (typeof document !== "undefined") {
    document.title = "Add New Inventory Item | Recipe System";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/inventory-codes")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory Codes Master
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Add a New Inventory Item
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Add a newly created Inventory item & its details
          </p>
        </div>

        {/* Request Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requestDesc" className="text-base font-semibold">
                Request Description <span className="text-destructive">*</span>
              </Label>
              <Input
                id="requestDesc"
                placeholder="Enter Request Desc"
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory Item Addition Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Inventory Item Addition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {inventoryItems.map((item, index) => (
              <div key={item.id} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  Item {index + 1}
                  {item.isLocked && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor={`code-${item.id}`} className="text-xs">
                      Inventory Code
                    </Label>
                    <Input
                      id={`code-${item.id}`}
                      placeholder="Enter Code"
                      value={item.inventoryCode}
                      onChange={(e) =>
                        handleUpdateItem(item.id, "inventoryCode", e.target.value)
                      }
                      disabled={item.isLocked}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`desc-${item.id}`} className="text-xs">
                      Inventory Description
                    </Label>
                    <Input
                      id={`desc-${item.id}`}
                      placeholder="Enter Description"
                      value={item.inventoryDescription}
                      onChange={(e) =>
                        handleUpdateItem(
                          item.id,
                          "inventoryDescription",
                          e.target.value
                        )
                      }
                      disabled={item.isLocked}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`portion-${item.id}`} className="text-xs">
                      Portion Unit
                    </Label>
                    <Select
                      value={item.portionUnit}
                      onValueChange={(value) =>
                        handleUpdateItem(item.id, "portionUnit", value)
                      }
                      disabled={item.isLocked}
                    >
                      <SelectTrigger id={`portion-${item.id}`} className="text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {portionUnitOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`order-${item.id}`} className="text-xs">
                      Order Unit
                    </Label>
                    <Select
                      value={item.orderUnit}
                      onValueChange={(value) =>
                        handleUpdateItem(item.id, "orderUnit", value)
                      }
                      disabled={item.isLocked}
                    >
                      <SelectTrigger id={`order-${item.id}`} className="text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {orderUnitOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`count-${item.id}`} className="text-xs">
                      Count Unit
                    </Label>
                    <Select
                      value={item.countUnit}
                      onValueChange={(value) =>
                        handleUpdateItem(item.id, "countUnit", value)
                      }
                      disabled={item.isLocked}
                    >
                      <SelectTrigger id={`count-${item.id}`} className="text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {countUnitOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => handleLockRow(item.id)}
                    disabled={item.isLocked}
                    size="default"
                    className="gap-2"
                  >
                    {item.isLocked ? (
                      <>
                        <Check className="h-4 w-4" />
                        Locked
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
                {index < inventoryItems.length - 1 && (
                  <div className="border-b border-border mt-4" />
                )}
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddNewItem}
                variant="outline"
                className="gap-2"
                disabled={!allItemsLocked}
              >
                <Plus className="h-4 w-4" />
                Add New Inventory Item
              </Button>

              <Button 
                onClick={handleSubmit} 
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
              >
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

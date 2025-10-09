import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Lock } from "lucide-react";
import { toast } from "sonner";

interface InventoryItemRow {
  id: number;
  inventoryCode: string;
  inventoryDescription: string;
  portionUnit: string;
  orderUnit: string;
  countUnit: string;
  isLocked: boolean;
}

export const AddNewInventoryItemFormPhase1 = () => {
  const navigate = useNavigate();
  const [requestDesc, setRequestDesc] = useState("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItemRow[]>([
    {
      id: 1,
      inventoryCode: "",
      inventoryDescription: "",
      portionUnit: "",
      orderUnit: "",
      countUnit: "",
      isLocked: false,
    },
  ]);

  const handleUpdateItem = (id: number, field: keyof InventoryItemRow, value: string) => {
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleLockRow = (id: number) => {
    const item = inventoryItems.find((item) => item.id === id);
    if (!item) return;

    if (!item.inventoryCode || !item.inventoryDescription || !item.portionUnit) {
      toast.error("Please fill in all required fields before locking");
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
    const newId = Math.max(...inventoryItems.map((item) => item.id)) + 1;
    setInventoryItems((prev) => [
      ...prev,
      {
        id: newId,
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
    if (!requestDesc.trim()) {
      toast.error("Please provide a request description");
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

    toast.success("Request submitted successfully!");
    navigate("/inventory-codes");
  };

  const allItemsLocked = inventoryItems.every((item) => item.isLocked) && inventoryItems.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container mx-auto max-w-6xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Add New Inventory Item (Phase 1)</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manually enter inventory item details
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/inventory-codes")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Inventory Codes Master
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Request Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Request Information</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requestDesc">
                    Request Description <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="requestDesc"
                    placeholder="Enter request description..."
                    value={requestDesc}
                    onChange={(e) => setRequestDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Inventory Item Addition */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Inventory Item Addition</h3>
                <Button
                  variant="outline"
                  onClick={handleAddNewItem}
                  className="gap-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Item
                </Button>
              </div>

              <div className="space-y-6">
                {inventoryItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`transition-all duration-200 ${
                      item.isLocked
                        ? "border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                        : "border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5"
                    }`}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Item {item.id}</Badge>
                          {item.isLocked && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-100">
                              <Lock className="h-3 w-3 mr-1" />
                              Locked
                            </Badge>
                          )}
                        </div>
                        {!item.isLocked && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleLockRow(item.id)}
                            className="gap-2"
                          >
                            <Lock className="h-4 w-4" />
                            Lock & Confirm Item
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`inventoryCode-${item.id}`}>
                            Inventory Code <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id={`inventoryCode-${item.id}`}
                            placeholder="e.g., INV001"
                            value={item.inventoryCode}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "inventoryCode", e.target.value)
                            }
                            disabled={item.isLocked}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`inventoryDescription-${item.id}`}>
                            Inventory Description <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id={`inventoryDescription-${item.id}`}
                            placeholder="e.g., Fresh Tomatoes"
                            value={item.inventoryDescription}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "inventoryDescription", e.target.value)
                            }
                            disabled={item.isLocked}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`portionUnit-${item.id}`}>
                            Portion Unit <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id={`portionUnit-${item.id}`}
                            placeholder="e.g., GM"
                            value={item.portionUnit}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "portionUnit", e.target.value)
                            }
                            disabled={item.isLocked}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`orderUnit-${item.id}`}>Order Unit</Label>
                          <Input
                            id={`orderUnit-${item.id}`}
                            placeholder="e.g., KG"
                            value={item.orderUnit}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "orderUnit", e.target.value)
                            }
                            disabled={item.isLocked}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`countUnit-${item.id}`}>Count Unit</Label>
                          <Input
                            id={`countUnit-${item.id}`}
                            placeholder="e.g., EA"
                            value={item.countUnit}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "countUnit", e.target.value)
                            }
                            disabled={item.isLocked}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!allItemsLocked}
                size="lg"
                className="gap-2"
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

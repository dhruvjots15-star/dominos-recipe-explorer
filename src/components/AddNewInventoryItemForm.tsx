import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Check, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface InventoryItemRow {
  id: string;
  inventoryCode: string;
  inventoryDescription: string;
  portionUnit: string;
  orderUnit: string;
  countUnit: string;
  isLocked: boolean;
  isFetched: boolean;
  isFetching: boolean;
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
      isFetched: false,
      isFetching: false,
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

  const handleFetchFromSAP = async (id: string) => {
    const item = inventoryItems.find((item) => item.id === id);
    if (!item) return;

    // Validation
    if (!item.inventoryCode.trim()) {
      toast.error("Please enter Inventory Code");
      return;
    }

    // Set fetching state
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFetching: true } : item
      )
    );

    // Simulate SAP API call with 2-3 second delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock SAP data - in real implementation, this would come from API
    const mockSAPData = {
      inventoryDescription: `SAP Description for ${item.inventoryCode}`,
      portionUnit: "GMS",
      orderUnit: "BOX",
      countUnit: "EA",
    };

    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...mockSAPData,
              isFetching: false,
              isFetched: true,
            }
          : item
      )
    );

    toast.success(`Data fetched successfully for ${item.inventoryCode}`);
  };

  const handleLockRow = (id: string) => {
    const item = inventoryItems.find((item) => item.id === id);
    if (!item) return;

    // Validation
    if (!item.isFetched) {
      toast.error("Please fetch data from SAP first");
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
        isFetched: false,
        isFetching: false,
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
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
                    Item {index + 1}
                  </Badge>
                  {item.isFetched && !item.isLocked && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      Data Fetched
                    </Badge>
                  )}
                  {item.isLocked && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <Check className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </div>

                {/* Initial State - Only Inventory Code */}
                {!item.isFetched && !item.isFetching && (
                  <div className="p-6 border-2 border-dashed border-primary/30 rounded-lg bg-gradient-to-br from-primary/5 to-background">
                    <div className="max-w-2xl">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`code-${item.id}`} className="text-base font-semibold">
                            Inventory Code <span className="text-destructive">*</span>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1 mb-3">
                            Enter the inventory code to fetch details from SAP
                          </p>
                          <div className="flex gap-3">
                            <Input
                              id={`code-${item.id}`}
                              placeholder="e.g., 80000161"
                              value={item.inventoryCode}
                              onChange={(e) =>
                                handleUpdateItem(item.id, "inventoryCode", e.target.value)
                              }
                              className="text-base font-mono"
                            />
                            <Button
                              onClick={() => handleFetchFromSAP(item.id)}
                              className="gap-2 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                              disabled={!item.inventoryCode.trim()}
                            >
                              <Download className="h-4 w-4" />
                              Fetch Data from SAP
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fetching State */}
                {item.isFetching && (
                  <div className="p-8 border-2 border-blue-300 dark:border-blue-700 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
                      <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                          Fetching data from SAP...
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-mono">
                          Inventory Code: <span className="font-bold">{item.inventoryCode}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fetched State - Full Form */}
                {item.isFetched && (
                  <div className="p-6 border-2 border-green-200 dark:border-green-800 rounded-lg bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/20 dark:to-background space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                      <Check className="h-4 w-4" />
                      SAP Data Retrieved Successfully
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Inventory Code
                        </Label>
                        <div className="p-3 bg-muted/50 rounded-md border">
                          <p className="text-sm font-mono font-semibold">{item.inventoryCode}</p>
                        </div>
                      </div>

                      <div className="space-y-2 lg:col-span-2">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Inventory Description
                        </Label>
                        <div className="p-3 bg-muted/50 rounded-md border">
                          <p className="text-sm font-medium">{item.inventoryDescription}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Portion Unit
                        </Label>
                        <div className="p-3 bg-muted/50 rounded-md border">
                          <p className="text-sm font-semibold">{item.portionUnit}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Order Unit
                        </Label>
                        <div className="p-3 bg-muted/50 rounded-md border">
                          <p className="text-sm font-semibold">{item.orderUnit}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">
                          Count Unit
                        </Label>
                        <div className="p-3 bg-muted/50 rounded-md border">
                          <p className="text-sm font-semibold">{item.countUnit}</p>
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex items-end">
                        <Button
                          onClick={() => handleLockRow(item.id)}
                          disabled={item.isLocked}
                          size="lg"
                          className="w-full lg:w-auto gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                        >
                          {item.isLocked ? (
                            <>
                              <Check className="h-4 w-4" />
                              Item Locked
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              Lock & Confirm Item
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {index < inventoryItems.length - 1 && (
                  <div className="border-b border-border/50 my-6" />
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

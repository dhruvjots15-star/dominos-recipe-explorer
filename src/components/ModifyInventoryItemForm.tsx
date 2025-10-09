import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { inventoryCodesData } from "@/data/inventoryCodesData";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { generateNextRequestId } from "@/utils/requestIdUtils";

interface ModifiedItem {
  inventoryCode: string;
  originalDescription: string;
  newDescription: string;
  newPortionUnit: string;
  orderUnit: string;
  countUnit: string;
  isLocked: boolean;
}

export const ModifyInventoryItemForm = () => {
  const navigate = useNavigate();
  const [requestDesc, setRequestDesc] = useState("");
  const [modifiedItems, setModifiedItems] = useState<ModifiedItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ModifiedItem | null>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelectInventoryItem = (itemCode: string) => {
    const selectedItem = inventoryCodesData.find(item => item.inventoryCode === itemCode);
    if (selectedItem) {
      setCurrentItem({
        inventoryCode: selectedItem.inventoryCode,
        originalDescription: selectedItem.inventoryDescription,
        newDescription: selectedItem.inventoryDescription,
        newPortionUnit: selectedItem.newPortionUnit,
        orderUnit: selectedItem.orderUnit,
        countUnit: selectedItem.countUnit,
        isLocked: false,
      });
      setOpen(false);
      setSearchValue("");
    }
  };

  const handleLockItem = () => {
    if (!currentItem || !currentItem.newDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description",
        variant: "destructive",
      });
      return;
    }

    const lockedItem = { ...currentItem, isLocked: true };
    setModifiedItems([...modifiedItems, lockedItem]);
    setCurrentItem(null);
    
    toast({
      title: "Success",
      description: "Item locked successfully",
    });
  };

  const handleAddAnother = () => {
    setCurrentItem({
      inventoryCode: "",
      originalDescription: "",
      newDescription: "",
      newPortionUnit: "",
      orderUnit: "",
      countUnit: "",
      isLocked: false,
    });
  };

  const handleSubmitRequest = () => {
    if (!requestDesc.trim()) {
      toast({
        title: "Error",
        description: "Please enter a request description",
        variant: "destructive",
      });
      return;
    }

    if (modifiedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one inventory item modification",
        variant: "destructive",
      });
      return;
    }

    const requestId = `INV-MOD-${generateNextRequestId().split('_')[1]}`;
    
    toast({
      title: "Success",
      description: `Request ${requestId} created successfully`,
    });

    navigate(`/recipe-request/${requestId}?source=inventory-codes&showToast=true`);
  };

  const filteredItems = inventoryCodesData.filter(item => {
    const search = searchValue.toLowerCase();
    return (
      item.inventoryCode.toLowerCase().includes(search) ||
      item.inventoryDescription.toLowerCase().includes(search)
    );
  });

  // SEO title
  if (typeof document !== "undefined") {
    document.title = "Modify Inventory Item | Recipe System";
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
            Modify an Existing Inventory Item
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Update an existing Inventory item & its details
          </p>
        </div>

        {/* Request Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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

        {modifiedItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Modified Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Inventory_Code</TableHead>
                    <TableHead>Inventory Description</TableHead>
                    <TableHead>New_Portion_Unit</TableHead>
                    <TableHead>order_unit</TableHead>
                    <TableHead>count_unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modifiedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.inventoryCode}</TableCell>
                      <TableCell>{item.newDescription}</TableCell>
                      <TableCell>{item.newPortionUnit}</TableCell>
                      <TableCell>{item.orderUnit}</TableCell>
                      <TableCell>{item.countUnit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {currentItem && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Select Inventory Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base font-semibold">Search Inventory Item</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {currentItem.inventoryCode ? 
                        `${currentItem.inventoryCode}: ${currentItem.originalDescription}` : 
                        "Search by Inventory Code or Description..."
                      }
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search inventory items..." 
                        value={searchValue}
                        onValueChange={setSearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>No inventory item found.</CommandEmpty>
                        <CommandGroup>
                          {filteredItems.map((item) => (
                            <CommandItem
                              key={item.inventoryCode}
                              value={item.inventoryCode}
                              onSelect={handleSelectInventoryItem}
                            >
                              {item.inventoryCode}: {item.inventoryDescription}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {currentItem.inventoryCode && (
                <>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Inventory_Code</TableHead>
                          <TableHead>Inventory Description</TableHead>
                          <TableHead>New_Portion_Unit</TableHead>
                          <TableHead>order_unit</TableHead>
                          <TableHead>count_unit</TableHead>
                          <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">{currentItem.inventoryCode}</TableCell>
                          <TableCell>
                            <Input
                              value={currentItem.newDescription}
                              onChange={(e) => setCurrentItem({
                                ...currentItem,
                                newDescription: e.target.value
                              })}
                              placeholder="Enter Inventory Description"
                            />
                          </TableCell>
                          <TableCell>{currentItem.newPortionUnit}</TableCell>
                          <TableCell>{currentItem.orderUnit}</TableCell>
                          <TableCell>{currentItem.countUnit}</TableCell>
                          <TableCell>
                            <Button onClick={handleLockItem} size="sm">
                              Submit
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {!currentItem && modifiedItems.length > 0 && (
          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" onClick={handleAddAnother} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Update Another Inventory Item
            </Button>
            <Button 
              onClick={handleSubmitRequest}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
            >
              Submit Request
            </Button>
          </div>
        )}

        {modifiedItems.length === 0 && !currentItem && (
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleAddAnother}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Select Inventory Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

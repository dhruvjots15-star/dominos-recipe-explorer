import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { allSizeCodes, extraToppingsData, ExtraTopping } from "@/data/extraToppingsData";
import { inventoryItems } from "@/data/inventoryData";
import { generateNextRequestId } from "@/utils/requestIdUtils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpdateExtraToppingsFormProps {
  onBack: () => void;
}

interface ToppingRow extends ExtraTopping {
  isNew?: boolean;
}

export const UpdateExtraToppingsForm = ({ onBack }: UpdateExtraToppingsFormProps) => {
  const { toast } = useToast();
  const [requestDesc, setRequestDesc] = useState("");
  const [selectedSizeCode, setSelectedSizeCode] = useState("");
  const [toppingRows, setToppingRows] = useState<ToppingRow[]>([]);
  const [openDescPopover, setOpenDescPopover] = useState<number | null>(null);
  const [openCodePopover, setOpenCodePopover] = useState<number | null>(null);

  const handleSizeCodeChange = (sizeCode: string) => {
    setSelectedSizeCode(sizeCode);
    // Load existing toppings for this size code
    const existingToppings = extraToppingsData.filter(t => t.sizeCode === sizeCode);
    setToppingRows(existingToppings);
  };

  const addNewRow = () => {
    if (!selectedSizeCode) {
      toast({
        title: "Error",
        description: "Please select a size code first",
        variant: "destructive"
      });
      return;
    }

    const newRow: ToppingRow = {
      sizeCode: selectedSizeCode,
      description: "",
      inventoryCode: "",
      numberOfToppings: 0,
      lightAmount: 0,
      singleAmount: 0,
      extraAmount: 0,
      doubleAmount: 0,
      tripleAmount: 0,
      isNew: true
    };

    setToppingRows([newRow, ...toppingRows]);
  };

  const handleInventorySelect = (index: number, inventoryCode: string, description: string) => {
    const newRows = [...toppingRows];
    newRows[index].inventoryCode = inventoryCode;
    newRows[index].description = description;
    setToppingRows(newRows);
    setOpenDescPopover(null);
    setOpenCodePopover(null);
  };

  const updateValue = (index: number, field: keyof ToppingRow, delta: number) => {
    const newRows = [...toppingRows];
    const currentValue = Number(newRows[index][field]) || 0;
    const newValue = Math.max(0, currentValue + delta);
    newRows[index] = { ...newRows[index], [field]: newValue };
    setToppingRows(newRows);
  };

  const handleDirectInput = (index: number, field: keyof ToppingRow, value: string) => {
    const newRows = [...toppingRows];
    const numValue = parseInt(value) || 0;
    newRows[index] = { ...newRows[index], [field]: Math.max(0, numValue) };
    setToppingRows(newRows);
  };

  const handleSubmit = () => {
    if (!requestDesc.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a request description",
        variant: "destructive"
      });
      return;
    }

    if (!selectedSizeCode) {
      toast({
        title: "Validation Error",
        description: "Please select a size code",
        variant: "destructive"
      });
      return;
    }

    if (toppingRows.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one topping",
        variant: "destructive"
      });
      return;
    }

    // Validate that all rows have inventory codes
    const invalidRows = toppingRows.filter(row => !row.inventoryCode);
    if (invalidRows.length > 0) {
      toast({
        title: "Validation Error",
        description: "All rows must have an inventory item selected",
        variant: "destructive"
      });
      return;
    }

    const requestId = generateNextRequestId();
    window.location.href = `/recipe-request/${requestId}?source=extra-toppings&showToast=true`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Extra Toppings Master
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Update Extra Toppings Master
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Submit updation requests for approval and processing
          </p>
        </div>

        {/* Form Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="requestDesc">Request Desc <span className="text-destructive">*</span></Label>
              <Input
                id="requestDesc"
                placeholder="Enter Request Desc"
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sizeCode">Select Size Code <span className="text-destructive">*</span></Label>
              <Select value={selectedSizeCode} onValueChange={handleSizeCodeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a size code" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {allSizeCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Toppings Table */}
        {selectedSizeCode && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Extra Toppings for {selectedSizeCode}</CardTitle>
                <Button onClick={addNewRow} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Row
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold w-24">Size Code</TableHead>
                      <TableHead className="font-semibold min-w-[250px]">Description</TableHead>
                      <TableHead className="font-semibold min-w-[200px]">Inventory Code</TableHead>
                      <TableHead className="font-semibold w-32 text-center">Number Of Toppings</TableHead>
                      <TableHead className="font-semibold w-32 text-center">Light Amount</TableHead>
                      <TableHead className="font-semibold w-32 text-center">Single Amount</TableHead>
                      <TableHead className="font-semibold w-32 text-center">Extra Amount</TableHead>
                      <TableHead className="font-semibold w-32 text-center">Double Amount</TableHead>
                      <TableHead className="font-semibold w-32 text-center">Triple Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {toppingRows.map((row, index) => (
                      <TableRow key={index} className={row.isNew ? "bg-primary/5" : ""}>
                        <TableCell className="font-medium">{row.sizeCode}</TableCell>
                        
                        {/* Description - Searchable Dropdown */}
                        <TableCell>
                          {row.isNew ? (
                            <Popover open={openDescPopover === index} onOpenChange={(open) => setOpenDescPopover(open ? index : null)}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-full justify-between"
                                >
                                  {row.description || "Select inventory..."}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Search inventory..." />
                                  <CommandEmpty>No inventory found.</CommandEmpty>
                                  <CommandGroup className="max-h-60 overflow-auto">
                                    {inventoryItems.map((item) => (
                                      <CommandItem
                                        key={item.code}
                                        value={item.description}
                                        onSelect={() => handleInventorySelect(index, item.code, item.description)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            row.description === item.description ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {item.description}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <span>{row.description}</span>
                          )}
                        </TableCell>

                        {/* Inventory Code - Searchable Dropdown */}
                        <TableCell>
                          {row.isNew ? (
                            <Popover open={openCodePopover === index} onOpenChange={(open) => setOpenCodePopover(open ? index : null)}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-full justify-between"
                                >
                                  {row.inventoryCode || "Select code..."}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[250px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Search code..." />
                                  <CommandEmpty>No code found.</CommandEmpty>
                                  <CommandGroup className="max-h-60 overflow-auto">
                                    {inventoryItems.map((item) => (
                                      <CommandItem
                                        key={item.code}
                                        value={item.code}
                                        onSelect={() => handleInventorySelect(index, item.code, item.description)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            row.inventoryCode === item.code ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {item.code}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <span>{row.inventoryCode}</span>
                          )}
                        </TableCell>

                        {/* Editable Number Fields */}
                        {(['numberOfToppings', 'lightAmount', 'singleAmount', 'extraAmount', 'doubleAmount', 'tripleAmount'] as const).map((field) => (
                          <TableCell key={field}>
                            <div className="flex items-center gap-1 justify-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateValue(index, field, -1)}
                                disabled={!row.inventoryCode}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={row[field]}
                                onChange={(e) => handleDirectInput(index, field, e.target.value)}
                                className="h-7 w-16 text-center"
                                disabled={!row.inventoryCode}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateValue(index, field, 1)}
                                disabled={!row.inventoryCode}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
            size="lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

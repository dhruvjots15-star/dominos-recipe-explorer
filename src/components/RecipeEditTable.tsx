import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Check, X, Trash2, Plus, ChevronsUpDown, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { inventoryItems } from "@/data/inventoryData";
import { cn } from "@/lib/utils";

interface RecipeRow {
  id: string;
  inventoryDescription: string;
  inventoryCode: string;
  portionUnit: string;
  amount: string;
  extraTopping: boolean;
  applyCarryOut: boolean;
  applyDelivery: boolean;
  applyDineIn: boolean;
  applyPickUp: boolean;
}

interface RecipeEditTableProps {
  product: string;
  size: string;
  onSubmit: () => void;
  onBack: () => void;
  startFromScratch?: boolean;
}

const initialRecipeData: RecipeRow[] = [
  { id: "1", inventoryDescription: "BOX_PKG- Box Regular", inventoryCode: "BOX0001", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: false, applyPickUp: true },
  { id: "2", inventoryDescription: "BOX_Lidless Regular - IHOP", inventoryCode: "20001596", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: false, applyDelivery: false, applyDineIn: true, applyPickUp: false },
  { id: "3", inventoryDescription: "PKG_Regular Corrugated Sheet", inventoryCode: "POT0052", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: false, applyPickUp: true },
  { id: "4", inventoryDescription: "SES_Oregano Seasoning", inventoryCode: "SES0007", portionUnit: "NOS", amount: "2.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "5", inventoryDescription: "Cold Dough Regular (140 Gm)", inventoryCode: "80001097", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "6", inventoryDescription: "PRS_Round Sticker", inventoryCode: "PRS0014", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "7", inventoryDescription: "PKG_Napkins", inventoryCode: "POT0006", portionUnit: "NOS", amount: "2.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "8", inventoryDescription: "PRS_Safe And Hygienic Veg - per Roll", inventoryCode: "20001031", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "9", inventoryDescription: "SES_Chilli Flakes", inventoryCode: "SES0005", portionUnit: "NOS", amount: "1.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "10", inventoryDescription: "OTH_ Corn Meal", inventoryCode: "VCN0001", portionUnit: "GMS", amount: "7.00", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "11", inventoryDescription: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", portionUnit: "GMS", amount: "48.00", extraTopping: true, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "12", inventoryDescription: "SAU_Tomato Blend", inventoryCode: "SPI0001", portionUnit: "GMS", amount: "40.00", extraTopping: true, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "13", inventoryDescription: "VG TOP_Onion", inventoryCode: "VFF0001", portionUnit: "GMS", amount: "35.00", extraTopping: true, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "14", inventoryDescription: "VG TOP_Green Pepper", inventoryCode: "VFF0002", portionUnit: "GMS", amount: "20.00", extraTopping: true, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "15", inventoryDescription: "VG TOP_Tomato", inventoryCode: "VFF0003", portionUnit: "GMS", amount: "25.00", extraTopping: true, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "16", inventoryDescription: "VG TOP_Mushroom", inventoryCode: "VFF0010", portionUnit: "GMS", amount: "36.00", extraTopping: true, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "17", inventoryDescription: "OTH_ K-Cuisine", inventoryCode: "CMP0016", portionUnit: "GMS", amount: "1.40", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
  { id: "18", inventoryDescription: "SES_Bake Sprinkle", inventoryCode: "SES0010", portionUnit: "GMS", amount: "0.56", extraTopping: false, applyCarryOut: true, applyDelivery: true, applyDineIn: true, applyPickUp: true },
];

export const RecipeEditTable = ({ product, size, onSubmit, onBack, startFromScratch = false }: RecipeEditTableProps) => {
  const [rows, setRows] = useState<RecipeRow[]>(() => {
    if (startFromScratch) {
      // Start with one empty row for scratch creation
      return [{
        id: "1",
        inventoryDescription: "",
        inventoryCode: "",
        portionUnit: "",
        amount: "",
        extraTopping: false,
        applyCarryOut: false,
        applyDelivery: false,
        applyDineIn: false,
        applyPickUp: false,
      }];
    }
    return initialRecipeData;
  });
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const updateAmount = (id: string, newAmount: string) => {
    // Validate numeric input with up to 2 decimals
    if (newAmount === "" || /^\d*\.?\d{0,2}$/.test(newAmount)) {
      setRows(rows.map(row => row.id === id ? { ...row, amount: newAmount } : row));
    }
  };

  const incrementAmount = (id: string) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const currentAmount = parseFloat(row.amount) || 0;
        return { ...row, amount: (currentAmount + 0.01).toFixed(2) };
      }
      return row;
    }));
  };

  const decrementAmount = (id: string) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const currentAmount = parseFloat(row.amount) || 0;
        const newAmount = Math.max(0, currentAmount - 0.01);
        return { ...row, amount: newAmount.toFixed(2) };
      }
      return row;
    }));
  };

  const toggleField = (id: string, field: keyof RecipeRow) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: !row[field] };
      }
      return row;
    }));
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const addRow = () => {
    const newRow: RecipeRow = {
      id: Date.now().toString(),
      inventoryDescription: "",
      inventoryCode: "",
      portionUnit: "",
      amount: "",
      extraTopping: false,
      applyCarryOut: false,
      applyDelivery: false,
      applyDineIn: false,
      applyPickUp: false,
    };
    setRows([newRow, ...rows]);
  };

  const selectInventoryItem = (id: string, code: string) => {
    const item = inventoryItems.find(i => i.code === code);
    if (item) {
      setRows(rows.map(row => {
        if (row.id === id) {
          return {
            ...row,
            inventoryCode: item.code,
            inventoryDescription: item.description,
            portionUnit: item.portionUnit,
            amount: "0.00",
            applyCarryOut: true,
            applyDelivery: true,
            applyDineIn: true,
            applyPickUp: true,
          };
        }
        return row;
      }));
    }
  };

  const handleSubmitClick = () => {
    setShowSubmitDialog(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitDialog(false);
    onSubmit();
  };

  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {startFromScratch ? "Creating Recipe from Scratch" : `Showing Recipe for ${product}, Size: ${size}`}
            </h2>
            {startFromScratch && (
              <p className="text-sm text-muted-foreground mt-1">
                For {product}, Size: {size}
              </p>
            )}
          </div>
          <Button onClick={addRow} variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inventory Description</TableHead>
                <TableHead>Inventory Code</TableHead>
                <TableHead>Portion Unit</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Extra Topping</TableHead>
                <TableHead>Apply CarryOut</TableHead>
                <TableHead>Apply Delivery</TableHead>
                <TableHead>Apply DineIn</TableHead>
                <TableHead>Apply PickUp</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const isNewRow = !row.inventoryCode && !row.inventoryDescription;
                const isDisabled = isNewRow;

                return (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">
                      {isNewRow ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {row.inventoryDescription || "Select inventory..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0 bg-popover z-50">
                            <Command>
                              <CommandInput placeholder="Search by description..." />
                              <CommandList>
                                <CommandEmpty>No inventory found.</CommandEmpty>
                                <CommandGroup>
                                  {inventoryItems.map((item) => (
                                    <CommandItem
                                      key={item.code}
                                      value={`${item.description} ${item.code}`}
                                      onSelect={() => selectInventoryItem(row.id, item.code)}
                                    >
                                      {item.description}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        row.inventoryDescription
                      )}
                    </TableCell>
                    <TableCell>
                      {isNewRow ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {row.inventoryCode || "Select code..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0 bg-popover z-50">
                            <Command>
                              <CommandInput placeholder="Search by code..." />
                              <CommandList>
                                <CommandEmpty>No inventory found.</CommandEmpty>
                                <CommandGroup>
                                  {inventoryItems.map((item) => (
                                    <CommandItem
                                      key={item.code}
                                      value={`${item.code} ${item.description}`}
                                      onSelect={() => selectInventoryItem(row.id, item.code)}
                                    >
                                      {item.code}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        row.inventoryCode
                      )}
                    </TableCell>
                    <TableCell>{row.portionUnit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 w-32">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => decrementAmount(row.id)}
                          disabled={isDisabled}
                        >
                          -
                        </Button>
                        <Input
                          type="text"
                          value={row.amount}
                          onChange={(e) => updateAmount(row.id, e.target.value)}
                          className="h-7 text-center"
                          disabled={isDisabled}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => incrementAmount(row.id)}
                          disabled={isDisabled}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {row.extraTopping ? "Y" : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleField(row.id, 'applyCarryOut')}
                        disabled={isDisabled}
                      >
                        {row.applyCarryOut ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <X className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleField(row.id, 'applyDelivery')}
                        disabled={isDisabled}
                      >
                        {row.applyDelivery ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <X className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleField(row.id, 'applyDineIn')}
                        disabled={isDisabled}
                      >
                        {row.applyDineIn ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <X className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleField(row.id, 'applyPickUp')}
                        disabled={isDisabled}
                      >
                        {row.applyPickUp ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <X className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRow(row.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex gap-4">
          <Button onClick={handleSubmitClick} className="flex-1">
            Submit Recipe
          </Button>
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
        </div>
      </Card>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              You are submitting Recipe for {product}, {size}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

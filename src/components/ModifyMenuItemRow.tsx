import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { menuItemsData } from "@/data/menuItemsData";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MenuItem {
  id: string;
  categoryCode: string;
  vegNonVeg: string;
  selectedMenuItems: string[]; // Array of menu codes
  sizeCodes: string[];
  channels: string[];
  isLocked: boolean;
}

interface ModifyMenuItemRowProps {
  item: MenuItem;
  index: number;
  onUpdate: (updates: Partial<MenuItem>) => void;
  onDelete: () => void;
}

const categories = [
  { value: "MCT0001", label: "MCT0001 (Pizza)" },
  { value: "MCT0002", label: "MCT0002 (Beverages)" },
  { value: "MCT0003", label: "MCT0003 (Breads)" },
  { value: "MCT0004", label: "MCT0004 (Sides)" },
  { value: "MCT0005", label: "MCT0005 (Desserts)" },
  { value: "MCT0006", label: "MCT0006 (Combos)" },
];

const vegNonVegOptions = [
  { value: "Veg", label: "Veg" },
  { value: "Non Veg", label: "Non Veg" },
  { value: "NA", label: "NA" },
];

const sizeCodes = [
  { value: "SD01", label: "SD01" },
  { value: "SD02", label: "SD02" },
  { value: "SD03", label: "SD03" },
  { value: "BHT07", label: "BHT07 (Regular New Hand Tossed)" },
  { value: "BHT95", label: "BHT95 (Medium New Hand Tossed)" },
  { value: "BHT125", label: "BHT125 (Large New Hand Tossed)" },
];

const channels = [
  { value: "OA", label: "OA - Own App" },
  { value: "IR", label: "IR - IRCTC" },
  { value: "DI", label: "DI - Dine-In" },
  { value: "AG", label: "AG - Aggregator" },
];

export const ModifyMenuItemRow = ({ item, index, onUpdate, onDelete }: ModifyMenuItemRowProps) => {
  const [expandedRows, setExpandedRows] = useState<MenuItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSizeCodeChange = (sizeCode: string, checked: boolean) => {
    const newSizeCodes = checked 
      ? [...item.sizeCodes, sizeCode]
      : item.sizeCodes.filter(sc => sc !== sizeCode);
    onUpdate({ sizeCodes: newSizeCodes });
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    const newChannels = checked 
      ? [...item.channels, channel]
      : item.channels.filter(ch => ch !== channel);
    onUpdate({ channels: newChannels });
  };

  const handleMenuItemToggle = (menuCode: string, checked: boolean) => {
    const newSelectedItems = checked
      ? [...item.selectedMenuItems, menuCode]
      : item.selectedMenuItems.filter(code => code !== menuCode);
    onUpdate({ selectedMenuItems: newSelectedItems });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allAvailableItems = getFilteredMenuItems().map(mi => mi.code);
      onUpdate({ selectedMenuItems: allAvailableItems });
    } else {
      onUpdate({ selectedMenuItems: [] });
    }
  };

  const getFilteredMenuItems = () => {
    if (!item.categoryCode) return [];
    
    let filtered = menuItemsData.filter(mi => mi.category === item.categoryCode);
    
    // For Pizza category, filter by Veg/Non Veg
    if (item.categoryCode === "MCT0001" && item.vegNonVeg) {
      filtered = filtered.filter(mi => mi.type === item.vegNonVeg);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mi => 
        mi.code.toLowerCase().includes(query) || 
        mi.name.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const handleSubmitRow = () => {
    if (!item.categoryCode || item.selectedMenuItems.length === 0 || 
        item.sizeCodes.length === 0 || item.channels.length === 0) {
      return;
    }

    const newRows: MenuItem[] = [];
    
    // Generate rows for each menu item, size, and channel combination
    item.selectedMenuItems.forEach((menuCode, menuIndex) => {
      item.channels.forEach((channel) => {
        item.sizeCodes.forEach((sizeCode, sizeIndex) => {
          if (menuIndex === 0 && sizeIndex === 0) {
            // Update the original row for first combination
            onUpdate({ 
              isLocked: true,
              selectedMenuItems: [menuCode],
              sizeCodes: [sizeCode],
              channels: [channel]
            });
            return;
          }
          
          const menuItem = menuItemsData.find(mi => mi.code === menuCode);
          newRows.push({
            id: `${item.id}_${menuIndex}_${channel}_${sizeIndex}`,
            categoryCode: item.categoryCode,
            vegNonVeg: menuItem?.type || item.vegNonVeg,
            selectedMenuItems: [menuCode],
            sizeCodes: [sizeCode],
            channels: [channel],
            isLocked: true
          });
        });
      });
    });
    
    setExpandedRows(newRows);
  };

  const isFormValid = item.categoryCode && item.selectedMenuItems.length > 0 && 
                     item.sizeCodes.length > 0 && item.channels.length > 0;

  if (item.isLocked) {
    const menuItem = menuItemsData.find(mi => mi.code === item.selectedMenuItems[0]);
    
    return (
      <div className="space-y-2">
        <div className="border rounded-lg p-4 bg-muted/50">
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="text-sm">{item.categoryCode}</div>
            <div className="text-sm font-mono">{menuItem?.code || item.selectedMenuItems[0]}</div>
            <div className="text-sm">{menuItem?.name || 'Unknown Item'}</div>
            <div>
              <Badge variant="outline" className="text-xs">{item.sizeCodes[0]}</Badge>
            </div>
            <div>
              <Badge variant="secondary" className="text-xs">
                {channels.find(ch => ch.value === item.channels[0])?.label || item.channels[0]}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Render expanded rows */}
        {expandedRows.map((expandedItem) => {
          const expandedMenuItem = menuItemsData.find(mi => mi.code === expandedItem.selectedMenuItems[0]);
          return (
            <div key={expandedItem.id} className="border rounded-lg p-4 bg-muted/30">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="text-sm">{expandedItem.categoryCode}</div>
                <div className="text-sm font-mono">{expandedMenuItem?.code || expandedItem.selectedMenuItems[0]}</div>
                <div className="text-sm">{expandedMenuItem?.name || 'Unknown Item'}</div>
                <div>
                  <Badge variant="outline" className="text-xs">{expandedItem.sizeCodes[0]}</Badge>
                </div>
                <div>
                  <Badge variant="secondary" className="text-xs">
                    {channels.find(ch => ch.value === expandedItem.channels[0])?.label || expandedItem.channels[0]}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => {
                    setExpandedRows(rows => rows.filter(r => r.id !== expandedItem.id));
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const filteredMenuItems = getFilteredMenuItems();
  const allSelected = filteredMenuItems.length > 0 && 
    filteredMenuItems.every(mi => item.selectedMenuItems.includes(mi.code));

  return (
    <div className="border rounded-lg p-6 space-y-4">
      {/* All fields in one row */}
      <div className="grid grid-cols-5 gap-6 items-end">
        {/* Category Code */}
        <div className="space-y-2 min-w-[180px]">
          <Label className="text-sm">Category *</Label>
          <Select value={item.categoryCode} onValueChange={(value) => {
            onUpdate({ categoryCode: value, selectedMenuItems: [], vegNonVeg: "" });
          }}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Veg/Non Veg - Only show for Pizza category */}
        {item.categoryCode === "MCT0001" && (
          <div className="space-y-2 min-w-[120px]">
            <Label className="text-sm">Type *</Label>
            <Select value={item.vegNonVeg} onValueChange={(value) => {
              onUpdate({ vegNonVeg: value, selectedMenuItems: [] });
            }}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {vegNonVegOptions.filter(opt => opt.value !== "NA").map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Menu Items - Combined searchable dropdown */}
        <div className={`space-y-2 ${item.categoryCode === "MCT0001" ? "col-span-1" : "col-span-2"}`}>
          <Label className="text-sm">Menu Items *</Label>
          <Popover open={menuOpen} onOpenChange={setMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={!item.categoryCode || (item.categoryCode === "MCT0001" && !item.vegNonVeg)}
                className="w-full justify-between h-10"
              >
                <span className="truncate">
                  {item.selectedMenuItems.length > 0
                    ? `${item.selectedMenuItems.length} item(s) selected`
                    : "Select menu items"}
                </span>
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 z-[100]" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search menu items..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No menu items found.</CommandEmpty>
                  <CommandGroup>
                    <div className="p-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="select-all"
                          checked={allSelected}
                          onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                        />
                        <Label htmlFor="select-all" className="text-sm font-semibold cursor-pointer">
                          Select All ({filteredMenuItems.length})
                        </Label>
                      </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredMenuItems.map((menuItem) => (
                        <CommandItem
                          key={menuItem.code}
                          value={`${menuItem.code} ${menuItem.name}`}
                          onSelect={() => {
                            const isSelected = item.selectedMenuItems.includes(menuItem.code);
                            handleMenuItemToggle(menuItem.code, !isSelected);
                          }}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={item.selectedMenuItems.includes(menuItem.code)}
                            onCheckedChange={(checked) => 
                              handleMenuItemToggle(menuItem.code, checked as boolean)
                            }
                          />
                          <span className="font-mono text-xs text-muted-foreground">{menuItem.code}</span>
                          <span className="text-sm">{menuItem.name}</span>
                        </CommandItem>
                      ))}
                    </div>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Size Codes */}
        <div className="space-y-2 min-w-[160px]">
          <Label className="text-sm">Size Code *</Label>
          <Select>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder={
                item.sizeCodes.length > 0 
                  ? `${item.sizeCodes.length} selected` 
                  : "Select sizes"
              } />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              <div className="p-2 space-y-2">
                {sizeCodes.map((size) => (
                  <div key={size.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${item.id}-${size.value}`}
                      checked={item.sizeCodes.includes(size.value)}
                      onCheckedChange={(checked) => 
                        handleSizeCodeChange(size.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`${item.id}-${size.value}`} className="text-sm font-normal">
                      {size.label}
                    </Label>
                  </div>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* Channels */}
        <div className="space-y-2 min-w-[160px]">
          <Label className="text-sm">Channels *</Label>
          <Select>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder={
                item.channels.length > 0 
                  ? `${item.channels.length} selected` 
                  : "Select channels"
              } />
            </SelectTrigger>
            <SelectContent className="z-[100] bg-popover">
              <div className="p-2 space-y-2">
                {channels.map((channel) => (
                  <div key={channel.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${item.id}-${channel.value}`}
                      checked={item.channels.includes(channel.value)}
                      onCheckedChange={(checked) => 
                        handleChannelChange(channel.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`${item.id}-${channel.value}`} className="text-sm font-normal">
                      {channel.label}
                    </Label>
                  </div>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="min-w-[100px]">
          <Button
            onClick={handleSubmitRow}
            disabled={!isFormValid}
            className="h-10 w-full"
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Multiple selections info */}
      {item.selectedMenuItems.length > 0 && (
        <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-xs text-blue-700 font-medium flex items-center gap-1">
            <span className="text-blue-500">ⓘ</span>
            Multiple selections will auto-generate rows for each combination
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {item.selectedMenuItems.length} item{item.selectedMenuItems.length > 1 ? 's' : ''} × {item.sizeCodes.length} size{item.sizeCodes.length > 1 ? 's' : ''} × {item.channels.length} channel{item.channels.length > 1 ? 's' : ''} = {item.selectedMenuItems.length * item.sizeCodes.length * item.channels.length} rows
          </p>
        </div>
      )}
    </div>
  );
};

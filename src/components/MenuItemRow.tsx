import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  categoryCode: string;
  subCategory: string;
  vegNonVeg: string;
  menuCode: string;
  menuItemName: string;
  sizeCodes: string[];
  channels: string[];
  isLocked: boolean;
}

interface MenuItemRowProps {
  item: MenuItem;
  index: number;
  lastGeneratedMenuCode?: string;
  onUpdate: (updates: Partial<MenuItem>) => void;
  onDelete: () => void;
}

const categories = [
  { value: "Pizza", label: "Pizza" },
  { value: "Beverages", label: "Beverages" },
  { value: "Breads", label: "Breads" },
  { value: "Sides", label: "Sides" },
  { value: "Desserts", label: "Desserts" },
];

const vegNonVegOptions = [
  { value: "Veg", label: "Veg" },
  { value: "Non Veg", label: "Non Veg" },
];

const sidesSubCategories = [
  { value: "Sides", label: "Sides" },
  { value: "Dips", label: "Dips" },
  { value: "Tacos", label: "Tacos" },
  { value: "Parcels", label: "Parcels" },
];

const dessertsSubCategories = [
  { value: "Desserts", label: "Desserts" },
  { value: "Cakes", label: "Cakes" },
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

export const MenuItemRow = ({ item, index, lastGeneratedMenuCode, onUpdate, onDelete }: MenuItemRowProps) => {
  const [expandedRows, setExpandedRows] = useState<MenuItem[]>([]);
  const { toast } = useToast();

  // Determine if SubCategory should be enabled (Sides or Desserts)
  const isSubCategoryEnabled = item.categoryCode === "Sides" || item.categoryCode === "Desserts";

  // Get subcategory options based on category
  const getSubCategoryOptions = () => {
    if (item.categoryCode === "Sides") return sidesSubCategories;
    if (item.categoryCode === "Desserts") return dessertsSubCategories;
    return [];
  };

  // Determine if Veg/Non-Veg should be enabled
  const isVegNonVegEnabled = () => {
    if (item.categoryCode === "Pizza") return true; // Pizza - enabled
    if (item.categoryCode === "Beverages") return false; // Beverages - disabled
    if (item.categoryCode === "Breads") return false; // Breads - disabled
    if (item.categoryCode === "Desserts") return false; // Desserts - disabled
    if (item.categoryCode === "Sides") {
      // Enabled only if Tacos or Parcels selected in subcategory
      return item.subCategory === "Tacos" || item.subCategory === "Parcels";
    }
    return false;
  };

  // Handle category change - reset subcategory and vegNonVeg
  const handleCategoryChange = (value: string) => {
    onUpdate({ 
      categoryCode: value, 
      subCategory: "", 
      vegNonVeg: "" 
    });
  };

  // Handle subcategory change - reset vegNonVeg if needed
  const handleSubCategoryChange = (value: string) => {
    onUpdate({ 
      subCategory: value, 
      vegNonVeg: "" 
    });
  };

  const generateMenuCode = () => {
    // For categories that don't need vegNonVeg, skip that check
    const needsVegNonVeg = isVegNonVegEnabled();
    if (!item.categoryCode || (needsVegNonVeg && !item.vegNonVeg)) return;
    
    // For Sides and Desserts, subcategory is required
    if ((item.categoryCode === "Sides" || item.categoryCode === "Desserts") && !item.subCategory) return;
    
    let newMenuCode = "";
    
    if (item.categoryCode === "Pizza") {
      const prefix = item.vegNonVeg === "Veg" ? "PIZ0" : "PIZ5";
      const randomNum = Math.floor(Math.random() * 900) + 100;
      newMenuCode = `${prefix}${randomNum}`;
    } else if (item.categoryCode === "Beverages") {
      const randomNum = Math.floor(Math.random() * 900) + 100;
      newMenuCode = `BEV0${randomNum}`;
    } else if (item.categoryCode === "Breads") {
      const randomNum = Math.floor(Math.random() * 900) + 100;
      newMenuCode = `BRD0${randomNum}`;
    } else if (item.categoryCode === "Sides") {
      if (item.subCategory === "Sides") {
        const randomNum = Math.floor(Math.random() * 900) + 100;
        newMenuCode = `SID0${randomNum}`;
      } else if (item.subCategory === "Dips") {
        const randomNum = Math.floor(Math.random() * 900) + 100;
        newMenuCode = `DIP0${randomNum}`;
      } else if (item.subCategory === "Tacos") {
        const randomNum = Math.floor(Math.random() * 90) + 10;
        if (item.vegNonVeg === "Veg") {
          newMenuCode = `TACVG${randomNum}`;
        } else {
          newMenuCode = `TACNV${randomNum}`;
        }
      } else if (item.subCategory === "Parcels") {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        if (item.vegNonVeg === "Veg") {
          newMenuCode = `VGPARCEL${randomNum}`;
        } else {
          newMenuCode = `NVPARCEL${randomNum}`;
        }
      }
    } else if (item.categoryCode === "Desserts") {
      if (item.subCategory === "Desserts") {
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        newMenuCode = `DST${randomNum}`;
      } else if (item.subCategory === "Cakes") {
        const randomNum = Math.floor(Math.random() * 90) + 10;
        newMenuCode = `CAK${randomNum}`;
      }
    }
    
    onUpdate({ menuCode: newMenuCode });
    
    // Show success toast
    toast({
      title: "Menu Code auto-generated",
      description: `Generated code: ${newMenuCode}`,
      className: "bg-success text-success-foreground border-success",
      duration: 2000,
    });
  };

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

  const handleSubmitRow = () => {
    if (!item.categoryCode || !item.vegNonVeg || !item.menuCode || !item.menuItemName || 
        item.sizeCodes.length === 0 || item.channels.length === 0) {
      return;
    }

    const newRows: MenuItem[] = [];
    const baseNumber = parseInt(item.menuCode.slice(3));
    
    // Generate rows for each channel-size combination
    item.channels.forEach((channel, channelIndex) => {
      // Generate new menu code for each channel (starting from base code for first channel)
      const menuCodeNumber = baseNumber + channelIndex;
      const newMenuCode = `${item.menuCode.slice(0, 3)}${String(menuCodeNumber).padStart(3, '0')}`;
      
      item.sizeCodes.forEach((sizeCode, sizeIndex) => {
        if (channelIndex === 0 && sizeIndex === 0) {
          // Update the original row for first combination
          onUpdate({ 
            isLocked: true,
            sizeCodes: [sizeCode],
            channels: [channel],
            menuCode: newMenuCode
          });
          return;
        }
        
        newRows.push({
          id: `${item.id}_${channelIndex}_${sizeIndex}`,
          categoryCode: item.categoryCode,
          subCategory: item.subCategory,
          vegNonVeg: item.vegNonVeg,
          menuCode: newMenuCode,
          menuItemName: item.menuItemName,
          sizeCodes: [sizeCode],
          channels: [channel],
          isLocked: true
        });
      });
    });
    
    setExpandedRows(newRows);
  };

  // Form validation - vegNonVeg only required if enabled
  const needsVegNonVeg = isVegNonVegEnabled();
  const needsSubCategory = isSubCategoryEnabled;
  const isFormValid = item.categoryCode && 
                     (!needsVegNonVeg || item.vegNonVeg) && 
                     (!needsSubCategory || item.subCategory) &&
                     item.menuCode && 
                     item.menuItemName && item.sizeCodes.length > 0 && item.channels.length > 0;

  if (item.isLocked) {
    return (
      <div className="space-y-2">
        <div className="border rounded-lg p-4 bg-muted/50">
          <div className="grid grid-cols-7 gap-4 items-center">
            <div className="text-sm">{item.categoryCode}</div>
            <div className="text-sm">{item.vegNonVeg}</div>
            <div className="text-sm font-mono">{item.menuCode}</div>
            <div className="text-sm">{item.menuItemName}</div>
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
        {expandedRows.map((expandedItem) => (
          <div key={expandedItem.id} className="border rounded-lg p-4 bg-muted/30">
            <div className="grid grid-cols-7 gap-4 items-center">
              <div className="text-sm">{expandedItem.categoryCode}</div>
              <div className="text-sm">{expandedItem.vegNonVeg}</div>
              <div className="text-sm font-mono">{expandedItem.menuCode}</div>
              <div className="text-sm">{expandedItem.menuItemName}</div>
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
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 space-y-4">
      {/* All fields in one row */}
      <div className="grid grid-cols-8 gap-3 items-end">
        {/* Category Code */}
        <div className="space-y-2 min-w-[150px]">
          <Label className="text-sm">Category *</Label>
          <Select value={item.categoryCode} onValueChange={handleCategoryChange}>
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

        {/* SubCategory */}
        <div className="space-y-2 min-w-[110px]">
          <Label className="text-sm text-muted-foreground">SubCategory</Label>
          <Select 
            value={item.subCategory} 
            onValueChange={handleSubCategoryChange}
            disabled={!isSubCategoryEnabled}
          >
            <SelectTrigger className={`h-10 w-full ${!isSubCategoryEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {getSubCategoryOptions().map((sub) => (
                <SelectItem key={sub.value} value={sub.value}>
                  {sub.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Veg/Non Veg */}
        <div className="space-y-2 min-w-[110px]">
          <Label className="text-sm text-muted-foreground">Veg/Non-Veg</Label>
          <Select 
            value={item.vegNonVeg} 
            onValueChange={(value) => onUpdate({ vegNonVeg: value })}
            disabled={!isVegNonVegEnabled()}
          >
            <SelectTrigger className={`h-10 w-full ${!isVegNonVegEnabled() ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {vegNonVegOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Menu Code */}
        <div className="space-y-2 min-w-[130px]">
          <Label className="text-sm">Menu Code *</Label>
          <div className="flex gap-1.5">
            <Input
              value={item.menuCode}
              placeholder="Auto-gen"
              readOnly
              className="font-mono h-10 text-sm flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateMenuCode}
              disabled={!item.categoryCode || (isVegNonVegEnabled() && !item.vegNonVeg) || ((item.categoryCode === "Sides" || item.categoryCode === "Desserts") && !item.subCategory)}
              className="h-10 w-10 p-0 shrink-0"
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Menu Item Name */}
        <div className="space-y-2 min-w-[180px]">
          <Label className="text-sm">Item Name *</Label>
          <Input
            value={item.menuItemName}
            onChange={(e) => onUpdate({ menuItemName: e.target.value })}
            placeholder="e.g., Sourdough Corn Pizza"
            className="h-10"
          />
        </div>

        {/* Size Codes */}
        <div className="space-y-2 min-w-[140px]">
          <Label className="text-sm">Size Code *</Label>
          <Select>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder={
                item.sizeCodes.length > 0 
                  ? `${item.sizeCodes.length} selected` 
                  : "Select sizes"
              } />
            </SelectTrigger>
            <SelectContent>
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
        <div className="space-y-2 min-w-[140px]">
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

      {/* Multiple selections info - appears below the form */}
      {item.channels.length > 1 && (
        <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-xs text-blue-700 font-medium flex items-center gap-1">
            <span className="text-blue-500">ⓘ</span>
            Multiple Channel selections will auto-generate additional menu codes
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {item.sizeCodes.length} size{item.sizeCodes.length > 1 ? 's' : ''} × {item.channels.length} channel{item.channels.length > 1 ? 's' : ''} = {item.sizeCodes.length * item.channels.length} rows
          </p>
        </div>
      )}
    </div>
  );
};
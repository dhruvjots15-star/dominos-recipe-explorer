import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface MenuItemRowProps {
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

export const MenuItemRow = ({ item, index, onUpdate, onDelete }: MenuItemRowProps) => {
  const [expandedRows, setExpandedRows] = useState<MenuItem[]>([]);

  const generateMenuCode = () => {
    if (!item.categoryCode || !item.vegNonVeg) return;
    
    let prefix = "";
    if (item.categoryCode === "MCT0001") {
      prefix = item.vegNonVeg === "Veg" ? "PIZ" : "PIZ";
    } else if (item.categoryCode === "MCT0002") {
      prefix = "BEV";
    } else if (item.categoryCode === "MCT0003") {
      prefix = "BRD";
    }
    
    const randomNum = Math.floor(Math.random() * 900) + 50000;
    const newMenuCode = `${prefix}${randomNum}`;
    onUpdate({ menuCode: newMenuCode });
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

    const totalCombinations = item.sizeCodes.length * item.channels.length;
    
    if (totalCombinations === 1) {
      onUpdate({ isLocked: true });
    } else {
      // Generate additional rows for each combination
      const newRows: MenuItem[] = [];
      
      item.sizeCodes.forEach(sizeCode => {
        item.channels.forEach((channel, channelIndex) => {
          if (channelIndex === 0 && sizeCode === item.sizeCodes[0]) {
            // This is the original row
            onUpdate({ isLocked: true });
            return;
          }
          
          const channelCode = channel;
          const newMenuCode = `${item.menuCode.slice(0, 3)}${parseInt(item.menuCode.slice(3)) + newRows.length + 1}`;
          
          newRows.push({
            id: `${item.id}_${sizeCode}_${channel}`,
            categoryCode: item.categoryCode,
            vegNonVeg: item.vegNonVeg,
            menuCode: newMenuCode,
            menuItemName: `${channelCode}_${item.menuItemName}`,
            sizeCodes: [sizeCode],
            channels: [channel],
            isLocked: true
          });
        });
      });
      
      setExpandedRows(newRows);
    }
  };

  const isFormValid = item.categoryCode && item.vegNonVeg && item.menuCode && 
                     item.menuItemName && item.sizeCodes.length > 0 && item.channels.length > 0;

  if (item.isLocked) {
    return (
      <div className="space-y-2">
        <div className="border rounded-lg p-4 bg-muted/50">
          <div className="grid grid-cols-6 gap-4 items-center">
            <div>
              <Label className="text-xs text-muted-foreground">Category</Label>
              <p className="text-sm">{item.categoryCode}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <p className="text-sm">{item.vegNonVeg}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Menu Code</Label>
              <p className="text-sm font-mono">{item.menuCode}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Item Name</Label>
              <p className="text-sm">{item.menuItemName}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Size Codes</Label>
              <div className="flex flex-wrap gap-1">
                {item.sizeCodes.map(sc => (
                  <Badge key={sc} variant="outline" className="text-xs">{sc}</Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Render expanded rows */}
        {expandedRows.map((expandedItem) => (
          <div key={expandedItem.id} className="border rounded-lg p-4 bg-muted/30 ml-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              <div>
                <p className="text-sm">{expandedItem.categoryCode}</p>
              </div>
              <div>
                <p className="text-sm">{expandedItem.vegNonVeg}</p>
              </div>
              <div>
                <p className="text-sm font-mono">{expandedItem.menuCode}</p>
              </div>
              <div>
                <p className="text-sm">{expandedItem.menuItemName}</p>
              </div>
              <div>
                <Badge variant="outline" className="text-xs">{expandedItem.sizeCodes[0]}</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
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
    <div className="border rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Category Code */}
        <div className="space-y-2">
          <Label>Category Code *</Label>
          <Select value={item.categoryCode} onValueChange={(value) => onUpdate({ categoryCode: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
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

        {/* Veg/Non Veg */}
        <div className="space-y-2">
          <Label>Veg/Non Veg *</Label>
          <Select value={item.vegNonVeg} onValueChange={(value) => onUpdate({ vegNonVeg: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
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
        <div className="space-y-2">
          <Label>Menu Code *</Label>
          <div className="flex gap-2">
            <Input
              value={item.menuCode}
              placeholder="Auto-generated"
              readOnly
              className="font-mono"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={generateMenuCode}
              disabled={!item.categoryCode || !item.vegNonVeg}
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Menu Item Name */}
        <div className="space-y-2">
          <Label>Menu Item Name *</Label>
          <Input
            value={item.menuItemName}
            onChange={(e) => onUpdate({ menuItemName: e.target.value })}
            placeholder="e.g., Sourdough Corn Pizza"
          />
        </div>
      </div>

      {/* Size Codes */}
      <div className="space-y-2">
        <Label>Size Code *</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizeCodes.map((size) => (
            <div key={size.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${item.id}-${size.value}`}
                checked={item.sizeCodes.includes(size.value)}
                onCheckedChange={(checked) => 
                  handleSizeCodeChange(size.value, checked as boolean)
                }
              />
              <Label htmlFor={`${item.id}-${size.value}`} className="text-sm">
                {size.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div className="space-y-2">
        <Label>Channels *</Label>
        <div className="grid grid-cols-2 gap-2">
          {channels.map((channel) => (
            <div key={channel.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${item.id}-${channel.value}`}
                checked={item.channels.includes(channel.value)}
                onCheckedChange={(checked) => 
                  handleChannelChange(channel.value, checked as boolean)
                }
              />
              <Label htmlFor={`${item.id}-${channel.value}`} className="text-sm">
                {channel.label}
              </Label>
            </div>
          ))}
        </div>
        {item.sizeCodes.length > 1 || item.channels.length > 1 ? (
          <p className="text-xs text-muted-foreground">
            Multiple selections will auto-generate additional menu codes
          </p>
        ) : null}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmitRow}
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
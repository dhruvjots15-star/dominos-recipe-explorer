import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeSelectionFormProps {
  onShowRecipe: (version: string, product: string, size: string) => void;
}

// Generate dummy pizza list
const generatePizzaList = () => {
  const pizzas = [
    { code: "PIZ0011", name: "Farmhouse Pizza" },
  ];
  
  const pizzaNames = [
    "Margherita", "Pepperoni", "Vegetarian", "Hawaiian", "BBQ Chicken",
    "Mushroom", "Four Cheese", "Spicy", "Supreme", "Mexican",
    "Mediterranean", "Seafood", "Buffalo", "Greek", "Tandoori",
    "Pesto", "Truffle", "Garlic Bread", "Cheese Burst", "Paneer Tikka"
  ];
  
  for (let i = 1; i < 100; i++) {
    if (i === 11) continue; // Skip as we already added Farmhouse
    const code = `PIZ${String(i).padStart(4, '0')}`;
    const name = pizzaNames[i % pizzaNames.length] + (i > 20 ? ` ${Math.floor(i / 20)}` : "");
    pizzas.push({ code, name });
  }
  
  return pizzas;
};

const pizzaList = generatePizzaList();

const sizeOptions = [
  "HT07-RegHT",
  "HT95-MedHT",
  "HT125-LarHT",
  "CB07-RegBU",
  "BU95-MedBU",
  "PZ11-RegPZ",
  "PZ14-MedPZ",
  "PZ16-LarPZ",
  "SD07-RegSD",
  "SD10-MedSD",
  "SD13-LarSD",
  "TH08-RegTH",
  "TH11-MedTH",
  "TH14-LarTH",
  "CR09-RegCR",
];

export const RecipeSelectionForm = ({ onShowRecipe }: RecipeSelectionFormProps) => {
  const [version, setVersion] = useState("v5 All India Stores");
  const [productOpen, setProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleShowRecipe = () => {
    if (selectedProduct && selectedSize) {
      onShowRecipe(version, selectedProduct, selectedSize);
    }
  };

  const selectedPizza = pizzaList.find(p => `${p.code}-${p.name}` === selectedProduct);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Select Version</Label>
        <Select value={version} onValueChange={setVersion}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="v5 All India Stores">v5 All India Stores</SelectItem>
            <SelectItem value="v6 Maharashtra stores">v6 Maharashtra stores</SelectItem>
            <SelectItem value="v7 Moz + Cheddar for CHD">v7 Moz + Cheddar for CHD</SelectItem>
            <SelectItem value="v8 BBP Doughball change">v8 BBP Doughball change</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Select Product</Label>
        <Popover open={productOpen} onOpenChange={setProductOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={productOpen}
              className="w-full justify-between"
            >
              {selectedProduct || "Enter Farmhouse or PIZ0001 to search"}
              <Check
                className={cn(
                  "ml-2 h-4 w-4 shrink-0 opacity-0",
                  selectedProduct && "opacity-100"
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search by pizza name or code..." />
              <CommandList>
                <CommandEmpty>No pizza found.</CommandEmpty>
                <CommandGroup>
                  {pizzaList.map((pizza) => (
                    <CommandItem
                      key={pizza.code}
                      value={`${pizza.code}-${pizza.name}`}
                      onSelect={(currentValue) => {
                        setSelectedProduct(currentValue === selectedProduct ? "" : currentValue);
                        setProductOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedProduct === `${pizza.code}-${pizza.name}` ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {pizza.code}-{pizza.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedProduct && (
        <div className="space-y-2">
          <Label>Select Size</Label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button 
        onClick={handleShowRecipe}
        disabled={!selectedProduct || !selectedSize}
        className="w-full"
      >
        Show Recipe
      </Button>
    </div>
  );
};

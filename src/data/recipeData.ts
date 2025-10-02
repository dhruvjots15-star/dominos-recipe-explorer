// Enhanced recipe data based on the uploaded Excel file
export interface RecipeItem {
  menuCode: string;
  menuCategoryCode: string;
  channel: string;
  description: string;
  sizeCode: string;
  sizeDescription: string;
  inventoryDescription: string;
  inventoryCode: string;
  portionUnit: string;
  amount: string;
  extraTopping?: string;
  applyCarryOut?: string;
  applyDelivery?: string;
  applyDineIn?: string;
  applyPickUp?: string;
}

export interface ProductSummary {
  description: string;
  menuCodes: string[];
  totalRecipes: number;
  category: string;
  isVeg: boolean;
  sizeCodes: string[];
  sizeDescriptions: string[];
}

// Mock data based on Excel structure - in real app, this would come from API
export const mockRecipeData: RecipeItem[] = [
  // Farmhouse recipes (12 total)
  { menuCode: "PIZ0119", menuCategoryCode: "Pizza", channel: "OA", description: "VG1-1Farmhouse", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0119", menuCategoryCode: "Pizza", channel: "OA", description: "VG1-1Farmhouse", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0119", menuCategoryCode: "Pizza", channel: "OA", description: "VG1-1Farmhouse", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  
  { menuCode: "PIZ0120", menuCategoryCode: "Pizza", channel: "DI", description: "VG1-1Farmhouse", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0120", menuCategoryCode: "Pizza", channel: "DI", description: "VG1-1Farmhouse", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0120", menuCategoryCode: "Pizza", channel: "DI", description: "VG1-1Farmhouse", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  
  { menuCode: "PIZ0121", menuCategoryCode: "Pizza", channel: "IR", description: "VG1-1Farmhouse", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0121", menuCategoryCode: "Pizza", channel: "IR", description: "VG1-1Farmhouse", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0121", menuCategoryCode: "Pizza", channel: "IR", description: "VG1-1Farmhouse", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  
  { menuCode: "PIZ0122", menuCategoryCode: "Pizza", channel: "AG", description: "VG1-1Farmhouse", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0122", menuCategoryCode: "Pizza", channel: "AG", description: "VG1-1Farmhouse", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0122", menuCategoryCode: "Pizza", channel: "AG", description: "VG1-1Farmhouse", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },

  // Margherita recipes (12 total)
  { menuCode: "PIZ0123", menuCategoryCode: "Pizza", channel: "OA", description: "Margherita", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0123", menuCategoryCode: "Pizza", channel: "OA", description: "Margherita", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0123", menuCategoryCode: "Pizza", channel: "OA", description: "Margherita", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  
  { menuCode: "PIZ0124", menuCategoryCode: "Pizza", channel: "DI", description: "Margherita", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0124", menuCategoryCode: "Pizza", channel: "DI", description: "Margherita", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0124", menuCategoryCode: "Pizza", channel: "DI", description: "Margherita", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  
  { menuCode: "PIZ0125", menuCategoryCode: "Pizza", channel: "IR", description: "Margherita", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0125", menuCategoryCode: "Pizza", channel: "IR", description: "Margherita", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0125", menuCategoryCode: "Pizza", channel: "IR", description: "Margherita", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  
  { menuCode: "PIZ0126", menuCategoryCode: "Pizza", channel: "AG", description: "Margherita", sizeCode: "HT07", sizeDescription: "Reg HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0126", menuCategoryCode: "Pizza", channel: "AG", description: "Margherita", sizeCode: "HT95", sizeDescription: "Med HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" },
  { menuCode: "PIZ0126", menuCategoryCode: "Pizza", channel: "AG", description: "Margherita", sizeCode: "HT125", sizeDescription: "Lar HT", inventoryCode: "BOX0001", inventoryDescription: "BOX_PKG- Box Regular", portionUnit: "NOS", amount: "1.00", extraTopping: "", applyCarryOut: "1", applyDelivery: "1", applyDineIn: "0", applyPickUp: "1" }
];

// Filter options based on data analysis
export const filterOptions = {
  categories: [
    { value: "MCT0001", label: "Pizza" },
    { value: "MCT0002", label: "Sides" },
    { value: "MCT0003", label: "Beverages" },
    { value: "MCT0004", label: "Desserts" }
  ],
  sizeCodes: [
    { value: "HT07", label: "HT07" },
    { value: "HT95", label: "HT95" },
    { value: "HT125", label: "HT125" },
    { value: "CB07", label: "CB07" },
    { value: "CB95", label: "CB95" },
    { value: "CB125", label: "CB125" },
    { value: "WT07", label: "WT07" },
    { value: "WT95", label: "WT95" },
    { value: "REG", label: "REG" }
  ],
  sizeDescriptions: [
    { value: "Reg HT", label: "Reg HT" },
    { value: "Med HT", label: "Med HT" }, 
    { value: "Lar HT", label: "Lar HT" },
    { value: "Reg CB", label: "Reg CB" },
    { value: "Med CB", label: "Med CB" },
    { value: "Lar CB", label: "Lar CB" },
    { value: "Reg WT", label: "Reg WT" },
    { value: "Med WT", label: "Med WT" },
    { value: "Regular", label: "Regular" }
  ],
  types: [
    { value: "VG", label: "Veg" },
    { value: "NV", label: "Non-Veg" }
  ]
};

// Utility functions for data processing
export const getProductSummaries = (data: RecipeItem[]): ProductSummary[] => {
  const productMap = new Map<string, ProductSummary>();
  
  data.forEach(item => {
    const key = `${item.description}-${item.menuCategoryCode}`;
    if (!productMap.has(key)) {
      productMap.set(key, {
        description: item.description,
        menuCodes: [],
        totalRecipes: 0,
        category: getCategoryName(item.menuCategoryCode),
        isVeg: item.description.includes('VG') || !item.description.includes('NV'),
        sizeCodes: [],
        sizeDescriptions: []
      });
    }
    
    const summary = productMap.get(key)!;
    if (!summary.menuCodes.includes(item.menuCode)) {
      summary.menuCodes.push(item.menuCode);
    }
    if (!summary.sizeCodes.includes(item.sizeCode)) {
      summary.sizeCodes.push(item.sizeCode);
    }
    if (!summary.sizeDescriptions.includes(item.sizeDescription)) {
      summary.sizeDescriptions.push(item.sizeDescription);
    }
    summary.totalRecipes++;
  });
  
  return Array.from(productMap.values());
};

export const getCategoryName = (categoryCode: string): string => {
  const category = filterOptions.categories.find(cat => cat.value === categoryCode);
  return category?.label || categoryCode;
};

export const getIngredientCount = (data: RecipeItem[], menuCode: string, sizeCode: string): number => {
  const farmhouseCodes = ["PIZ0119", "PIZ0121", "PIZ0122"];
  const farmhouseDI = ["PIZ0120"];
  const margheritaCodes = ["PIZ0123", "PIZ0125", "PIZ0126"];
  const margheritaDI = ["PIZ0124"];
  
  if (farmhouseCodes.includes(menuCode)) return 20;
  if (farmhouseDI.includes(menuCode)) return 22;
  if (margheritaCodes.includes(menuCode)) return 14;
  if (margheritaDI.includes(menuCode)) return 16;
  
  return 20;
};

export const searchRecipes = (
  data: RecipeItem[], 
  searchTerm: string, 
  searchType: 'product' | 'ingredient'
): RecipeItem[] => {
  if (!searchTerm.trim()) return data;
  
  const term = searchTerm.toLowerCase();
  
  if (searchType === 'product') {
    return data.filter(item =>
      item.description.toLowerCase().includes(term) ||
      item.menuCode.toLowerCase().includes(term) ||
      item.sizeCode.toLowerCase().includes(term) ||
      item.sizeDescription.toLowerCase().includes(term)
    );
  } else {
    return data.filter(item =>
      item.inventoryDescription.toLowerCase().includes(term) ||
      item.inventoryCode.toLowerCase().includes(term)
    );
  }
};
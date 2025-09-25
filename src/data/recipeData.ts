// Enhanced recipe data based on the uploaded Excel file
export interface RecipeItem {
  menuCode: string;
  menuCategoryCode: string;
  description: string;
  sizeCode: string;
  sizeDescription: string;
  inventoryDescription: string;
  inventoryCode: string;
  portionUnit: string;
  amount: string;
  extraTopping?: string;
  applyCarryOut?: number;
  applyDelivery?: number;
  applyDineIn?: number;
  applyPickUp?: number;
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
  // Peppy Paneer variants
  {
    menuCode: "PIZ0120",
    menuCategoryCode: "MCT0001", 
    description: "VG2-1Peppy Paneer",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "Cold Dough Regular (140 Gm)",
    inventoryCode: "80001097",
    portionUnit: "NOS",
    amount: "1.00"
  },
  {
    menuCode: "PIZ0120",
    menuCategoryCode: "MCT0001",
    description: "VG2-1Peppy Paneer", 
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "CH_Diced Mozzarella - New Specs",
    inventoryCode: "10000721",
    portionUnit: "GMS",
    amount: "48.00",
    extraTopping: "Y"
  },
  {
    menuCode: "PIZ0120",
    menuCategoryCode: "MCT0001",
    description: "VG2-1Peppy Paneer",
    sizeCode: "HT07", 
    sizeDescription: "Reg HT",
    inventoryDescription: "VG TOP_Green Pepper",
    inventoryCode: "VFF0002",
    portionUnit: "GMS",
    amount: "25.00",
    extraTopping: "Y"
  },
  {
    menuCode: "PIZ0120",
    menuCategoryCode: "MCT0001",
    description: "VG2-1Peppy Paneer",
    sizeCode: "HT07",
    sizeDescription: "Reg HT", 
    inventoryDescription: "VG TOP_Paneer",
    inventoryCode: "CPM0003",
    portionUnit: "GMS",
    amount: "50.00",
    extraTopping: "Y"
  },
  {
    menuCode: "PIZ0120",
    menuCategoryCode: "MCT0001",
    description: "VG2-1Peppy Paneer",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "SAU_Tomato Blend", 
    inventoryCode: "SPI0001",
    portionUnit: "GMS",
    amount: "40.00",
    extraTopping: "Y"
  },
  // Farmhouse variants
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "Cold Dough Regular (140 Gm)",
    inventoryCode: "80001097", 
    portionUnit: "NOS",
    amount: "1.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "CH_Diced Mozzarella - New Specs",
    inventoryCode: "10000721",
    portionUnit: "GMS", 
    amount: "48.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "VG TOP_Onion",
    inventoryCode: "VFF0001",
    portionUnit: "GMS",
    amount: "35.00"
  },
  {
    menuCode: "PIZ0119", 
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "VG TOP_Green Pepper",
    inventoryCode: "VFF0002",
    portionUnit: "GMS",
    amount: "20.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT", 
    inventoryDescription: "VG TOP_Tomato",
    inventoryCode: "VFF0003",
    portionUnit: "GMS",
    amount: "25.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT07",
    sizeDescription: "Reg HT",
    inventoryDescription: "VG TOP_Mushroom",
    inventoryCode: "VFF0010",
    portionUnit: "GMS",
    amount: "36.00"
  },
  // Medium size variants
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001",
    description: "VG1-1Farmhouse",
    sizeCode: "HT95",
    sizeDescription: "Med HT",
    inventoryDescription: "Cold Dough Medium (180 Gm)",
    inventoryCode: "80001098",
    portionUnit: "NOS",
    amount: "1.00"
  },
  {
    menuCode: "PIZ0119",
    menuCategoryCode: "MCT0001", 
    description: "VG1-1Farmhouse",
    sizeCode: "HT95",
    sizeDescription: "Med HT",
    inventoryDescription: "CH_Diced Mozzarella - New Specs",
    inventoryCode: "10000721",
    portionUnit: "GMS",
    amount: "65.00"
  },
  // Beverages category
  {
    menuCode: "BEV0001",
    menuCategoryCode: "MCT0003",
    description: "Pepsi 500ml",
    sizeCode: "REG",
    sizeDescription: "Regular",
    inventoryDescription: "Pepsi Bottle 500ml",
    inventoryCode: "BEV500001",
    portionUnit: "NOS",
    amount: "1.00"
  },
  // Sides category
  {
    menuCode: "SID0001", 
    menuCategoryCode: "MCT0002",
    description: "Garlic Breadsticks",
    sizeCode: "REG",
    sizeDescription: "Regular",
    inventoryDescription: "Breadstick Dough",
    inventoryCode: "BRD0001",
    portionUnit: "NOS",
    amount: "6.00"
  },
  {
    menuCode: "SID0001",
    menuCategoryCode: "MCT0002",
    description: "Garlic Breadsticks", 
    sizeCode: "REG",
    sizeDescription: "Regular",
    inventoryDescription: "Garlic Butter Spread",
    inventoryCode: "GAR0001",
    portionUnit: "GMS",
    amount: "15.00"
  }
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
  return data.filter(item => 
    item.menuCode === menuCode && 
    item.sizeCode === sizeCode
  ).length;
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
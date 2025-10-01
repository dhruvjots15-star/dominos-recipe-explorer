export interface InventoryCodeItem {
  inventoryCode: string;
  inventoryDescription: string;
  newPortionUnit: string;
  orderUnit: string;
  countUnit: string;
  countOrder: number;
  oldPortionUnit: string;
  oldPortionCount: number;
  newPortionCount: number;
}

export interface InventoryRequest {
  id: string;
  requestDesc: string;
  requestType: string;
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: string;
  goLiveDate?: string;
  inventoryItems?: Array<{
    inventoryCode: string;
    inventoryDescription: string;
    newPortionUnit: string;
    orderUnit: string;
    countUnit: string;
  }>;
}

export const inventoryCodesData: InventoryCodeItem[] = [
  { inventoryCode: "10000492", inventoryDescription: "NV TOP_Chicken Pepperoni", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000634", inventoryDescription: "NV TOP_Chilli Herb Sausage", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000635", inventoryDescription: "NV TOP_Chicken Tikka Masala", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000638", inventoryDescription: "SAU_Spicy Red Dressing", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000640", inventoryDescription: "SES_Pepper & Herb Seasoning (70gm)", newPortionUnit: "GMS", orderUnit: "PKT", countUnit: "KGS", countOrder: 0.07, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000721", inventoryDescription: "CH_Diced Mozzarella - New Specs", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000822", inventoryDescription: "NV TOP_Peri Peri Chicken - New Specs", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10000823", inventoryDescription: "NV TOP_BBQ Pepper Chicken - New Specs", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10001052", inventoryDescription: "Mint Mayo", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10001053", inventoryDescription: "SAU_Peri Peri Sauce", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10001055", inventoryDescription: "VG TOP_Paneer Tikka Topping", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10001141", inventoryDescription: "SES_Achari Seasoning", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10001142", inventoryDescription: "NV TOP_Chicken Keema", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10001591", inventoryDescription: "CH_Process Cheese Ghost Pepper", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "10002536", inventoryDescription: "Wheat based Pizza saver", newPortionUnit: "NOS", orderUnit: "NOS", countUnit: "NOS", countOrder: 1, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "10002987", inventoryDescription: "SOT_Guntur Chilli Sauce 500g", newPortionUnit: "GMS", orderUnit: "PKT", countUnit: "PKT", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 0.5, newPortionCount: 500 },
  { inventoryCode: "10003192", inventoryDescription: "SES- Korean Seasoning", newPortionUnit: "GMS", orderUnit: "EA", countUnit: "EA", countOrder: 1, oldPortionUnit: "EA", oldPortionCount: 1, newPortionCount: 25 },
  { inventoryCode: "CPM0003", inventoryDescription: "VG TOP_Paneer", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "CMP0005", inventoryDescription: "CH_Filler Cheese", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "CMP0016", inventoryDescription: "OTH_ K-Cuisine", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "CMP0034", inventoryDescription: "CH_Shredded Orange Cheddar Cheese (150 gm pkt)", newPortionUnit: "GMS", orderUnit: "PKT", countUnit: "KG", countOrder: 0.15, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "DOI0001", inventoryDescription: "OTH_ Oil", newPortionUnit: "GMS", orderUnit: "LITRE", countUnit: "LITRE", countOrder: 1, oldPortionUnit: "LITRE", oldPortionCount: 1, newPortionCount: 910 },
  { inventoryCode: "NVG0048", inventoryDescription: "NV TOP_TOP NV_Grilled Chicken Rashers", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SES0003", inventoryDescription: "SES_Mexican Seasoning", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SES0005", inventoryDescription: "SES_Chilli Flakes", newPortionUnit: "NOS", orderUnit: "BOX", countUnit: "PKT", countOrder: 5, oldPortionUnit: "SACHT", oldPortionCount: 100, newPortionCount: 100 },
  { inventoryCode: "SES0006", inventoryDescription: "SES_Zesty Blend", newPortionUnit: "GMS", orderUnit: "PKT", countUnit: "KG", countOrder: 0.685, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SES0007", inventoryDescription: "SES_Oregano Seasoning", newPortionUnit: "NOS", orderUnit: "BOX", countUnit: "PKT", countOrder: 5, oldPortionUnit: "SACHT", oldPortionCount: 100, newPortionCount: 100 },
  { inventoryCode: "SES0010", inventoryDescription: "SES_Bake Sprinkle", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SES0032", inventoryDescription: "Basil Parsley Sprinkle", newPortionUnit: "GMS", orderUnit: "KGS", countUnit: "KGS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SES0036", inventoryDescription: "SES_Paneer Mix Powder", newPortionUnit: "GMS", orderUnit: "NOS", countUnit: "NOS", countOrder: 1, oldPortionUnit: "KGS", oldPortionCount: 0.03, newPortionCount: 30 },
  { inventoryCode: "SOT0001", inventoryDescription: "SAU_Hot & Sweet Sauce", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SOT0018", inventoryDescription: "CH_SAU- Seasoned Cheese Blend", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "SPI0001", inventoryDescription: "SAU_Tomato Blend", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VCN0001", inventoryDescription: "OTH_ Corn Meal", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VCN0002", inventoryDescription: "VG TOP_Corn", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VCN0004", inventoryDescription: "VG TOP_Black Olives", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VCN0006", inventoryDescription: "VG TOP_Red Peppers", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VCN0011", inventoryDescription: "VG TOP_Jalapeno", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VFF0001", inventoryDescription: "VG TOP_Onion", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VFF0002", inventoryDescription: "VG TOP_Green Pepper", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VFF0003", inventoryDescription: "VG TOP_Tomato", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "VFF0010", inventoryDescription: "VG TOP_Mushroom", newPortionUnit: "GMS", orderUnit: "KG", countUnit: "KG", countOrder: 1, oldPortionUnit: "KG", oldPortionCount: 1, newPortionCount: 1000 },
  { inventoryCode: "DOF0001", inventoryDescription: "PIE_ Cold Dough Regular", newPortionUnit: "NOS", orderUnit: "TRAY", countUnit: "NOS", countOrder: 15, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "80000161", inventoryDescription: "PIE_New Hand-Tossed Dough Reg (165gm)", newPortionUnit: "NOS", orderUnit: "TRAY", countUnit: "NOS", countOrder: 15, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "80000100", inventoryDescription: "PIE_New Hand-Tossed Dough (275gm)", newPortionUnit: "NOS", orderUnit: "TRAY", countUnit: "NOS", countOrder: 12, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "80000162", inventoryDescription: "New Hand-Tossed Dough Large (495gm)", newPortionUnit: "NOS", orderUnit: "TRAY", countUnit: "NOS", countOrder: 6, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "80000362", inventoryDescription: "PIE_Wheat Thin crust Regular", newPortionUnit: "NOS", orderUnit: "EA", countUnit: "EA", countOrder: 1, oldPortionUnit: "EA", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "TCF0021", inventoryDescription: "PIE_5.75 Tortilla", newPortionUnit: "NOS", orderUnit: "NOS", countUnit: "NOS", countOrder: 1, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "TCF0016", inventoryDescription: "PIE_TCF Thinner Tortilla Medium", newPortionUnit: "NOS", orderUnit: "NOS", countUnit: "NOS", countOrder: 1, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "TCF0017", inventoryDescription: "PIE_TCF Thin Crust Mediun-Wheat", newPortionUnit: "NOS", orderUnit: "NOS", countUnit: "NOS", countOrder: 1, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
  { inventoryCode: "80000842", inventoryDescription: "Multigrain Thin crust", newPortionUnit: "NOS", orderUnit: "NOS", countUnit: "NOS", countOrder: 1, oldPortionUnit: "NOS", oldPortionCount: 1, newPortionCount: 1 },
];

export const inventoryRequests: InventoryRequest[] = [
  {
    id: "REQ_151",
    requestDesc: "3 New Sourdough dough balls for Soudough pizzas",
    requestType: "NEW INVENTORY",
    requestedBy: "Satyam",
    requestCreatedDate: "2025-03-17T16:15:00",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON SC PLANNING",
    inventoryItems: [
      {
        inventoryCode: "80000197",
        inventoryDescription: "PIE_Sourdough Dough Reg (165gm)",
        newPortionUnit: "NOS",
        orderUnit: "TRAY",
        countUnit: "NOS"
      },
      {
        inventoryCode: "80000198",
        inventoryDescription: "PIE_Sourdough Dough Med (275gm)",
        newPortionUnit: "NOS",
        orderUnit: "TRAY",
        countUnit: "NOS"
      },
      {
        inventoryCode: "80000199",
        inventoryDescription: "PIE_SourdoughDough Lar (1495gm)",
        newPortionUnit: "NOS",
        orderUnit: "TRAY",
        countUnit: "NOS"
      }
    ]
  },
  {
    id: "REQ_141",
    requestDesc: "Modify Blue box to Green box in Inventory master",
    requestType: "UPDATE INVENTORY",
    requestedBy: "Satyam",
    requestCreatedDate: "2025-03-16T16:15:00",
    currentStatus: "REQUEST APPROVED, INVENTORY CODE MASTER UPDATED"
  },
];

export const getInventoryRequestById = (requestId: string): InventoryRequest | undefined => {
  return inventoryRequests.find(request => request.id === requestId);
};

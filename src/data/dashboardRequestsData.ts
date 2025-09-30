export interface DashboardRequest {
  requestId: string;
  requestDesc: string;
  requestType: 'NEW RECIPE' | 'RECIPE MODIFICATION' | 'VERSION EXTEND' | 'VERSION ROLLBACK' | 'NEW SIZE CODE' | 'NEW CATEGORY';
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: string;
  goLiveDate?: string;
  targetVersion?: string;
  affectedStores?: number;
  remarks?: string;
}

export const mockDashboardRequestsData: DashboardRequest[] = [
  // PENDING REQUESTS - Currently active
  {
    requestId: "REQ_142",
    requestDesc: "New Sourdough Pizza Recipes creation",
    requestType: "NEW RECIPE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2025-03-17T16:15:00Z",
    currentStatus: "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & SC PLANNING",
    targetVersion: "v1.0",
    affectedStores: 150,
    remarks: "New premium pizza line"
  },
  {
    requestId: "REQ_136",
    requestDesc: "Modify Recipes for Pizza Mania Pizzas in v7",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Kshitij",
    requestCreatedDate: "2025-03-16T16:15:00Z",
    currentStatus: "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY",
    targetVersion: "v7",
    affectedStores: 200,
    remarks: "Recipe updates for existing line"
  },
  {
    requestId: "REQ_125",
    requestDesc: "Extend v5 on 100 more stores",
    requestType: "VERSION EXTEND",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-15T16:15:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v5",
    affectedStores: 100,
    remarks: "Store expansion"
  },
  {
    requestId: "REQ_093",
    requestDesc: "New Chicken Feast Category to be created",
    requestType: "NEW CATEGORY",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-13T19:15:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v1.0",
    affectedStores: 250,
    remarks: "New menu category"
  },
  {
    requestId: "REQ_088",
    requestDesc: "3 New Size Codes for Big Big Pizza",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-13T16:15:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v1.0",
    affectedStores: 180,
    remarks: "Extra large size introduction"
  },
  {
    requestId: "REQ_075",
    requestDesc: "Modify Recipes in v8 to include new boxes material",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-12T16:15:00Z",
    currentStatus: "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & QUALITY",
    targetVersion: "v8",
    affectedStores: 220,
    remarks: "Packaging update"
  },
  {
    requestId: "REQ_021",
    requestDesc: "Rollback v10 Chandigarh SCC MOZ changes",
    requestType: "VERSION ROLLBACK",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-10T16:15:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v9",
    affectedStores: 50,
    remarks: "Regional rollback"
  },
  
  // NEW RECIPE & RECIPE MODIFICATION requests - all statuses
  {
    requestId: "REQ_NR_002",
    requestDesc: "New Vegan Chocolate Mousse dessert",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON CATEGORY & SC PLANNING & QUALITY",
    targetVersion: "v1.0",
    affectedStores: 120,
    remarks: "Plant-based dessert option"
  },
  {
    requestId: "REQ_NR_003",
    requestDesc: "New Korean BBQ Fusion Bowl",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON CATEGORY & SC PLANNING",
    targetVersion: "v1.0",
    affectedStores: 140,
    remarks: "Asian fusion cuisine"
  },
  {
    requestId: "REQ_NR_004",
    requestDesc: "New Breakfast Power Bowl",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON SC PLANNING & QUALITY",
    targetVersion: "v1.0",
    affectedStores: 175,
    remarks: "Healthy breakfast option"
  },
  {
    requestId: "REQ_NR_005",
    requestDesc: "New Artisanal Sourdough Sandwich",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON CATEGORY & QUALITY",
    targetVersion: "v1.0",
    affectedStores: 160,
    remarks: "Premium sandwich option"
  },
  {
    requestId: "REQ_NR_006",
    requestDesc: "New Seasonal Pumpkin Spice Latte",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v1.0",
    affectedStores: 200,
    remarks: "Seasonal beverage"
  },
  {
    requestId: "REQ_NR_007",
    requestDesc: "New Truffle Mac & Cheese",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVAL PENDING ON SC PLANNING",
    targetVersion: "v1.0",
    affectedStores: 140,
    remarks: "Premium comfort food"
  },
  {
    requestId: "REQ_NR_008",
    requestDesc: "New Thai Green Curry Bowl",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVAL PENDING ON QUALITY",
    targetVersion: "v1.0",
    affectedStores: 130,
    remarks: "Asian cuisine expansion"
  },
  {
    requestId: "REQ_NR_009",
    requestDesc: "New Gluten-Free Pizza Crust",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY CATEGORY",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "Quality concerns with gluten-free ingredients"
  },
  {
    requestId: "REQ_NR_010",
    requestDesc: "New Keto-Friendly Bowl",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY SC PLANNING",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "Supply chain constraints"
  },
  {
    requestId: "REQ_NR_011",
    requestDesc: "New Organic Smoothie Bowl",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY QUALITY",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "Failed quality standards"
  },
  {
    requestId: "REQ_NR_012",
    requestDesc: "New Gourmet Burger Collection",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REQUEST APPROVED, PENDING FINAL APPROVAL FROM FINANCE",
    targetVersion: "v1.0",
    affectedStores: 250,
    remarks: "Premium burger lineup"
  },
  {
    requestId: "REQ_NR_013",
    requestDesc: "New Farm Fresh Salad Bowl",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "ALL APPROVALS DONE, PENDING EXECUTION BY MDM(POS)",
    targetVersion: "v1.0",
    affectedStores: 180,
    remarks: "Fresh ingredients focus"
  },
  {
    requestId: "REQ_NR_014",
    requestDesc: "New Fusion Tacos Menu",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY FINANCE",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "Cost concerns"
  },
  {
    requestId: "REQ_NR_015",
    requestDesc: "New Plant-Based Burger",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE",
    targetVersion: "v1.0",
    affectedStores: 200,
    remarks: "Vegan option"
  },
  {
    requestId: "REQ_NR_016",
    requestDesc: "New Signature Pasta Collection",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY MDM(POS)",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "POS system limitations"
  },
  {
    requestId: "REQ_NR_017",
    requestDesc: "New Craft Coffee Selection",
    requestType: "NEW RECIPE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-10T20:00:00Z",
    currentStatus: "REQUEST LIVE, NEW RECIPES LIVE",
    goLiveDate: "2024-03-18T12:00:00Z",
    targetVersion: "v1.0",
    affectedStores: 300,
    remarks: "Successfully launched"
  },
  // RECIPE MODIFICATION requests
  {
    requestId: "REQ_RM_001",
    requestDesc: "Modify Classic Burger - reduce sodium content",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REQUEST CREATED, PENDING ON CHEF",
    targetVersion: "v3.2",
    affectedStores: 180,
    remarks: "Health initiative"
  },
  {
    requestId: "REQ_RM_002",
    requestDesc: "Modify Caesar Salad - switch to organic ingredients",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON CATEGORY & SC PLANNING & QUALITY",
    targetVersion: "v2.8",
    affectedStores: 200,
    remarks: "Sustainability initiative"
  },
  {
    requestId: "REQ_RM_003",
    requestDesc: "Modify Margherita Pizza - upgrade to premium ingredients",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON CATEGORY & SC PLANNING",
    targetVersion: "v4.1",
    affectedStores: 300,
    remarks: "Premium upgrade"
  },
  {
    requestId: "REQ_RM_004",
    requestDesc: "Modify Fish & Chips - gluten-free batter",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON SC PLANNING & QUALITY",
    targetVersion: "v2.5",
    affectedStores: 90,
    remarks: "Dietary accommodation"
  },
  {
    requestId: "REQ_RM_005",
    requestDesc: "Modify Chicken Tikka - adjust spice level",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVALS PENDING ON CATEGORY & QUALITY",
    targetVersion: "v3.7",
    affectedStores: 220,
    remarks: "Customer feedback driven"
  },
  {
    requestId: "REQ_RM_006",
    requestDesc: "Modify Pasta Carbonara - add truffle oil",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v2.1",
    affectedStores: 150,
    remarks: "Premium enhancement"
  },
  {
    requestId: "REQ_RM_007",
    requestDesc: "Modify Thai Curry - increase coconut milk",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVAL PENDING ON SC PLANNING",
    targetVersion: "v1.8",
    affectedStores: 110,
    remarks: "Creamier texture"
  },
  {
    requestId: "REQ_RM_008",
    requestDesc: "Modify Chocolate Cake - reduce sugar",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "RECIPES SUBMITTED BY CHEF, APPROVAL PENDING ON QUALITY",
    targetVersion: "v3.0",
    affectedStores: 170,
    remarks: "Health conscious option"
  },
  {
    requestId: "REQ_RM_009",
    requestDesc: "Modify Greek Salad - add feta cheese variant",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY CATEGORY",
    targetVersion: "v2.3",
    affectedStores: 0,
    remarks: "Ingredient concerns"
  },
  {
    requestId: "REQ_RM_010",
    requestDesc: "Modify BBQ Ribs - new sauce formula",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY SC PLANNING",
    targetVersion: "v1.5",
    affectedStores: 0,
    remarks: "Supply issues"
  },
  {
    requestId: "REQ_RM_011",
    requestDesc: "Modify Ice Cream - natural flavoring",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY QUALITY",
    targetVersion: "v2.0",
    affectedStores: 0,
    remarks: "Quality standards not met"
  },
  {
    requestId: "REQ_RM_012",
    requestDesc: "Modify Tandoori Chicken - marinade adjustment",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REQUEST APPROVED, PENDING FINAL APPROVAL FROM FINANCE",
    targetVersion: "v4.0",
    affectedStores: 280,
    remarks: "Flavor enhancement"
  },
  {
    requestId: "REQ_RM_013",
    requestDesc: "Modify Veggie Wrap - add hummus spread",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "ALL APPROVALS DONE, PENDING EXECUTION BY MDM(POS)",
    targetVersion: "v1.2",
    affectedStores: 160,
    remarks: "Flavor improvement"
  },
  {
    requestId: "REQ_RM_014",
    requestDesc: "Modify Breakfast Burrito - add salsa verde",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY FINANCE",
    targetVersion: "v2.7",
    affectedStores: 0,
    remarks: "Cost increase too high"
  },
  {
    requestId: "REQ_RM_015",
    requestDesc: "Modify Smoothie Bowl - organic fruits",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE",
    targetVersion: "v1.4",
    affectedStores: 140,
    remarks: "Organic upgrade"
  },
  {
    requestId: "REQ_RM_016",
    requestDesc: "Modify Fried Rice - add cashews",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15T20:00:00Z",
    currentStatus: "REJECTED BY MDM(POS)",
    targetVersion: "v3.1",
    affectedStores: 0,
    remarks: "Allergen concerns in POS"
  },
  {
    requestId: "REQ_RM_017",
    requestDesc: "Modify Espresso Blend - premium beans",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-10T20:00:00Z",
    currentStatus: "REQUEST LIVE, RECIPES MODIFIED",
    goLiveDate: "2024-03-18T12:00:00Z",
    targetVersion: "v2.9",
    affectedStores: 320,
    remarks: "Successfully upgraded"
  },
  // VERSION EXTEND and VERSION ROLLBACK requests from Recipe Bank
  {
    requestId: "REQ_013",
    requestDesc: "Extend current version v3.2 of Peppy Paneer recipe",
    requestType: "VERSION EXTEND",
    requestedBy: "Maria Santos",
    requestCreatedDate: "2024-03-05T09:30:00Z",
    currentStatus: "APPROVAL PENDING ON SC",
    targetVersion: "v3.3",
    affectedStores: 200,
    remarks: "Seasonal menu expansion"
  },
  {
    requestId: "REQ_014",
    requestDesc: "Rollback Farmhouse recipe from v2.8 to v2.6",
    requestType: "VERSION ROLLBACK",
    requestedBy: "James Wilson",
    requestCreatedDate: "2024-03-06T14:15:00Z",
    currentStatus: "APPROVED BY ALL, PENDING ON MDM",
    targetVersion: "v2.6",
    affectedStores: 180,
    remarks: "Quality issue with supplier"
  },
  {
    requestId: "REQ_015",
    requestDesc: "Extend Margherita Pizza v4.1",
    requestType: "VERSION EXTEND",
    requestedBy: "Sarah Kim",
    requestCreatedDate: "2024-03-07T10:45:00Z",
    currentStatus: "ACKNOWLEDGED BY MDM, CHANGES PENDING",
    targetVersion: "v4.2",
    affectedStores: 250,
    remarks: "Dietary accommodation"
  },
  // NEW SIZE CODE requests from Size Codes Master
  {
    requestId: "REQ_145",
    requestDesc: "New Size codes for Sourdough pizza",
    requestType: "NEW SIZE CODE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-03-15T14:30:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING",
    targetVersion: "v1.0",
    affectedStores: 150,
    remarks: "Premium crust option"
  },
  {
    requestId: "REQ_123",
    requestDesc: "New Size codes for Chicken Burst pizza",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-10T09:15:00Z",
    currentStatus: "REQUEST APPROVED, PENDING ON CHEF",
    targetVersion: "v1.0",
    affectedStores: 120,
    remarks: "Chicken filled crust variant"
  },
  {
    requestId: "REQ_129",
    requestDesc: "New Size codes",
    requestType: "NEW SIZE CODE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-03-08T16:45:00Z",
    currentStatus: "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF",
    targetVersion: "v1.0",
    affectedStores: 100,
    remarks: "Special edition size"
  },
  {
    requestId: "REQ_076",
    requestDesc: "Changing Size Codes for Reg HT pizza",
    requestType: "NEW SIZE CODE",
    requestedBy: "ADMIN",
    requestCreatedDate: "2024-02-20T10:30:00Z",
    currentStatus: "REQUEST APPROVED, PENDING ON CHEF",
    targetVersion: "v1.0",
    affectedStores: 300,
    remarks: "Updated specification"
  }
];

export const getDashboardRequestById = (requestId: string): DashboardRequest | undefined => {
  return mockDashboardRequestsData.find(request => request.requestId === requestId);
};
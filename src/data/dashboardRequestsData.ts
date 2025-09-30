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
  products?: Array<{
    menuCode: string;
    menuCategoryCode: string;
    description: string;
    sizeCode: string;
    sizeDescription: string;
  }>;
}

export const mockDashboardRequestsData: DashboardRequest[] = [
  {
    requestId: "REQ_142",
    requestDesc: "New Sourdough Pizza Recipes creation",
    requestType: "NEW RECIPE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2025-03-17T16:15:00Z",
    currentStatus: "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & SC PLANNING",
    targetVersion: "v5 All India, v6 Maharashtra Only, v7 Moz + Cheddar for CHD, v8 BBP Doughball change",
    affectedStores: 12,
    remarks: "New premium pizza line",
    products: [
      { menuCode: "PIZ0901", menuCategoryCode: "MCT0001", description: "OA_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
      { menuCode: "PIZ0901", menuCategoryCode: "MCT0001", description: "OA_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
      { menuCode: "PIZ0901", menuCategoryCode: "MCT0001", description: "OA_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" },
      { menuCode: "PIZ0902", menuCategoryCode: "MCT0001", description: "IR_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
      { menuCode: "PIZ0902", menuCategoryCode: "MCT0001", description: "IR_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
      { menuCode: "PIZ0902", menuCategoryCode: "MCT0001", description: "IR_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" },
      { menuCode: "PIZ0903", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
      { menuCode: "PIZ0903", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
      { menuCode: "PIZ0903", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" },
      { menuCode: "PIZ0904", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD01", sizeDescription: "Reg Sourdough" },
      { menuCode: "PIZ0904", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD02", sizeDescription: "Med Sourdough" },
      { menuCode: "PIZ0904", menuCategoryCode: "MCT0001", description: "DI_Sourdough Corn Pizza", sizeCode: "SD03", sizeDescription: "Lar Sourdough" }
    ]
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
  }
];

export const getDashboardRequestById = (requestId: string): DashboardRequest | undefined => {
  return mockDashboardRequestsData.find(request => request.requestId === requestId);
};
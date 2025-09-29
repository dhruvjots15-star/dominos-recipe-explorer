export interface DashboardRequest {
  requestId: string;
  requestDesc: string;
  requestType: 'NEW RECIPE' | 'MODIFICATION';
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: 'REQUEST CREATED,PENDING ON CHEF' | 'APPROVAL PENDING ON CATEGORY' | 'APPROVAL PENDING ON SC' | 'APPROVAL PENDING ON QUALITY' | 'APPROVAL PENDING ON FINANCE' | 'APPROVED BY ALL, PENDING ON MDM' | 'ACKNOWLEDGED BY MDM, CHANGES PENDING' | 'DONE BY MDM, AWAITING ROLLOUT' | 'LIVE' | 'REJECTED';
  goLiveDate?: string;
  targetVersion?: string;
  affectedStores?: number;
  remarks?: string;
}

export const mockDashboardRequestsData: DashboardRequest[] = [
  {
    requestId: "REQ_001",
    requestDesc: "New Mediterranean Quinoa Bowl recipe with tahini dressing and seasonal vegetables for health-conscious customers",
    requestType: "NEW RECIPE",
    requestedBy: "Maria Santos",
    requestCreatedDate: "2024-02-10T09:15:00Z",
    currentStatus: "LIVE",
    goLiveDate: "2024-02-20T12:00:00Z",
    targetVersion: "v1.0",
    affectedStores: 250,
    remarks: "Successful launch of new healthy menu option"
  },
  {
    requestId: "REQ_002",
    requestDesc: "Modification to Classic Burger recipe - reduce sodium content by 15% while maintaining taste profile",
    requestType: "MODIFICATION",
    requestedBy: "James Wilson",
    requestCreatedDate: "2024-02-12T14:30:00Z",
    currentStatus: "APPROVAL PENDING ON QUALITY",
    targetVersion: "v3.2",
    affectedStores: 180,
    remarks: "Health initiative to reduce sodium across menu items"
  },
  {
    requestId: "REQ_003",
    requestDesc: "New Vegan Chocolate Avocado Mousse dessert with coconut whipped cream and berry compote",
    requestType: "NEW RECIPE",
    requestedBy: "Sarah Kim",
    requestCreatedDate: "2024-02-14T11:45:00Z",
    currentStatus: "DONE BY MDM, AWAITING ROLLOUT",
    targetVersion: "v1.0",
    affectedStores: 120,
    remarks: "Plant-based dessert option for vegan customers"
  },
  {
    requestId: "REQ_004",
    requestDesc: "Modification to Caesar Salad dressing - switch to organic ingredients and cage-free eggs",
    requestType: "MODIFICATION",
    requestedBy: "Alex Rodriguez",
    requestCreatedDate: "2024-02-16T16:20:00Z",
    currentStatus: "ACKNOWLEDGED BY MDM, CHANGES PENDING",
    targetVersion: "v2.8",
    affectedStores: 200,
    remarks: "Sustainability initiative for organic ingredient sourcing"
  },
  {
    requestId: "REQ_005",
    requestDesc: "New Korean BBQ Fusion Bowl with kimchi, bulgogi-style protein, and gochujang aioli",
    requestType: "NEW RECIPE",
    requestedBy: "Linda Chen",
    requestCreatedDate: "2024-02-18T08:10:00Z",
    currentStatus: "APPROVAL PENDING ON FINANCE",
    targetVersion: "v1.0",
    affectedStores: 150,
    remarks: "Expansion into Asian fusion cuisine market"
  },
  {
    requestId: "REQ_006",
    requestDesc: "Modification to Margherita Pizza - upgrade to San Marzano tomatoes and buffalo mozzarella",
    requestType: "MODIFICATION",
    requestedBy: "Tony Ricci",
    requestCreatedDate: "2024-02-20T13:55:00Z",
    currentStatus: "APPROVED BY ALL, PENDING ON MDM",
    targetVersion: "v4.1",
    affectedStores: 300,
    remarks: "Premium ingredient upgrade for signature pizza"
  },
  {
    requestId: "REQ_007",
    requestDesc: "New Breakfast Power Bowl with quinoa, poached egg, avocado, and turmeric tahini dressing",
    requestType: "NEW RECIPE",
    requestedBy: "Emma Thompson",
    requestCreatedDate: "2024-02-22T10:30:00Z",
    currentStatus: "REQUEST CREATED,PENDING ON CHEF",
    targetVersion: "v1.0",
    affectedStores: 175,
    remarks: "Healthy breakfast option for morning customers"
  },
  {
    requestId: "REQ_008",
    requestDesc: "Modification to Fish & Chips batter - gluten-free alternative using rice flour and cornstarch blend",
    requestType: "MODIFICATION",
    requestedBy: "David Park",
    requestCreatedDate: "2024-02-24T15:40:00Z",
    currentStatus: "APPROVAL PENDING ON CATEGORY",
    targetVersion: "v2.5",
    affectedStores: 90,
    remarks: "Gluten-free option for customers with dietary restrictions"
  },
  {
    requestId: "REQ_009",
    requestDesc: "New Seasonal Pumpkin Spice Latte with house-made syrup and organic pumpkin puree",
    requestType: "NEW RECIPE",
    requestedBy: "Rachel Green",
    requestCreatedDate: "2024-02-26T09:25:00Z",
    currentStatus: "REJECTED",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "Seasonal timing conflict with existing beverage promotions"
  },
  {
    requestId: "REQ_010",
    requestDesc: "Modification to Chicken Tikka Masala - adjust spice level and add coconut milk for creamier texture",
    requestType: "MODIFICATION",
    requestedBy: "Priya Sharma",
    requestCreatedDate: "2024-02-28T12:15:00Z",
    currentStatus: "APPROVAL PENDING ON SC",
    targetVersion: "v3.7",
    affectedStores: 220,
    remarks: "Customer feedback driven recipe improvement"
  },
  {
    requestId: "REQ_011",
    requestDesc: "New Artisanal Sourdough Sandwich with locally sourced meats, aged cheeses, and house-made pickles",
    requestType: "NEW RECIPE",
    requestedBy: "Michael Brown",
    requestCreatedDate: "2024-03-01T14:50:00Z",
    currentStatus: "LIVE",
    goLiveDate: "2024-03-08T11:30:00Z",
    targetVersion: "v1.0",
    affectedStores: 160,
    remarks: "Premium sandwich option using local suppliers"
  },
  {
    requestId: "REQ_012",
    requestDesc: "Modification to Classic Mac & Cheese - add truffle oil and breadcrumb topping for premium version",
    requestType: "MODIFICATION",
    requestedBy: "Jessica Lee",
    requestCreatedDate: "2024-03-03T11:20:00Z",
    currentStatus: "APPROVAL PENDING ON QUALITY",
    targetVersion: "v2.3",
    affectedStores: 140,
    remarks: "Upscale comfort food option for dinner service"
  }
];

export const getDashboardRequestById = (requestId: string): DashboardRequest | undefined => {
  return mockDashboardRequestsData.find(request => request.requestId === requestId);
};
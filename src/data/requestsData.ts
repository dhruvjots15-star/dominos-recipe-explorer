export interface Store {
  id: string;
  city: string;
  locality: string;
}

export interface RecipeRequest {
  requestId: string;
  requestDesc: string;
  requestType: 'VERSION EXTEND' | 'VERSION ROLLBACK';
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: 'REQUEST CREATED, APPROVAL PENDING ON CATEGORY' | 'REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)' | 'REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE' | 'REQUEST LIVE, VERSION EXTENDED TO STORES' | 'REQUEST LIVE, VERSION ROLLED BACK' | 'REJECTED';
  goLiveDate?: string;
  targetVersion?: string;
  affectedStores?: number;
  remarks?: string;
}

// Helper functions to generate dummy stores
const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna",
  "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Kalyan", "Vasai", "Varanasi", "Srinagar",
  "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Noida"
];

const localities = [
  "Andheri", "CP", "Skymark Sector 98", "Koramangala", "Indiranagar",
  "Bandra", "Malad", "Powai", "Whitefield", "HSR Layout", "MG Road",
  "Sector 18", "Sector 62", "Gomti Nagar", "Hazratganj", "Sadar",
  "Connaught Place", "Karol Bagh", "Lajpat Nagar", "Nehru Place",
  "Marathahalli", "Jayanagar", "Rajajinagar", "Yelahanka", "Electronic City",
  "Hitech City", "Jubilee Hills", "Banjara Hills", "Gachibowli", "Kukatpally",
  "Anna Nagar", "T Nagar", "Adyar", "Velachery", "Porur", "OMR",
  "Salt Lake", "Park Street", "Rajarhat", "New Town", "Ballygunge",
  "Aundh", "Kothrud", "Viman Nagar", "Wakad", "Hinjewadi", "Kharadi",
  "Satellite", "Vastrapur", "Bodakdev", "Prahlad Nagar", "Maninagar"
];

const generateStoreId = (num: number): string => {
  const paddedNum = num.toString().padStart(4, '0');
  return `DPI${paddedNum}`;
};

const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];
const getRandomLocality = () => localities[Math.floor(Math.random() * localities.length)];

const generateStores = (count: number, startNum: number = 1): Store[] => {
  const stores: Store[] = [];
  for (let i = 0; i < count; i++) {
    stores.push({
      id: generateStoreId(startNum + i),
      city: getRandomCity(),
      locality: getRandomLocality()
    });
  }
  return stores;
};

export const mockRequestsData: RecipeRequest[] = [
  {
    requestId: "REQ_001",
    requestDesc: "Extend v5.2 BBP Doughball recipe changes to 150 additional stores across North region",
    requestType: "VERSION EXTEND",
    requestedBy: "Sarah Chen",
    requestCreatedDate: "2024-01-15T09:30:00Z",
    currentStatus: "REQUEST LIVE, VERSION EXTENDED TO STORES",
    goLiveDate: "2024-01-20T14:45:00Z",
    targetVersion: "v5.2",
    affectedStores: 150,
    remarks: "Successful rollout of BBP improvements to North region stores"
  },
  {
    requestId: "REQ_002", 
    requestDesc: "Rollback v4.8 Pizza sauce recipe due to customer complaints about taste consistency",
    requestType: "VERSION ROLLBACK",
    requestedBy: "Michael Rodriguez",
    requestCreatedDate: "2024-01-18T11:15:00Z",
    currentStatus: "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE",
    targetVersion: "v4.7",
    affectedStores: 75,
    remarks: "Quality issues identified in v4.8 pizza sauce formulation"
  },
  {
    requestId: "REQ_003",
    requestDesc: "Extend v6.1 Salad portion optimization to remaining 200 stores nationwide",
    requestType: "VERSION EXTEND",
    requestedBy: "Emily Watson",
    requestCreatedDate: "2024-01-22T08:45:00Z",
    currentStatus: "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)",
    targetVersion: "v6.1",
    affectedStores: 200,
    remarks: "Proven cost savings from salad portion optimization in pilot stores"
  },
  {
    requestId: "REQ_004",
    requestDesc: "Rollback v5.9 Chicken seasoning blend changes due to supply chain issues",
    requestType: "VERSION ROLLBACK",
    requestedBy: "David Park",
    requestCreatedDate: "2024-01-25T13:20:00Z", 
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    targetVersion: "v5.8",
    affectedStores: 120,
    remarks: "Supplier unable to maintain consistent quality for new seasoning blend"
  },
  {
    requestId: "REQ_005",
    requestDesc: "Extend v7.0 Beverage syrup concentration updates to 300 high-volume locations",
    requestType: "VERSION EXTEND",
    requestedBy: "Lisa Thompson",
    requestCreatedDate: "2024-01-28T10:00:00Z",
    currentStatus: "REJECTED",
    targetVersion: "v7.0", 
    affectedStores: 300,
    remarks: "Budget constraints for Q1 rollout, deferred to Q2"
  },
  {
    requestId: "REQ_006",
    requestDesc: "Extend v6.3 Dessert recipe standardization to all remaining franchise locations",
    requestType: "VERSION EXTEND",
    requestedBy: "Robert Kim",
    requestCreatedDate: "2024-02-01T16:30:00Z",
    currentStatus: "REQUEST LIVE, VERSION EXTENDED TO STORES",
    goLiveDate: "2024-02-08T12:00:00Z",
    targetVersion: "v6.3",
    affectedStores: 180,
    remarks: "Complete dessert standardization across franchise network"
  },
  {
    requestId: "REQ_007", 
    requestDesc: "Rollback v8.1 Soup base recipe modifications due to allergen concerns",
    requestType: "VERSION ROLLBACK",
    requestedBy: "Amanda Foster",
    requestCreatedDate: "2024-02-05T14:15:00Z",
    currentStatus: "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)",
    targetVersion: "v8.0",
    affectedStores: 95,
    remarks: "Potential allergen cross-contamination identified in new soup base formulation"
  }
];

// Store data for each request
const requestStoresData: Record<string, Store[]> = {
  REQ_001: generateStores(150, 1),
  REQ_002: generateStores(75, 200),
  REQ_003: generateStores(200, 300),
  REQ_004: generateStores(120, 550),
  REQ_005: generateStores(300, 700),
  REQ_006: generateStores(180, 1050),
  REQ_007: generateStores(95, 1250),
};

export const getRequestById = (requestId: string): RecipeRequest | undefined => {
  return mockRequestsData.find(request => request.requestId === requestId);
};

export const getStoresForRequest = (requestId: string): Store[] => {
  return requestStoresData[requestId] || [];
};
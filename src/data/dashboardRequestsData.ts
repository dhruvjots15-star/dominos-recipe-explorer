export interface DashboardRequest {
  requestId: string;
  requestDesc: string;
  requestType: 'NEW RECIPE' | 'RECIPE MODIFICATION' | 'VERSION EXTEND' | 'VERSION ROLLBACK' | 'NEW SIZE CODE' | 'NEW CATEGORY';
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: string;
  pendingOnTeam?: 'Category Team' | 'Chef Team' | 'MDM (POS) Team';
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
  stores?: string[];
  sizeCodes?: Array<{
    code: string;
    description: string;
  }>;
}

export const mockDashboardRequestsData: DashboardRequest[] = [
  {
    requestId: "REQ_144",
    requestDesc: "New Sourdough Pizza Recipes creation",
    requestType: "NEW RECIPE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2025-03-17T16:15:00Z",
    currentStatus: "REQUEST CREATED, RECIPE SUBMISSION PENDING ON CHEF",
    pendingOnTeam: "Chef Team",
    targetVersion: "v1.0",
    affectedStores: 0,
    remarks: "New premium pizza line"
  },
  {
    requestId: "REQ_142",
    requestDesc: "New Sourdough Pizza Recipes creation",
    requestType: "NEW RECIPE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2025-03-17T16:15:00Z",
    currentStatus: "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & SC PLANNING",
    pendingOnTeam: "Category Team",
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
    pendingOnTeam: "Category Team",
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
    pendingOnTeam: "Category Team",
    targetVersion: "v5 All India",
    affectedStores: 100,
    remarks: "Store expansion",
    stores: [
      "DPI1001 Mumbai Andheri store", "DPI1002 Mumbai Bandra store", "DPI1003 Mumbai Juhu store", "DPI1004 Mumbai Powai store", "DPI1005 Mumbai Goregaon store",
      "DPI1006 Delhi Connaught Place store", "DPI1007 Delhi Saket store", "DPI1008 Delhi Rohini store", "DPI1009 Delhi Dwarka store", "DPI1010 Delhi Nehru Place store",
      "DPI1011 Bangalore Koramangala store", "DPI1012 Bangalore Indiranagar store", "DPI1013 Bangalore Whitefield store", "DPI1014 Bangalore Marathahalli store", "DPI1015 Bangalore Electronic City store",
      "DPI1016 Chennai T Nagar store", "DPI1017 Chennai Anna Nagar store", "DPI1018 Chennai Velachery store", "DPI1019 Chennai Adyar store", "DPI1020 Chennai Malaigaon store",
      "DPI1021 Hyderabad Banjara Hills store", "DPI1022 Hyderabad Hitech City store", "DPI1023 Hyderabad Gachibowli store", "DPI1024 Hyderabad Kukatpally store", "DPI1025 Hyderabad Madhapur store",
      "DPI1026 Pune Koregaon Park store", "DPI1027 Pune Hinjewadi store", "DPI1028 Pune Kothrud store", "DPI1029 Pune Viman Nagar store", "DPI1030 Pune Wakad store",
      "DPI1031 Kolkata Park Street store", "DPI1032 Kolkata Salt Lake store", "DPI1033 Kolkata Howrah store", "DPI1034 Kolkata Ballygunge store", "DPI1035 Kolkata New Town store",
      "DPI1036 Ahmedabad Satellite store", "DPI1037 Ahmedabad Vastrapur store", "DPI1038 Ahmedabad Bopal store", "DPI1039 Ahmedabad Thaltej store", "DPI1040 Ahmedabad Maninagar store",
      "DPI1041 Jaipur C Scheme store", "DPI1042 Jaipur Vaishali Nagar store", "DPI1043 Jaipur Malviya Nagar store", "DPI1044 Jaipur Mansarovar store", "DPI1045 Jaipur Raja Park store",
      "DPI1046 Chandigarh Sector 17 store", "DPI1047 Chandigarh Sector 35 store", "DPI1048 Chandigarh Sector 22 store", "DPI1049 Chandigarh Zirakpur store", "DPI1050 Chandigarh Mohali store",
      "DPI1051 Lucknow Hazratganj store", "DPI1052 Lucknow Gomti Nagar store", "DPI1053 Lucknow Alambagh store", "DPI1054 Lucknow Aliganj store", "DPI1055 Lucknow Indira Nagar store",
      "DPI1056 Kochi Marine Drive store", "DPI1057 Kochi Kaloor store", "DPI1058 Kochi Edappally store", "DPI1059 Kochi Kakkanad store", "DPI1060 Kochi Vytilla store",
      "DPI1061 Coimbatore RS Puram store", "DPI1062 Coimbatore Gandhipuram store", "DPI1063 Coimbatore Saibaba Colony store", "DPI1064 Coimbatore Peelamedu store", "DPI1065 Coimbatore Ukkadam store",
      "DPI1066 Indore Vijay Nagar store", "DPI1067 Indore Palasia store", "DPI1068 Indore MG Road store", "DPI1069 Indore Sapna Sangeeta store", "DPI1070 Indore South Tukoganj store",
      "DPI1071 Nagpur Dharampeth store", "DPI1072 Nagpur Sadar store", "DPI1073 Nagpur Sitabuldi store", "DPI1074 Nagpur Civil Lines store", "DPI1075 Nagpur Wardha Road store",
      "DPI1076 Vadodara Alkapuri store", "DPI1077 Vadodara Sayajigunj store", "DPI1078 Vadodara Manjalpur store", "DPI1079 Vadodara Fatehgunj store", "DPI1080 Vadodara Waghodia Road store",
      "DPI1081 Surat Adajan store", "DPI1082 Surat Athwalines store", "DPI1083 Surat Vesu store", "DPI1084 Surat Udhna store", "DPI1085 Surat City Light store",
      "DPI1086 Visakhapatnam Beach Road store", "DPI1087 Visakhapatnam Dwaraka Nagar store", "DPI1088 Visakhapatnam MVP Colony store", "DPI1089 Visakhapatnam Madhurawada store", "DPI1090 Visakhapatnam Gajuwaka store",
      "DPI1091 Bhopal MP Nagar store", "DPI1092 Bhopal Arera Colony store", "DPI1093 Bhopal New Market store", "DPI1094 Bhopal Hoshangabad Road store", "DPI1095 Bhopal Bawadiya Kalan store",
      "DPI1096 Patna Boring Road store", "DPI1097 Patna Fraser Road store", "DPI1098 Patna Kankarbagh store", "DPI1099 Patna Patliputra store", "DPI1100 Patna Bailey Road store"
    ]
  },
  {
    requestId: "REQ_093",
    requestDesc: "New Chicken Feast Category to be created",
    requestType: "NEW CATEGORY",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-13T19:15:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    pendingOnTeam: "Category Team",
    targetVersion: "v1.0",
    affectedStores: 250,
    remarks: "New menu category"
  },
  {
    requestId: "REQ_088",
    requestDesc: "3 New Size Codes for Big Big Pizza",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-13T21:45:00Z",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
    pendingOnTeam: "Category Team",
    targetVersion: "v1.0",
    affectedStores: 180,
    remarks: "Extra large size introduction",
    sizeCodes: [
      { code: "BB125", description: "Lar BBP" },
      { code: "BB175", description: "Xlar BBP" },
      { code: "BB175", description: "XXL BBP" }
    ]
  },
  {
    requestId: "REQ_087",
    requestDesc: "3 New Size Codes for Big Big Pizza",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-13T16:15:00Z",
    currentStatus: "REQUEST APPROVED, EXTRA TOPPING UPDATION PENDING ON CHEF",
    pendingOnTeam: "Chef Team",
    targetVersion: "v1.0",
    affectedStores: 180,
    remarks: "Extra large size introduction",
    sizeCodes: [
      { code: "BB125", description: "Lar BBP" },
      { code: "BB175", description: "Xlar BBP" },
      { code: "BB175", description: "XXL BBP" }
    ]
  },
  {
    requestId: "REQ_075",
    requestDesc: "Modify Recipes in v8 to include new boxes material",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-12T16:15:00Z",
    currentStatus: "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & QUALITY",
    pendingOnTeam: "Category Team",
    targetVersion: "v8",
    affectedStores: 220,
    remarks: "Packaging update"
  },
  {
    requestId: "REQ_074",
    requestDesc: "Modify Recipes in v8 to include new boxes material",
    requestType: "RECIPE MODIFICATION",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-12T16:15:00Z",
    currentStatus: "REQUEST CREATED, RECIPE SUBMISSION PENDING ON CHEF",
    pendingOnTeam: "Chef Team",
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
    pendingOnTeam: "Category Team",
    targetVersion: "v9",
    affectedStores: 50,
    remarks: "Regional rollback"
  },
  {
    requestId: "RE_012",
    requestDesc: "Add new size codes for Chicken Burst pizzaa",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2025-03-09T16:15:00Z",
    currentStatus: "EXTRA TOPPING UPDATE SUBMITTED, APPROVAL PENDING ON CHEF",
    pendingOnTeam: "Chef Team",
    targetVersion: "v1.0",
    affectedStores: 150,
    remarks: "New size codes for Chicken Burst"
  }
];

export const getDashboardRequestById = (requestId: string): DashboardRequest | undefined => {
  return mockDashboardRequestsData.find(request => request.requestId === requestId);
};
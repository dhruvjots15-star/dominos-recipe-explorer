export interface SizeCode {
  sizeCode: string;
  description: string;
  remarks: string;
}

export interface SizeCodeRequest {
  id: string;
  requestDesc: string;
  sizeCode: string;
  description: string;
  remarks: string;
  requestType: string;
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: string;
}

export const sizeCodesData: SizeCode[] = [
  { sizeCode: "HT07", description: "Regular Hand Tossed", remarks: "Default crust type for Pizza Mania only (7 inch)" },
  { sizeCode: "BHT07", description: "Regular New Hand Tossed", remarks: "Default crust type for all Regular Pizzas, except Pizza Mania (7 inch)" },
  { sizeCode: "BHT95", description: "Medium New Hand Tossed", remarks: "Default crust type for all Medium Pizzas (9.5 inch)" },
  { sizeCode: "BHT105", description: "Extra Medium New Hand Tossed", remarks: "For Gourmet Pizzas only (10.5 inch)" },
  { sizeCode: "BHT125", description: "Large New Hand Tossed", remarks: "Default crust type for all Large Pizzas (12.5 inch)" },
  { sizeCode: "BHT135", description: "Extra Large New Hand Tossed", remarks: "For Gourmet Pizzas only (13.5 inch)" },
  { sizeCode: "BHT155", description: "Extra Large New Hand Tossed", remarks: "For Big Big Pizzas only (15.5 inch)" },
  { sizeCode: "CB07", description: "Regular Cheese Burst", remarks: "" },
  { sizeCode: "BU95", description: "Medium Cheese Burst", remarks: "" },
  { sizeCode: "CF07", description: "Regular Cheese Burst Fiery (CB 2.0)", remarks: "" },
  { sizeCode: "CF95", description: "Medium Cheese Burst Fiery (CB 2.0)", remarks: "" },
  { sizeCode: "CK07", description: "Regular Cheese Burst Korean (CB 2.0)", remarks: "" },
  { sizeCode: "CK95", description: "Medium Cheese Burst Korean (CB 2.0)", remarks: "" },
  { sizeCode: "CM07", description: "Regular Cheese Burst Makhani (CB 2.0)", remarks: "" },
  { sizeCode: "CM95", description: "Medium Cheese Burst Makhani (CB 2.0)", remarks: "" },
  { sizeCode: "DD06", description: "Regular Deep Dish", remarks: "" },
  { sizeCode: "DD10", description: "Medium Deep Dish", remarks: "" },
  { sizeCode: "DD12", description: "Large Deep Dish", remarks: "" },
  { sizeCode: "BUDD06", description: "Regular Deep Dish Cheese Burst", remarks: "" },
  { sizeCode: "BUDD10", description: "Medium Deep Dish Cheese Burst", remarks: "" },
  { sizeCode: "TC07", description: "Regular Thin Crust", remarks: "" },
  { sizeCode: "TC95", description: "Medium Thin Crust", remarks: "" },
  { sizeCode: "FP07", description: "Regular Fresh Pan", remarks: "" },
  { sizeCode: "FP95", description: "Medium Fresh Pan", remarks: "" },
  { sizeCode: "FP155", description: "Extra Large", remarks: "For Big Big Pizzas only (15.5 inch), specifically for ONDC Channel" },
  { sizeCode: "CV95", description: "Regular Plus Cheese Volcano", remarks: "" },
  { sizeCode: "CV125", description: "Medium Plus Cheese Volcano", remarks: "" },
  { sizeCode: "RC07", description: "Regular Ragi Crust", remarks: "" },
  { sizeCode: "DCC07", description: "Regular Double Cheese Crunch", remarks: "Used for Valentine's" }
];

export const sizeCodeRequests: SizeCodeRequest[] = [
  {
    id: "REQ_145",
    requestDesc: "New Size codes for Sourdough pizza",
    sizeCode: "SD07",
    description: "Regular Sourdough Crust",
    remarks: "New premium crust option",
    requestType: "NEW SIZE CODE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-03-15 14:30:00",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING"
  },
  {
    id: "REQ_123",
    requestDesc: "New Size codes for Chicken Burst pizza",
    sizeCode: "CBU07",
    description: "Regular Chicken Burst",
    remarks: "Chicken filled crust variant",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-10 09:15:00",
    currentStatus: "REQUEST APPROVED, PENDING ON CHEF"
  },
  {
    id: "REQ_129",
    requestDesc: "New Size codes",
    sizeCode: "NS95",
    description: "Medium New Special",
    remarks: "Special edition size",
    requestType: "NEW SIZE CODE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-03-08 16:45:00",
    currentStatus: "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF"
  },
  {
    id: "REQ_097",
    requestDesc: "Dummy Size codes for Testing",
    sizeCode: "TEST01",
    description: "Test Size Code",
    remarks: "For testing purposes only",
    requestType: "NEW SIZE CODE",
    requestedBy: "Dhruvjot",
    requestCreatedDate: "2024-02-28 11:20:00",
    currentStatus: "EXTRA TOPPING MASTER UPDATED"
  },
  {
    id: "REQ_088",
    requestDesc: "NA",
    sizeCode: "XL155",
    description: "Extra Large Premium",
    remarks: "",
    requestType: "NEW SIZE CODE",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-02-25 13:10:00",
    currentStatus: "REJECTED"
  },
  {
    id: "REQ_076",
    requestDesc: "Changing Size Codes for Reg HT pizza",
    sizeCode: "HT08",
    description: "Regular Hand Tossed Modified",
    remarks: "Updated specification",
    requestType: "NEW SIZE CODE",
    requestedBy: "ADMIN",
    requestCreatedDate: "2024-02-20 10:30:00",
    currentStatus: "REQUEST APPROVED, PENDING ON CHEF"
  },
  {
    id: "REQ_066",
    requestDesc: "NA",
    sizeCode: "CR07",
    description: "Regular Crispy",
    remarks: "",
    requestType: "NEW SIZE CODE",
    requestedBy: "Varun",
    requestCreatedDate: "2024-02-15 15:45:00",
    currentStatus: "EXTRA TOPPING MASTER UPDATED"
  }
];
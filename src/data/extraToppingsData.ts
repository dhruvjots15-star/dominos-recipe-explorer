export interface ExtraTopping {
  sizeCode: string;
  description: string;
  inventoryCode: string;
  numberOfToppings: number;
  lightAmount: number;
  singleAmount: number;
  extraAmount: number;
  doubleAmount: number;
  tripleAmount: number;
}

// All available size codes
export const allSizeCodes = [
  "HT07", "BHT07", "CB07", "CM07", "TC07", "CF07", "CK07",
  "PT09", "BPT09", "MT08", "LT10", "XLT12", "ST06", "RST07",
  "DTH08", "DBTH08", "PCB09", "PCM10", "PTC11", "WCB07", "WCM08",
  "TCF06", "BTCF06", "GCB08", "GCM09", "GTC10", "SCB07", "SCM08",
  "FCB09", "FCM10", "FTC11", "BCB08", "BCM09", "BTC10", "NCB07"
];

export interface ExtraToppingRequest {
  id: string;
  requestDesc: string;
  sizeCode: string;
  description: string;
  inventoryCode: string;
  requestType: string;
  requestedBy: string;
  requestCreatedDate: string;
  currentStatus: string;
}

export const extraToppingsData: ExtraTopping[] = [
  { sizeCode: "HT07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "HT07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "HT07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "HT07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "HT07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "HT07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "HT07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "HT07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "HT07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "HT07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "HT07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "HT07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "HT07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "HT07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "HT07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "HT07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "HT07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "HT07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "HT07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
  { sizeCode: "BHT07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "BHT07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "BHT07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "BHT07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "BHT07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "BHT07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "BHT07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "BHT07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "BHT07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "BHT07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "BHT07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "BHT07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "BHT07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "BHT07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "BHT07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "BHT07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "BHT07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "BHT07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "BHT07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
  { sizeCode: "CB07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CB07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CB07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CB07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "CB07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CB07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CB07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CB07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CB07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CB07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CB07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CB07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "CB07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CB07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CB07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CB07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CB07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CB07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CB07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
  { sizeCode: "CF07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CF07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CF07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CF07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "CF07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CF07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CF07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CF07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CF07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CF07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CF07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CF07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "CF07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CF07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CF07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CF07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CF07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CF07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CF07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
  { sizeCode: "CK07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CK07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CK07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CK07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "CK07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CK07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CK07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CK07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CK07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CK07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CK07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CK07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "CK07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CK07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CK07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CK07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CK07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CK07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CK07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
  { sizeCode: "CM07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CM07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CM07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CM07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "CM07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CM07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "CM07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CM07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CM07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CM07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "CM07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CM07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "CM07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CM07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CM07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CM07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "CM07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "CM07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "CM07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
  { sizeCode: "TC07", description: "NV TOP_Chilli Herb Sausage", inventoryCode: "10000634", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "TC07", description: "NV TOP_Chicken Tikka Masala", inventoryCode: "10000635", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "TC07", description: "NV TOP_Chicken Keema", inventoryCode: "10001142", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "TC07", description: "NV TOP_Chicken Pepperoni", inventoryCode: "10000492", numberOfToppings: 1, lightAmount: 6, singleAmount: 6, extraAmount: 12, doubleAmount: 12, tripleAmount: 18 },
  { sizeCode: "TC07", description: "NV TOP_Peri Peri Chicken - New Specs", inventoryCode: "10000822", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "TC07", description: "NV TOP_BBQ Pepper Chicken - New Specs", inventoryCode: "10000823", numberOfToppings: 1, lightAmount: 12, singleAmount: 12, extraAmount: 24, doubleAmount: 24, tripleAmount: 36 },
  { sizeCode: "TC07", description: "NV TOP_TOP NV_Grilled Chicken Rashers", inventoryCode: "NVG0048", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "TC07", description: "VG TOP_Black Olives", inventoryCode: "VCN0004", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "TC07", description: "VG TOP_Red Peppers", inventoryCode: "VCN0006", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "TC07", description: "VG TOP_Jalapeno", inventoryCode: "VCN0011", numberOfToppings: 1, lightAmount: 10, singleAmount: 10, extraAmount: 20, doubleAmount: 20, tripleAmount: 30 },
  { sizeCode: "TC07", description: "VG TOP_Onion", inventoryCode: "VFF0001", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "TC07", description: "VG TOP_Green Pepper", inventoryCode: "VFF0002", numberOfToppings: 1, lightAmount: 20, singleAmount: 20, extraAmount: 40, doubleAmount: 40, tripleAmount: 60 },
  { sizeCode: "TC07", description: "VG TOP_Tomato", inventoryCode: "VFF0003", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "TC07", description: "VG TOP_Mushroom", inventoryCode: "VFF0010", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "TC07", description: "VG TOP_Paneer", inventoryCode: "CPM0003", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "TC07", description: "VG TOP_Corn", inventoryCode: "VCN0002", numberOfToppings: 1, lightAmount: 15, singleAmount: 15, extraAmount: 30, doubleAmount: 30, tripleAmount: 45 },
  { sizeCode: "TC07", description: "VG TOP_Paneer Tikka Topping", inventoryCode: "10001055", numberOfToppings: 1, lightAmount: 30, singleAmount: 30, extraAmount: 60, doubleAmount: 60, tripleAmount: 90 },
  { sizeCode: "TC07", description: "CH_Diced Mozzarella - New Specs", inventoryCode: "10000721", numberOfToppings: 1, lightAmount: 25, singleAmount: 25, extraAmount: 50, doubleAmount: 50, tripleAmount: 75 },
  { sizeCode: "TC07", description: "SAU_Tomato Blend", inventoryCode: "SPI0001", numberOfToppings: 1, lightAmount: 0, singleAmount: 0, extraAmount: 0, doubleAmount: 0, tripleAmount: 0 },
];

export const extraToppingRequests: ExtraToppingRequest[] = [
  {
    id: "REQ_234",
    requestDesc: "Update portions for Paneer Tikka",
    sizeCode: "BHT07",
    description: "VG TOP_Paneer Tikka Topping",
    inventoryCode: "10001055",
    requestType: "UPDATE EXTRA TOPPING",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-03-18 11:20:00",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING"
  },
  {
    id: "REQ_221",
    requestDesc: "New topping portion for Vegan Cheese",
    sizeCode: "HT07",
    description: "VG TOP_Vegan Cheese",
    inventoryCode: "10002001",
    requestType: "NEW EXTRA TOPPING",
    requestedBy: "Varun",
    requestCreatedDate: "2024-03-15 14:30:00",
    currentStatus: "REQUEST APPROVED, PENDING ON CHEF"
  },
  {
    id: "REQ_215",
    requestDesc: "Adjust Chicken Pepperoni portions",
    sizeCode: "CB07",
    description: "NV TOP_Chicken Pepperoni",
    inventoryCode: "10000492",
    requestType: "UPDATE EXTRA TOPPING",
    requestedBy: "Kshitij",
    requestCreatedDate: "2024-03-12 09:45:00",
    currentStatus: "EXTRA TOPPING MASTER UPDATED"
  }
];

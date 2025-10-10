// Generate dummy store data for each version

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

export interface Store {
  id: string;
  city: string;
  locality: string;
}

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

// Version-specific store data
export const versionStoresData: Record<string, Store[]> = {
  v5: generateStores(1560, 1),
  v6: generateStores(432, 1600),
  v7: generateStores(330, 2050),
  v8: generateStores(155, 2400),
  v9: generateStores(125, 2600),
};

export const getStoresForVersion = (versionId: string): Store[] => {
  return versionStoresData[versionId] || [];
};

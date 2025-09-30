import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface StoreSelectorProps {
  selectedStores: string[];
  onStoresChange: (stores: string[]) => void;
}

export const StoreSelector = ({ selectedStores, onStoresChange }: StoreSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [storeGroup, setStoreGroup] = useState("");
  const [storeChips, setStoreChips] = useState<string[]>([]);
  const [storeError, setStoreError] = useState("");
  const [regionType, setRegionType] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedSCCs, setSelectedSCCs] = useState<string[]>([]);
  const [activeMethod, setActiveMethod] = useState<string>("");

  // Generate 1000 dummy Dominos stores
  const mockStores = Array.from({ length: 1000 }, (_, i) => {
    const id = `DPI${String(i + 1).padStart(4, '0')}`;
    const regions = ["North 1", "North 2", "South 1", "South 2", "East", "West 1", "West 2"];
    const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad"];
    const sccs = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Mohali", "Guwahati"];
    
    return {
      id,
      name: `Store ${id}`,
      region: regions[i % regions.length],
      city: cities[i % cities.length],
      scc: sccs[i % sccs.length]
    };
  });

  const regions = ["North 1", "North 2", "South 1", "South 2", "East", "West 1", "West 2"];
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal"
  ];
  const sccs = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Mohali", "Guwahati"];

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStoreToggle = (storeId: string, checked: boolean) => {
    if (checked) {
      onStoresChange([...selectedStores, storeId]);
    } else {
      onStoresChange(selectedStores.filter(id => id !== storeId));
    }
  };

  const checkMethodChange = (newMethod: string) => {
    if (activeMethod && activeMethod !== newMethod) {
      if (confirm("Previous selection will be discarded. Continue?")) {
        onStoresChange([]);
        setStoreChips([]);
        setSelectedRegions([]);
        setSelectedStates([]);
        setSelectedSCCs([]);
        setActiveMethod(newMethod);
        return true;
      }
      return false;
    }
    setActiveMethod(newMethod);
    return true;
  };

  const handleStoreInputChange = (value: string) => {
    setStoreGroup(value);
    setStoreError("");
    
    if (value.endsWith(',') || value.endsWith(' ')) {
      const storeId = value.slice(0, -1).trim();
      if (storeId) {
        const storeExists = mockStores.some(store => store.id === storeId);
        if (storeExists) {
          if (!storeChips.includes(storeId)) {
            setStoreChips([...storeChips, storeId]);
            onStoresChange([...selectedStores, storeId]);
          }
          setStoreGroup("");
        } else {
          setStoreError(`Store ${storeId} not found`);
        }
      }
    }
  };

  const removeStoreChip = (storeId: string) => {
    setStoreChips(storeChips.filter(id => id !== storeId));
    onStoresChange(selectedStores.filter(id => id !== storeId));
  };

  const handleRegionToggle = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions([...selectedRegions, region]);
    } else {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    }
  };

  const handleStateToggle = (state: string, checked: boolean) => {
    if (checked) {
      setSelectedStates([...selectedStates, state]);
    } else {
      setSelectedStates(selectedStates.filter(s => s !== state));
    }
  };

  const handleSCCToggle = (scc: string, checked: boolean) => {
    if (checked) {
      setSelectedSCCs([...selectedSCCs, scc]);
    } else {
      setSelectedSCCs(selectedSCCs.filter(s => s !== scc));
    }
  };

  const handleAllPanIndia = () => {
    const allStoreIds = mockStores.map(store => store.id);
    onStoresChange(allStoreIds);
  };

  const removeStore = (storeId: string) => {
    onStoresChange(selectedStores.filter(id => id !== storeId));
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger 
            value="search"
            onClick={() => checkMethodChange("search")}
          >
            Search Stores
          </TabsTrigger>
          <TabsTrigger 
            value="group"
            onClick={() => checkMethodChange("group")}
          >
            Store Group
          </TabsTrigger>
          <TabsTrigger 
            value="region"
            onClick={() => checkMethodChange("region")}
          >
            By Region
          </TabsTrigger>
          <TabsTrigger 
            value="scc"
            onClick={() => checkMethodChange("scc")}
          >
            By SCC
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-3">
          <Input
            placeholder="Search stores by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-48 overflow-y-auto border rounded p-3 space-y-2">
            {filteredStores.map((store) => (
              <div key={store.id} className="flex items-center space-x-2">
                <Checkbox
                  id={store.id}
                  checked={selectedStores.includes(store.id)}
                  onCheckedChange={(checked) => 
                    handleStoreToggle(store.id, checked as boolean)
                  }
                />
                <Label htmlFor={store.id} className="text-sm">
                  {store.id} - {store.name}
                </Label>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="group" className="space-y-3">
          <Input
            placeholder="Enter store IDs (comma separated)"
            value={storeGroup}
            onChange={(e) => handleStoreInputChange(e.target.value)}
          />
          {storeError && (
            <p className="text-sm text-destructive">{storeError}</p>
          )}
          {storeChips.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {storeChips.map((storeId) => (
                <Badge key={storeId} variant="secondary" className="gap-1">
                  {storeId}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeStoreChip(storeId)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="region" className="space-y-3">
          <div className="space-y-3">
            <Select value={regionType} onValueChange={setRegionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select by Region, State, Circle or City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="city">City</SelectItem>
              </SelectContent>
            </Select>

            {regionType === "region" && (
              <div className="border rounded p-3 space-y-2 max-h-48 overflow-y-auto">
                {regions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${region}`}
                      checked={selectedRegions.includes(region)}
                      onCheckedChange={(checked) => 
                        handleRegionToggle(region, checked as boolean)
                      }
                    />
                    <Label htmlFor={`region-${region}`} className="text-sm">
                      {region}
                    </Label>
                  </div>
                ))}
                {selectedRegions.length > 0 && (
                  <p className="text-sm text-muted-foreground pt-2 border-t">
                    All stores mapped to this Region(s) have been selected.
                  </p>
                )}
              </div>
            )}

            {regionType === "state" && (
              <div className="border rounded p-3 space-y-2 max-h-48 overflow-y-auto">
                {states.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={`state-${state}`}
                      checked={selectedStates.includes(state)}
                      onCheckedChange={(checked) => 
                        handleStateToggle(state, checked as boolean)
                      }
                    />
                    <Label htmlFor={`state-${state}`} className="text-sm">
                      {state}
                    </Label>
                  </div>
                ))}
                {selectedStates.length > 0 && (
                  <p className="text-sm text-muted-foreground pt-2 border-t">
                    All stores mapped to this State(s) have been selected.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <Button onClick={handleAllPanIndia} variant="outline" className="w-full">
            All Pan India Stores
          </Button>
        </TabsContent>

        <TabsContent value="scc" className="space-y-3">
          <div className="border rounded p-3 space-y-2 max-h-48 overflow-y-auto">
            {sccs.map((scc) => (
              <div key={scc} className="flex items-center space-x-2">
                <Checkbox
                  id={`scc-${scc}`}
                  checked={selectedSCCs.includes(scc)}
                  onCheckedChange={(checked) => 
                    handleSCCToggle(scc, checked as boolean)
                  }
                />
                <Label htmlFor={`scc-${scc}`} className="text-sm">
                  {scc}
                </Label>
              </div>
            ))}
            {selectedSCCs.length > 0 && (
              <p className="text-sm text-muted-foreground pt-2 border-t">
                All stores mapped to this SCC(s) have been selected.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedStores.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Selected Stores ({selectedStores.length}):</Label>
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
            {selectedStores.map((storeId) => {
              const store = mockStores.find(s => s.id === storeId);
              return (
                <Badge key={storeId} variant="secondary" className="gap-1">
                  {store?.name || storeId}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeStore(storeId)}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
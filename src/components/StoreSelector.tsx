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
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSCC, setSelectedSCC] = useState("");

  // Mock data
  const mockStores = [
    { id: "ST001", name: "Mumbai Central", region: "Maharashtra", scc: "Mumbai" },
    { id: "ST002", name: "Delhi CP", region: "North", scc: "Delhi" },
    { id: "ST003", name: "Bangalore Forum", region: "South", scc: "Bangalore" },
    { id: "ST004", name: "Pune FC Road", region: "Maharashtra", scc: "Pune" },
    { id: "ST005", name: "Chennai Express Avenue", region: "South", scc: "Chennai" },
  ];

  const regions = ["Maharashtra", "North", "South", "East", "West"];
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

  const handleGroupSelect = () => {
    if (storeGroup.trim()) {
      const storeIds = storeGroup.split(',').map(id => id.trim()).filter(Boolean);
      const newStores = [...new Set([...selectedStores, ...storeIds])];
      onStoresChange(newStores);
      setStoreGroup("");
    }
  };

  const handleRegionSelect = () => {
    if (selectedRegion) {
      const regionStores = mockStores
        .filter(store => store.region === selectedRegion)
        .map(store => store.id);
      const newStores = [...new Set([...selectedStores, ...regionStores])];
      onStoresChange(newStores);
      setSelectedRegion("");
    }
  };

  const handleSCCSelect = () => {
    if (selectedSCC) {
      const sccStores = mockStores
        .filter(store => store.scc === selectedSCC)
        .map(store => store.id);
      const newStores = [...new Set([...selectedStores, ...sccStores])];
      onStoresChange(newStores);
      setSelectedSCC("");
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
          <TabsTrigger value="search">Search Stores</TabsTrigger>
          <TabsTrigger value="group">Store Group</TabsTrigger>
          <TabsTrigger value="region">By Region</TabsTrigger>
          <TabsTrigger value="scc">By SCC</TabsTrigger>
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
          <div className="flex gap-2">
            <Input
              placeholder="Enter store IDs (comma separated)"
              value={storeGroup}
              onChange={(e) => setStoreGroup(e.target.value)}
            />
            <Button onClick={handleGroupSelect}>Add</Button>
          </div>
        </TabsContent>

        <TabsContent value="region" className="space-y-3">
          <div className="flex gap-2">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleRegionSelect}>Add Region</Button>
          </div>
          <Button onClick={handleAllPanIndia} variant="outline" className="w-full">
            All Pan India Stores
          </Button>
        </TabsContent>

        <TabsContent value="scc" className="space-y-3">
          <div className="flex gap-2">
            <Select value={selectedSCC} onValueChange={setSelectedSCC}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select SCC" />
              </SelectTrigger>
              <SelectContent>
                {sccs.map((scc) => (
                  <SelectItem key={scc} value={scc}>
                    {scc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSCCSelect}>Add SCC</Button>
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
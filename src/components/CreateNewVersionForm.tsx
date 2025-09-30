import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StoreSelector } from "./StoreSelector";

interface CreateNewVersionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVersionCreated: (version: { id: string; name: string }) => void;
}

export const CreateNewVersionForm = ({ open, onOpenChange, onVersionCreated }: CreateNewVersionFormProps) => {
  const [versionName, setVersionName] = useState("");
  const [baseVersion, setBaseVersion] = useState("");
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  const baseVersions = [
    { id: "v5", name: "v5 All India Store" },
    { id: "v6", name: "v6 Maharashtra stores" },
    { id: "v7", name: "v7 Moz + Cheddar for CHD" },
    { id: "v8", name: "v8 BBP Doughball change" },
  ];

  const handleSubmit = () => {
    if (!versionName.trim() || !baseVersion) {
      return;
    }

    const newVersion = {
      id: `v${Math.floor(Math.random() * 100) + 9}`,
      name: `v${Math.floor(Math.random() * 100) + 9} ${versionName}`
    };

    onVersionCreated(newVersion);
    onOpenChange(false);
    
    // Reset form
    setVersionName("");
    setBaseVersion("");
    setSelectedStores([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Recipe Bank Version</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="versionName">Version Name *</Label>
            <Input
              id="versionName"
              placeholder="e.g., Sourdough Pizza rollout"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Version number will be auto-generated
            </p>
          </div>

          <div className="space-y-2">
            <Label>Select Base Version *</Label>
            <Select value={baseVersion} onValueChange={setBaseVersion}>
              <SelectTrigger>
                <SelectValue placeholder="Select base version" />
              </SelectTrigger>
              <SelectContent>
                {baseVersions.map((version) => (
                  <SelectItem key={version.id} value={version.id}>
                    {version.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              This version will be used as the base, with new recipes added on top
            </p>
          </div>

          <div className="space-y-2">
            <Label>Select Stores *</Label>
            <StoreSelector
              selectedStores={selectedStores}
              onStoresChange={setSelectedStores}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Create Version
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
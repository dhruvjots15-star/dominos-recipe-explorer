import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, AlertCircle, ChevronRight } from "lucide-react";
import { generateNextRequestId } from "@/utils/requestIdUtils";
import { StoreSelector } from "@/components/StoreSelector";

interface ExtendVersionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVersion: string;
  onRequestSubmitted: (requestId: string) => void;
}

export const ExtendVersionForm = ({ isOpen, onClose, selectedVersion, onRequestSubmitted }: ExtendVersionFormProps) => {
  const [formData, setFormData] = useState({
    requestDesc: "",
    remarks: ""
  });
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requestDesc.trim()) {
      toast({
        title: "Error",
        description: "Request description is required",
        variant: "destructive"
      });
      return;
    }
    if (selectedStores.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one store",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const requestId = generateNextRequestId();
    
    // Close form and reset state first
    onClose();
    setShowConfirmation(false);
    setFormData({ requestDesc: "", remarks: "" });
    setSelectedStores([]);
    
    // Navigate to request landing page with success toast
    window.location.href = `/recipe-request/${requestId}?source=recipe-bank&showToast=true`;
  };

  const mockStoreMapping = {
    "v2": 60,
    "v3": 40
  };

  const mockDifferences = {
    productsInOldNotNew: 8,
    productsInNewNotOld: 5,
    commonProductsWithDifferences: 12
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Confirm Version Extension
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Store Mapping Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Store Mapping Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(mockStoreMapping).map(([version, count]) => (
                  <div key={version} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span>{count} stores currently on {version}</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      will be remapped to
                      <ChevronRight className="w-4 h-4" />
                      <Badge variant="outline">{selectedVersion}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Version Comparison Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Version Comparison Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Products Differences:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/30 rounded">
                      <span>{mockDifferences.productsInOldNotNew} products found in old versions but not in {selectedVersion}</span>
                      <Badge variant="destructive" className="text-xs">Will be deactivated</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded">
                      <span>{mockDifferences.productsInNewNotOld} products found in {selectedVersion} but not in old versions</span>
                      <Badge variant="default" className="text-xs bg-green-600">Will be activated</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recipe Differences:</h4>
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded text-sm">
                    {mockDifferences.commonProductsWithDifferences} common products with different recipes (ingredient or grammage changes)
                  </div>
                </div>

                <Button variant="link" className="p-0 h-auto text-sm">
                  View Full Comparison
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleConfirm} className="flex-1">
                Yes, Confirm & Extend
              </Button>
              <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Extend Recipe Version</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="requestDesc">Request Description *</Label>
            <Input
              id="requestDesc"
              value={formData.requestDesc}
              onChange={(e) => setFormData(prev => ({ ...prev, requestDesc: e.target.value }))}
              placeholder="e.g., Extend v5 to 100 more stores"
              required
            />
          </div>

          <div>
            <Label>Selected Version</Label>
            <Input value={selectedVersion} disabled className="bg-muted" />
          </div>

          <div>
            <Label htmlFor="targetStores">Target Stores *</Label>
            <StoreSelector 
              selectedStores={selectedStores}
              onStoresChange={setSelectedStores}
            />
          </div>

          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="e.g., Extending the BBP Doughball change to 100 more stores due to success in experiment"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Submit</Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
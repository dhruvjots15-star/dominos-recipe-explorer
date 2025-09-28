import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, ChevronRight } from "lucide-react";

interface RollbackVersionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVersion: string;
  onRequestSubmitted: (requestId: string) => void;
}

export const RollbackVersionForm = ({ isOpen, onClose, selectedVersion, onRequestSubmitted }: RollbackVersionFormProps) => {
  const [formData, setFormData] = useState({
    requestDesc: "",
    targetVersion: "",
    remarks: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const mockVersions = [
    { value: "v5", label: "v5 - All India version (234 stores)" },
    { value: "v4", label: "v4 - Regional launch (156 stores)" },
    { value: "v3", label: "v3 - Pilot version (89 stores)" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requestDesc.trim() || !formData.targetVersion) {
      toast({
        title: "Error",
        description: "Request description and target version are required",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const requestId = `REQ_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    toast({
      title: "Request Submitted",
      description: `Request submitted: ${requestId}`,
    });
    onRequestSubmitted(requestId);
    onClose();
    setShowConfirmation(false);
    setFormData({ requestDesc: "", targetVersion: "", remarks: "" });
  };

  const mockDifferences = {
    productsInCurrentNotTarget: 8,
    productsInTargetNotCurrent: 5,
    commonProductsWithDifferences: 12
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Confirm Version Rollback
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Rollback Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rollback Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>{selectedVersion} will be rolled back & all its 50 stores will be mapped</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4" />
                    <Badge variant="outline">{formData.targetVersion}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Version Comparison Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Version Comparison Snapshot</CardTitle>
                <p className="text-sm text-muted-foreground">Between {selectedVersion} & {formData.targetVersion}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Products Differences:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/30 rounded">
                      <span>{mockDifferences.productsInCurrentNotTarget} products found in {selectedVersion} but not in {formData.targetVersion}</span>
                      <Badge variant="destructive" className="text-xs">Will be deactivated</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded">
                      <span>{mockDifferences.productsInTargetNotCurrent} products found in {formData.targetVersion} but not in {selectedVersion}</span>
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
                Yes, Confirm & Rollback
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
          <DialogTitle>Rollback Recipe Version</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="requestDesc">Request Description *</Label>
            <Input
              id="requestDesc"
              value={formData.requestDesc}
              onChange={(e) => setFormData(prev => ({ ...prev, requestDesc: e.target.value }))}
              placeholder="e.g., Rollback v9 BBP Doughball change"
              required
            />
          </div>

          <div>
            <Label>Current Selected Version</Label>
            <Input value={selectedVersion} disabled className="bg-muted" />
          </div>

          <div>
            <Label htmlFor="targetVersion">Target Version *</Label>
            <Select value={formData.targetVersion} onValueChange={(value) => setFormData(prev => ({ ...prev, targetVersion: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select target version" />
              </SelectTrigger>
              <SelectContent>
                {mockVersions.map((version) => (
                  <SelectItem key={version.value} value={version.value}>
                    {version.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="e.g., Rolling back the BBP Doughball change altogether on X stores since the experiment is being shelved"
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
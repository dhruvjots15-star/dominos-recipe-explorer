import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, AlertCircle, ChevronRight } from "lucide-react";
import { generateNextRequestId } from "@/utils/requestIdUtils";

const ExtendVersionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedVersion = searchParams.get("version") || "v1.0";
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    requestDesc: "",
    targetStores: [] as string[],
    remarks: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const requestId = generateNextRequestId();
    
    // Navigate to request landing page with success toast
    navigate(`/recipe-request/${requestId}?source=recipe-bank&showToast=true`);
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

  // SEO title
  if (typeof document !== "undefined") {
    document.title = "Extend Recipe Version | Recipe System";
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setShowConfirmation(false)}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center gap-3">
              <AlertCircle className="w-9 h-9 text-amber-500" />
              Confirm Version Extension
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Review the changes before submitting your extension request
            </p>
          </div>

          {/* Store Mapping Summary */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Store Mapping Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(mockStoreMapping).map(([version, count]) => (
                <div key={version} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                  <span className="font-medium">{count} stores currently on {version}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    will be remapped to
                    <ChevronRight className="w-4 h-4" />
                    <Badge variant="outline" className="text-base px-3 py-1">{selectedVersion}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Version Comparison Snapshot */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Version Comparison Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-3">Products Differences:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <span className="font-medium">{mockDifferences.productsInOldNotNew} products found in old versions but not in {selectedVersion}</span>
                    <Badge variant="destructive">Will be deactivated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <span className="font-medium">{mockDifferences.productsInNewNotOld} products found in {selectedVersion} but not in old versions</span>
                    <Badge className="bg-green-600 hover:bg-green-700">Will be activated</Badge>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-3">Recipe Differences:</h4>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <span className="font-medium">{mockDifferences.commonProductsWithDifferences} common products with different recipes (ingredient or grammage changes)</span>
                </div>
              </div>

              <Button variant="link" className="p-0 h-auto">
                View Full Comparison
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-6">
            <Button 
              onClick={handleConfirm} 
              size="lg"
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
            >
              Yes, Confirm & Extend
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)} 
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/recipe-bank")}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipe Bank
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Extend Recipe Version
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Extend selected recipe version to additional stores
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Extension Request Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requestDesc" className="text-base font-semibold">
                  Request Description <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="requestDesc"
                  value={formData.requestDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestDesc: e.target.value }))}
                  placeholder="e.g., Extend v5 to 100 more stores"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">Selected Version</Label>
                <Input value={selectedVersion} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetStores" className="text-base font-semibold">Target Stores</Label>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="font-medium mb-2">100 additional stores selected</p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Change Store Selection
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks" className="text-base font-semibold">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="e.g., Extending the BBP Doughball change to 100 more stores due to success in experiment"
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
                >
                  Submit Request
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/recipe-bank")} 
                  size="lg"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExtendVersionPage;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowLeft } from "lucide-react";

interface RecipeRequestLandingProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

export const RecipeRequestLanding = ({ isOpen, onClose, requestId }: RecipeRequestLandingProps) => {
  // Mock request data based on requestId
  const mockRequest = {
    id: requestId,
    type: requestId.includes("EXT") ? "Extend Version" : "Rollback Version",
    description: requestId.includes("EXT") ? "Extend v5 to 100 more stores" : "Rollback v9 BBP Doughball change",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING",
    requestedBy: "Category Team",
    requestCreatedDate: new Date().toISOString(),
    targetVersion: "v5",
    affectedStores: 100,
    remarks: "Extending the BBP Doughball change to 100 more stores due to success in experiment"
  };

  const getWorkflowSteps = () => {
    const isExtend = mockRequest.type === "Extend Version";
    return [
      {
        step: 1,
        title: "Request Submitted",
        description: `${mockRequest.type} request submitted by Category Team`,
        status: "completed",
        completedBy: mockRequest.requestedBy,
        completedAt: mockRequest.requestCreatedDate,
        icon: CheckCircle
      },
      {
        step: 2,
        title: "Category Team Approval",
        description: "Request approval by Category Team",
        status: mockRequest.currentStatus === "REQUEST CREATED, APPROVAL PENDING" ? "current" : 
                mockRequest.currentStatus === "REJECTED" ? "rejected" : "completed",
        completedBy: mockRequest.currentStatus !== "REQUEST CREATED, APPROVAL PENDING" ? "Category Manager" : undefined,
        completedAt: mockRequest.currentStatus !== "REQUEST CREATED, APPROVAL PENDING" ? "2024-03-16 10:30:00" : undefined,
        icon: mockRequest.currentStatus === "REJECTED" ? XCircle : 
              mockRequest.currentStatus === "REQUEST CREATED, APPROVAL PENDING" ? Clock : CheckCircle
      },
      {
        step: 3,
        title: "Recipe Team Review",
        description: `Recipe ${isExtend ? 'extension' : 'rollback'} review by Recipe Team`,
        status: "pending",
        icon: AlertCircle
      },
      {
        step: 4,
        title: "Final Implementation",
        description: `Recipe version ${isExtend ? 'extended' : 'rolled back'} and stores updated`,
        status: "pending",
        icon: AlertCircle
      }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-emerald-600";
      case "current": return "text-blue-600";
      case "rejected": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 dark:bg-emerald-950";
      case "current": return "bg-blue-100 dark:bg-blue-950";
      case "rejected": return "bg-red-100 dark:bg-red-950";
      default: return "bg-muted";
    }
  };

  const steps = getWorkflowSteps();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Request Details - {mockRequest.id}
          </DialogTitle>
          <Badge 
            variant="outline" 
            className="w-fit bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
          >
            {mockRequest.currentStatus}
          </Badge>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Request Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Request Type</label>
                  <p className="text-foreground font-medium mt-1">{mockRequest.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Target Version</label>
                  <p className="text-foreground font-medium mt-1 text-primary">{mockRequest.targetVersion}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground font-medium mt-1">{mockRequest.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Affected Stores</label>
                  <p className="text-foreground font-medium mt-1">{mockRequest.affectedStores} stores</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Requested By</label>
                  <p className="text-foreground font-medium mt-1">{mockRequest.requestedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Request Created</label>
                  <p className="text-foreground font-medium mt-1">
                    {new Date(mockRequest.requestCreatedDate).toLocaleString()}
                  </p>
                </div>
              </div>
              {mockRequest.remarks && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Remarks</label>
                  <p className="text-foreground font-medium mt-1">{mockRequest.remarks}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workflow Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.step} className="flex items-start gap-4 relative">
                      <div className={`rounded-full p-2 ${getStatusBg(step.status)} z-10`}>
                        <IconComponent className={`h-5 w-5 ${getStatusColor(step.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${getStatusColor(step.status)}`}>
                            Step {step.step}: {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        {step.completedBy && step.completedAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Completed by {step.completedBy} on {new Date(step.completedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      {index < steps.length - 1 && step.status !== "rejected" && (
                        <div className="absolute left-6 top-12 w-0.5 h-6 bg-border" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RecipeRequestLandingProps {
  requestId: string;
  onBack: () => void;
}

export const RecipeRequestLanding = ({ requestId, onBack }: RecipeRequestLandingProps) => {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Mock request data based on requestId
  const mockRequest = {
    id: requestId,
    type: requestId.includes("EXT") ? "Extend Version" : "Rollback Version",
    description: requestId.includes("EXT") ? "Extend v5 to 100 more stores" : "Rollback v9 BBP Doughball change",
    currentStatus: "REQUEST CREATED, APPROVAL PENDING ON CATEGORY",
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
        title: "Request Submitted by Category Team",
        description: `Submitted by ${mockRequest.requestedBy} on ${new Date(mockRequest.requestCreatedDate).toLocaleString()}`,
        status: "completed",
        completedBy: mockRequest.requestedBy,
        completedAt: mockRequest.requestCreatedDate,
        icon: CheckCircle
      },
      {
        step: 2,
        title: mockRequest.currentStatus.includes("PENDING ON CATEGORY") ? "Request Approval Pending on Category Team" :
               mockRequest.currentStatus === "REJECTED" ? "Request Rejected by Category Team" : "Request Approved by Category Team",
        description: mockRequest.currentStatus.includes("PENDING ON CATEGORY") ? "Awaiting Category Team approval" :
                    mockRequest.currentStatus === "REJECTED" ? "Request was rejected" : "Request approved by Category Team",
        status: mockRequest.currentStatus.includes("PENDING ON CATEGORY") ? "current" : 
                mockRequest.currentStatus === "REJECTED" ? "rejected" : "completed",
        completedBy: !mockRequest.currentStatus.includes("PENDING ON CATEGORY") && mockRequest.currentStatus !== "REJECTED" ? "Category Manager" : undefined,
        completedAt: !mockRequest.currentStatus.includes("PENDING ON CATEGORY") && mockRequest.currentStatus !== "REJECTED" ? "2024-03-16 10:30:00" : undefined,
        icon: mockRequest.currentStatus === "REJECTED" ? XCircle : 
              mockRequest.currentStatus.includes("PENDING ON CATEGORY") ? Clock : CheckCircle
      },
      {
        step: 3,
        title: mockRequest.currentStatus.includes("PENDING EXECUTION ON MDM") ? "Request Execution Pending on MDM (POS) Team" :
               mockRequest.currentStatus.includes("PENDING GO LIVE") ? "Request Executed by MDM (POS) Team, Change Inactive" : "Request Execution Pending on MDM (POS) Team",
        description: mockRequest.currentStatus.includes("PENDING EXECUTION ON MDM") ? "Awaiting MDM (POS) Team execution" :
                    mockRequest.currentStatus.includes("PENDING GO LIVE") ? "Changes executed, awaiting go-live" : "Pending execution",
        status: mockRequest.currentStatus.includes("APPROVED BY CATEGORY") ? "current" :
                mockRequest.currentStatus.includes("PENDING EXECUTION ON MDM") ? "current" :
                mockRequest.currentStatus.includes("PENDING GO LIVE") || mockRequest.currentStatus.includes("LIVE") ? "completed" : "pending",
        completedBy: mockRequest.currentStatus.includes("PENDING GO LIVE") || mockRequest.currentStatus.includes("LIVE") ? "MDM Lead" : undefined,
        completedAt: mockRequest.currentStatus.includes("PENDING GO LIVE") || mockRequest.currentStatus.includes("LIVE") ? "2024-03-17 14:15:00" : undefined,
        icon: mockRequest.currentStatus.includes("APPROVED BY CATEGORY") || mockRequest.currentStatus.includes("PENDING EXECUTION ON MDM") ? Clock :
              mockRequest.currentStatus.includes("PENDING GO LIVE") || mockRequest.currentStatus.includes("LIVE") ? CheckCircle : AlertCircle
      },
      {
        step: 4,
        title: mockRequest.currentStatus.includes("PENDING GO LIVE") ? "Go Live Pending on MDM (POS) Team" : "LIVE",
        description: mockRequest.currentStatus.includes("PENDING GO LIVE") ? "Awaiting go-live activation" : 
                    mockRequest.currentStatus.includes("LIVE") ? `Recipe version ${isExtend ? 'extended' : 'rolled back'} and stores updated` : "Pending go-live",
        status: mockRequest.currentStatus.includes("PENDING GO LIVE") ? "current" :
                mockRequest.currentStatus.includes("LIVE") ? "completed" : "pending",
        completedBy: mockRequest.currentStatus.includes("LIVE") ? "MDM Manager" : undefined,
        completedAt: mockRequest.currentStatus.includes("LIVE") ? "2024-03-18 11:45:00" : undefined,
        icon: mockRequest.currentStatus.includes("LIVE") ? CheckCircle :
              mockRequest.currentStatus.includes("PENDING GO LIVE") ? Clock : AlertCircle
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
      case "completed": return "bg-emerald-100";
      case "current": return "bg-blue-100";
      case "rejected": return "bg-red-100";
      default: return "bg-muted";
    }
  };

  const handleApprove = () => {
    toast({
      title: "Request Approved",
      description: `Request ${mockRequest.id} has been approved successfully`,
    });
    onBack();
  };

  const handleExecute = () => {
    toast({
      title: "Request Executed",
      description: `Request ${mockRequest.id} has been executed successfully`,
    });
    onBack();
  };

  const handleMarkLive = () => {
    toast({
      title: "Request Marked Live",
      description: `Request ${mockRequest.id} is now live`,
    });
    onBack();
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Request Rejected",
      description: `Request ${mockRequest.id} has been rejected`,
      variant: "destructive"
    });
    onBack();
  };

  const canApprove = () => {
    return mockRequest.currentStatus.includes("PENDING ON CATEGORY");
  };

  const canExecute = () => {
    return mockRequest.currentStatus.includes("APPROVED BY CATEGORY");
  };

  const canMarkLive = () => {
    return mockRequest.currentStatus.includes("PENDING GO LIVE");
  };

  const canReject = () => {
    return mockRequest.currentStatus.includes("PENDING ON CATEGORY") || 
           mockRequest.currentStatus.includes("APPROVED BY CATEGORY") ||
           mockRequest.currentStatus.includes("PENDING GO LIVE");
  };

  const steps = getWorkflowSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipe Bank
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Request Details - {mockRequest.id}
          </h1>
          <div className="mt-4">
            <Badge 
              variant="outline" 
              className={`px-4 py-2 text-sm font-medium ${
                mockRequest.currentStatus.includes("LIVE") ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                mockRequest.currentStatus === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" :
                "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {mockRequest.currentStatus}
            </Badge>
          </div>
        </div>

        {/* Workflow Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Request Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${getStatusBg(step.status)}`}>
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
                      <div className="absolute left-6 mt-12 w-0.5 h-6 bg-border" style={{ marginLeft: '1.75rem' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {(canApprove() || canExecute() || canMarkLive() || canReject()) && (
          <Card>
            <CardHeader>
              <CardTitle>Available Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                {canApprove() && (
                  <Button 
                    onClick={handleApprove}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                )}
                {canExecute() && (
                  <Button 
                    onClick={handleExecute}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Execute
                  </Button>
                )}
                {canMarkLive() && (
                  <Button 
                    onClick={handleMarkLive}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark LIVE
                  </Button>
                )}
                {canReject() && (
                  <Button 
                    variant="destructive"
                    onClick={() => setShowRejectForm(!showRejectForm)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                )}
              </div>
              
              {showRejectForm && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rejection Reason</label>
                    <Textarea
                      placeholder="Please provide a reason for rejection..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive"
                      onClick={handleReject}
                    >
                      Confirm Rejection
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowRejectForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Request Description</label>
                <p className="text-foreground font-medium mt-1">{mockRequest.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Selected Version</label>
                <p className="text-foreground font-medium mt-1 text-primary">{mockRequest.targetVersion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Target Stores</label>
                <p className="text-foreground font-medium mt-1">{mockRequest.affectedStores} stores</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Remarks</label>
                <p className="text-foreground font-medium mt-1">{mockRequest.remarks || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Requested By</label>
                <p className="text-foreground font-medium mt-1">{mockRequest.requestedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created On</label>
                <p className="text-foreground font-medium mt-1">
                  {new Date(mockRequest.requestCreatedDate).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SizeCodeRequest } from "@/data/sizeCodesData";

interface RequestLandingProps {
  request?: SizeCodeRequest;
  onBack: () => void;
}

export const RequestLanding = ({ request, onBack }: RequestLandingProps) => {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Size Codes Master
          </Button>
          <div className="text-center mt-8">
            <p>Request not found</p>
          </div>
        </div>
      </div>
    );
  }

  const getWorkflowSteps = () => {
    return [
      {
        step: 1,
        title: "Request Submitted",
        description: "Request submitted by Category Team",
        status: "completed",
        completedBy: request.requestedBy,
        completedAt: request.requestCreatedDate,
        icon: CheckCircle
      },
      {
        step: 2,
        title: "Approval Pending",
        description: "Request approval by Category Team",
        status: request.currentStatus === "REQUEST CREATED, APPROVAL PENDING" ? "current" : 
                request.currentStatus === "REJECTED" ? "rejected" : "completed",
        completedBy: request.currentStatus !== "REQUEST CREATED, APPROVAL PENDING" ? "Category Manager" : undefined,
        completedAt: request.currentStatus !== "REQUEST CREATED, APPROVAL PENDING" ? "2024-03-16 10:30:00" : undefined,
        icon: request.currentStatus === "REJECTED" ? XCircle : 
              request.currentStatus === "REQUEST CREATED, APPROVAL PENDING" ? Clock : CheckCircle
      },
      {
        step: 3,
        title: "Chef Team Action",
        description: "Extra Topping Master Update Request by Chef Team",
        status: request.currentStatus === "REQUEST APPROVED, PENDING ON CHEF" ? "current" :
                request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF" || 
                request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "completed" : "pending",
        completedBy: request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF" || 
                    request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "Chef Lead" : undefined,
        completedAt: request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF" || 
                    request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "2024-03-17 14:15:00" : undefined,
        icon: request.currentStatus === "REQUEST APPROVED, PENDING ON CHEF" ? Clock : 
              request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF" || 
              request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? CheckCircle : AlertCircle
      },
      {
        step: 4,
        title: "Final Approval",
        description: "Extra Topping Master Update approved by Chef Team",
        status: request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF" ? "current" :
                request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "completed" : "pending",
        completedBy: request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "Chef Manager" : undefined,
        completedAt: request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "2024-03-18 11:45:00" : undefined,
        icon: request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? CheckCircle : 
              request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF" ? Clock : AlertCircle
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
      description: `Request ${request.id} has been approved successfully`,
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
      description: `Request ${request.id} has been rejected`,
      variant: "destructive"
    });
    onBack();
  };

  const canApprove = () => {
    return request.currentStatus === "REQUEST CREATED, APPROVAL PENDING" || 
           request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF";
  };

  const canReject = () => {
    return request.currentStatus === "REQUEST CREATED, APPROVAL PENDING" || 
           request.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF";
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
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Size Codes Master
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Request Details - {request.id}
          </h1>
          <div className="mt-4">
            <Badge 
              variant="outline" 
              className={`px-4 py-2 text-sm font-medium ${
                request.currentStatus === "EXTRA TOPPING MASTER UPDATED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                request.currentStatus === "REJECTED" ? "bg-red-50 text-red-700 border-red-200" :
                "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {request.currentStatus}
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
        {(canApprove() || canReject()) && (
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
                <p className="text-foreground font-medium mt-1">{request.requestDesc}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Size Code</label>
                <p className="text-foreground font-medium mt-1 text-primary">{request.sizeCode}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-foreground font-medium mt-1">{request.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Remarks</label>
                <p className="text-foreground font-medium mt-1">{request.remarks || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Requested By</label>
                <p className="text-foreground font-medium mt-1">{request.requestedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Request Created</label>
                <p className="text-foreground font-medium mt-1">
                  {new Date(request.requestCreatedDate).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
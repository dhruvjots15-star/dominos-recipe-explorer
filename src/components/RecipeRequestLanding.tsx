import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowLeft, User, Calendar, FileText, Settings, Play, Globe } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { getDashboardRequestById, DashboardRequest } from "@/data/dashboardRequestsData";

interface RecipeRequestLandingProps {
  requestId: string;
  onBack: () => void;
  source?: string;
}

export const RecipeRequestLanding = ({ requestId, onBack, source = 'recipe-bank' }: RecipeRequestLandingProps) => {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Get the actual request data or create a placeholder for newly created requests
  const baseRequestType = source === 'size-codes' ? 'NEW SIZE CODE' : source === 'dashboard' ? 'NEW RECIPE' : 'VERSION EXTEND';
  const placeholderRequest: DashboardRequest = {
    requestId,
    requestDesc: 'Request created. Details will be available shortly.',
    requestType: baseRequestType as any,
    requestedBy: 'You',
    requestCreatedDate: new Date().toISOString(),
    currentStatus: 'REQUEST CREATED, APPROVAL PENDING',
    targetVersion: 'v1.0',
    affectedStores: 0,
    remarks: ''
  };
  const request = getDashboardRequestById(requestId) || placeholderRequest;

  const getWorkflowSteps = (requestData: any) => {
    const steps = [
      {
        title: "Request Submitted by Category Team",
        description: `Submitted by ${requestData.requestedBy} on ${format(new Date(requestData.requestCreatedDate), 'MMM dd, yyyy HH:mm')}`,
        status: "completed",
        icon: FileText
      }
    ];

    // Step 2: Approval
    if (requestData.currentStatus === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY") {
      steps.push({
        title: "Request Approval Pending on Category Team",
        description: "Awaiting approval from Category Team",
        status: "pending",
        icon: Clock
      });
    } else if (requestData.currentStatus === "REJECTED") {
      steps.push({
        title: "Request Rejected by Category Team",
        description: "Rejected by Category Manager on Jan 16, 2024 15:30",
        status: "rejected",
        icon: XCircle
      });
    } else {
      steps.push({
        title: "Request Approved by Category Team", 
        description: "Approved by Category Manager on Jan 16, 2024 10:15",
        status: "completed",
        icon: CheckCircle
      });
    }

    // Step 3: Execution
    if (requestData.currentStatus === "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)") {
      steps.push({
        title: "Request Execution Pending on MDM (POS) Team",
        description: "Awaiting execution by MDM (POS) Team",
        status: "pending", 
        icon: Clock
      });
    } else if (requestData.currentStatus === "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE" || 
               requestData.currentStatus.includes("REQUEST LIVE")) {
      steps.push({
        title: "Request Executed by MDM (POS) Team, Change Inactive",
        description: "Executed by MDM Lead on Jan 18, 2024 14:30",
        status: "completed",
        icon: Settings
      });
    }

    // Step 4: Go Live
    if (requestData.currentStatus === "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE") {
      steps.push({
        title: "Go Live Pending on MDM (POS) Team",
        description: "Awaiting go live activation",
        status: "pending",
        icon: Clock
      });
    } else if (requestData.currentStatus.includes("REQUEST LIVE")) {
      const statusText = requestData.currentStatus.includes("EXTENDED") ? "VERSION EXTENDED TO STORES" : "VERSION ROLLED BACK";
      steps.push({
        title: "LIVE",
        description: requestData.goLiveDate ? 
          `LIVE by MDM Manager on ${format(new Date(requestData.goLiveDate), 'MMM dd, yyyy HH:mm')}` :
          `LIVE by MDM Manager on Jan 20, 2024 14:45`, 
        status: "completed",
        icon: Globe
      });
    }

    return steps;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-emerald-600 dark:text-emerald-400";
      case "pending": return "text-amber-600 dark:text-amber-400";
      case "rejected": return "text-red-600 dark:text-red-400";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 dark:bg-emerald-950/30";
      case "pending": return "bg-amber-100 dark:bg-amber-950/30";
      case "rejected": return "bg-red-100 dark:bg-red-950/30";
      default: return "bg-muted";
    }
  };

  const handleApprove = () => {
    toast({
      title: "Request Approved",
      description: `Request ${request.requestId} has been approved successfully`,
    });
    onBack();
  };

  const handleExecute = () => {
    toast({
      title: "Request Executed",
      description: `Request ${request.requestId} has been executed successfully`,
    });
    onBack();
  };

  const handleMarkLive = () => {
    toast({
      title: "Request Marked Live",
      description: `Request ${request.requestId} is now live`,
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
      description: `Request ${request.requestId} has been rejected`,
      variant: "destructive"
    });
    onBack();
  };

  const canApprove = (status: string) => {
    return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY";
  };

  const canExecute = (status: string) => {
    return status === "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)";
  };

  const canMarkLive = (status: string) => {
    return status === "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE";
  };

  const canReject = (status: string) => {
    return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY" || 
           status === "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)" ||
           status === "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE";
  };

  const steps = getWorkflowSteps(request);

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
            {source === 'dashboard' ? 'Back to Dashboard' : 'Back to Recipe Bank'}
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Request Details - {request.requestId}
          </h1>
          <div className="mt-4">
            <Badge 
              variant="outline" 
              className={`px-4 py-2 text-sm font-medium ${
                request.currentStatus.includes("LIVE") ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800" :
                request.currentStatus === "REJECTED" ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800" :
                "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
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
                  <div key={index} className="flex items-start gap-4 relative">
                    <div className={`rounded-full p-2 ${getStatusBg(step.status)}`}>
                      <IconComponent className={`h-5 w-5 ${getStatusColor(step.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${getStatusColor(step.status)}`}>
                          Step {index + 1}: {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && step.status !== "rejected" && (
                      <div 
                        className="absolute left-6 mt-12 w-0.5 h-6 bg-border" 
                        style={{ marginLeft: '1.75rem' }} 
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {(canApprove(request.currentStatus) || canExecute(request.currentStatus) || canMarkLive(request.currentStatus) || canReject(request.currentStatus)) && (
          <Card>
            <CardHeader>
              <CardTitle>Available Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                {canApprove(request.currentStatus) && (
                  <Button 
                    onClick={handleApprove}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                )}
                {canExecute(request.currentStatus) && (
                  <Button 
                    onClick={handleExecute}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Execute
                  </Button>
                )}
                {canMarkLive(request.currentStatus) && (
                  <Button 
                    onClick={handleMarkLive}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark LIVE
                  </Button>
                )}
                {canReject(request.currentStatus) && (
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
                <label className="text-sm font-medium text-muted-foreground">Selected Version</label>
                <p className="text-foreground font-medium mt-1 text-primary">{request.targetVersion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Target Stores</label>
                <p className="text-foreground font-medium mt-1">{request.affectedStores} stores</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Remarks</label>
                <p className="text-foreground font-medium mt-1">{request.remarks || "No remarks provided"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Requested By</label>
                <p className="text-foreground font-medium mt-1">{request.requestedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created On</label>
                <p className="text-foreground font-medium mt-1">
                  {format(new Date(request.requestCreatedDate), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
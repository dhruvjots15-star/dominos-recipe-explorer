import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowLeft, User, Calendar, FileText, Settings, Play, Globe } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { getDashboardRequestById, DashboardRequest } from "@/data/dashboardRequestsData";
import { getRequestById as getRecipeBankRequestById, RecipeRequest as RBRequest } from "@/data/requestsData";

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
  const recipeBankRequest = getRecipeBankRequestById(requestId);
  const dashboardRequest = getDashboardRequestById(requestId);
  const request = (recipeBankRequest || dashboardRequest || placeholderRequest) as any;

  const getWorkflowSteps = (requestData: any) => {
    // Handle NEW RECIPE and RECIPE MODIFICATION requests with 6-step workflow
    if (requestData.requestType === 'NEW RECIPE' || requestData.requestType === 'RECIPE MODIFICATION') {
      const status = requestData.currentStatus;
      const isNewRecipe = requestData.requestType === 'NEW RECIPE';
      
      return [
        {
          title: "Request Submitted by Category Team",
          description: "Submitted by Varun on Mar 15, 2024 20:00",
          status: 'completed' as const,
          icon: CheckCircle
        },
        {
          title: "Recipe Submission by Chef Team",
          description: 
            status.includes('RECIPES SUBMITTED BY CHEF') ? "Submitted by Shamsher on Mar 15, 2024 23:00" :
            status === 'REJECTED BY CHEF' ? "Rejected by Shamsher on Mar 15, 2024 23:00" : "",
          status: 
            status === 'REQUEST CREATED, PENDING ON CHEF' ? 'pending' as const :
            status.includes('RECIPES SUBMITTED BY CHEF') ? 'completed' as const :
            status === 'REJECTED BY CHEF' ? 'rejected' as const : 'upcoming' as const,
          icon: 
            status === 'REQUEST CREATED, PENDING ON CHEF' ? Clock :
            status.includes('RECIPES SUBMITTED BY CHEF') ? CheckCircle :
            status === 'REJECTED BY CHEF' ? XCircle : Settings
        },
        {
          title: "Request Approvals by Category, SC Planning, Quality Teams",
          description: (() => {
            const approvals = [];
            if (status.includes('APPROVED') && !status.includes('PENDING ON CATEGORY')) {
              approvals.push("Approved by Kshitij on Mar 16, 2024 13:30");
            }
            if (status.includes('APPROVED') && !status.includes('PENDING ON SC PLANNING')) {
              approvals.push("Approved by Satyam on Mar 16, 2024 14:30");
            }
            if (status.includes('APPROVED') && !status.includes('PENDING ON QUALITY')) {
              approvals.push("Approved by Rajesh on Mar 17, 2024 09:30");
            }
            if (status === 'REJECTED BY CATEGORY') {
              return "Rejected by Kshitij on Mar 16, 2024 13:30";
            }
            if (status === 'REJECTED BY SC PLANNING') {
              return "Rejected by Satyam on Mar 16, 2024 14:30";
            }
            if (status === 'REJECTED BY QUALITY') {
              return "Rejected by Rajesh on Mar 17, 2024 09:30";
            }
            return approvals.join(", ");
          })(),
          status: 
            status.includes('REJECTED BY CATEGORY') || status.includes('REJECTED BY SC PLANNING') || status.includes('REJECTED BY QUALITY') ? 'rejected' as const :
            status.includes('APPROVALS PENDING') || status.includes('APPROVAL PENDING') ? 'pending' as const :
            status.includes('REQUEST APPROVED') || status.includes('ALL APPROVALS DONE') ? 'completed' as const :
            status.includes('RECIPES SUBMITTED BY CHEF') ? 'upcoming' as const : 'upcoming' as const,
          icon: 
            status.includes('REJECTED BY CATEGORY') || status.includes('REJECTED BY SC PLANNING') || status.includes('REJECTED BY QUALITY') ? XCircle :
            status.includes('APPROVALS PENDING') || status.includes('APPROVAL PENDING') ? Clock :
            status.includes('REQUEST APPROVED') || status.includes('ALL APPROVALS DONE') ? CheckCircle : Settings
        },
        {
          title: "Request Approval by Business Finance Team",
          description: 
            status.includes('ALL APPROVALS DONE') || status.includes('REQUEST EXECUTED') || status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? "Approved by Vijender on Mar 17, 2024 13:30" :
            status === 'REJECTED BY FINANCE' ? "Rejected by Vijender on Mar 17, 2024 13:30" : "",
          status: 
            status === 'REJECTED BY FINANCE' ? 'rejected' as const :
            status === 'REQUEST APPROVED, PENDING FINAL APPROVAL FROM FINANCE' ? 'pending' as const :
            status.includes('ALL APPROVALS DONE') || status.includes('REQUEST EXECUTED') || status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? 'completed' as const : 'upcoming' as const,
          icon: 
            status === 'REJECTED BY FINANCE' ? XCircle :
            status === 'REQUEST APPROVED, PENDING FINAL APPROVAL FROM FINANCE' ? Clock :
            status.includes('ALL APPROVALS DONE') || status.includes('REQUEST EXECUTED') || status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? CheckCircle : Settings
        },
        {
          title: "Request Execution by MDM (POS) Team",
          description: 
            status.includes('REQUEST EXECUTED') || status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? "Executed by Awadesh on Mar 18, 2024 13:30" :
            status === 'REJECTED BY MDM(POS)' ? "Rejected by Awadesh on Mar 18, 2024 13:30" : "",
          status: 
            status === 'REJECTED BY MDM(POS)' ? 'rejected' as const :
            status === 'ALL APPROVALS DONE, PENDING EXECUTION BY MDM(POS)' ? 'pending' as const :
            status.includes('REQUEST EXECUTED') || status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? 'completed' as const : 'upcoming' as const,
          icon: 
            status === 'REJECTED BY MDM(POS)' ? XCircle :
            status === 'ALL APPROVALS DONE, PENDING EXECUTION BY MDM(POS)' ? Clock :
            status.includes('REQUEST EXECUTED') || status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? CheckCircle : Settings
        },
        {
          title: "Request Go Live by MDM (POS) Team",
          description: 
            status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? "Go LIVE by Awadesh on Mar 17, 2024 13:30" : "",
          status: 
            status === 'REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE' ? 'pending' as const :
            status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? 'completed' as const : 'upcoming' as const,
          icon: 
            status === 'REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE' ? Clock :
            status === 'REQUEST LIVE, NEW RECIPES LIVE' || status === 'REQUEST LIVE, RECIPES MODIFIED' ? Globe : Settings
        }
      ];
    }
    
    // Handle NEW SIZE CODE requests with specific 3-step workflow
    if (requestData.requestType === "NEW SIZE CODE") {
      const steps = [
        {
          title: "Request Submitted by Category Team",
          description: `Submitted by ${requestData.requestedBy} on ${format(new Date(requestData.requestCreatedDate), 'MMM dd, yyyy HH:mm')}`,
          status: "completed",
          icon: FileText
        }
      ];

      // Step 2: Request Approval by Category Team
      if (requestData.currentStatus === "REQUEST CREATED, APPROVAL PENDING") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Awaiting approval from Category Team",
          status: "pending",
          icon: Clock
        });
        // Step 3 is upcoming (grayed out)
        steps.push({
          title: "Extra Topping Master to be Updated by Chef",
          description: "Awaiting Category Team approval",
          status: "upcoming",
          icon: Settings
        });
      } else if (requestData.currentStatus === "REQUEST APPROVED, PENDING ON CHEF") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Approved by Kshitij on Mar 16, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Extra Topping Master to be Updated by Chef",
          description: "Awaiting update by Chef",
          status: "pending",
          icon: Clock
        });
      } else if (requestData.currentStatus === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Approved by Kshitij on Mar 16, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Extra Topping Master to be Updated by Chef",
          description: "Update request submitted by Chef",
          status: "pending",
          icon: Clock
        });
      } else if (requestData.currentStatus === "EXTRA TOPPING MASTER UPDATED") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Approved by Kshitij on Mar 16, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Extra Topping Master to be Updated by Chef",
          description: "Updated by Shamsher on Mar 17, 2024 16:30",
          status: "completed",
          icon: CheckCircle
        });
      } else if (requestData.currentStatus === "REJECTED") {
        // Check if rejection was at Category level or Chef level
        const isChefRejection = requestData.currentStatus.includes("CHEF") || 
                               ["REQUEST APPROVED, PENDING ON CHEF", "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF"].includes(requestData.previousStatus);
        
        if (isChefRejection) {
          steps.push({
            title: "Request Approval by Category Team",
            description: "Approved by Kshitij on Mar 16, 2024 13:30",
            status: "completed",
            icon: CheckCircle
          });
          steps.push({
            title: "Extra Topping Master to be Updated by Chef",
            description: "Rejected by Shamsher on Mar 17, 2024 16:30",
            status: "rejected",
            icon: XCircle
          });
        } else {
          steps.push({
            title: "Request Approval by Category Team",
            description: "Rejected by Kshitij on Mar 16, 2024 13:30",
            status: "rejected",
            icon: XCircle
          });
          steps.push({
            title: "Extra Topping Master to be Updated by Chef",
            description: "Awaiting Category Team approval",
            status: "upcoming",
            icon: Settings
          });
        }
      }

      return steps;
    }

    // Handle VERSION EXTEND and VERSION ROLLBACK requests with specific 4-step workflow
    if (requestData.requestType === "VERSION EXTEND" || requestData.requestType === "VERSION ROLLBACK") {
      const steps = [
        {
          title: "Request Submitted by Category Team",
          description: `Submitted by ${requestData.requestedBy} on ${format(new Date(requestData.requestCreatedDate), 'MMM dd, yyyy HH:mm')}`,
          status: "completed",
          icon: FileText
        }
      ];

      // Step 2: Request Approval by Category Team
      if (requestData.currentStatus === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Awaiting approval from Category Team",
          status: "pending",
          icon: Clock
        });
        // Steps 3 and 4 are upcoming (grayed out)
        steps.push({
          title: "Request Execution by MDM (POS) Team",
          description: "Awaiting Category Team approval",
          status: "upcoming",
          icon: Settings
        });
        steps.push({
          title: "Request Go Live by MDM (POS) Team",
          description: "Awaiting execution completion",
          status: "upcoming",
          icon: Globe
        });
      } else if (requestData.currentStatus === "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Approved by Kshitij on Mar 16, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Request Execution by MDM (POS) Team",
          description: "Awaiting execution by MDM (POS) Team",
          status: "pending",
          icon: Clock
        });
        steps.push({
          title: "Request Go Live by MDM (POS) Team",
          description: "Awaiting execution completion",
          status: "upcoming",
          icon: Globe
        });
      } else if (requestData.currentStatus === "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Approved by Kshitij on Mar 16, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Request Execution by MDM (POS) Team",
          description: "Executed by Awadesh on Mar 17, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Request Go Live by MDM (POS) Team",
          description: "Awaiting go live activation",
          status: "pending",
          icon: Clock
        });
      } else if (requestData.currentStatus === "REQUEST LIVE, VERSION EXTENDED TO STORES" || 
                 requestData.currentStatus === "REQUEST LIVE, VERSION ROLLED BACK") {
        steps.push({
          title: "Request Approval by Category Team",
          description: "Approved by Kshitij on Mar 16, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Request Execution by MDM (POS) Team",
          description: "Executed by Awadesh on Mar 17, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
        steps.push({
          title: "Request Go Live by MDM (POS) Team",
          description: "Go LIVE by Awadesh on Mar 17, 2024 13:30",
          status: "completed",
          icon: CheckCircle
        });
      } else if (requestData.currentStatus === "REJECTED") {
        // Check which step the rejection occurred at
        if (requestData.previousStatus === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY" || 
            !requestData.previousStatus) {
          // Rejection at Category Team level
          steps.push({
            title: "Request Approval by Category Team",
            description: "Rejected by Kshitij on Mar 16, 2024 13:30",
            status: "rejected",
            icon: XCircle
          });
          steps.push({
            title: "Request Execution by MDM (POS) Team",
            description: "Awaiting Category Team approval",
            status: "upcoming",
            icon: Settings
          });
          steps.push({
            title: "Request Go Live by MDM (POS) Team",
            description: "Awaiting execution completion",
            status: "upcoming",
            icon: Globe
          });
        } else if (requestData.previousStatus === "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)") {
          // Rejection at MDM execution level
          steps.push({
            title: "Request Approval by Category Team",
            description: "Approved by Kshitij on Mar 16, 2024 13:30",
            status: "completed",
            icon: CheckCircle
          });
          steps.push({
            title: "Request Execution by MDM (POS) Team",
            description: "Rejected by Awadesh on Mar 17, 2024 13:30",
            status: "rejected",
            icon: XCircle
          });
          steps.push({
            title: "Request Go Live by MDM (POS) Team",
            description: "Awaiting execution completion",
            status: "upcoming",
            icon: Globe
          });
        } else {
          // Rejection at Go Live level
          steps.push({
            title: "Request Approval by Category Team",
            description: "Approved by Kshitij on Mar 16, 2024 13:30",
            status: "completed",
            icon: CheckCircle
          });
          steps.push({
            title: "Request Execution by MDM (POS) Team",
            description: "Executed by Awadesh on Mar 17, 2024 13:30",
            status: "completed",
            icon: CheckCircle
          });
          steps.push({
            title: "Request Go Live by MDM (POS) Team",
            description: "Rejected by Awadesh on Mar 17, 2024 13:30",
            status: "rejected",
            icon: XCircle
          });
        }
      }

      return steps;
    }

    // Original workflow for other request types (fallback)
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
      case "upcoming": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 dark:bg-emerald-950/30";
      case "pending": return "bg-amber-100 dark:bg-amber-950/30";
      case "rejected": return "bg-red-100 dark:bg-red-950/30";
      case "upcoming": return "bg-muted/50";
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
    const title = request.requestType === "NEW SIZE CODE" ? "Extra Topping Master Updated" : "Request Executed";
    const description = request.requestType === "NEW SIZE CODE" ? 
      `Extra Topping Master updated for request ${request.requestId}` :
      `Request ${request.requestId} has been executed successfully`;
    
    toast({
      title,
      description,
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
    if (request.requestType === "NEW SIZE CODE") {
      return status === "REQUEST CREATED, APPROVAL PENDING";
    }
    return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY";
  };

  const canExecute = (status: string) => {
    if (request.requestType === "NEW SIZE CODE") {
      return status === "REQUEST APPROVED, PENDING ON CHEF" || 
             status === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF";
    }
    return status === "REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)";
  };

  const canMarkLive = (status: string) => {
    if (request.requestType === "NEW SIZE CODE") {
      return false; // No "Mark Live" action for size code requests
    }
    return status === "REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE";
  };

  const canReject = (status: string) => {
    if (request.requestType === "NEW SIZE CODE") {
      return status === "REQUEST CREATED, APPROVAL PENDING" || 
             status === "REQUEST APPROVED, PENDING ON CHEF" ||
             status === "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF";
    }
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
            className="text-primary hover:bg-muted/50 hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {source === 'dashboard' ? 'Back to Dashboard' : source === 'size-codes' ? 'Back to Size Codes Master' : 'Back to Recipe Bank'}
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
                    {request.requestType === "NEW SIZE CODE" ? "Update Extra Topping Master" : "Execute"}
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
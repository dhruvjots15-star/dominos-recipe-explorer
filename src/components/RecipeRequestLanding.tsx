import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowLeft, User, Calendar, FileText, Settings, Play, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { getDashboardRequestById, DashboardRequest } from "@/data/dashboardRequestsData";
import { getRequestById as getRecipeBankRequestById, RecipeRequest as RBRequest } from "@/data/requestsData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RecipeRequestLandingProps {
  requestId: string;
  onBack: () => void;
  source?: string;
}

export const RecipeRequestLanding = ({ requestId, onBack, source = 'recipe-bank' }: RecipeRequestLandingProps) => {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showStores, setShowStores] = useState(false);
  const [showSizeCodes, setShowSizeCodes] = useState(false);

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
    // Special handling for REQ_142
    if (requestData.requestId === 'REQ_142') {
      return [
        {
          title: "Step 1: Request Submission by Category Team",
          description: "Submitted by Kshitij on Mar 17, 2025, 4:15pm",
          status: 'completed' as const,
          icon: CheckCircle
        },
        {
          title: "Step 2: Recipe Submission by Chef Team",
          description: "Submitted by Shamsher on Mar 18, 2025, 4:15pm",
          status: 'completed' as const,
          icon: CheckCircle
        },
        {
          title: "Step 3: Recipe Approvals by Category, SC Planning & Quality Teams",
          description: "Approved by Rajesh on Mar 19, 2025, 4:15pm\nAwaiting Approvals by Category & SC Planning",
          status: 'pending' as const,
          icon: Clock
        },
        {
          title: "Step 4: Final Recipe Approval by Finance Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 5: Request Execution & Verification by MDM (POS) Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 6: LIVE",
          description: "",
          status: 'upcoming' as const,
          icon: Globe
        }
      ];
    }

    // Special handling for REQ_125
    if (requestData.requestId === 'REQ_125') {
      return [
        {
          title: "Step 1: Request Submission by Category Team",
          description: "Submitted by Varun on Mar 15, 2025, 4:15pm",
          status: 'completed' as const,
          icon: CheckCircle
        },
        {
          title: "Step 2: Request Approval by Category Team",
          description: "Awaiting Approval by Category Team",
          status: 'pending' as const,
          icon: Clock
        },
        {
          title: "Step 3: Request Execution & Verification by MDM (POS) Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 4: LIVE",
          description: "",
          status: 'upcoming' as const,
          icon: Globe
        }
      ];
    }

    // Special handling for REQ_088
    if (requestData.requestId === 'REQ_088') {
      return [
        {
          title: "Step 1: Request Submission by Category Team",
          description: "Submitted by Varun on Mar 13, 2025 21:45",
          status: 'completed' as const,
          icon: CheckCircle
        },
        {
          title: "Step 2: Request Approval by Category Team",
          description: "Awaiting Approval by Category Team",
          status: 'pending' as const,
          icon: Clock
        },
        {
          title: "Step 3: Extra Topping Master Updation by Chef Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 4: Extra Topping Master Update Approval by Chef Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 5: Request Execution & Verification by MDM (POS) Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 6: LIVE",
          description: "",
          status: 'upcoming' as const,
          icon: Globe
        }
      ];
    }

    // Special handling for REQ_021
    if (requestData.requestId === 'REQ_021') {
      return [
        {
          title: "Step 1: Request Submission by Category Team",
          description: "Submitted by Varun on Mar 10, 2025, 21:15pm",
          status: 'completed' as const,
          icon: CheckCircle
        },
        {
          title: "Step 2: Request Approval by Category Team",
          description: "Awaiting Approval by Category Team",
          status: 'pending' as const,
          icon: Clock
        },
        {
          title: "Step 3: Request Execution & Verification by MDM (POS) Team",
          description: "",
          status: 'upcoming' as const,
          icon: Settings
        },
        {
          title: "Step 4: LIVE",
          description: "",
          status: 'upcoming' as const,
          icon: Globe
        }
      ];
    }
    
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
            // Handle rejections
            if (status === 'REJECTED BY CATEGORY') {
              return "Rejected by Kshitij on Mar 16, 2024 13:30";
            }
            if (status === 'REJECTED BY SC PLANNING') {
              return "Rejected by Satyam on Mar 16, 2024 14:30";
            }
            if (status === 'REJECTED BY QUALITY') {
              return "Rejected by Rajesh on Mar 17, 2024 09:30";
            }
            
            // Build approval messages for pending states
            const approvals = [];
            const awaiting = [];
            
            // Check which teams have pending approvals
            const pendingCategory = status.includes('PENDING ON CATEGORY');
            const pendingSC = status.includes('PENDING ON SC PLANNING');
            const pendingQuality = status.includes('PENDING ON QUALITY');
            
            // If all three are pending
            if (status.includes('APPROVALS PENDING ON CATEGORY & SC PLANNING & QUALITY')) {
              return "Awaiting approvals from Category, SC Planning & Quality teams";
            }
            
            // If two are pending
            if (status.includes('APPROVALS PENDING ON CATEGORY & SC PLANNING')) {
              approvals.push("Approved by Rajesh on Mar 16, 2024 09:30");
              return approvals.join("\n") + "\nAwaiting approvals from Category & SC Planning teams";
            }
            if (status.includes('APPROVALS PENDING ON SC PLANNING & QUALITY')) {
              approvals.push("Approved by Kshitij on Mar 16, 2024 13:30");
              return approvals.join("\n") + "\nAwaiting approvals from SC Planning & Quality teams";
            }
            if (status.includes('APPROVALS PENDING ON CATEGORY & QUALITY')) {
              approvals.push("Approved by Satyam on Mar 16, 2024 14:30");
              return approvals.join("\n") + "\nAwaiting approvals from Category & Quality teams";
            }
            
            // If only one is pending
            if (status.includes('APPROVAL PENDING ON CATEGORY')) {
              approvals.push("Approved by Rajesh on Mar 16, 2024 09:30");
              approvals.push("Approved by Satyam on Mar 16, 2024 14:30");
              return approvals.join("\n") + "\nAwaiting approval from Category team";
            }
            if (status.includes('APPROVAL PENDING ON SC PLANNING')) {
              approvals.push("Approved by Kshitij on Mar 16, 2024 13:30");
              approvals.push("Approved by Rajesh on Mar 16, 2024 09:30");
              return approvals.join("\n") + "\nAwaiting approval from SC Planning team";
            }
            if (status.includes('APPROVAL PENDING ON QUALITY')) {
              approvals.push("Approved by Kshitij on Mar 16, 2024 13:30");
              approvals.push("Approved by Satyam on Mar 16, 2024 14:30");
              return approvals.join("\n") + "\nAwaiting approval from Quality team";
            }
            
            // All approved
            if (status.includes('REQUEST APPROVED') || status.includes('ALL APPROVALS DONE')) {
              return "Approved by Kshitij on Mar 16, 2024 13:30\nApproved by Rajesh on Mar 16, 2024 09:30\nApproved by Satyam on Mar 16, 2024 14:30";
            }
            
            return "";
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
      case "upcoming": return "text-muted-foreground/50";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800";
      case "pending": return "bg-amber-100 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-600";
      case "rejected": return "bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-800";
      case "upcoming": return "bg-muted/20 border border-muted/30 opacity-50";
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
    if (request.requestId === 'REQ_142') {
      return status === "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & SC PLANNING";
    }
    if (request.requestId === 'REQ_125' || request.requestId === 'REQ_021') {
      return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY";
    }
    if (request.requestId === 'REQ_088') {
      return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY";
    }
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
    if (request.requestId === 'REQ_142') {
      return status === "RECIPE SUBMITTED BY CHEF, PENDING APPROVAL ON CATEGORY & SC PLANNING";
    }
    if (request.requestId === 'REQ_125' || request.requestId === 'REQ_021') {
      return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY";
    }
    if (request.requestId === 'REQ_088') {
      return status === "REQUEST CREATED, APPROVAL PENDING ON CATEGORY";
    }
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
        <Card className="border-2 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
            <CardTitle className="text-2xl">Request Workflow</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <div className="space-y-2">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isPending = step.status === 'pending';
                const isCompleted = step.status === 'completed';
                const isUpcoming = step.status === 'upcoming';
                const isRejected = step.status === 'rejected';
                
                return (
                  <div key={index} className="relative">
                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <div 
                        className={`absolute left-8 top-20 w-1 h-12 -mb-12 transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-400 dark:bg-emerald-500' : 
                          isPending ? 'bg-gradient-to-b from-amber-400 to-muted/30 dark:from-amber-500' : 
                          'bg-muted/30'
                        }`}
                      />
                    )}
                    
                    {/* Step Card */}
                    <div className={`relative flex items-start gap-6 p-6 rounded-xl transition-all duration-300 ${
                      isPending ? 'bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-400 dark:border-amber-600 shadow-lg scale-[1.02] ring-4 ring-amber-200/50 dark:ring-amber-900/30' :
                      isCompleted ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/50' :
                      isRejected ? 'bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-800/50' :
                      'bg-muted/20 border border-muted/40 opacity-60'
                    }`}>
                      {/* Icon Circle */}
                      <div className={`relative shrink-0 flex items-center justify-center rounded-full transition-all duration-300 ${
                        isPending ? 'w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-400/50' :
                        isCompleted ? 'w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-md' :
                        isRejected ? 'w-14 h-14 bg-gradient-to-br from-red-400 to-red-500 shadow-md' :
                        'w-14 h-14 bg-muted/40 border-2 border-muted/60'
                      }`}>
                        <IconComponent className={`transition-all duration-300 ${
                          isPending ? 'h-8 w-8 text-white animate-pulse' :
                          isCompleted ? 'h-7 w-7 text-white' :
                          isRejected ? 'h-7 w-7 text-white' :
                          'h-6 w-6 text-muted-foreground/40'
                        }`} />
                        
                        {/* Pulse ring for pending */}
                        {isPending && (
                          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className={`font-bold mb-2 transition-all duration-300 ${
                          isPending ? 'text-xl text-amber-900 dark:text-amber-100' :
                          isCompleted ? 'text-lg text-emerald-800 dark:text-emerald-200' :
                          isRejected ? 'text-lg text-red-800 dark:text-red-200' :
                          'text-base text-muted-foreground/50'
                        }`}>
                          {step.title}
                        </h3>
                        
                        {step.description && (
                          <div className={`text-sm space-y-1 transition-all duration-300 ${
                            isPending ? 'text-amber-800 dark:text-amber-200 font-medium' :
                            isCompleted ? 'text-emerald-700 dark:text-emerald-300' :
                            isRejected ? 'text-red-700 dark:text-red-300' :
                            'text-muted-foreground/40'
                          }`}>
                            {step.description.split('\n').map((line, i) => (
                              <p key={i} className={i > 0 ? 'font-semibold' : ''}>
                                {line}
                              </p>
                            ))}
                          </div>
                        )}
                        
                        {!step.description && isUpcoming && (
                          <p className="text-sm text-muted-foreground/40 italic">
                            Awaiting previous steps
                          </p>
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="shrink-0 pt-1">
                        {isPending && (
                          <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1 shadow-md">
                            IN PROGRESS
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-3 py-1">
                            COMPLETED
                          </Badge>
                        )}
                        {isRejected && (
                          <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1">
                            REJECTED
                          </Badge>
                        )}
                        {isUpcoming && (
                          <Badge variant="outline" className="border-muted/40 text-muted-foreground/40 px-3 py-1">
                            PENDING
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {(canApprove(request.currentStatus) || canExecute(request.currentStatus) || canMarkLive(request.currentStatus) || canReject(request.currentStatus)) && (
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Available Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex gap-4 flex-wrap">
                {canApprove(request.currentStatus) && (
                  <Button 
                    onClick={handleApprove}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                    size="lg"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve
                  </Button>
                )}
                {canExecute(request.currentStatus) && (
                  <Button 
                    onClick={handleExecute}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    size="lg"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {request.requestType === "NEW SIZE CODE" ? "Update Extra Topping Master" : "Execute"}
                  </Button>
                )}
                {canMarkLive(request.currentStatus) && (
                  <Button 
                    onClick={handleMarkLive}
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                    size="lg"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Mark LIVE
                  </Button>
                )}
                {canReject(request.currentStatus) && (
                  <Button 
                    variant="destructive"
                    onClick={() => setShowRejectForm(!showRejectForm)}
                    size="lg"
                    className="shadow-lg"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Reject
                  </Button>
                )}
              </div>
              
              {showRejectForm && (
                <div className="space-y-4 border-t pt-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Rejection Reason <span className="text-destructive">*</span></label>
                    <Textarea
                      placeholder="Please provide a reason for rejection (required)..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive"
                      onClick={handleReject}
                      size="lg"
                    >
                      Confirm Rejection
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectReason("");
                      }}
                      size="lg"
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
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Request Description</label>
              <p className="text-foreground font-medium mt-1">{request.requestDesc}</p>
            </div>
            
            {request.requestId === 'REQ_142' && (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Selected Versions</label>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li className="text-foreground font-medium">v5 All India</li>
                    <li className="text-foreground font-medium">v6 Maharashtra Only</li>
                    <li className="text-foreground font-medium">v7 Moz + Cheddar for CHD</li>
                    <li className="text-foreground font-medium">v8 BBP Doughball change</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-muted-foreground">Products</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowProducts(!showProducts)}
                      className="text-primary hover:text-primary/80"
                    >
                      {showProducts ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide Products
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          View 12 Products
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-foreground font-medium mt-1">12 Products added</p>
                  
                  {showProducts && request.products && (
                    <div className="mt-4 border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Menu Code</TableHead>
                            <TableHead>Menu Category Code</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Size Code</TableHead>
                            <TableHead>Size Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {request.products.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{product.menuCode}</TableCell>
                              <TableCell>{product.menuCategoryCode}</TableCell>
                              <TableCell>{product.description}</TableCell>
                              <TableCell>{product.sizeCode}</TableCell>
                              <TableCell>{product.sizeDescription}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {request.requestId === 'REQ_125' && (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Selected Versions</label>
                  <p className="text-foreground font-medium mt-1 text-primary">{request.targetVersion}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-muted-foreground">Target Stores</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowStores(!showStores)}
                      className="text-primary hover:text-primary/80"
                    >
                      {showStores ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide Stores
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          View {request.affectedStores} Stores
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-foreground font-medium mt-1">{request.affectedStores} stores selected</p>
                  
                  {showStores && request.stores && (
                    <div className="mt-4 border rounded-lg p-4 max-h-96 overflow-y-auto bg-muted/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {request.stores.map((store, index) => (
                          <div key={index} className="text-sm text-foreground p-2 hover:bg-muted/50 rounded">
                            {store}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {request.requestId === 'REQ_088' && (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-muted-foreground">Size Codes</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSizeCodes(!showSizeCodes)}
                      className="text-primary hover:text-primary/80"
                    >
                      {showSizeCodes ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide Size Codes
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          View {request.sizeCodes?.length || 3} Size Codes
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-foreground font-medium mt-1">{request.sizeCodes?.length || 3} size codes added</p>
                  
                  {showSizeCodes && request.sizeCodes && (
                    <div className="mt-4 border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Size Code</TableHead>
                            <TableHead>Size Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {request.sizeCodes.map((sizeCode, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{sizeCode.code}</TableCell>
                              <TableCell>{sizeCode.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {request.requestId === 'REQ_021' && (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Selected Versions</label>
                  <p className="text-foreground font-medium mt-1">v10 Moz change for CHD stores</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Target Version</label>
                  <p className="text-foreground font-medium mt-1 text-primary">v5 All India Stores</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Remarks</label>
                  <p className="text-foreground font-medium mt-1">Rolling back the CHD Moz SCC expriment. Mapping all its stores to parent: v5 version</p>
                </div>
              </>
            )}
            
            {request.requestId !== 'REQ_142' && request.requestId !== 'REQ_125' && request.requestId !== 'REQ_088' && request.requestId !== 'REQ_021' && (
              <>
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
              </>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Requested By</label>
                <p className="text-foreground font-medium mt-1">
                  {request.requestId === 'REQ_125' || request.requestId === 'REQ_088' || request.requestId === 'REQ_021'
                    ? 'Varun' 
                    : `${request.requestedBy} on ${format(new Date(request.requestCreatedDate), 'MMM dd, yyyy, h:mma')}`}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created On</label>
                <p className="text-foreground font-medium mt-1">
                  {request.requestId === 'REQ_125' ? 'Mar 15, 2025, 9:45PM' : 
                   request.requestId === 'REQ_088' ? 'Mar 13, 2025 21:45' :
                   request.requestId === 'REQ_021' ? 'Mar 10, 2025, 9:45PM' :
                   format(new Date(request.requestCreatedDate), 'MMM dd, yyyy, h:mma')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
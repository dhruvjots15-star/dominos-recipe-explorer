import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { mockDashboardRequestsData, DashboardRequest } from "@/data/dashboardRequestsData";

interface PendingRequestsWidgetProps {
  className?: string;
}

export const PendingRequestsWidget = ({ className }: PendingRequestsWidgetProps) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Filter for pending requests (not LIVE or REJECTED)
  const pendingRequests = mockDashboardRequestsData.filter(request => 
    request.currentStatus !== 'LIVE' && request.currentStatus !== 'REJECTED'
  );

  const displayedRequests = showAll ? pendingRequests : pendingRequests.slice(0, 5);

  const getStatusColor = (status: string) => {
    return 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800';
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const handleRowClick = (requestId: string) => {
    navigate(`/recipe-request/${requestId}`);
  };

  return (
    <div className={className}>
      <Card className="border-none bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Pending Requests on Team</CardTitle>
                <p className="text-muted-foreground">Requests currently awaiting action from your team</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-lg">
                <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {pendingRequests.length}
                </span>
                <span className="text-sm text-amber-600 dark:text-amber-400">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No pending requests on your team</p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="rounded-lg border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold w-32">
                        <div className="h-auto p-0 font-semibold justify-start gap-1">
                          Request ID
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold min-w-[300px]">Request Desc</TableHead>
                      <TableHead className="font-semibold w-36">Request Type</TableHead>
                      <TableHead className="font-semibold w-40">Requested By</TableHead>
                      <TableHead className="font-semibold w-48">
                        <div className="h-auto p-0 font-semibold justify-start gap-1">
                          Request Created Date
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold w-64">Current Status</TableHead>
                      <TableHead className="font-semibold w-48">Go Live Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedRequests.map((request) => (
                      <TableRow 
                        key={request.requestId}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleRowClick(request.requestId)}
                      >
                        <TableCell className="font-medium text-primary w-32">
                          {request.requestId}
                        </TableCell>
                        <TableCell className="min-w-[300px]">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="line-clamp-2 leading-tight">
                                  {request.requestDesc}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-md">
                                <p>{request.requestDesc}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="w-36">
                          <Badge 
                            variant="outline"
                            className={`text-xs leading-tight text-center ${
                              request.requestType === 'NEW RECIPE' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800' 
                                : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800'
                            }`}
                          >
                            {request.requestType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium w-40">{request.requestedBy}</TableCell>
                        <TableCell className="text-sm text-muted-foreground w-48">
                          {formatDate(request.requestCreatedDate)}
                        </TableCell>
                        <TableCell className="w-64">
                          <Badge 
                            className={`text-xs whitespace-nowrap ${getStatusColor(request.currentStatus)}`}
                            variant="outline"
                          >
                            {request.currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground w-48">
                          {request.goLiveDate ? formatDate(request.goLiveDate) : '—'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* View All Button */}
              {pendingRequests.length > 5 && !showAll && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAll(true)}
                  >
                    View All Pending Requests
                  </Button>
                </div>
              )}

              {showAll && pendingRequests.length > 5 && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="ghost"
                    onClick={() => setShowAll(false)}
                  >
                    Show Less
                  </Button>
                </div>
              )}

              {/* Results Summary */}
              <div className="text-sm text-muted-foreground text-center">
                Showing {displayedRequests.length} of {pendingRequests.length} pending requests
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
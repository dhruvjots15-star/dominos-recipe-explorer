import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Users, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { mockDashboardRequestsData, DashboardRequest } from "@/data/dashboardRequestsData";
import { getRequestTypeVariant } from "@/utils/requestTypeUtils";
import { useTeamView } from "@/contexts/TeamViewContext";

interface PendingRequestsWidgetProps {
  className?: string;
}

type SortField = 'requestId' | 'requestCreatedDate';
type SortDirection = 'asc' | 'desc';

export const PendingRequestsWidget = ({ className }: PendingRequestsWidgetProps) => {
  const navigate = useNavigate();
  const { currentTeam } = useTeamView();
  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState<SortField>('requestCreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filter for pending requests (not LIVE or REJECTED) and by current team
  const pendingRequests = mockDashboardRequestsData.filter(request => 
    request.currentStatus !== 'LIVE' && 
    request.currentStatus !== 'REJECTED' &&
    request.pendingOnTeam === currentTeam
  );

  // Apply sorting
  const sortedPendingRequests = [...pendingRequests].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'requestId':
        aValue = a.requestId;
        bValue = b.requestId;
        break;
      case 'requestCreatedDate':
        aValue = new Date(a.requestCreatedDate).getTime();
        bValue = new Date(b.requestCreatedDate).getTime();
        break;
      default:
        return 0;
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const displayedRequests = showAll ? sortedPendingRequests : sortedPendingRequests.slice(0, 5);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-primary" /> : 
      <ArrowDown className="w-4 h-4 text-primary" />;
  };

  const getStatusColor = (status: string) => {
    return 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800';
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const handleRowClick = (requestId: string) => {
    navigate(`/recipe-request/${requestId}?source=dashboard`);
  };

  return (
    <div className={className}>
      <Card className="border-2 border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/50 dark:via-amber-950/50 dark:to-orange-950/50 shadow-lg">
        {/* Prominent Count Section */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-orange-700 dark:via-amber-700 dark:to-orange-800 px-8 py-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                <Clock className="w-9 h-9 text-white" />
              </div>
              <div>
                <h2 className="text-white text-3xl font-bold mb-1">Pending Requests</h2>
                <p className="text-white/90 text-sm font-medium">Awaiting action from {currentTeam}</p>
              </div>
            </div>
            
            {/* Large Prominent Count */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl px-8 py-5 shadow-xl border-4 border-white/40 dark:border-slate-700">
              <div className="text-center">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 leading-none mb-1">
                  {pendingRequests.length}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="pt-6 space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">All Clear!</h3>
              <p className="text-muted-foreground">No pending requests on your team at the moment</p>
            </div>
          ) : (
            <>
              {/* Subtitle for table section */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1 w-1 rounded-full bg-orange-500"></div>
                <h3 className="text-lg font-semibold text-foreground">Request Details</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent dark:from-orange-800"></div>
              </div>
              
              {/* Table */}
              <div className="rounded-xl border-2 border-orange-100 dark:border-orange-900 bg-background shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold w-32">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('requestId')}
                          className="h-auto p-0 font-semibold justify-start gap-1 whitespace-nowrap"
                        >
                          Request ID
                          {getSortIcon('requestId')}
                        </Button>
                      </TableHead>
                      <TableHead className="font-semibold min-w-[300px]">Request Desc</TableHead>
                      <TableHead className="font-semibold w-36">Request Type</TableHead>
                      <TableHead className="font-semibold w-40">Requested By</TableHead>
                      <TableHead className="font-semibold w-48">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort('requestCreatedDate')}
                          className="h-auto p-0 font-semibold justify-start gap-1 whitespace-nowrap"
                        >
                          Request Created Date
                          {getSortIcon('requestCreatedDate')}
                        </Button>
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
                          <Badge variant={getRequestTypeVariant(request.requestType) as any}>
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
              <div className="flex items-center justify-between pt-4 border-t border-orange-100 dark:border-orange-900">
                <div className="text-sm font-medium text-muted-foreground">
                  Showing <span className="text-orange-600 dark:text-orange-400 font-bold">{displayedRequests.length}</span> of <span className="text-orange-600 dark:text-orange-400 font-bold">{sortedPendingRequests.length}</span> pending requests
                </div>
                
                {sortedPendingRequests.length > 5 && (
                  <Button 
                    variant={showAll ? "ghost" : "default"}
                    onClick={() => setShowAll(!showAll)}
                    className={!showAll ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700" : ""}
                  >
                    {showAll ? "Show Less" : `View All ${sortedPendingRequests.length} Requests`}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Filter, ArrowUpDown, ArrowUp, ArrowDown, FileText } from "lucide-react";
import { format } from "date-fns";
import { mockRequestsData, RecipeRequest } from "@/data/requestsData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface RequestsTableProps {
  className?: string;
}

type SortField = 'requestId' | 'requestCreatedDate' | 'goLiveDate';
type SortDirection = 'asc' | 'desc';

export const RequestsTable = ({ className }: RequestsTableProps) => {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<SortField>('requestCreatedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Filter states
  const [filters, setFilters] = useState({
    createdAfter: '',
    createdBefore: '',
    goLiveAfter: '', 
    goLiveBefore: '',
    status: 'all'
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'REQUEST CREATED, APPROVAL PENDING ON CATEGORY':
        return 'secondary';
      case 'REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)':
        return 'default';
      case 'REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE':
        return 'outline';
      case 'REQUEST LIVE, VERSION EXTENDED TO STORES':
      case 'REQUEST LIVE, VERSION ROLLED BACK':
        return 'default';
      case 'REJECTED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUEST CREATED, APPROVAL PENDING ON CATEGORY':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30';
      case 'REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30';
      case 'REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE':
        return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30';
      case 'REQUEST LIVE, VERSION EXTENDED TO STORES':
      case 'REQUEST LIVE, VERSION ROLLED BACK':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30';
      case 'REJECTED':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30';
      default:
        return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950/30';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const applyFilters = (requests: RecipeRequest[]): RecipeRequest[] => {
    return requests.filter(request => {
      // Status filter
      if (filters.status !== 'all' && request.currentStatus !== filters.status) {
        return false;
      }

      // Created date filters
      if (filters.createdAfter) {
        const createdDate = new Date(request.requestCreatedDate);
        const afterDate = new Date(filters.createdAfter);
        if (createdDate < afterDate) return false;
      }

      if (filters.createdBefore) {
        const createdDate = new Date(request.requestCreatedDate);
        const beforeDate = new Date(filters.createdBefore);
        if (createdDate > beforeDate) return false;
      }

      // Go live date filters
      if (filters.goLiveAfter && request.goLiveDate) {
        const goLiveDate = new Date(request.goLiveDate);
        const afterDate = new Date(filters.goLiveAfter);
        if (goLiveDate < afterDate) return false;
      }

      if (filters.goLiveBefore && request.goLiveDate) {
        const goLiveDate = new Date(request.goLiveDate);
        const beforeDate = new Date(filters.goLiveBefore);
        if (goLiveDate > beforeDate) return false;
      }

      return true;
    });
  };

  const applySorting = (requests: RecipeRequest[]): RecipeRequest[] => {
    return [...requests].sort((a, b) => {
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
        case 'goLiveDate':
          aValue = a.goLiveDate ? new Date(a.goLiveDate).getTime() : 0;
          bValue = b.goLiveDate ? new Date(b.goLiveDate).getTime() : 0;
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
  };

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

  const clearFilters = () => {
    setFilters({
      createdAfter: '',
      createdBefore: '',
      goLiveAfter: '',
      goLiveBefore: '',
      status: 'all'
    });
  };

  const filteredAndSortedRequests = applySorting(applyFilters(mockRequestsData));
  const displayedRequests = filteredAndSortedRequests.slice(0, displayCount);
  const hasMoreRequests = filteredAndSortedRequests.length > displayCount;

  const handleRowClick = (requestId: string) => {
    navigate(`/recipe-request/${requestId}`);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  return (
    <div className={className}>
      <Card className="border-none bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Recent Requests</CardTitle>
                <p className="text-muted-foreground">Extend and Rollback requests for recipe versions</p>
              </div>
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
              size="sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Request Created Date</Label>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="createdAfter" className="text-xs text-muted-foreground">After</Label>
                      <Input
                        id="createdAfter"
                        type="date"
                        value={filters.createdAfter}
                        onChange={(e) => setFilters(prev => ({ ...prev, createdAfter: e.target.value }))}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="createdBefore" className="text-xs text-muted-foreground">Before</Label>
                      <Input
                        id="createdBefore"
                        type="date"
                        value={filters.createdBefore}
                        onChange={(e) => setFilters(prev => ({ ...prev, createdBefore: e.target.value }))}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Go Live Date</Label>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="goLiveAfter" className="text-xs text-muted-foreground">After</Label>
                      <Input
                        id="goLiveAfter"
                        type="date"
                        value={filters.goLiveAfter}
                        onChange={(e) => setFilters(prev => ({ ...prev, goLiveAfter: e.target.value }))}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="goLiveBefore" className="text-xs text-muted-foreground">Before</Label>
                      <Input
                        id="goLiveBefore"
                        type="date"
                        value={filters.goLiveBefore}
                        onChange={(e) => setFilters(prev => ({ ...prev, goLiveBefore: e.target.value }))}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="REQUEST CREATED, APPROVAL PENDING ON CATEGORY">Approval Pending</SelectItem>
                      <SelectItem value="REQUEST APPROVED BY CATEGORY, PENDING EXECUTION ON MDM(POS)">Execution Pending</SelectItem>
                      <SelectItem value="REQUEST EXECUTED BY MDM(POS), PENDING GO LIVE">Go Live Pending</SelectItem>
                      <SelectItem value="REQUEST LIVE, VERSION EXTENDED TO STORES">Extended Live</SelectItem>
                      <SelectItem value="REQUEST LIVE, VERSION ROLLED BACK">Rolled Back Live</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full text-xs">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Table */}
          <div className="rounded-lg border bg-background">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold w-32">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('requestId')}
                      className="h-auto p-0 font-semibold justify-start gap-1"
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
                      className="h-auto p-0 font-semibold justify-start gap-1"
                    >
                      Request Created Date
                      {getSortIcon('requestCreatedDate')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold w-64">Current Status</TableHead>
                  <TableHead className="font-semibold w-48">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('goLiveDate')}
                      className="h-auto p-0 font-semibold justify-start gap-1"
                    >
                      Go Live Date
                      {getSortIcon('goLiveDate')}
                    </Button>
                  </TableHead>
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
                        className={`text-xs whitespace-nowrap ${
                          request.requestType === 'RECIPE VERSION EXTEND' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800' 
                            : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800'
                        }`}
                      >
                        {request.requestType === 'RECIPE VERSION EXTEND' ? 'EXTEND' : 'ROLLBACK'}
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

          {/* Load More */}
          {hasMoreRequests && (
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline"
                onClick={() => setDisplayCount(prev => prev + 10)}
              >
                View More
              </Button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground text-center">
            Showing {displayedRequests.length} of {filteredAndSortedRequests.length} requests
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
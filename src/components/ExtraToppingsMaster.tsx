import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Filter, FileText, ArrowUpDown, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { extraToppingsData, extraToppingRequests, ExtraTopping, ExtraToppingRequest } from "@/data/extraToppingsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { getStatusVariant } from "@/utils/requestTypeUtils";

type SortField = "requestId" | "requestCreatedDate";
type SortDirection = "asc" | "desc";

export const ExtraToppingsMaster = () => {
  const navigate = useNavigate();
  const [visibleRequests, setVisibleRequests] = useState(5);
  const [sortField, setSortField] = useState<SortField>("requestCreatedDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    createdAfter: '',
    createdBefore: '',
    status: 'all'
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const applyFilters = (requests: typeof extraToppingRequests) => {
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

      return true;
    });
  };

  const applySorting = (requests: typeof extraToppingRequests) => {
    return [...requests].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'requestId':
          aValue = a.id;
          bValue = b.id;
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
      status: 'all'
    });
  };

  const filteredAndSortedRequests = applySorting(applyFilters(extraToppingRequests));
  const displayedRequests = filteredAndSortedRequests.slice(0, visibleRequests);
  const hasMoreRequests = filteredAndSortedRequests.length > visibleRequests;
  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  const handleRowClick = (requestId: string) => {
    navigate(`/recipe-request/${requestId}?source=extra-toppings&showToast=false`);
  };

  const filteredToppings = extraToppingsData.filter((topping) => {
    const search = searchTerm.toLowerCase();
    return (
      topping.sizeCode.toLowerCase().includes(search) ||
      topping.description.toLowerCase().includes(search) ||
      topping.inventoryCode.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Extra Toppings Portion Master
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage and maintain Extra Topping portions for all sizes
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                Active Toppings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">21</div>
              <p className="text-sm text-muted-foreground">Currently configured toppings</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                Last Modified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold text-foreground mb-1">March 15, 2024 2:30 PM</div>
              <p className="text-sm text-muted-foreground">Modified by Shamsher (Chef Team)</p>
            </CardContent>
          </Card>
        </div>

        {/* All Extra Topping Requests Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">All Extra Topping Requests</h2>
          <Card className="border-none bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Request History</CardTitle>
                    <p className="text-muted-foreground">Extra topping portion requests</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
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
                      <Label className="text-sm font-medium">Status</Label>
                      <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="REQUEST CREATED, APPROVAL PENDING">Approval Pending</SelectItem>
                          <SelectItem value="REQUEST APPROVED, PENDING ON CHEF">Pending on Chef</SelectItem>
                          <SelectItem value="EXTRA TOPPING MASTER UPDATED">Updated</SelectItem>
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
                      <TableHead className="font-semibold w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedRequests.map((request) => (
                      <TableRow 
                        key={request.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleRowClick(request.id)}
                      >
                        <TableCell className="font-medium text-primary w-32">
                          {request.id}
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
                          <Badge variant="newSizeCode">
                            {request.requestType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium w-40">{request.requestedBy}</TableCell>
                        <TableCell className="text-sm text-muted-foreground w-48">
                          {formatDate(request.requestCreatedDate)}
                        </TableCell>
                        <TableCell className="w-64">
                          <Badge variant={getStatusVariant(request.currentStatus)}>
                            {request.currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-12">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
                    onClick={() => setVisibleRequests(prev => prev + 10)}
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

        {/* Extra Toppings Portion Master Table Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Extra Toppings Portion Master Table</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Extra Toppings</CardTitle>
                <Input
                  placeholder="Search by Size Code, Description, or Inventory Code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Size Code</TableHead>
                      <TableHead className="font-semibold">Description</TableHead>
                      <TableHead className="font-semibold">Inventory Code</TableHead>
                      <TableHead className="font-semibold text-center">Number of Toppings</TableHead>
                      <TableHead className="font-semibold text-center">Light Amount</TableHead>
                      <TableHead className="font-semibold text-center">Single Amount</TableHead>
                      <TableHead className="font-semibold text-center">Extra Amount</TableHead>
                      <TableHead className="font-semibold text-center">Double Amount</TableHead>
                      <TableHead className="font-semibold text-center">Triple Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredToppings.map((topping, index) => (
                      <TableRow key={`${topping.sizeCode}-${topping.inventoryCode}-${index}`}>
                        <TableCell className="font-medium">{topping.sizeCode}</TableCell>
                        <TableCell>{topping.description}</TableCell>
                        <TableCell>{topping.inventoryCode}</TableCell>
                        <TableCell className="text-center">{topping.numberOfToppings}</TableCell>
                        <TableCell className="text-center">{topping.lightAmount}</TableCell>
                        <TableCell className="text-center">{topping.singleAmount}</TableCell>
                        <TableCell className="text-center">{topping.extraAmount}</TableCell>
                        <TableCell className="text-center">{topping.doubleAmount}</TableCell>
                        <TableCell className="text-center">{topping.tripleAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

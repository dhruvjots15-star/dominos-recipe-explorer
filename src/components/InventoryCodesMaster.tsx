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
import { Users, Calendar, Filter, FileText, ArrowUpDown, ArrowUp, ArrowDown, Eye, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { format } from "date-fns";
import { inventoryCodesData, inventoryRequests } from "@/data/inventoryCodesData";
import { getStatusVariant } from "@/utils/requestTypeUtils";
import { toast } from "sonner";

export const InventoryCodesMaster = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleRequests, setVisibleRequests] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<'requestId' | 'requestCreatedDate'>('requestCreatedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter states
  const [filters, setFilters] = useState({
    createdAfter: '',
    createdBefore: '',
    status: 'all'
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const applyFilters = (requests: typeof inventoryRequests) => {
    return requests.filter(request => {
      if (filters.status !== 'all' && request.currentStatus !== filters.status) {
        return false;
      }

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

  const applySorting = (requests: typeof inventoryRequests) => {
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

  const handleSort = (field: 'requestId' | 'requestCreatedDate') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: 'requestId' | 'requestCreatedDate') => {
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

  const filteredAndSortedRequests = applySorting(applyFilters(inventoryRequests));
  const displayedRequests = filteredAndSortedRequests.slice(0, visibleRequests);
  const hasMoreRequests = filteredAndSortedRequests.length > visibleRequests;
  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  const handleRowClick = (requestId: string) => {
    navigate(`/recipe-request/${requestId}?source=inventory-codes&showToast=false`);
  };

  const filteredInventory = inventoryCodesData.filter((item) => {
    const search = searchQuery.toLowerCase();
    return (
      item.inventoryCode.toLowerCase().includes(search) ||
      item.inventoryDescription.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Inventory Codes Master
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage and maintain Inventory Items for all products
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/inventory-codes/add-new")}>
                Add a New Inventory Item
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Modify functionality coming soon")}>
                Modify an Existing Inventory Item
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                Active Inventory Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">214</div>
              <p className="text-sm text-muted-foreground">Currently configured</p>
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
              <p className="text-sm text-muted-foreground">Modified by Satyam (SC Planning Team)</p>
            </CardContent>
          </Card>
        </div>

        {/* All Inventory Requests Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">All Inventory Requests</h2>
          <Card className="border-none bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Request History</CardTitle>
                    <p className="text-muted-foreground">Inventory code creation and modification requests</p>
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
                          <SelectItem value="REQUEST APPROVED, PENDING ON SC PLANNING">Pending on SC Planning</SelectItem>
                          <SelectItem value="INVENTORY MASTER UPDATED">Updated</SelectItem>
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

        {/* Inventory Code Master Table Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Inventory Code Master Table</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Inventory Items</CardTitle>
                <Input
                  placeholder="Search by Inventory Code or Description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-background overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Inventory_Code</TableHead>
                      <TableHead className="font-semibold min-w-[300px]">Inventory Description</TableHead>
                      <TableHead className="font-semibold text-center">New_Portion_Unit</TableHead>
                      <TableHead className="font-semibold text-center">order_unit</TableHead>
                      <TableHead className="font-semibold text-center">count_unit</TableHead>
                      <TableHead className="font-semibold text-center">count_order</TableHead>
                      <TableHead className="font-semibold text-center">Old_portion_unit</TableHead>
                      <TableHead className="font-semibold text-center">OLD_portion_count</TableHead>
                      <TableHead className="font-semibold text-center">New_portion_count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.inventoryCode}>
                        <TableCell className="font-medium">{item.inventoryCode}</TableCell>
                        <TableCell>{item.inventoryDescription}</TableCell>
                        <TableCell className="text-center">{item.newPortionUnit}</TableCell>
                        <TableCell className="text-center">{item.orderUnit}</TableCell>
                        <TableCell className="text-center">{item.countUnit}</TableCell>
                        <TableCell className="text-center">{item.countOrder}</TableCell>
                        <TableCell className="text-center">{item.oldPortionUnit}</TableCell>
                        <TableCell className="text-center">{item.oldPortionCount}</TableCell>
                        <TableCell className="text-center">{item.newPortionCount}</TableCell>
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

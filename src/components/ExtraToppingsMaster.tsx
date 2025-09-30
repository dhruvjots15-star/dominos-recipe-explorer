import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Filter, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type SortField = "id" | "requestCreatedDate" | "currentStatus";
type SortDirection = "asc" | "desc";

export const ExtraToppingsMaster = () => {
  const [visibleRequests, setVisibleRequests] = useState(5);
  const [sortField, setSortField] = useState<SortField>("requestCreatedDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const sortedRequests = [...extraToppingRequests].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "id":
        comparison = a.id.localeCompare(b.id);
        break;
      case "requestCreatedDate":
        comparison = new Date(a.requestCreatedDate).getTime() - new Date(b.requestCreatedDate).getTime();
        break;
      case "currentStatus":
        comparison = a.currentStatus.localeCompare(b.currentStatus);
        break;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const filteredToppings = extraToppingsData.filter((topping) => {
    const search = searchTerm.toLowerCase();
    return (
      topping.sizeCode.toLowerCase().includes(search) ||
      topping.description.toLowerCase().includes(search) ||
      topping.inventoryCode.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Extra Toppings Portion Master</h1>
          <p className="text-muted-foreground mt-1">
            Manage and maintain Extra Topping portions for all sizes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Toppings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">21</div>
            <p className="text-xs text-muted-foreground mt-1">Currently configured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Modified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">March 15, 2024 2:30 PM</div>
            <p className="text-xs text-muted-foreground mt-1">Modified by Shamsher (Chef Team)</p>
          </CardContent>
        </Card>
      </div>

      {/* All Extra Topping Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">All Extra Topping Requests</h2>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    Request ID {getSortIcon("id")}
                  </TableHead>
                  <TableHead>Request Description</TableHead>
                  <TableHead>Size Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Inventory Code</TableHead>
                  <TableHead>Request Type</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("requestCreatedDate")}
                  >
                    Created Date {getSortIcon("requestCreatedDate")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("currentStatus")}
                  >
                    Status {getSortIcon("currentStatus")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRequests.slice(0, visibleRequests).map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.requestDesc}</TableCell>
                    <TableCell>{request.sizeCode}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>{request.inventoryCode}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.requestType}</Badge>
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{new Date(request.requestCreatedDate).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        request.currentStatus.includes("PENDING") ? "secondary" :
                        request.currentStatus.includes("APPROVED") ? "default" :
                        request.currentStatus.includes("UPDATED") ? "default" :
                        "destructive"
                      }>
                        {request.currentStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {visibleRequests < sortedRequests.length && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setVisibleRequests(prev => prev + 5)}
                >
                  View More
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Extra Toppings Portion Master Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Extra Toppings Portion Master Table</h2>
        </div>

        <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">All Extra Toppings</CardTitle>
                <div className="flex gap-2 items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by Size Code, Description, or Inventory Code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                      {filterOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  Use the search box to filter by Size Code, Description, or Inventory Code
                </div>
              </CardContent>
            </CollapsibleContent>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Inventory Code</TableHead>
                      <TableHead className="text-center">Number of Toppings</TableHead>
                      <TableHead className="text-center">Light Amount</TableHead>
                      <TableHead className="text-center">Single Amount</TableHead>
                      <TableHead className="text-center">Extra Amount</TableHead>
                      <TableHead className="text-center">Double Amount</TableHead>
                      <TableHead className="text-center">Triple Amount</TableHead>
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
        </Collapsible>
      </div>
    </div>
  );
};

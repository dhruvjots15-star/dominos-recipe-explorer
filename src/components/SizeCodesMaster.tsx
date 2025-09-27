import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Plus, Eye } from "lucide-react";
import { sizeCodesData, sizeCodeRequests } from "@/data/sizeCodesData";
import { CreateSizeCode } from "./CreateSizeCode";
import { RequestLanding } from "./RequestLanding";

export const SizeCodesMaster = () => {
  const [currentView, setCurrentView] = useState<"master" | "create" | "request">("master");
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [visibleRequests, setVisibleRequests] = useState(5);

  const handleViewRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setCurrentView("request");
  };

  const loadMoreRequests = () => {
    setVisibleRequests(prev => Math.min(prev + 10, sizeCodeRequests.length));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "REQUEST CREATED, APPROVAL PENDING":
        return "secondary";
      case "REQUEST APPROVED, PENDING ON CHEF":
        return "default";
      case "EXTRA TOPPING MASTER UPDATE REQUEST SUBMITTED BY CHEF":
        return "outline";
      case "EXTRA TOPPING MASTER UPDATED":
        return "default";
      case "REJECTED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (currentView === "create") {
    return <CreateSizeCode onBack={() => setCurrentView("master")} />;
  }

  if (currentView === "request") {
    const request = sizeCodeRequests.find(req => req.id === selectedRequestId);
    return (
      <RequestLanding 
        request={request} 
        onBack={() => setCurrentView("master")} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Size Codes Master
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage and maintain size code configurations for all pizza crusts and variants
            </p>
          </div>
          <Button 
            onClick={() => setCurrentView("create")}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Size Code
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                Active Size Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">{sizeCodesData.length}</div>
              <p className="text-sm text-muted-foreground">Currently configured size codes</p>
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
              <p className="text-sm text-muted-foreground">Modified by Kshitij (Category Team)</p>
            </CardContent>
          </Card>
        </div>

        {/* All Size Code Requests Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">All Size Code Requests</h2>
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Request Desc</TableHead>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Request Created Date</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeCodeRequests.slice(0, visibleRequests).map((request) => (
                    <TableRow 
                      key={request.id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleViewRequest(request.id)}
                    >
                      <TableCell className="font-medium text-primary">{request.id}</TableCell>
                      <TableCell>{request.requestDesc}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {request.requestType}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{new Date(request.requestCreatedDate).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(request.currentStatus)}>
                          {request.currentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewRequest(request.id);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {visibleRequests < sizeCodeRequests.length && (
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={loadMoreRequests}>
                    View More
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Size Codes Master Table Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Size Codes Master Table</h2>
          <Card>
            <CardHeader>
              <CardTitle>All Size Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sizeCodesData.map((sizeCode) => (
                    <TableRow key={sizeCode.sizeCode}>
                      <TableCell className="font-medium text-primary">{sizeCode.sizeCode}</TableCell>
                      <TableCell>{sizeCode.description}</TableCell>
                      <TableCell className="text-muted-foreground">{sizeCode.remarks || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
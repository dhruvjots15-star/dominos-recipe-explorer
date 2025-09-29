import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { DashboardTable } from "@/components/DashboardTable";
import { PendingRequestsWidget } from "@/components/PendingRequestsWidget";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      // Already on dashboard, do nothing
      return;
    } else if (tab === "recipe-bank") {
      navigate("/recipe-bank");
    } else if (tab === "size-codes") {
      navigate("/size-codes");
    }
  };

  return (
    <div className="min-h-screen">
      <TopNavigation activeTab="dashboard" onTabChange={handleTabChange} />
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Central view of all requests and their current status
            </p>
          </div>
          
          <div className="space-y-8">
            <PendingRequestsWidget />
            <DashboardTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
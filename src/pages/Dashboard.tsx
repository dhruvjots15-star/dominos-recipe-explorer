import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { DashboardTable } from "@/components/DashboardTable";
import { PendingRequestsWidget } from "@/components/PendingRequestsWidget";
import { CreateNewRequestDropdown } from "@/components/CreateNewRequestDropdown";
import { useTeamView } from "@/contexts/TeamViewContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentTeam } = useTeamView();

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      // Already on dashboard, do nothing
      return;
    } else if (tab === "recipe-bank") {
      navigate("/recipe-bank");
    } else if (tab === "size-codes") {
      navigate("/size-codes");
    } else if (tab === "extra-toppings") {
      navigate("/extra-toppings");
    } else if (tab === "inventory-codes") {
      navigate("/inventory-codes");
    }
  };

  return (
    <div className="min-h-screen">
      <TopNavigation activeTab="dashboard" onTabChange={handleTabChange} />
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="w-full px-4 py-8 max-w-[95%] mx-auto">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Central view of all requests and their current status
              </p>
            </div>
            {currentTeam === "Category Team" && <CreateNewRequestDropdown />}
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
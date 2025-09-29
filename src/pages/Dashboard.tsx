import { DashboardTable } from "@/components/DashboardTable";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Central view of all requests and their current status
          </p>
        </div>
        
        <DashboardTable />
      </div>
    </div>
  );
};

export default Dashboard;
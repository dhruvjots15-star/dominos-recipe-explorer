import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RecipeMaster } from "@/components/RecipeMaster";
import { SizeCodesMaster } from "@/components/SizeCodesMaster";
import { TopNavigation } from "@/components/TopNavigation";

interface IndexProps {
  activeTab?: string;
}

const Index = ({ activeTab: propActiveTab }: IndexProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = propActiveTab || (location.pathname === "/size-codes" ? "size-codes" : "recipe-bank");

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "recipe-bank") {
      navigate("/recipe-bank");
    } else if (tab === "size-codes") {
      navigate("/size-codes");
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "recipe-bank":
        return <RecipeMaster />;
      case "size-codes":
        return <SizeCodesMaster />;
      default:
        return <RecipeMaster />;
    }
  };

  return (
    <div className="min-h-screen">
      <TopNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      {renderActiveTab()}
    </div>
  );
};

export default Index;

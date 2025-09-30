import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RecipeMaster } from "@/components/RecipeMaster";
import { SizeCodesMaster } from "@/components/SizeCodesMaster";
import { ExtraToppingsMaster } from "@/components/ExtraToppingsMaster";
import { TopNavigation } from "@/components/TopNavigation";

interface IndexProps {
  activeTab?: string;
}

const Index = ({ activeTab: propActiveTab }: IndexProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = propActiveTab || 
    (location.pathname === "/size-codes" ? "size-codes" : 
     location.pathname === "/extra-toppings" ? "extra-toppings" : 
     "recipe-bank");

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "recipe-bank") {
      navigate("/recipe-bank");
    } else if (tab === "size-codes") {
      navigate("/size-codes");
    } else if (tab === "extra-toppings") {
      navigate("/extra-toppings");
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "recipe-bank":
        return <RecipeMaster />;
      case "size-codes":
        return <SizeCodesMaster />;
      case "extra-toppings":
        return <ExtraToppingsMaster />;
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

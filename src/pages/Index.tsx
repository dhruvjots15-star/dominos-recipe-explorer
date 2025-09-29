import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RecipeMaster } from "@/components/RecipeMaster";
import { SizeCodesMaster } from "@/components/SizeCodesMaster";
import { TopNavigation } from "@/components/TopNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("recipe-bank");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else {
      setActiveTab(tab);
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

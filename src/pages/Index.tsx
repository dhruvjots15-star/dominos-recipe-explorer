import { useState } from "react";
import { RecipeMaster } from "@/components/RecipeMaster";
import { SizeCodesMaster } from "@/components/SizeCodesMaster";
import { TopNavigation } from "@/components/TopNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("recipe-bank");

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
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderActiveTab()}
    </div>
  );
};

export default Index;

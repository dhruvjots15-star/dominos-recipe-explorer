import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { RecipeRequestLanding } from "@/components/RecipeRequestLanding";
import { useToast } from "@/hooks/use-toast";

const RecipeRequestLandingPage = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show the success toast when the page loads
    if (requestId) {
      toast({
        title: "Request Submitted",
        description: `Request submitted: ${requestId}`,
      });
    }
  }, [requestId, toast]);

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "recipe-bank" || tab === "size-codes") {
      navigate("/");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!requestId) {
    return (
      <div className="min-h-screen">
        <TopNavigation activeTab="recipe-bank" onTabChange={handleTabChange} />
        <div className="bg-background p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Request Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested request ID was not found.</p>
            <button 
              onClick={handleBack}
              className="text-primary hover:underline"
            >
              Back to Recipe Bank
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopNavigation activeTab="recipe-bank" onTabChange={handleTabChange} />
      <RecipeRequestLanding 
        requestId={requestId} 
        onBack={handleBack}
      />
    </div>
  );
};

export default RecipeRequestLandingPage;
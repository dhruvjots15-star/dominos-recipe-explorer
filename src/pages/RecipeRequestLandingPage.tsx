import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { RecipeRequestLanding } from "@/components/RecipeRequestLanding";
import { useToast } from "@/hooks/use-toast";

const RecipeRequestLandingPage = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasShownToast, setHasShownToast] = useState(false);
  
  const source = searchParams.get('source') || 'recipe-bank';
  const showToast = searchParams.get('showToast') === 'true';

  useEffect(() => {
    // Only show toast once when explicitly requested (on creation)
    if (requestId && showToast && !hasShownToast) {
      const toastId = toast({
        title: "Request Submitted",
        description: `Request created: ${requestId}`,
        className: "bg-success text-success-foreground border-success",
        duration: 3000, // 3 seconds
      });
      setHasShownToast(true);
    }
  }, [requestId, showToast, hasShownToast, toast]);

  const handleTabChange = (tab: string) => {
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "recipe-bank" || tab === "size-codes") {
      navigate("/");
    }
  };

  const handleBack = () => {
    if (source === 'dashboard') {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  if (!requestId) {
    return (
      <div className="min-h-screen">
        <TopNavigation activeTab={source === 'dashboard' ? 'dashboard' : 'recipe-bank'} onTabChange={handleTabChange} />
        <div className="bg-background p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Request Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested request ID was not found.</p>
            <button 
              onClick={handleBack}
              className="text-primary hover:underline"
            >
              {source === 'dashboard' ? 'Back to Dashboard' : 'Back to Recipe Bank'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopNavigation activeTab={source === 'dashboard' ? 'dashboard' : 'recipe-bank'} onTabChange={handleTabChange} />
      <RecipeRequestLanding 
        requestId={requestId} 
        onBack={handleBack}
        source={source}
      />
    </div>
  );
};

export default RecipeRequestLandingPage;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RecipeRequestLandingPage from "./pages/RecipeRequestLandingPage";
import NotFound from "./pages/NotFound";
import NewRecipeRequestPage from "./pages/NewRecipeRequestPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipe-bank" element={<Index activeTab="recipe-bank" />} />
          <Route path="/size-codes" element={<Index activeTab="size-codes" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipe-request/:requestId" element={<RecipeRequestLandingPage />} />
          <Route path="/requests/new-recipe" element={<NewRecipeRequestPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

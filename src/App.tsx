import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamViewProvider } from "./contexts/TeamViewContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RecipeRequestLandingPage from "./pages/RecipeRequestLandingPage";
import NotFound from "./pages/NotFound";
import NewRecipeRequestPage from "./pages/NewRecipeRequestPage";
import ModifyRecipeRequestPage from "./pages/ModifyRecipeRequestPage";
import UpdateRecipePage from "./pages/UpdateRecipePage";
import RecipeEditorPage from "./pages/RecipeEditorPage";
import { AddNewInventoryItemForm } from "./components/AddNewInventoryItemForm";
import { ModifyInventoryItemForm } from "./components/ModifyInventoryItemForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TeamViewProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipe-bank" element={<Index activeTab="recipe-bank" />} />
          <Route path="/size-codes" element={<Index activeTab="size-codes" />} />
          <Route path="/extra-toppings" element={<Index activeTab="extra-toppings" />} />
          <Route path="/inventory-codes" element={<Index activeTab="inventory-codes" />} />
        <Route path="/inventory-codes/add-new" element={<AddNewInventoryItemForm />} />
        <Route path="/inventory-codes/modify" element={<ModifyInventoryItemForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipe-request/:requestId" element={<RecipeRequestLandingPage />} />
            <Route path="/recipe-request/:requestId/update-recipe" element={<UpdateRecipePage />} />
            <Route path="/recipe-request/:requestId/update-recipe/editor" element={<RecipeEditorPage />} />
            <Route path="/requests/new-recipe" element={<NewRecipeRequestPage />} />
            <Route path="/requests/modify-recipe" element={<ModifyRecipeRequestPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TeamViewProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

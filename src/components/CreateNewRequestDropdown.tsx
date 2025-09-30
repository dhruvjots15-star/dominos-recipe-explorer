import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { ModifyRecipeRequestForm } from "./ModifyRecipeRequestForm";

export const CreateNewRequestDropdown = () => {
  const navigate = useNavigate();
  const [showModifyRecipeForm, setShowModifyRecipeForm] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Request
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate("/requests/new-recipe")}>
            Create New Recipes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowModifyRecipeForm(true)}>
            Modify Existing Recipes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModifyRecipeRequestForm 
        open={showModifyRecipeForm} 
        onOpenChange={setShowModifyRecipeForm}
      />
    </>
  );
};
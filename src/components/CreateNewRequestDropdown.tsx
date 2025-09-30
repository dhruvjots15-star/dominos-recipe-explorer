import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { NewRecipeRequestForm } from "./NewRecipeRequestForm";
import { ModifyRecipeRequestForm } from "./ModifyRecipeRequestForm";

export const CreateNewRequestDropdown = () => {
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
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
          <DropdownMenuItem onClick={() => setShowNewRecipeForm(true)}>
            Create New Recipes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowModifyRecipeForm(true)}>
            Modify Existing Recipes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NewRecipeRequestForm 
        open={showNewRecipeForm} 
        onOpenChange={setShowNewRecipeForm}
      />
      <ModifyRecipeRequestForm 
        open={showModifyRecipeForm} 
        onOpenChange={setShowModifyRecipeForm}
      />
    </>
  );
};
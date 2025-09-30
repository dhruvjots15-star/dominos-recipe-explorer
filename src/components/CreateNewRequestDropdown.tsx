import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

export const CreateNewRequestDropdown = () => {
  const navigate = useNavigate();

  return (
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
        <DropdownMenuItem onClick={() => navigate("/requests/modify-recipe")}>
          Modify Existing Recipes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
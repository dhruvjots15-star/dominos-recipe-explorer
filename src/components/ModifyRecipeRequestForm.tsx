import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModifyRecipeRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModifyRecipeRequestForm = ({ open, onOpenChange }: ModifyRecipeRequestFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Modify Existing Recipe Request Form
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            This form will be implemented in the next phase. It will allow modification of existing recipes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
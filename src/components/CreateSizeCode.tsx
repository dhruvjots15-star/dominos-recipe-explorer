import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sizeCodesData } from "@/data/sizeCodesData";

interface SizeCodeForm {
  requestDesc: string;
  sizeCode: string;
  description: string;
  remarks: string;
}

interface CreateSizeCodeProps {
  onBack: () => void;
}

export const CreateSizeCode = ({ onBack }: CreateSizeCodeProps) => {
  const { toast } = useToast();
  const [forms, setForms] = useState<SizeCodeForm[]>([
    { requestDesc: "", sizeCode: "", description: "", remarks: "" }
  ]);
  const [submittedForms, setSubmittedForms] = useState<SizeCodeForm[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateSizeCode = (sizeCode: string, index: number) => {
    const newErrors = { ...errors };
    const key = `sizeCode_${index}`;

    // Remove existing error for this field
    delete newErrors[key];

    if (!sizeCode) {
      newErrors[key] = "Size code is required";
    } else if (!/^[A-Z][A-Z0-9]{0,9}$/.test(sizeCode)) {
      newErrors[key] = "Invalid format. Must start with letter, no spaces/special chars, max 10 chars";
    } else if (sizeCode.length !== 10 && sizeCode.length < 3) {
      newErrors[key] = "Size code must be between 3-10 characters";
    } else if (sizeCodesData.some(sc => sc.sizeCode === sizeCode)) {
      newErrors[key] = "This Size code already exists. Please enter a new Size code";
    } else if (submittedForms.some(sf => sf.sizeCode === sizeCode)) {
      newErrors[key] = "This Size code is already added in current request";
    }

    setErrors(newErrors);
  };

  const validateDescription = (description: string, index: number) => {
    const newErrors = { ...errors };
    const key = `description_${index}`;

    delete newErrors[key];

    if (!description) {
      newErrors[key] = "Description is required";
    } else if (/^\d/.test(description)) {
      newErrors[key] = "Description cannot start with numbers";
    } else if (description.length > 100) {
      newErrors[key] = "Description must be less than 100 characters";
    }

    setErrors(newErrors);
  };

  const handleSizeCodeChange = (value: string, index: number) => {
    const upperValue = value.toUpperCase();
    const newForms = [...forms];
    newForms[index].sizeCode = upperValue;
    setForms(newForms);
  };

  const handleSizeCodeBlur = (index: number) => {
    validateSizeCode(forms[index].sizeCode, index);
  };

  const handleDescriptionBlur = (index: number) => {
    validateDescription(forms[index].description, index);
  };

  const handleInputChange = (field: keyof SizeCodeForm, value: string, index: number) => {
    const newForms = [...forms];
    newForms[index][field] = value;
    setForms(newForms);
  };

  const addAnotherSizeCode = () => {
    const currentForm = forms[0];
    
    // Validate current form
    validateSizeCode(currentForm.sizeCode, 0);
    validateDescription(currentForm.description, 0);
    
    if (!currentForm.requestDesc || !currentForm.sizeCode || !currentForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields before adding another size code",
        variant: "destructive"
      });
      return;
    }

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Error", 
        description: "Please fix all errors before proceeding",
        variant: "destructive"
      });
      return;
    }

    // Move current form to submitted forms
    setSubmittedForms([...submittedForms, currentForm]);
    
    // Reset current form
    setForms([{ requestDesc: "", sizeCode: "", description: "", remarks: "" }]);
    setErrors({});
  };

  const editSubmittedForm = (index: number) => {
    const formToEdit = submittedForms[index];
    setForms([formToEdit]);
    setSubmittedForms(submittedForms.filter((_, i) => i !== index));
  };

  const deleteSubmittedForm = (index: number) => {
    setSubmittedForms(submittedForms.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const currentForm = forms[0];
    
    // Validate current form if it has data
    if (currentForm.requestDesc || currentForm.sizeCode || currentForm.description) {
      validateSizeCode(currentForm.sizeCode, 0);
      validateDescription(currentForm.description, 0);
      
      if (!currentForm.requestDesc || !currentForm.sizeCode || !currentForm.description) {
        toast({
          title: "Validation Error",
          description: "Please fill all required fields",
          variant: "destructive"
        });
        return;
      }

      if (Object.keys(errors).length > 0) {
        toast({
          title: "Validation Error",
          description: "Please fix all errors before submitting",
          variant: "destructive"
        });
        return;
      }

      setSubmittedForms([...submittedForms, currentForm]);
    }

    if (submittedForms.length === 0 && (!currentForm.requestDesc && !currentForm.sizeCode && !currentForm.description)) {
      toast({
        title: "No Data",
        description: "Please add at least one size code before submitting",
        variant: "destructive"
      });
      return;
    }

    // Generate request ID
    const requestId = `REQ_${Math.floor(Math.random() * 900) + 100}`;
    
    toast({
      title: "Request Submitted",
      description: `Request submitted: ${requestId}`,
    });

    // Navigate back to master page
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Size Codes Master
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Create New Size Code
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Submit new size code requests for approval and processing
          </p>
        </div>

        {/* Submitted Forms Display */}
        {submittedForms.map((form, index) => (
          <Card key={index} className="bg-muted/30 border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Submitted Form {index + 1}</p>
                  <p className="font-medium">
                    Size Code: <span className="text-primary">{form.sizeCode}</span> | 
                    Description: {form.description} | 
                    Remarks: {form.remarks || "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editSubmittedForm(index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSubmittedForm(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Current Form */}
        <Card>
          <CardHeader>
            <CardTitle>Size Code Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="requestDesc">Request Desc <span className="text-destructive">*</span></Label>
              <Input
                id="requestDesc"
                placeholder="Enter Request Description"
                value={forms[0].requestDesc}
                onChange={(e) => handleInputChange("requestDesc", e.target.value, 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sizeCode">Size Code <span className="text-destructive">*</span></Label>
              <Input
                id="sizeCode"
                placeholder="Enter New Size Code, eg: ABC10"
                value={forms[0].sizeCode}
                onChange={(e) => handleSizeCodeChange(e.target.value, 0)}
                onBlur={() => handleSizeCodeBlur(0)}
                className={errors.sizeCode_0 ? "border-destructive" : ""}
                maxLength={10}
              />
              {errors.sizeCode_0 && (
                <p className="text-sm text-destructive">{errors.sizeCode_0}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
              <Input
                id="description"
                placeholder="Enter Size Code Description"
                value={forms[0].description}
                onChange={(e) => handleInputChange("description", e.target.value, 0)}
                onBlur={() => handleDescriptionBlur(0)}
                className={errors.description_0 ? "border-destructive" : ""}
                maxLength={100}
              />
              {errors.description_0 && (
                <p className="text-sm text-destructive">{errors.description_0}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Enter Any Remarks"
                value={forms[0].remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value, 0)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={addAnotherSizeCode}
              >
                Add Another Size Code
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
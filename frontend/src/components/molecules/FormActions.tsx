import React from "react";
import { Button } from "@mui/material";

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitText: string;
  isSubmitting: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onSubmit,
  submitText,
  isSubmitting,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <Button onClick={handleCancel} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} type="submit" color="primary">
        {isSubmitting ? "Submitting..." : submitText}
      </Button>
    </>
  );
};

export default FormActions;

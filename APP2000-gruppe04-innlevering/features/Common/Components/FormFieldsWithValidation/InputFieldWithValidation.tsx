import React from "react";
import validateUserProfile from "@/features/User/Validators/userProfileValidator";
import { ValidationErrors } from "@/features/User/Types/ValidationErrors";
import InputFieldWithValidationLayout from "@/features/Common/Layout/Component/FormFieldsWithValidation/InputFieldWithValidationLayout";

export interface InputFieldWithValidationProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  isRequired?: boolean;
  value: any;

  onFieldUpdate: (field: string, value: any) => void;
  errors?: string[] | undefined;
}

const InputFieldWithValidation = ({
  onFieldUpdate,
  errors,
  ...children
}: InputFieldWithValidationProps) => {
  const [fieldValue, setFieldValue] = React.useState<any>(); //TODO ikke sikkert, lag interface for dette

  // Handler for form field updates
  const handleFieldChange = (field: string, value: any | null | "") => {
    setFieldValue({ value });
    onFieldUpdate(field, value);
  };
  const fieldData = children;

  const errormessage: string = errors ? errors.join("\n") : "";

  return (
    <InputFieldWithValidationLayout
      onFieldUpdate={(field, value) => handleFieldChange(field, value)}
      errors={errormessage}
      fieldData={fieldData}
      fieldValue={fieldValue}
    />
  );
};

export default InputFieldWithValidation;

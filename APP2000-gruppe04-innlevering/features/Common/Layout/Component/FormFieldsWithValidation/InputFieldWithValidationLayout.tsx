import React from "react";

import { Textarea, Input } from "@nextui-org/react";
import { FileUploader } from "react-drag-drop-files";
import Text from "@/features/Common/Components/Text/text";

interface InputFieldWithValidationLayoutProps {
  onFieldUpdate: (field: string, value: any) => void;
  errors?: string;
  fieldData: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    isRequired?: boolean;
    value: any;
  };
  fieldValue: any; //TODO gjøre om til generisk type,
  //TODo som er avhengig av de typene som er definert i appen, av sikkerhetsmessige årsaker
}

/**
 * @description InputFieldWIthValdationLayout er en layout for inputfelt med validering.
 * @author Borgar Flaen Stensrud
 * @usage <InputFieldWithValidationLayout /> in components/FormFieldsWithValidation/InputFieldWithValidation.tsx
 * @example <InputFieldWithValidationLayout onFieldUpdate={onFieldUpdate} errors={errors} fieldData={fieldData} fieldValue={fieldValue} />
 *
 * @use react
 * @use <Textarea />, <Input /> fra @nextui-org/react
 * @version 1.0 2024-28-01
 * TODO: exportere types til egen fil.
 *
 */

const InputFieldWithValidationLayout = ({
  onFieldUpdate,
  errors,
  fieldData,
  fieldValue,
}: InputFieldWithValidationLayoutProps) => {
  const fileTypes = ["JPG", "PNG", "GIF"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    console.log("fieldData.name", fieldData.name);

    // Handle other input types
    onFieldUpdate(fieldData.name, e.target.value);
  };

  const handleFileUpload = (file: any) => {
    onFieldUpdate(fieldData.name, file);
  };

  const renderInputField = () => {
    if (fieldData.type === "textarea") {
      return (
        <Textarea
          id={fieldData.name}
          isRequired={fieldData.isRequired}
          value={fieldData.value}
          errorMessage={errors}
          onChange={(e) => handleChange(e)}
          isInvalid={errors && errors.length > 0 ? true : false}
          label={fieldData.label}
          placeholder={fieldData.placeholder}
          color={errors !== null ? "danger" : "primary"}
          className="w-full  rounded-md px-4 py-2  transition duration-150 ease-in-out sm:text-sm
          resize-none"
          variant="bordered"
        />
      );
    } else if (fieldData.type === "file") {
      // Render file input
      return (
        <>
          {" "}
          <FileUploader
            handleChange={handleFileUpload}
            name="file"
            types={fileTypes}
          />
          <Text variant="h3" color="grey">
            {fieldData.value.name}
          </Text>
        </>

        /*<Input
          id={fieldData.name}
          type={fieldData.type}
          isRequired={fieldData.isRequired}
          errorMessage={errors}
          isInvalid={errors && errors.length > 0 ? true : false}
          onChange={handleFileUpload}
          on
          className="w-full rounded-md px-4 py-2 transition duration-150 ease-in-out sm:text-sm
        resize-none focus:outline-none"
          size="lg"
          color={errors !== null ? "danger" : "primary"}
          style={{
            color: "black",
            backgroundColor: "transparent",
            border: "none",
          }} // Add this line for styling
          name={fieldData.name}
          variant="bordered"
        />*/
      );
    } else {
      // Default to text input
      return (
        <Input
          id={fieldData.name}
          label={fieldData.label}
          placeholder={fieldData.placeholder}
          type={fieldData.type}
          variant="bordered"
          // ...other props
          isRequired={fieldData.isRequired}
          value={fieldData.value}
          errorMessage={errors}
          isInvalid={errors && errors.length > 0 ? true : false}
          isClearable
          color={errors !== null ? "danger" : "primary"}
          className="w-full rounded-md px-4 py-2  transition duration-150 ease-in-out sm:text-sm
          resize-none"
          onChange={(e) => handleChange(e)}
        />
      );
    }
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <label
        htmlFor={fieldData.name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {fieldData.label}{" "}
        {fieldData.isRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      {renderInputField()}
    </div>
  );
};

export default InputFieldWithValidationLayout;

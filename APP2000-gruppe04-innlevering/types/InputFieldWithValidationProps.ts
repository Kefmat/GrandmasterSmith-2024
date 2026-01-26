export default interface InputFieldWithValidationProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  isRequired?: boolean;
  value: any;
  onFieldUpdate: (field: string, value: any) => void;
  errors?: string[] | undefined;
}

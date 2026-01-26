export default interface InputFieldWithValidationLayoutProps {
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

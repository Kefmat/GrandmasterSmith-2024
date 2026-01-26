import { ValidationErrors } from "./";
import { UserProfileData } from "./UserProfileData";

export default interface UserProfileFormLayoutProps {
  onFieldUpdate: (field: string, value: any) => void;
  onStoreProfile: () => void;
  errors?: ValidationErrors;
  fields?: UserProfileData;
}

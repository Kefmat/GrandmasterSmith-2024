export interface UserCredentials {
  username: string;
  password: string;
  email: string;
  registrationStatus: registrationStatus;
  accountActive: boolean;
}

export type registrationStatus =
  | "init"
  | "activation_pendig"
  | "profile_completion_pending"
  | "profile_completed"
  | "completed";

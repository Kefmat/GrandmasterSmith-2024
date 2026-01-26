import bcrypt from "bcrypt";
import Authenticate from "./Authenticate";
import { UserCredentials } from "../Types/UserCredentials";

abstract class Account {
  email: string;
  private password: string;
  accountType: string;
  registrationStatus:
    | "init"
    | "activation_pendig"
    | "profile_completion_pending"
    | "profile_completed"
    | "completed";

  accountActive: boolean;
  loginType: string; //email or username
  username: string;
  //constructor
  constructor({ ...props }) {
    const {
      email,
      password,
      accountType,
      registrationStatus,
      accountActive,
      loginType,
      username,
    } = props;
    this.email = email;
    this.password = password;
    this.accountType = accountType;
    this.registrationStatus = registrationStatus;

    this.accountActive = accountActive;
    this.loginType = loginType;
    this.username = username;
  }

  //methods

  abstract login({ ...props }: UserCredentials): Promise<boolean>;
  abstract update(accountDetails: any): Promise<any>;
  abstract getAccountActive(): Promise<boolean>;
  abstract getAccountType(): Promise<string>;
  abstract compareForLogin(
    username: string,
    password: string
  ): Promise<boolean>;

  getPassword(): string {
    return this.password;
  }

  getUserName(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getRegistrationStatus(): string {
    return this.registrationStatus;
  }

  getLoginType(): string {
    return this.loginType;
  }

  async setPassword(password: string): Promise<string> {
    this.password = password;
    return this.password;
  }
}
export default Account;

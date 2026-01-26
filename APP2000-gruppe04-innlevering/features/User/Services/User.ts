import Account from "./Account";
import UserProfile from "./UserProfile";
import { UserCredentials } from "../Types/UserCredentials";
class User extends Account {
  userProfile: UserProfile;

  //constructor
  constructor({ ...props }) {
    super({ ...props });
    const { email } = props;
    this.accountType = "user";
    this.accountActive = true;
    this.email = this.isValidEmail(email) ? email : "";
    this.registrationStatus = "init";
    if (props.userProfile) this.userProfile = props.userProfile;
    else this.userProfile = new UserProfile({ ...props });
  }

  //methods
  /*
  async register({ ...props }): Promise<boolean> {
    //logic
    this.setPassword(await this.newPassword(props.password));
    this.sendEmailVerification();
    this.registrationStatus = "activation_pendig";
    return true;
  }
*/
  async activateAccount(): Promise<boolean> {
    //logic
    if (this.registrationStatus !== "activation_pendig")
      throw new Error("Account activation not pending.");
    this.registrationStatus = "profile_completion_pending";
    return true;
  }

  async completeProfile({ ...props }): Promise<boolean> {
    //logic
    if (this.registrationStatus !== "profile_completion_pending")
      throw new Error("Profile completion not pending.");
    this.userProfile.completeUserProfile({ ...props });
    this.registrationStatus = "profile_completed";
    return true;
  }

  async sendEmailVerification(): Promise<boolean> {
    //TODO send email verification with react-email.

    return true;
  }

  async login({ ...props }: UserCredentials): Promise<boolean> {
    return true;
  }

  async update(accountDetails: any): Promise<any> {
    //logic
    return accountDetails;
  }

  isValidEmail(email: string): boolean {
    //logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async getAccountActive(): Promise<boolean> {
    //logic
    return true;
  }

  async getAccountType(): Promise<string> {
    //logic
    return this.accountType;
  }

  async compareForLogin(username: string, password: string): Promise<boolean> {
    //logic
    return true;
  }

  async getFullName(): Promise<string> {
    return `${this.userProfile.firstName} ${this.userProfile.lastName}`;
  }

  getEmail(): string {
    return this.email;
  }

  async getUsername(): Promise<string> {
    return this.userProfile.username;
  }
  /*
  async newPassword(password: string): Promise<string> {
    if (this.authenticator.isValidPassword(password)) {
      const newPassword = await this.authenticator.encryptPassword(password);
      this.setPassword(newPassword);
      return "password updated";
    } else {
      return "password not updated";
    }
  }
*/
  async dumpUserToMongoDB(): Promise<any> {
    //logic
    return this;
  }
}
export default User;

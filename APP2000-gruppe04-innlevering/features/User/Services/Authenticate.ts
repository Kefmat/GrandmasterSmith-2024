import Account from "./Account";
import bcrypt from "bcrypt";
import { UserCredentials } from "../Types/UserCredentials";
import axios from "axios";

class Authenticate {
  private account: Account;
  private loginType: string = "email";
  userCredentials: any;
  constructor(account: Account, loginType?: string) {
    this.account = account;
    if (loginType) this.loginType = loginType;
  }
  /*
  async verifyCredentials({ ...props }: UserCredentials): Promise<boolean> {
    //TODO type username, registrationStatus, loginType, email, password properly!
    // Example logic
    this.userCredentials = this.dbCallForUserCredentials();
    if (
      this.account.getRegistrationStatus() === "completed" &&
      (await this.account.getAccountActive()) === true
    ) {
      if (
        this.loginType === "email" &&
        this.userCredentials?.email === props.email &&
        (await this.verifyPassword(
          props.password,
          this.userCredentials.password
        ))
      ) {
        return true;
      }
    } else if (
      (this.loginType === "username",
      this.userCredentials?.username === props.username,
      await this.verifyPassword(props.password, this.userCredentials.password))
    ) {
      return true;
    }
    return false;
  }
*/
  isValidPassword(password: string): boolean {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    } else if (password.length > 20) {
      throw new Error("Password must be at most 20 characters long.");
    } else if (!password.match(/[a-z]/)) {
      throw new Error("Password must contain at least one lowercase letter.");
    } else if (!password.match(/[A-Z]/)) {
      throw new Error("Password must contain at least one uppercase letter.");
    } else if (!password.match(/[0-9]/)) {
      throw new Error("Password must contain at least one number.");
    } else if (!password.match(/[^a-zA-Z\d]/)) {
      throw new Error("Password must contain at least one special character.");
    } else if (password === this.account.getPassword()) {
      throw new Error("Something went wrong, try a different password.");
    }
    return true;
  }

  async dbCallForUserCredentials(): Promise<any> {
    //TODO implement db call for user credentials
    const userCredentials = await axios.get("/api/users/userCredentials");

    return userCredentials ? userCredentials : null;
  }
}
export default Authenticate;

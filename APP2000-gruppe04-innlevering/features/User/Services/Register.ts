import User from "./User";

class Register {
  static async register(email: string, username: string, password: string) {
    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    })
      .then((res) => {
        const result = res.json();
        if (res.status !== 200) throw new Error(res.statusText);
        return result;
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const user = new User({ email, username, password });
        return user;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  }
}

export default Register;

import React, { useState } from "react";
import Link from "next/link";
import { Card, Box } from "@chakra-ui/react";
import Text from "@/features/Common/Components/Text/text";
import { GitHub, Facebook, Twitter, Google } from "@mui/icons-material";
import { Input, Button, Switch } from "@nextui-org/react";
import { useRouter } from "next/router";
import Register from "@/features/User/Services/Register";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleNext = () => {
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (email === null) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email, every email should contain @ and .");
      return;
    }

    setValidEmail(true);
  };

  const handleRegister = async () => {
    try {
      await Register.register(email, username, password)
        .then((result) => {
          console.log(result);
          router.push("/auth/sign-in");
        })
        .catch((err) => console.error("error", err.errors[0].longMessage));
      // Redirect or show success message
    } catch (err: any) {
      setError(err.message);
    }
  };

  //on valid email, show username and password

  return (
    <Card style={{ minWidth: "400px" }}>
      <Box mx={2} mt={0} p={2} mb={1} textAlign="center">
        <Text
          variant="h1"
          style={{ fontSize: "25px" }}
          className="text-center"
          color="grey"
        >
          Register with Grandmaster&apos;s smith
        </Text>

        <div className="flex flex-row items-center justify-center mt-3 gap-2">
          <div className="flex flex-row items-center justify-self-start">
            <Text variant="body2" className="justify-self-start ">
              Create account with:
            </Text>
          </div>
          <div className="flex flex-row items-center justify-self-end gap-1">
            <Link href="#" color="grey">
              <Facebook color="inherit" fontSize="large" />
            </Link>
            <Link href="#" color="grey">
              <GitHub color="inherit" fontSize="large" />
            </Link>
            <Link href="#" color="grey">
              <Google color="inherit" fontSize="large" />
            </Link>
          </div>
        </div>
      </Box>
      <hr />
      <div className="flex flex-col items-center justify-self-center">
        <Text variant="body2" className="justify-self-center ">
          or fill in required data:
        </Text>
      </div>
      <Box pt={4} pb={3} px={3}>
        <Box role="form">
          <Text variant="h5">Userinfo: *</Text>
          <hr className="mb-3 mt-1" />
          {!validEmail && (
            <Box mb={2}>
              <Text variant="h5">Email: *</Text>
              <Input
                type="email"
                onChange={(e) => handleEmailChange(e)}
                label="Email"
                value={email}
                fullWidth
              />
              {/* Error message */}
              {error && (
                <Text
                  variant="body3"
                  className="bg-error text-secondary mt-1 p-2"
                  color=""
                >
                  {error ? error : ""}
                </Text>
              )}
            </Box>
          )}
          {validEmail && (
            <>
              <Box mb={2}>
                <Text variant="h5">Username: *</Text>
                <Input
                  type="text"
                  onChange={(e) => handleUserNameChange(e)}
                  label="Username"
                  value={username}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <Text variant="h5">Password: *</Text>
                <Input
                  type="password"
                  onChange={(e) => handlePasswordChange(e)}
                  label="Password"
                  value={password}
                  fullWidth
                />
              </Box>
            </>
          )}
          {!validEmail ? (
            <Box mt={4} mb={1}>
              <Button variant="solid" fullWidth onClick={handleNext}>
                Next
              </Button>
            </Box>
          ) : (
            <Box mt={4} mb={1}>
              <Button variant="solid" fullWidth onClick={handleRegister}>
                Register
              </Button>
            </Box>
          )}

          <Box mt={3} mb={1} textAlign="center">
            <Text variant="body3" color="text">
              Allready have an account?{" "}
              <Link href="/auth/sign-in" style={{ color: "blue" }}>
                Sign in
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default SignUp;

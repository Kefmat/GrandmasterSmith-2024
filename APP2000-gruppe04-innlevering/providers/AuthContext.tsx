import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

/**
 * @description Auth Context for å håndtere autentisering og brukerdata.
 * @author  Borgar Flaen Stensrud
 *
 */
interface AuthContextValue {
  gsUser: any | null;
  isAuthLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextValue>({
  gsUser: null,
  isAuthLoading: true,
  authError: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [gsUser, setGsUser] = useState<any | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        setIsAuthLoading(true);
        try {
          const result = await axios.get("/api/users/user?userId=" + user?.sub);
          if (result.data) {
            const resultUser = result.data.user;
            const theUser = {
              ...resultUser,
              id: resultUser._id,
              user,
              friends: result.data.friends,
            };
            setGsUser(theUser);
          }
        } catch (e: any) {
          setAuthError(e.message);
        }
        setIsAuthLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ gsUser, isAuthLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

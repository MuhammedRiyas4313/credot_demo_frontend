import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { AUTH_TOKEN } from "../../common/constant_frontend.common";

type AuthContextType = [
  auth: string | null,
  setAuth: Dispatch<React.SetStateAction<string | null>>,
];

const authDefault: AuthContextType = [null, () => {}];

const AuthContext = createContext<AuthContextType>(authDefault);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (token) {
        setAuth(token);
      }
    }
  }, [localStorage]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

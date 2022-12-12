import { createContext } from "react";
import axios from "axios";

const baseURL = "https://lms-public.onrender.com/api";

type User = {
  username: string;
  name?: string;
  password: string;
};

type AuthContextProps = {
  login: (user: User) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider({ children }: AuthProviderProps) {
  const login = async (user: User) => {
    try {
      const response = await axios.post(baseURL + "/login", { user });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
    
  const signup = async (user: User) => {
    try {
      const response = await axios.post(baseURL + "/register", { user });
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
    
    const logout = () => {
        localStorage.removeItem("user");
    }

  return (
    <AuthContext.Provider value={{ login, signup,logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

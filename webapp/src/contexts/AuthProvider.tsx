import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-location";
import { createContext } from "react";
import { deserialize } from "../lib/strings";
import { User } from "../types/common";
import {toast} from 'react-toastify'


interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuthContext {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  user: null,
  login: () => {
    return null;
  },
  logout: () => {
    return null;
  },
});

function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage<string | null>({
    key: "token",
    defaultValue: null,
    deserialize,
  });

  const [user, setUser] = useLocalStorage<User | null>({
    key: "user",
    defaultValue: null,
    deserialize,
  });

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    navigate({
      to: "/",
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    toast('Successfully logged Out!',{type:'info'})
    navigate({
      to: "/login",
    });
  };

  const value: IAuthContext = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;

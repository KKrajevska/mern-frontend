import { createContext } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  login: (uid: string, token: string, expiration?: Date) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: (uid: string, token: string, expiration?: Date) => {},
  logout: () => {},
});

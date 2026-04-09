import { createContext, useContext, useState } from "react";
import { storage } from "@utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get("user"));
  const [token, setToken] = useState(() => storage.get("token"));

  const login = (userData, authToken) => {
    setUser(userData);
    storage.set("user", userData);

    if (authToken) {
      setToken(authToken);
      storage.set("token", authToken);
    } else {
      setToken(null);
      storage.remove("token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove("user");
    storage.remove("token");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

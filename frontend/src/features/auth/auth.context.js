import { createContext, createElement, useContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (usernameOrEmail, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await login(usernameOrEmail, password);
      setUser(response.user || response);
      return response;
    } catch (error) {
      setError(error.message);
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await register(username, email, password);
      setUser(response.user || response);
      return response;
    } catch (error) {
      setError(error.message);
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        loginUser: handleLogin,
        registerUser: handleRegister,
        isAuthenticated: Boolean(user),
      },
    },
    children,
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

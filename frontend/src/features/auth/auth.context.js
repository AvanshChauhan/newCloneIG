import { createContext, createElement, useContext, useMemo, useState } from "react";
import { login, register } from "./services/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function registerUser(username, email, password) {
    setLoading(true);
    setError("");

    try {
      // Register success hote hi backend se aaya user data context me save kar dete hain.
      const data = await register(username, email, password);
      setUser(data.user || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function loginUser(usernameOrEmail, password) {
    setLoading(true);
    setError("");

    try {
      // Login ke baad auth cookie browser me set hoti hai, aur UI ke liye user state update hoti hai.
      const data = await login(usernameOrEmail, password);
      setUser(data.user || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logoutUser() {
    // Frontend state clear karte hain; backend logout API add ho to yahin se call kar sakte hain.
    setUser(null);
    setError("");
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      registerUser,
      loginUser,
      logoutUser,
      isAuthenticated: Boolean(user),
    }),
    [user, loading, error],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, loginUser, registerUser } from "../services/authService.js";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "ecomm-auth";

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          token: null,
          user: null,
        };
  });
  const [loading, setLoading] = useState(Boolean(state.token));

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.token || state.user) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((data) => {
        setState((previous) => ({
          ...previous,
          user: data.user,
        }));
      })
      .catch(() => {
        setState({ token: null, user: null });
      })
      .finally(() => setLoading(false));
  }, [state.token, state.user]);

  const actions = useMemo(
    () => ({
      async login(formValues) {
        const data = await loginUser(formValues);
        setState({ token: data.token, user: data.user });
        return data;
      },
      async register(formValues) {
        const data = await registerUser(formValues);
        setState({ token: data.token, user: data.user });
        return data;
      },
      logout() {
        setState({ token: null, user: null });
      },
    }),
    [],
  );

  const value = useMemo(
    () => ({
      ...actions,
      loading,
      token: state.token,
      user: state.user,
      isAuthenticated: Boolean(state.token && state.user),
    }),
    [actions, loading, state.token, state.user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

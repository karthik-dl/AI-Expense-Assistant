import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } =
          await authService.getProfile();

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("access_token")) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem(
      "access_token",
      token
    );

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(
      "access_token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
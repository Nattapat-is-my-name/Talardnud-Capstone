import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  providerId: string | null;
  login: (token: string, providerId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);

  // Load authentication state from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedProviderId = localStorage.getItem("providerId");

    if (storedToken && storedProviderId) {
      setToken(storedToken);
      setProviderId(storedProviderId);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string, newProviderId: string) => {
    setToken(newToken);
    setProviderId(newProviderId);
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("providerId", newProviderId);
  };

  const logout = () => {
    setToken(null);
    setProviderId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("providerId");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, providerId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

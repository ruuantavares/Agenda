import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (e) {
    return false;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
    localStorage.SetItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken && isTokenValid(storageToken)) {
      setToken(storageToken);
    } else {
      setToken(null);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

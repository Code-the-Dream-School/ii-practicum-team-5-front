import { createContext, useContext, useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { AuthModalProvider } from "./AuthModalContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // TODO: Validate token and also check the expiration.

  const login = (userId, name, email, imageURL, token) => {
    const userData = {
      userId,
      name,
      email,
      imageURL,
    };
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <AuthModalProvider>{children}</AuthModalProvider>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

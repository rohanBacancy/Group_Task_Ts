import React, { useContext, useState } from 'react';
import { getItemFromStorage } from '../helper';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const user = getItemFromStorage('userId');
  const [isLoggedIn, setIsLoggedIn] = useState(!!(user));

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }} {...props} />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

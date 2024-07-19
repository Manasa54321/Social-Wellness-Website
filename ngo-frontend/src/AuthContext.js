// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: 0,  // 0 means not logged in, any other value means logged in
    vId:0,
  });

  const logout = () => {
    setAuthState({ userId: 0 ,vId:0 });
    // navigate('/login'); // Navigate to the login page
    window.location.reload(); // Reload the page to ensure state is fully reset
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: 0,  
  });

  const logout = () => {
    setAuthState({ userId: 0 ,vId:0 });
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value = {{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

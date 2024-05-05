import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: null,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "SET_TOKEN":
        return { ...state, token: action.payload };
      case "CLEAR_TOKEN":
        return { ...state, token: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./../Utilities/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });

    return () => unsuscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const values = {
    user,
    signup,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UseToken from "../hooks/useToken";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { token, setToken } = UseToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  // const apiLink = process.env.REACT_APP_ANONIFY_API;
  const apiLink = "https://anonify-backend.onrender.com";

  // Function to fetch the data;
  const fetchData = (url, details) => {
    axios
      .post(`${apiLink}${url}`, details)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        if (response.data.status == "success") {
          data.user ? setUser(data.user) : "";
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.token) {
            setToken(data.token);
            router.push("/profile");
            setLoading(false);
          } else {
            router.push("/");
            setLoading(false);
          }
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        let tempError = err.response.data;
        if (tempError.status === "fail") {
          // console.log("Fail error", tempError.message);
          setError(tempError.message);
        } else if (tempError.status === "error") {
          // console.log("Error err", tempError.message);
          setError(tempError.message);
        } else {
          // console.log(err.message);
          setError(err.message);
        }
        setLoading(false);
      });
  };

  // Signup function
  const signup = (username, email, password) => {
    const credentials = {
      username,
      email,
      password,
    };
    setLoading(true);
    setError("");
    fetchData("/user/signup", credentials);
  };

  // Login function
  const login = (email, password) => {
    const credentials = {
      email,
      password,
    };
    setLoading(true);
    setError("");
    fetchData("/user/login", credentials);
  };

  // Logout function
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    alert("Logout successful");
    router.push("/");
    setToken(null);
  };

  // Check auth status
  const checkAuthStatus = () => {
    if (token) {
      return true;
    }
    return false;
  };

  const values = {
    signup,
    login,
    logout,
    token,
    user,
    checkAuthStatus,
    loading,
    error,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

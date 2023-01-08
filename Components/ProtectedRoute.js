import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "./../Context/AuthContext";

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { checkAuthStatus } = useAuth();
  return checkAuthStatus ? children : router.push("/");
};

export default ProtectRoute;

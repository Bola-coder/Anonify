import React, { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../Context/AuthContext";
import ProtectRoute from "../../Components/ProtectedRoute";

const Dashboard = () => {
  const { user, checkAuthStatus } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    checkAuthStatus() ? "" : router.push("/");
  }, [checkAuthStatus, router]);
  console.log(user);
  return (
    // <ProtectRoute>
    <section>
      {/* <h2> {user.email} Dashboard</h2> */}
      <h2>Welcome to the dashboard component</h2>
    </section>
    // </ProtectRoute>
  );
};

export default Dashboard;

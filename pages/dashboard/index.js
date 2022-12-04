import React from "react";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <section>
      <h2> {user.email} Dashboard</h2>
    </section>
  );
};

export default Dashboard;

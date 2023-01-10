import React from "react";
import Link from "next/link";
import { useAuth } from "../Context/AuthContext";
import styles from "./../styles/Navbar.module.css";

const Navbar = () => {
  const { token, user } = useAuth();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <h2>Anonify</h2>
      </Link>
      {token ? (
        <div className={styles.menu}>
          <p>{user?.username}</p>
          <p>Dashboard</p>
          <p>Logout</p>
        </div>
      ) : (
        <div className={styles.menu}>
          <Link href="/">
            <p>Home</p>
          </Link>
          <Link href="/login">
            <p>Login</p>
          </Link>
          <Link href="/signup">
            <p>Register</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

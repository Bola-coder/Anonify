import React from "react";
import Link from "next/link";
import { useAuth } from "../Context/AuthContext";
import styles from "./../styles/Navbar.module.css";

const Navbar = () => {
  const { logout, token, user } = useAuth();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <h2>Anonify</h2>
      </Link>
      {token ? (
        <div className={styles.menu}>
          <Link href="/profile">
            <p>Profile</p>
          </Link>
          {/* <p>Dashboard</p> */}
          <p onClick={logout}>Logout</p>
        </div>
      ) : (
        <div className={styles.menu}>
          <Link href="/signup">
            <p>Register</p>
          </Link>
          <Link href="/login">
            <p>Login</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../Context/AuthContext";
import styles from "./../styles/Navbar.module.css";

const Navbar = () => {
  const { logout, token, user } = useAuth();
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    token ? setSignedIn(true) : setSignedIn(false);
  }, [token]);
  return (
    <nav className={styles.nav}>
      <h2>
        {" "}
        <Link href="/">Anonify </Link>
      </h2>

      {signedIn ? (
        <div className={styles.menu}>
          <p>
            <Link href="/profile">Profile</Link>
          </p>
          {/* <p>Dashboard</p> */}
          <p onClick={logout}>Logout</p>
        </div>
      ) : (
        <div className={styles.menu}>
          <p>
            <Link href="/signup">Register</Link>
          </p>
          <p>
            {" "}
            <Link href="/login">Login</Link>{" "}
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHamburger, FaTimes } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import styles from "./../styles/Navbar.module.css";

const Navbar = () => {
  const { logout, token, user } = useAuth();
  const [signedIn, setSignedIn] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    token ? setSignedIn(true) : setSignedIn(false);
  }, [token]);

  const handleMobileChange = () => {
    setMobile((prev) => !prev);
  };
  return (
    <nav className={styles.nav}>
      <h2>
        {" "}
        <Link href="/">Anonify </Link>
      </h2>

      <div
        className={`${styles.nav__container} ${
          mobile ? styles.mobile__nav : ""
        }`}
      >
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
        <div className={styles.hamburger}>
          {mobile ? (
            <FaTimes onClick={handleMobileChange} />
          ) : (
            <FaHamburger onClick={handleMobileChange} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

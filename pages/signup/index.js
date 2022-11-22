import React from "react";
import Image from "next/image";
import Link from "next/link";
import SecureKey from "./../../public/images/key.png";
import styles from "./../../styles/auth.module.css";

const Signup = () => {
  return (
    <section className={styles.auth}>
      <div className={styles.auth__image}>
        <Image src={SecureKey} alt="Secure Key" width={300} height={300} />
      </div>
      <form className={styles.auth__form}>
        <div className={styles.auth__content}>
          <h3>Sign Up on Anonify</h3>
          <div className={styles.auth__group}>
            <div className={styles.auth__input}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
            </div>
            <div className={styles.auth__input}>
              <label htmlFor="name">Email</label>
              <input type="email" name="email" />
            </div>
            <div className={styles.auth__input}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>
            <div className={styles.auth__input}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" />
            </div>
          </div>
          <p className={styles.auth__footer}>
            Already have an account?{" "}
            <span>
              <Link href="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Signup;

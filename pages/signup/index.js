import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./../../Context/AuthContext";
import SecureKey from "./../../public/images/key.png";
import styles from "./../../styles/auth.module.css";

const Signup = () => {
  const { signup, user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = form;

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setForm((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirm) {
      alert("Missing fields. Please fill in all fields before you submit.");
    } else if (password !== passwordConfirm) {
      alert("Password do not match");
    } else {
      console.log(form, "submitted successfully");
      signup(email, password)
        .then(() => {
          alert("user Signed up sucessully");
          console.log(user);
        })
        .catch((err) => {
          console.log("An error occurred", err);
        });
      setForm({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    }
  };

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
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleFormInputChange}
              />
            </div>
            <div className={styles.auth__input}>
              <label htmlFor="name">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleFormInputChange}
              />
            </div>
            <div className={styles.auth__input}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleFormInputChange}
              />
            </div>
            <div className={styles.auth__input}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleFormInputChange}
              />
            </div>
            <button className={styles.auth__btn} onClick={handleSignup}>
              Register
            </button>
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

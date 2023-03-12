import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import SecureKey from "./../../public/images/key.png";
import styles from "./../../styles/auth.module.css";

const Signup = () => {
  const { signup, loading, error } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, email, password, passwordConfirm } = form;

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setForm((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !passwordConfirm) {
      alert("Missing fields. Please fill in all fields before you submit.");
    } else if (password !== passwordConfirm) {
      alert("Password do not match");
    } else {
      console.log(form, "submitted successfully");
      await signup(username, email, password);
      // setForm({
      //   username: "",
      //   email: "",
      //   password: "",
      //   passwordConfirm: "",
      // });
    }
  };

  return (
    <>
      <Navbar />
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
                  name="username"
                  value={username}
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
              {error && <p className={styles.auth__error}>{error}</p>}
              <button
                className={styles.auth__btn}
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Please wait" : "Register"}
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
    </>
  );
};

export default Signup;

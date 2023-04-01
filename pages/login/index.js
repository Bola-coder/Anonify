import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./../../Context/AuthContext";
import Navbar from "../../Components/Navbar";
import SecureKey from "./../../public/images/key.png";
import styles from "./../../styles/auth.module.css";

const Login = () => {
  const { login, loading, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setForm((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Missing fields. Please fill in all fields before you submit.");
    } else {
      console.log(form, "submitted  successful ly");
      login(email, password);
      // setForm({
      //   email: "",
      //   password: "",
      // });
    }
  };

  return (
    <>
      <Head>
        <title>Anonify | Login</title>
      </Head>{" "}
      <Navbar />
      <section className={styles.auth}>
        <div className={styles.auth__image}>
          <Image src={SecureKey} alt="Secure Key" width={300} height={300} />
        </div>
        <form className={styles.auth__form}>
          <div className={styles.auth__content}>
            <h3>Login to Anonify</h3>
            <div className={styles.auth__group}>
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
              {error && <p className={styles.auth__error}>{error}</p>}
              <button
                className={styles.auth__btn}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Please wait" : "Login"}
              </button>
            </div>
            <p className={styles.auth__footer}>
              Don&apos;t have an account?{" "}
              <span>
                <Link href="/signup">Signup</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;

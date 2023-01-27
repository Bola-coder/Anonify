import React from "react";
import Link from "next/link";
import styles from "./../styles/Denied.module.css";

const ErrorPage = () => {
  return (
    <section className={styles.denied}>
      <h2>This page does not exist. Lost your way???</h2>
      <button>
        <Link href="/">Back to Home page</Link>
      </button>
    </section>
  );
};

export default ErrorPage;

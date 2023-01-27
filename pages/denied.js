import React from "react";
import Link from "next/link";
import styles from "./../styles/Denied.module.css";

const AccessDenied = () => {
  return (
    <section className={styles.denied}>
      <h2>
        Access Denied. You do not have the right access to visit this page.
      </h2>
      <button>
        <Link href="/">Back to Home page</Link>
      </button>
    </section>
  );
};

export default AccessDenied;

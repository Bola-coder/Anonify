import React from 'react';
import styles from './../styles/Footer.module.css';
const Footer = () => {
    return ( 
        <footer className={styles.footer}>
            <div className={styles.name}>
                <h4>Anonify</h4>
            </div>
            <div className={styles.text}>
                <p>Copyright - Bolarinwa Ahmed 2022.</p>
            </div>
        </footer>
     );
}
 
export default Footer;

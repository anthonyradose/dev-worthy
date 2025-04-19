import { Link } from "react-router-dom";
import styles from '../styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Link to="about">Credits</Link>
    <a href="https://github.com/anthonyradose/dev-worthy" target='_blank'>GitHub</a>
  </footer>
);

export default Footer;
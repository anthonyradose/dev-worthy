import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Navbar.module.css";

const NavBar = () => {
  return (
    <>
      <nav className={`navbar navbar-expand-lg px-3 ${styles.navWrapper}`}>
        <Link
          className={`navbar-brand d-flex align-items-center ${styles.brand}`}
          to="/"
        >
          <img
            src="src/assets/images/dev-worthy-logo.png"
            className={`me-2 ${styles.logo} `}
          />
          <span className={`${styles.brandText}`}>Dev Worthy</span>
        </Link>
        <button
          className={`navbar-toggler ${styles.toggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles.togglerIcon}`}></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={styles.navLink} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.navLink} to="about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.navLink} to="favourites">
                Favourites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

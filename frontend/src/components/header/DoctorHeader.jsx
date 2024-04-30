import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const DoctorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="header">
      <a className="logo" href="#logo">
        <i className="fas fa-heartbeat"></i>Apna hospital
      </a>
      <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
        <Link to="/doctordashboard">Home</Link>
        <Link to="/doctors">Doctors</Link>

        <a className="nav-item dropdown" href="#nothing" id="logintag">
          <Link
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Receptionist
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">Receptionist</Link>
            </li>
            <li>
              <Link className="dropdown-item">Create Receptionist</Link>
            </li>
          </ul>
        </a>
        <a className="nav-item dropdown" href="#nothing" id="logintag">
          <Link
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Patients
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">Patients</Link>
            </li>
            <li>
              <Link className="dropdown-item">Create Patients</Link>
            </li>
          </ul>
        </a>

        <a className="nav-item dropdown" href="#nothing" id="logintag">
          <Link
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dashboard
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">Profile</Link>
            </li>
            <li>
              <Link className="dropdown-item">Meassage</Link>
            </li>
            <li>
              <Link className="dropdown-item">LogOut</Link>
            </li>
          </ul>
        </a>
      </nav>
      <div
        id="menu-btn"
        className={`fas fa-bars ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default DoctorHeader;

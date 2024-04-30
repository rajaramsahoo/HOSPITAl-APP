import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ReceptionistHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      const receptionistData = JSON.parse(localStorage.getItem("auth"));
      let token = JSON.parse(localStorage.getItem("token")).token;
      if (receptionistData && token) {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="header">
      <a className="logo" href="#logo">
        <i className="fas fa-heartbeat"></i>Apna hospital
      </a>
      <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
        <Link to="/deandashboard">Home</Link>
        <Link to="/view/doctors">Doctors</Link>
        <Link to="/view/receptionist">Receptionist</Link>

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
              <Link className="dropdown-item" to={"/patients"}>
                Patients
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={"/patients/createpatient"}>
                Create Patients
              </Link>
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
              <Link className="dropdown-item" to={"/deandashboard/profile"}>
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item">Meassage</Link>
            </li>
            <li>
              <Link className="dropdown-item" onClick={handleLogout} to={"/"}>
                Logout
              </Link>
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

export default ReceptionistHeader;

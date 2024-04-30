import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const deanData = JSON.parse(localStorage.getItem("auth"));
      let token = JSON.parse(localStorage.getItem("token")).token;
      if (deanData && token) {
        localStorage.clear();
      
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="header">
        <a className="logo" href="#logo">
          <i className="fas fa-heartbeat"></i>Apna hospital
        </a>
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <Link to="/deandashboard">Home</Link>
          <a className="nav-item dropdown" href="#nothing" id="logintag">
            <Link
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Doctors
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/doctors">
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={"/doctors/createdoctor"}
                >
                  Create Doctor
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
              Receptionist
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  to={"/receptionists"}
                >
                  Receptionist
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={"/receptionist/createreceptionist"}
                >
                  Create Receptionist
                </Link>
              </li>
            </ul>
          </a>

          <Link to={"/patients"}>Patients</Link>
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
    </>
  );
};

export default Header;

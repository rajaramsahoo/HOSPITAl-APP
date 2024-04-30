import "./homepage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";
const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deanModal, setDeanModal] = useState(false);
  const [doctorModal, setDoctorModal] = useState(false);
  const [resModal, setResModal] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const departmentsArray = [
    "Select Department",
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "0.31rem solid #16a085",
      boxShadow: " 0.5rem 0.5rem 0 rgba(22, 160, 133, 0.2)",
    },
  };
  // ================PATIENT BOOKING START====================
  const [patientData, setPatientData] = useState({
    patientName: "",
    gender: "",
    mobileNumber: "",
    address: "",
    email: "",
    department: "",
    doctorName: "",
    appointmentTime: "",
  });

  function onChangeHandler(e) {
    // console.log(e.target.value);
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  }

  async function onClickHandler(e) {
    try {
      e.preventDefault();
      await axios.post("/api/patient", patientData);
      // console.log(res.data);
      toast.success("your appointment was booked");
      setPatientData({
        patientName: "",
        gender: "",
        mobileNumber: "",
        address: "",
        email: "",
        department: "",
        doctorName: "",
        appointmentTime: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  // ================PATIENT BOOKING end====================
  // ================DEAN PART START====================
  const [deanData, setDeanData] = useState({
    email: "",
    password: "",
  });

  function onChangeHandlerDean(e) {
    console.log(e.target.value);
    setDeanData({
      ...deanData,
      [e.target.name]: e.target.value,
    });
  }

  async function onClickHandlerDeanlogin(e) {
    try {
      e.preventDefault();
      // console.log(deanData);
      if (!deanData.email.trim() || !deanData.password.trim()) {
        return toast.error("please pass Email and password");
      }
      const res = await axios.post("api/dean/login", deanData);
      // console.log(res.data);
      localStorage.setItem("token", JSON.stringify({ token: res.data.token }));
      localStorage.setItem(
        "auth",
        JSON.stringify({ auth: res.data.deanFound })
      );
      navigate("/deandashboard");
    } catch (error) {
      console.log(error);
      let errorString = "";
      if (error.response.data.errors) {
        error.response.data.errors.forEach((element) => {
          errorString += `${element.msg}`;
          // showAlert({
          //     type : "err",
          //     msg: errorString
          // })
          window.alert(errorString);
        });
      } else {
        errorString = error.response.data.err;
        // showAlert({
        //   type: "error",
        //   msg: errorString
        // })
        window.alert(errorString);
      }
    }
  }
  // ================DEAN PART END====================
  // ================DOCTOR PART START====================
  const [doctorData, setDoctorData] = useState({
    email: "",
    password: "",
  });

  function onChangeHandlerDoctor(e) {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  }

  async function onClickHandlerDoctorlogin(e) {
    try {
      e.preventDefault();
      if (!doctorData.email.trim() || !doctorData.password.trim()) {
        return window.alert("please pass Email and password");
      }
      const res = await axios.post("api/doctor/login", doctorData);
      localStorage.setItem("token", JSON.stringify({ token: res.data.token }));
      localStorage.setItem("auth", JSON.stringify({ auth: res.data.doctor }));
      navigate("/doctordashboard");
    } catch (error) {
      console.log(error);
      let errorString = "";
      if (error.response.data.errors) {
        error.response.data.errors.forEach((element) => {
          errorString += `${element.msg}`;
          // showAlert({
          //     type : "err",
          //     msg: errorString
          // })
          window.alert(errorString);
        });
      } else {
        errorString = error.response.data.err;
        // showAlert({
        //   type: "error",
        //   msg: errorString
        // })
        window.alert(errorString);
      }
    }
  }
  // ================DOCTOR PART END====================

  return (
    <>
      <header className="header">
        <a className="logo" href="#logo">
          <i className="fas fa-heartbeat"></i>Apna hospital
        </a>
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#doctors">Doctors</a>
          <a href="#books">Book</a>
          <a href="#review">Review</a>
          <a href="#blogs">Blogs</a>
          <a href="#feedback">Feedback</a>

          <a className="nav-item dropdown" href="#nothing" id="logintag">
            <Link
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Login
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  onClick={() => setDeanModal(true)}
                >
                  Dean Login
                </Link>
                <Modal
                  isOpen={deanModal}
                  onRequestClose={() => setDeanModal(false)}
                  style={customStyles}
                >
                  <form>
                    <input
                      type="submit"
                      value="close"
                      className="btn"
                      onClick={() => setDeanModal(false)}
                    />
                    <h3>
                      Dean <span>Login</span>
                    </h3>
                    <input
                      type="email"
                      placeholder="Your Email Id"
                      className="box"
                      required
                      name="email"
                      onChange={onChangeHandlerDean}
                    />
                    <input
                      type="password"
                      placeholder="Enter The Password"
                      className="box"
                      required
                      name="password"
                      onChange={onChangeHandlerDean}
                    />

                    <button
                      className="btn"
                      type="submit"
                      onClick={onClickHandlerDeanlogin}
                    >
                      Login
                    </button>
                  </form>
                </Modal>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  onClick={() => setDoctorModal(true)}
                >
                  Doctor Login
                </Link>
                <Modal
                  isOpen={doctorModal}
                  onRequestClose={() => setDoctorModal(false)}
                  style={customStyles}
                >
                  <form>
                    <input
                      type="submit"
                      value="close"
                      className="btn"
                      onClick={() => setDoctorModal(false)}
                    />
                    <h3>
                      Doctor <span>Login</span>
                    </h3>
                    <input
                      type="email"
                      placeholder="Your Email Id"
                      className="box"
                      onChange={onChangeHandlerDoctor}
                      name="email"
                    />
                    <input
                      type="password"
                      placeholder="Your Password"
                      className="box"
                      onChange={onChangeHandlerDoctor}
                      name="password"
                    />

                    <button
                      className="btn"
                      onClick={onClickHandlerDoctorlogin}
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </Modal>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  onClick={() => setResModal(true)}
                >
                  Recepation Login
                </Link>
                <Modal
                  isOpen={resModal}
                  onRequestClose={() => setResModal(false)}
                  style={customStyles}
                >
                  <form>
                    <input
                      type="submit"
                      value="close"
                      className="btn"
                      onClick={() => setResModal(false)}
                    />
                    <h3>
                      Doctor <span>Login</span>
                    </h3>
                    <input
                      type="email"
                      placeholder="Your Email Id"
                      className="box"
                    />
                    <input
                      type="password"
                      placeholder="Patient Address"
                      className="box"
                    />

                    <button className="btn">Login</button>
                  </form>
                </Modal>
              </li>
            </ul>
          </a>
        </nav>
        <div
          id="menu-btn"
          className={`fas fa-bars ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        ></div>{" "}
      </header>
      {/* =============HOME SECTION START============================ */}
      <section className="home" id="home">
        <div className="image">
          <img src="/hospital1.png" alt="img" />
        </div>
        <div className="content">
          <h3>stay safe, stay healthy</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            voluptatibus esse maxime culpa placeat commodi dignissimos doloribus
            eaque id aliquam. Vel laboriosam delectus esse quam assumenda fuga
            praesentium dicta cumque!
          </p>
          <a href="#nothing" className="btn">
            contact us<span className="fas fa-chevron-right"></span>
          </a>
        </div>
      </section>
      <div className="icons-container">
        <div className="icons">
          <i className="fas fa-user-md"></i>
          <h3>140+</h3>
          <p>Doctors at work</p>
        </div>
        <div className="icons">
          <i className="fas fa-users"></i>
          <h4>10Lakh +</h4>
          <p>Satisfied patients</p>
        </div>
        <div className="icons">
          <i className="fas fa-procedures"></i>
          <h3>500+</h3>
          <p>Bed facility</p>
        </div>
        <div className="icons">
          <i className="fas fa-hospital"></i>
          <h3>50+</h3>
          <p>Hospital available</p>
        </div>
      </div>
      {/* =============HOME SECTION END============================ */}
      {/* =============Services SECTION START============================ */}

      <section className="services" id="services">
        <h1 className="heading">
          our <span>services</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <i className="fas fa-notes-medical"></i>
            <h3>free checkup</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quia, necessitatibus aliquid numquam nihil dolor a nemo quisquam!
              Vel debitis sequi ab voluptatibus vero aut excepturi alias ea
              labore quisquam!
            </p>
            <a href="#services" className="btn">
              learn more <span className="fas fa-chevron-right"></span>
            </a>
          </div>
          <div className="box">
            <i className="fas fa-ambulance"></i>
            <h3>24/7 ambulance</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quia, necessitatibus aliquid numquam nihil dolor a nemo quisquam!
              Vel debitis sequi ab voluptatibus vero aut excepturi alias ea
              labore quisquam!
            </p>
            <a href="#services" className="btn">
              learn more <span className="fas fa-chevron-right"></span>
            </a>
          </div>
          <div className="box">
            <i className="fas fa-user-md"></i>
            <h3>export doctors</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quia, necessitatibus aliquid numquam nihil dolor a nemo quisquam!
              Vel debitis sequi ab voluptatibus vero aut excepturi alias ea
              labore quisquam!
            </p>
            <a href="#services" className="btn">
              learn more <span className="fas fa-chevron-right"></span>
            </a>
          </div>
          <div className="box">
            <i className="fas fa-pills"></i>
            <h3>medicines</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quia, necessitatibus aliquid numquam nihil dolor a nemo quisquam!
              Vel debitis sequi ab voluptatibus vero aut excepturi alias ea
              labore quisquam!
            </p>
            <a href="#services" className="btn">
              learn more <span className="fas fa-chevron-right"></span>
            </a>
          </div>
          <div className="box">
            <i className="fas fa-procedures"></i>
            <h3>bed facility</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quia, necessitatibus aliquid numquam nihil dolor a nemo quisquam!
              Vel debitis sequi ab voluptatibus vero aut excepturi alias ea
              labore quisquam!
            </p>
            <a href="#services" className="btn">
              learn more <span className="fas fa-chevron-right"></span>
            </a>
          </div>
          <div className="box">
            <i className="fas fa-heartbeat"></i>
            <h3>total cares</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quia, necessitatibus aliquid numquam nihil dolor a nemo quisquam!
              Vel debitis sequi ab voluptatibus vero aut excepturi alias ea
              labore quisquam!
            </p>
            <a href="#services" className="btn">
              learn more <span className="fas fa-chevron-right"></span>
            </a>
          </div>
        </div>
      </section>
      {/* =============Services SECTION END============================ */}
      {/* =============ABOUT SECTION START============================ */}

      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span>us
        </h1>
        <div className="row">
          <div className="image">
            <img src="/about.webp" alt="about" />
          </div>
          <div className="content">
            <h3>we take care of your healthy life</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              quibusdam non id distinctio suscipit quae impedit voluptatem
              temporibus dignissimos veritatis vero minus iusto, voluptate
              assumenda voluptas ratione neque nemo cum.
            </p>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam,
              illo consectetur. Rerum distinctio adipisci delectus accusamus
              provident assumenda, placeat et ipsum, aliquid optio porro
              quibusdam a molestias voluptas ipsa explicabo.
            </p>
            <a href="#services" className="btn">
              learn more<span className="fas fa-chevron-right"></span>
            </a>
          </div>
        </div>
      </section>
      {/* =============ABOUT SECTION END============================ */}
      {/* =============DOCTORS SECTION START============================ */}

      <section className="doctors" id="doctors">
        <h1 className="heading">
          our <span>doctors</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <img src="/about.webp" alt="doctorspic" />
            <h3>john deo</h3>
            <span>expert doctor</span>
            <div className="share">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="box">
            <img src="/about.webp" alt="doctorspic" />
            <h3>john deo</h3>
            <span>expert doctor</span>
            <div className="share">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="box">
            <img src="/about.webp" alt="doctorspic" />
            <h3>john deo</h3>
            <span>expert doctor</span>
            <div className="share">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="box">
            <img src="/about.webp" alt="doctorspic" />
            <h3>john deo</h3>
            <span>expert doctor</span>
            <div className="share">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="box">
            <img src="/about.webp" alt="doctorspic" />
            <h3>john deo</h3>
            <span>expert doctor</span>
            <div className="share">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="box">
            <img src="/about.webp" alt="doctorspic" />
            <h3>john deo</h3>
            <span>expert doctor</span>
            <div className="share">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
        </div>
      </section>
      {/* =============DOCTOR SECTION END============================ */}
      {/* =============BOOKING SECTION START============================ */}

      <section className="books" id="books">
        <h1 className="heading">
          <span>books</span>now
        </h1>
        <div className="row">
          <div className="image">
            <img src="hospital1.png" alt="Book-now" />
          </div>
          <form action="">
            <h3>Book appointment</h3>
            <input
              type="text"
              placeholder="Patient Name"
              className="box"
              required
              onChange={onChangeHandler}
              value={patientData.patientName}
              name="patientName"
            />
            <select
              className="box"
              name="gender"
              required
              onChange={onChangeHandler}
              value={patientData.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Your Phone Number"
              className="box"
              required
              name="mobileNumber"
              onChange={onChangeHandler}
              value={patientData.mobileNumber}
            />
            <input
              type="email"
              placeholder="Your Email Id"
              className="box"
              required
              onChange={onChangeHandler}
              value={patientData.email}
              name="email"
            />
            <input
              type="text"
              placeholder="Patient Address"
              className="box"
              required
              onChange={onChangeHandler}
              value={patientData.address}
              name="address"
            />

            <select
              name="department"
              className="box"
              required
              value={patientData.department}
              onChange={onChangeHandler}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Enter Doctor Name"
              className="box"
              required
              onChange={onChangeHandler}
              value={patientData.doctorName}
              name="doctorName"
            />

            <input
              type="datetime-local"
              className="box"
              required
              onChange={onChangeHandler}
              value={patientData.appointmentTime}
              name="appointmentTime"
            />
            <button type="submit" className="btn" onClick={onClickHandler}>
              Book Now
            </button>
          </form>
        </div>
      </section>
      {/* =============BOOKING SECTION END============================ */}
      {/* =============REVIEW SECTION START============================ */}

      <section className="review" id="review">
        <h1 className="heading">
          client's <span>review</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <img src="raja.jpg" alt="review" />
            <h3>Rajaram</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor ex
              consequuntur maiores explicabo, aut saepe voluptas officiis
              corporis. Asperiores maiores, adipisci quaerat odio ex nemo porro
              mollitia aliquam architecto reiciendis.
            </p>
          </div>

          <div className="box">
            <img src=" hospital1.png" alt="review" />
            <h3>Rajaram</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor ex
              consequuntur maiores explicabo, aut saepe voluptas officiis
              corporis. Asperiores maiores, adipisci quaerat odio ex nemo porro
              mollitia aliquam architecto reiciendis.
            </p>
          </div>
          <div className="box">
            <img src=" hospital1.png" alt="review" />
            <h3>Rajaram</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor ex
              consequuntur maiores explicabo, aut saepe voluptas officiis
              corporis. Asperiores maiores, adipisci quaerat odio ex nemo porro
              mollitia aliquam architecto reiciendis.
            </p>
          </div>
          <div className="box">
            <img src=" hospital1.png" alt="review" />
            <h3>Rajaram</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor ex
              consequuntur maiores explicabo, aut saepe voluptas officiis
              corporis. Asperiores maiores, adipisci quaerat odio ex nemo porro
              mollitia aliquam architecto reiciendis.
            </p>
          </div>
          <div className="box">
            <img src=" hospital1.png" alt="review" />
            <h3>Rajaram</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor ex
              consequuntur maiores explicabo, aut saepe voluptas officiis
              corporis. Asperiores maiores, adipisci quaerat odio ex nemo porro
              mollitia aliquam architecto reiciendis.
            </p>
          </div>
          <div className="box">
            <img src=" hospital1.png" alt="review" />
            <h3>Rajaram</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor ex
              consequuntur maiores explicabo, aut saepe voluptas officiis
              corporis. Asperiores maiores, adipisci quaerat odio ex nemo porro
              mollitia aliquam architecto reiciendis.
            </p>
          </div>
        </div>
        {/* ========================== */}
      </section>
      {/* =============BLOG SECTION START============================ */}

      <section className="blogs" id="blogs">
        <h1 className="heading">
          our<span>blogs</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <div className="image">
              <img src="raja.jpg" alt="Blogs" />
            </div>
            <div className="content">
              <div className="icon">
                <a href="#blogs">
                  <i className="fas fa-calendar"></i>1st may, 2021
                </a>
                <a href="#blogs">
                  <i className="fas fa-user"></i>by admin
                </a>
              </div>
              <h3>blog title goes here</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
                totam nam pariatur corporis itaque voluptatum laborum id minima
                odio fugit rem accusamus iusto, alias nemo quae temporibus in
                aut tenetur.
              </p>
              <a href="#blogs" className="btn">
                learn more<span className="fas fa-chevron-right"></span>
              </a>
            </div>
          </div>
          <div className="box">
            <div className="image">
              <img src="hospital1.png" alt="Blogs" />
            </div>
            <div className="content">
              <div className="icon">
                <a href="#blogs">
                  <i className="fas fa-calendar"></i>1st may, 2021
                </a>
                <a href="#blogs">
                  <i className="fas fa-user"></i>by admin
                </a>
              </div>
              <h3>blog title goes here</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
                totam nam pariatur corporis itaque voluptatum laborum id minima
                odio fugit rem accusamus iusto, alias nemo quae temporibus in
                aut tenetur.
              </p>
              <a href="#blogs" className="btn">
                learn more<span className="fas fa-chevron-right"></span>
              </a>
            </div>
          </div>
          <div className="box">
            <div className="image">
              <img src="hospital1.png" alt="Blogs" />
            </div>
            <div className="content">
              <div className="icon">
                <a href="#blogs">
                  <i className="fas fa-calendar"></i>1st may, 2021
                </a>
                <a href="#blogs">
                  <i className="fas fa-user"></i>by admin
                </a>
              </div>
              <h3>blog title goes here</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
                totam nam pariatur corporis itaque voluptatum laborum id minima
                odio fugit rem accusamus iusto, alias nemo quae temporibus in
                aut tenetur.
              </p>
              <a href="#blogs" className="btn">
                learn more<span className="fas fa-chevron-right"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* =============REVIEW SECTION END============================ */}
      {/* =============FEEDBACK SECTION END============================ */}

      <section className="feedback" id="feedback">
        <h1 className="heading">
          please Give your valueable <span>Feedback</span>
        </h1>
        <div className="row">
          <div className="image">
            <h3>Lost time is never found again</h3>
            <h1>{time}</h1>
          </div>
          <form action="">
            <h3>Feedback form</h3>
            <input type="text" placeholder="Enter Your Name" className="box" />
            <input type="email" placeholder="Your Email Id" className="box" />
            <input
              type="number"
              placeholder="Your Phone Number"
              className="box"
            />
            <select className="box" name="gender">
              <option value="">Do You Satisfy With Our Service</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <textarea type="text" className="box" placeholder="Write to Us" />

            <button className="btn">Submit</button>
          </form>
        </div>
      </section>
      {/* =============FEEDBACK SECTION END============================ */}

      {/* =============FOOTER SECTION START============================ */}

      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>quick links</h3>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>home
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>services
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>about
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>doctors
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>book
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>review
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>blogs
            </a>
          </div>
          <div className="box">
            <h3>our services</h3>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>dental care
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>massage therapy
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>cardiology
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>diagnosis
            </a>
            <a href="#footer">
              <i className="fas fa-chevron-right"></i>ambulance service
            </a>
          </div>
          <div className="box">
            <h3>contact info</h3>
            <a href="#footer">
              <i className="fas fa-phone"></i>+917008309629
            </a>
            <a href="#footer">
              <i className="fas fa-phone"></i>+918895487864
            </a>
            <a href="#footer">
              <i className="fas fa-envelope"></i>raja@gamil.com
            </a>
            <a href="#footer">
              <i className="fas fa-envelope"></i>doctors@gmail.com
            </a>
            <a href="#footer">
              <i className="fas fa-map-marker-alt"></i>bbsr,odisha
            </a>
          </div>
          <div className="box">
            <h3>follow us</h3>
            <a href="#footer">
              <i className="fab fa-facebook-f"></i>facebook
            </a>
            <a href="#footer">
              <i className="fab fa-twitter"></i>twitter
            </a>
            <a href="#footer">
              <i className="fab fa-instagram"></i>instagram
            </a>
            <a href="#footer">
              <i className="fab fa-linkedin"></i>linkdean
            </a>
          </div>
        </div>
        <div className="credit">
          created by <span>mr. rajaram sahoo</span>|all right reserved
        </div>
      </section>
    </>
  );
};

export default Homepage;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const CreateDoctor = () => {
  const deanData = JSON.parse(localStorage.getItem("auth"));
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

  let navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
    name: "",
    userName: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    department: "",
    addedBy: deanData.auth.name,
  });

  function onChangeHandler(e) {
    console.log(e.target.value);
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  }

  async function onClickHandler(e) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;
      e.preventDefault();
      if (
        !doctorData.name.trim() ||
        !doctorData.userName.trim() ||
        !doctorData.gender.trim() ||
        !doctorData.email.trim() ||
        !doctorData.mobile.trim() ||
        !doctorData.address.trim() ||
        !doctorData.password.trim() ||
        !doctorData.department.trim()
        // !doctorData.addedBy.trim()
      ) {
        return toast.error("please fill up properly");
      }
      // console.log(userData)
      const res = await axios.post("/api/doctor/signup", doctorData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

      toast.success("Doctor profile was created");
      navigate("/doctors");
      setDoctorData({
        name: "",
        userName: "",
        gender: "",
        email: "",
        mobile: "",
        address: "",
        password: "",
        department: "",
        addedBy: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="books" id="books">
      <h1 className="heading">
        <span>Create</span>Doctor
      </h1>
      <div className="row">
        <div className="image">
          <i className="fas fa-user-md"></i>
        </div>
        <form action="">
          <h3>Doctor dAta</h3>
          <input
            type="text"
            placeholder="Doctor Name"
            className="box"
            name="name"
            onChange={onChangeHandler}
            value={doctorData.name}
            required
          />
          <input
            type="text"
            placeholder="Enter Unique Username"
            className="box"
            name="userName"
            onChange={onChangeHandler}
            value={doctorData.userName}
            required
          />

          <select
            className="box"
            name="gender"
            required
            onChange={onChangeHandler}
            value={doctorData.gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            placeholder=" Phone Number"
            className="box"
            name="mobile"
            onChange={onChangeHandler}
            value={doctorData.mobile}
            required
          />
          <input
            type="email"
            placeholder=" Email Id"
            className="box"
            name="email"
            onChange={onChangeHandler}
            value={doctorData.email}
            required
          />
          <input
            type="text"
            placeholder=" Address"
            className="box"
            name="address"
            onChange={onChangeHandler}
            value={doctorData.address}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="box"
            name="password"
            onChange={onChangeHandler}
            value={doctorData.password}
            required
          />
          <input
            type="text"
            placeholder="added by "
            className="box"
            value={doctorData.addedBy}
            name="addedBy"
            required
          />

          <select
            name="department"
            className="box"
            required
            value={doctorData.department}
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
          <button className="btn" onClick={onClickHandler}>
            Submit
          </button>
          <button
            className="btn"
            onClick={() => navigate("/doctors")}
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateDoctor;

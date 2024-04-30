import React from "react";
import "./doctor.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SingleDoctor = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { _id, name, gender, mobile, email, address, department } = state;
  const doctorId = _id;

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
  const [data, setData] = useState({
    newDoctorName: name,
    newGender: gender,
    newMobileNumber: mobile,
    newAddress: address,
    newEmail: email,
    newDepartment: department,
  });
  function onChangeHandler(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.value)
  }
  async function onClickHandler(e, doctorId) {
    try {
      e.preventDefault();
      let token = JSON.parse(localStorage.getItem("token")).token;
      //console.log(token)
      let res = await axios.patch(`/api/doctor/${doctorId}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      window.alert("Updated successfully");
      navigate("/deandashboard/doctors");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteDoctor(doctorId) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;
      await axios.delete(`/api/doctor/${doctorId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      navigate("/deandashboard/doctors");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="books" id="books">
      <h1 className="heading">
        <span>Update</span>Doctor Data
      </h1>
      <div className="row">
        <div className="image">
          {/* <img src="hospital1.png" alt="Book-now" /> */}
          <i className="fas fa-user-md"></i>
        </div>
        <form action="">
          <h3>Doctor Data</h3>
          <input
            type="text"
            className="box"
            name="newDoctorName"
            value={data.newDoctorName}
            onChange={onChangeHandler}
          />
          <select
            className="box"
            name="newGender"
            onChange={onChangeHandler}
            value={data.newGender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            className="box"
            name="newMobileNumber"
            onChange={onChangeHandler}
            value={data.newMobileNumber}
          />
          <input
            type="email"
            className="box"
            name="newEmail"
            onChange={onChangeHandler}
            value={data.newEmail}
          />
          <input
            type="text"
            className="box"
            name="newAddress"
            onChange={onChangeHandler}
            value={data.newAddress}
          />

          <select
            name="newDepartment"
            onChange={onChangeHandler}
            className="box"
            value={data.newDepartment}
          >
            {departmentsArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>
                  {depart}
                </option>
              );
            })}
          </select>

          <button
            className="btn"
            onClick={(e) => onClickHandler(e, doctorId)}
            type="submit"
          >
            Update
          </button>
          <button
            className="btn"
            onClick={() => deleteDoctor(doctorId)}
            type="submit"
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() => navigate("/deandashboard/doctors")}
            type="submit"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default SingleDoctor;

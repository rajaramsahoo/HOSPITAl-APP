import React from 'react'
import axios from "axios";
import { useState } from 'react';
import toast from 'react-hot-toast';
const CreatePatient = () => {
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
  return (
   
    <section className="books" id="books">
    <h1 className="heading">
      <span>books</span>now
    </h1>
    <div className="row">
      <div className="image">
        <img src="/hospital1.png" alt="Book-now" />
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
  )
}

export default CreatePatient
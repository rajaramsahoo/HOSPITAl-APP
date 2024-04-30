import React from "react";
import Header from "../header/DeanHeader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Patients = () => {
  let navigate = useNavigate();
  const [allPatient, setAllPatient] = useState([]);

  async function allPatientData() {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;

      let res = await axios.get("/api/patient", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      setAllPatient(res.data);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  useEffect(() => {
    allPatientData();
  }, []);

  return (
    <>
      <Header />

      <div className="icons-container1">
        {allPatient &&
          allPatient?.map((patient, index) => (
            <div className="icons" key={index}>
              <h3>{patient.name}</h3>
              <p>{patient.email}</p>
              <p>{patient.mobile}</p>
              <p>{patient.gender}</p>
              <p>{patient.address}</p>
              <p>{patient.department}</p>
              <p>{patient.doctorName}</p>
              <p>{patient.appointmentTime}</p>
            </div>
          ))}
        <div className="icons">
          <h3>dr name</h3>
          <p>Email</p>
          <p>Phone</p>
          <p>Gender</p>
          <p>Adress</p>
          <p>dept</p>
        </div>
      </div>
    </>
  );
};

export default Patients;

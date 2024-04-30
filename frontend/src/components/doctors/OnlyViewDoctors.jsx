import React from "react";
import DoctorHeader from "../header/DoctorHeader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const OnlyViewDoctors = () => {
  const [allDoctor, setAllDoctor] = useState([]);
  async function allDoctorData() {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;

      let res = await axios.get("/api/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllDoctor(res.data);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  useEffect(() => {
    allDoctorData();
  }, []);
  return (
    <>
      <DoctorHeader />
      <div className="icons-container1">
        {allDoctor &&
          allDoctor?.map((doc, index) => (
            <div className="icons" key={index}>
              <h3>{doc.name}</h3>
              <p>{doc.email}</p>
              <p>{doc.mobile}</p>
              <p>{doc.gender}</p>
              <p>{doc.address}</p>
              <p>{doc.department}</p>
              
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

export default OnlyViewDoctors;

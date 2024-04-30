import React from "react";
import Header from "../header/DeanHeader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Receptionists = () => {
  let navigate = useNavigate();

  const [allReceptionist, setAllReceptionist] = useState([]);

  async function allReceptionistData() {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;

      let res = await axios.get("/api/receptionist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllReceptionist(res.data);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  useEffect(() => {
    allReceptionistData();
  }, []);
  
  function onClickHandle(_id, name, gender, email, mobile, address) {
    navigate(`/deandashboard/receptionists/${_id}`, {
      state: {
        _id,
        name,
        gender,
        email,
        mobile,
        address,
      },
    });
  }
  return (
    <>
      <Header />
      <div className="icons-container1">
        {allReceptionist &&
          allReceptionist?.map((receptionist, index) => (
            <div
              className="icons"
              key={index}
              onClick={() =>
                onClickHandle(
                  receptionist._id,
                  receptionist.name,
                  receptionist.gender,
                  receptionist.email,
                  receptionist.mobile,
                  receptionist.address
                )
              }
            >
              <h3>{receptionist.name}</h3>
              <p>{receptionist.email}</p>
              <p>{receptionist.mobile}</p>
              <p>{receptionist.gender}</p>
              <p>{receptionist.address}</p>
              <p>{receptionist.department}</p>
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

export default Receptionists;

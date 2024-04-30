import "./receptionist.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SingleReceptionist = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { _id, name, gender, email, mobile, address } = state;
  const referenceNo = _id;

  const [data, setData] = useState({
    newReceptionistName: name,
    newGender: gender,
    newMobileNumber: mobile,
    newAddress: address,
    newEmail: email,
  });
  function onChangeHandler(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  console.log(data.newReceptionistName);

  async function onClickHandler(e, referenceNo) {
    try {
      e.preventDefault();
      let token = JSON.parse(localStorage.getItem("token")).token;
      //console.log(token)
      const res = await axios.patch(`/api/receptionist/${referenceNo}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      navigate("/deandashboard/receptionists");
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteReceptionist(referenceNo) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;
      await axios.delete(`/api/receptionist/${referenceNo}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate("/deandashboard/receptionists");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="books" id="books">
      <h1 className="heading">
        <span>Update</span>Reception Data
      </h1>
      <div className="row">
        <div className="image">
          {/* <img src="hospital1.png" alt="Book-now" /> */}
          <i className="fas fa-user-md"></i>
        </div>
        <form action="">
          <h3>Receptionist Data</h3>
          <input
            type="text"
            className="box"
            name="newReceptionistName"
            value={data.newReceptionistName}
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
          <button
            className="btn"
            onClick={(e) => onClickHandler(e, referenceNo)}
            type="submit"
          >
            Update
          </button>
          <button
            className="btn"
            onClick={() => deleteReceptionist(referenceNo)}
            type="submit"
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={() => navigate("/deandashboard/receptionists")}
            type="submit"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default SingleReceptionist;

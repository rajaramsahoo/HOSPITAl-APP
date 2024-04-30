import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateReceptionist = () => {
  const deanData = JSON.parse(localStorage.getItem("auth"));

  let navigate = useNavigate();
  const [receptionistData, setReceptionistData] = useState({
    name: "",
    userName: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    addedBy: deanData.auth.name,
  });

  function onChangeHandler(e) {
    console.log(e.target.value);
    setReceptionistData({
      ...receptionistData,
      [e.target.name]: e.target.value,
    });
  }

  async function onClickHandler(e) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;

      e.preventDefault();
      if (
        !receptionistData.name.trim() ||
        !receptionistData.userName.trim() ||
        !receptionistData.gender.trim() ||
        !receptionistData.email.trim() ||
        !receptionistData.mobile.trim() ||
        !receptionistData.address.trim() ||
        !receptionistData.password.trim() ||
        !receptionistData.addedBy.trim()
      ) {
        return window.alert("please fill up properly");
      }
      // console.log(userData)
      const res = await axios.post(
        "/api/receptionist/signup",
        receptionistData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      toast.success("Receptionist profile was created");
      If(dea);
      navigate("/receptionists");
      setReceptionistData({
        name: "",
        userName: "",
        gender: "",
        email: "",
        mobile: "",
        address: "",
        password: "",
        addedBy: "",
      });
    } catch (error) {
      console.log(error);
      window.alert(error.response.data);
    }
  }

  return (
    <section className="books" id="books">
      <h1 className="heading">
        <span>Create</span>Receptionist
      </h1>
      <div className="row">
        <div className="image">
          <i className="fas fa-user-md"></i>
        </div>
        <form action="">
          <h3>Receptionist dAta</h3>
          <input
            type="text"
            placeholder="Receptionist Name"
            className="box"
            name="name"
            onChange={onChangeHandler}
            value={receptionistData.name}
            required
          />
          <input
            type="text"
            placeholder="Enter Unique Username"
            className="box"
            name="userName"
            onChange={onChangeHandler}
            value={receptionistData.userName}
            required
          />

          <select
            className="box"
            name="gender"
            required
            onChange={onChangeHandler}
            value={receptionistData.gender}
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
            value={receptionistData.mobile}
            required
          />
          <input
            type="email"
            placeholder=" Email Id"
            className="box"
            name="email"
            onChange={onChangeHandler}
            value={receptionistData.email}
            required
          />
          <input
            type="text"
            placeholder=" Address"
            className="box"
            name="address"
            onChange={onChangeHandler}
            value={receptionistData.address}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="box"
            name="password"
            onChange={onChangeHandler}
            value={receptionistData.password}
            required
          />
          <input
            type="text"
            placeholder="added by "
            className="box"
            value={receptionistData.addedBy}
            name="addedBy"
            required
          />

          <button className="btn" onClick={onClickHandler}>
            Submit
          </button>
          <button className="btn" onClick={() => navigate("/receptionists")}>
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateReceptionist;

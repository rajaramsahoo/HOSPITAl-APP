import React from "react";
import { useNavigate } from "react-router-dom";
const DeanProfile = () => {
  const navigate = useNavigate()
  const deanData = JSON.parse(localStorage.getItem("auth"));
  return (
    <section className="books" id="books">
      <h1 className="heading">
        Welcome dean<span>{deanData.auth.name}</span>
      </h1>
      <div className="row">
        <div className="image">
          <i className="fas fa-user-md"></i>
        </div>
        <form action="">
          <h3>u want to update</h3>
          <input
            type="text"
            placeholder="Receptionist Name"
            className="box"
            name="name"
            value={deanData.auth.name}
            required
          />
          <input
            type="text"
            placeholder="Enter Unique Username"
            className="box"
            name="userName"
            value={deanData.auth.email}
            required
          />

          <select
            className="box"
            name="gender"
            required
            value={deanData.auth.gender}
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
            value={deanData.auth.mobile}
            required
          />
          <input
            type="email"
            placeholder=" Email Id"
            className="box"
            name="email"
            value={deanData.auth.address}
            required
          />

          <button
            className="btn"
            onClick={() => navigate("/deandashboard")}
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default DeanProfile;

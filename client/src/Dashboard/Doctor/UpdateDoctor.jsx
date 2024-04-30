import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useLocation } from 'react-router-dom';




function UpdateDoctor() {

  let navigate = useNavigate();
  const { state } = useLocation();
  const { _id, name, gender, mobile, email, address, department } = state
  const doctorId = _id


  const [data, setData] = useState({
    newDoctorName: name,
    newGender: gender,
    newMobileNumber: mobile,
    newAddress: address,
    newEmail: email,

    newDepartment: department,
  })
  function onChangeHandler(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  async function onClickHandler(e, doctorId) {
    try {

      e.preventDefault();
      let token = JSON.parse(localStorage.getItem('token')).token;
      //console.log(token)
      let res = await axios.patch(`/api/doctor/${doctorId}`, data, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      console.log(res.data)
      window.alert("Updated successfully");
      navigate("/dean/alldoctor");
    }
    catch (error) {
      console.log(error)
    }
  }




  return (
    <>
      <div>
        <center>
          <form>
            <label>
              Enter the Doctor Name:
              <input type="text" name="newDoctorName" onChange={onChangeHandler} value={data.newDoctorName} />
            </label>
            <br />
            <label>
              Gender :
              <input type="text" name="newGender" onChange={onChangeHandler} value={data.newGender} />
            </label>
            <br />
            <label>
              Enter the Email :
              <input type="text" name="newEmail" onChange={onChangeHandler} value={data.newEmail} />
            </label>
            <br />
            <label>
              Enter the Mobile Number   :
              <input type="text" name="newMobileNumber" onChange={onChangeHandler} value={data.newMobileNumber} />
            </label>
            <br />
            <label>
              Enter the Adress :
              <input type="text" name="newAddress" onChange={onChangeHandler} value={data.newAddress} />
            </label>
            <br />
            <label>
              Enter the DEPT :
              <input type="text" name="newDepartment" onChange={onChangeHandler} value={data.newDepartment} />
            </label><br />
            <button type="submit" onClick={(e) => onClickHandler(e, doctorId)}>Update The Doctor Data</button>
          </form>
        </center>
      </div>
    </>
  )
}

export default UpdateDoctor
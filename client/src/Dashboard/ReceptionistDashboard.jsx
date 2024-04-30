import React from 'react'
import { useNavigate } from 'react-router-dom'




function ReceptionistDashboard() {

  let navigate = useNavigate()


  function onChangeHandler1(e) {
    e.preventDefault();
    const selectedValue = e.target.value;
   
    if (selectedValue === "View all Patient") {
      navigate("/allpatients");
    }
    if (selectedValue === "Create A Patient") {
      navigate("/createpatient");
    }
  }
  
  

  return (
    <>
      <h1>Receptionist Dashboard</h1>
      <div>
        <h3>View Patient Data</h3>
        <select onChange={onChangeHandler1}>
          <option>select</option>
          <option value="View all Patient">View all Patient</option>
          <option>Search a Patient</option>
          <option value="Create A Patient">Create A Patient</option>
        </select>
      </div>
    </>
  )
}

export default ReceptionistDashboard
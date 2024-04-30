import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



function ViewAllReceptionist() {
  let navigate = useNavigate();

  const [allReceptionist, setAllReceptionist] = useState([])

  async function allReceptionistData() {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token

      let res = await axios.get("/api/receptionist", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(res.data)
      setAllReceptionist(res.data)
    }
    catch (error) {
      console.log(error)
      window.alert(error)
    }
  }

  useEffect(() => {
    allReceptionistData()
  }, [])


  async function deleteReceptionist(referenceNo) {
    try {
      let token = JSON.parse(localStorage.getItem('token')).token
      await axios.delete(`/api/receptionist/${referenceNo}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      let updatedReceptionist = allReceptionist.filter((ele) => ele._id !== referenceNo);
      setAllReceptionist(updatedReceptionist);
      window.alert(`Successfully Deleted`)
    }
    catch (error) {
      console.log(error)
    }
  }


  function onClickHandle(_id, name, gender, email, mobile, address, password) {

    navigate(`/receptionist/edit/${_id}`, {
      state: {
        _id, name, gender, email, mobile, address, password

      }
    })
  }


  return (
    <>
      <center>
        <h1>All Receptionist Data</h1>
        <table>
          <thead>
            <tr>
              <th >Sl No</th>
              <th>Receptionist Id</th>
              <th>Receptionist Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th >Contact No</th>
              <th>Address</th>
              <th>Added by</th>
              <th className='eye'>👉🏿</th>
              <th className='eye'>🗑️</th>
              <th className='eye'>✏️</th>
            </tr>
          </thead>

          {
            allReceptionist.map((receptionist, index) => {
              return (
                <tbody key={receptionist._id}>
                  <tr>

                    <td >{index + 1}</td>
                    <td>{receptionist._id}</td>
                    <td>{receptionist.name}</td>
                    <td>{receptionist.gender}</td>
                    <td>{receptionist.email}</td>
                    <td >{receptionist.mobile}</td>
                    <td>{receptionist.address}</td>
                    <td>{receptionist.addedBy} </td>
                    <td className='eye'><Link to={`/receptionist/view/${receptionist._id}`}>👉🏿</Link></td>
                    <td className='eye' onClick={() => deleteReceptionist(receptionist._id)}>🗑️</td>
                    <td className='eye'><button type="edit" title="Edit" onClick={()=>onClickHandle(receptionist._id,
                      receptionist.name,receptionist.gender,receptionist.email,
                      receptionist.mobile,receptionist.address,receptionist.password)}>✏️</button></td>
                  </tr>
                </tbody>
              )
            })
          }


        </table>
      </center>

    </>
  )
}

export default ViewAllReceptionist
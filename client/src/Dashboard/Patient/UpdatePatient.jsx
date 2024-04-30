import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useLocation } from 'react-router-dom';



function UpdatePatient() {
   

    let navigate = useNavigate();
    const { state } = useLocation();

    const { _id, patientName, gender, mobileNumber, email, address, aadhar, department, doctorName, appointmentTime }
     = state
    const referenceNo = _id
    // console.log(state)

    const [data, setData] = useState({
        newPatientName: patientName,
        newGender: gender,
        newMobileNumber: mobileNumber,
        newAddress: address,
        newEmail: email,
        newAadhar: aadhar,
        newDepartment: department,
        newDoctorName: doctorName,
        newAppointmentTime: appointmentTime
    })
    function onChangeHandler(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    async function onClickHandler(e, referenceNo) {
        try {
            e.preventDefault();
            let token = JSON.parse(localStorage.getItem('token')).token;
            //console.log(token)
            let res = await axios.patch(`/api/patient/${referenceNo}`, data, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            // console.log(res.data)

            window.alert("Updated successfully");
            navigate("/allpatients");
        } catch (error) {
            let errorString = "";
            //handling express validator errors
            if (error.response.data.errors) {
                error.response.data.errors.forEach((ele) => {
                    errorString += `${ele.msg} `
                })
                // showAlert({
                //   type: "error",
                //   msg: errorString
                // })
                window.alert(errorString)

            }
            else {
                //Custom errors
                errorString = error.response.data.error;
                // showAlert({
                //   type: "error",
                //   msg: errorString
                // })
                window.alert(errorString)

            }
        }

    }

    return (
        <>
            <div>

                <center>
                    <form>
                        <label>
                            Enter the Patient Name:
                            <input type="text" name="newPatientName" onChange={onChangeHandler} value={data.newPatientName} />
                        </label>
                        <br />
                        <label>
                            Gender :
                            <input type="text" name="newGender" onChange={onChangeHandler} value={data.newGender} />
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
                            Enter the Email :
                            <input type="text" name="newEmail" onChange={onChangeHandler} value={data.newEmail} />
                        </label><br />
                        <label>
                            Enter the Aadhar :
                            <input type="Number" name="newAadhar" onChange={onChangeHandler} value={data.newAadhar} />
                        </label><br />
                        <label>
                            Enter the DEPT :
                            <input type="text" name="newDepartment" onChange={onChangeHandler} value={data.newDepartment} />
                        </label><br />
                        <label>
                            Enter the Dr. Name :
                            <input type="text" name="newDoctorName" onChange={onChangeHandler} value={data.newDoctorName} />
                        </label><br />
                        <label>
                            Enter the Appiontment Date :
                            <input type="datetime-newAppointmentTime" name="appointmentTime" onChange={onChangeHandler} value={data.newAppointmentTime} />
                        </label>
                        <br />
                        <button type="submit" onClick={(e) => onClickHandler(e, referenceNo)}>UpDate  The Patient Data</button>
                    </form>

                </center>

            </div>

        </>
    )
}

export default UpdatePatient
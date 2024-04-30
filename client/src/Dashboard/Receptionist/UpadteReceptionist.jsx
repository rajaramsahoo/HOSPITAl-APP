import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useLocation } from 'react-router-dom';




function UpadteReceptionist() {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { _id, name, gender, email, mobile, address, password } = state
    console.log(state)
    const referenceNo = _id
    const [data, setData] = useState({
        newReceptionistName: name,
        newGender: gender,
        newMobileNumber: mobile,
        newAddress: address,
        newEmail: email,
        newPassword: password

    })
    function onChangeHandler(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }



    async function edit(e, referenceNo) {
        try {
            e.preventDefault();
            let token = JSON.parse(localStorage.getItem('token')).token;
            //console.log(token)
            let res = await axios.patch(`/api/receptionist/${referenceNo}`, data, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            console.log(res.data)
            window.alert("Updated successfully");
            navigate("/dean/allreceptionist");
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
                            Enter the Receptionist Name:
                            <input type="text" name="newReceptionistName" onChange={onChangeHandler} value={data.newReceptionistName} />
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
                            Enter the Password :
                            <input type='text' name="newPassword" onChange={onChangeHandler} value={data.newPassword} />
                        </label><br />
                        <button type="submit" onClick={(e) => edit(e, referenceNo)}>Edit Recepoinist Data</button>
                    </form>
                </center>
            </div>
        </>
    )
}

export default UpadteReceptionist
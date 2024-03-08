import React from 'react'
import axios from "axios";
import mycontext from '../Context/Context';
import {useContext } from 'react';
export default function Register() {
   const {registerdata,setRegisterdata} = useContext(mycontext)
    const handleChange = (key, value) => {
        setRegisterdata({ ...registerdata, [key]: value });
    };
    const register = async () => {
        try {
            const response = await axios.post("http://localhost:5000/User/registration",registerdata );
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div>  <label>register</label>
    <input
        type='text'
        value={registerdata.username}
        placeholder='Username...'
        onChange={(e) => handleChange("username", e.target.value)}
    />
    <input
        type='text'
        value={registerdata.password}
        placeholder='Password...'
        onChange={(e) => handleChange("password", e.target.value)}
    />
    <button onClick={()=>{register()}}>Register</button>
    </div>
  )
}

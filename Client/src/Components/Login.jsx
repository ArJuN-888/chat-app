import React, { useContext } from 'react'
import axios from "axios";
import mycontext from '../Context/Context';
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const {loginData,setLogindata} = useContext(mycontext)
  const nav= useNavigate()
console.log("lgindt",loginData)
    const handleLoginChange = (key, value) => {
        setLogindata({ ...loginData, [key]: value });
    };
    const login = async () => {
        try {
            const response = await axios.post("http://localhost:5000/User/logindata",loginData );
            alert(response.data.message);
            localStorage.setItem("userID",response.data.id)
            localStorage.setItem("User",response.data.name)
            nav("/Home")
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div>

<label>login</label>
            <input
                type='text'
                value={loginData.username}
                placeholder='Username...'
                onChange={(e) => handleLoginChange("username", e.target.value)}
            />
            <input
                type='text'
                value={loginData.password}
                placeholder='Password...'
                onChange={(e) => handleLoginChange("password", e.target.value)}
            />
            <button onClick={login}>Login</button>

    </div>
  )
}

import React, { useContext } from 'react'
import GetID from './Hooks/Getuserid'
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import Getname from './Hooks/Getname'
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
export default function Navbar() {
  const {setCurrentChat,setMessages,setChat} = useContext(mycontext)
    const userID = GetID()
    const username = Getname()
    const nav = useNavigate()
    const Logststate = () =>{
     if(userID)
     {
        localStorage.removeItem("userID")
        localStorage.removeItem("User")
        setCurrentChat(null)
        setMessages(null)
        setChat([])

        nav("/Login")
     }
    
    }
  return (
    <>
    <nav style={{
        display:"flex",
        justifyContent:"center",
       fontFamily:"monospace",
    }}>
       <label style={{
    
        fontSize:"18px"
       }}>Personal-Chat</label>
      <ul style={{
        display:"flex",
        justifyContent:"center",
        gap:"20px",
        listStyleType:"none",
        fontSize:"18px"
    }}>
  
        {userID ? <>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{username}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logststate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>:<>
        <li><Link style={{textDecoration:"none"}} to="/Login">Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Adminlogin">Admin-Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Register">Register</Link></li>
        </> }
        
     
        </ul>
        </nav>
    </>
  )
}

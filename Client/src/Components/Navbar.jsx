import React, { useContext } from 'react'
import GetID from './Hooks/Getuserid'
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import Getname from './Hooks/Getname'
import GetadminID from './Hooks/GetadminID';
import Getadminname from './Hooks/Getadminname';
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
export default function Navbar() {
  const {setCurrentChat,setMessages,setChat} = useContext(mycontext)
    const userID = GetID()
    const adminID = GetadminID()
    const username = Getname()
    const adminName = Getadminname()
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
     const Logadminout = () =>{
      if(adminID)
      {
    
         setCurrentChat(null)
         setMessages(null)
         setChat([])
         localStorage.removeItem("adminName")
         localStorage.removeItem("adminID")
         nav("/AdminLogin")
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
  {adminID ? <>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{adminName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logadminout()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>:""}
        {userID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{username}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logststate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {(!adminID && !userID) && <>
        <li><Link style={{textDecoration:"none"}} to="/Login">Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Adminlogin">Admin-Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Register">Register</Link></li>
        </> }
        
     
        </ul>
        </nav>
    </>
  )
}

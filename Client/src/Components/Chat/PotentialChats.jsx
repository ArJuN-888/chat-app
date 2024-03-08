import React, { useContext, useEffect } from 'react'
import mycontext from '../../Context/Context'
import axios from "axios"
import GetID from '../Hooks/Getuserid';
import { HiOutlineStatusOnline } from "react-icons/hi";
export default function PotentialChats() {
    const {potentialChats,baseURL,chat,setChat,onlineUsers,setOnlineUsers} = useContext(mycontext)
    console.log("Potentialchat",potentialChats)
    const userID = GetID()
 
    const Createchat = async(firstId,secondId) =>{
        try{
            const response = await axios.post(`${baseURL}/Chat`,{firstId,secondId})
            setChat((prev)=> [...prev,response.data])
           
        }
catch(error)
{
    alert(error.response.data.message)
}
      
    }
  return (
    <div>
        <div className="all-users" style={{cursor:"pointer",textAlign:"center"}}>
            <label style={{margin:"0px 0px 11.6px 0px"}} className='ms-2  fs-6'>New chat</label>
            {potentialChats && potentialChats.map((u,index)=>{
                return(
<div className="single-user p-2 ms-2 mb-1 d-flex " key={index} onClick={()=>{Createchat(userID,u._id)}}>
     {u.username}
   {onlineUsers.some((user)=>user?.userID === u._id) ? <HiOutlineStatusOnline style={{fontSize:"20px",color:"yellow"}} /> : ""}
</div>
            )})}

        </div>
    </div>
  )
}

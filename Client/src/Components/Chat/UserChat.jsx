import React, { useContext } from 'react'
import { useFetchRecipient } from '../Hooks/FetchRecipient'
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import mycontext from '../../Context/Context';
const UserChat = ({chat,userID}) => {
const {onlineUsers} = useContext(mycontext)
 const {recipientUser} = useFetchRecipient(chat,userID)
 const isOnline = onlineUsers.some((user)=>user?.userID === recipientUser?._id) 
 console.log("rgth", recipientUser)
  return (
    <>
    <div style={{
        display:"flex",
        cursor:"pointer",
        color:"white",
        fontSize:"15px",
        boxShadow:"0px 0px 6px 0px grey",
        borderRadius:"10px"
    }} className='user-card  align-items-center p-2  justify-content-between'>
 <div className='d-flex'>
   
<div className='me-2'>
<FaUserCircle style={{
  fontSize:"30px"
}} />
</div>
<div className='text-content'>
{recipientUser && recipientUser.username && (
  <div className='name '>{recipientUser.username}</div>
)}
  <div className='text'>text message</div>
</div>
 </div>
 <div className="d-flex flex-column align-items-end">
    <div className='date'>10/02/2024</div>
    <div className='this-user-notifications'>2</div>
    <span className="user-online">{isOnline ? <HiOutlineStatusOnline  style={{fontSize:"20px",color:"yellow"}} /> : "" }</span>
 </div>
    </div>
    </>
  )
}
export default UserChat

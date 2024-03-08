import React, { useContext,useState } from 'react'
import GetID from '../Hooks/Getuserid'
import { BiSolidSend } from "react-icons/bi";
import moment from "moment"
import "../Styles/Chat.css"
import { BiChat } from "react-icons/bi";
import axios from 'axios';
import {Stack} from "react-bootstrap"
import { useFetchRecipient } from '../Hooks/FetchRecipient'
import mycontext from '../../Context/Context'
import InputEmoji from "react-input-emoji"
export default function Chatbox() {
    const {currentChat,messages,setMessages,baseURL,setNewMessage} = useContext(mycontext)
    const [textMessage,setTextMessage] = useState("")
    console.log("tmess",textMessage)
   const userID = GetID()
   const {recipientUser} = useFetchRecipient(currentChat,userID)

   if(!recipientUser) return (<p style={{display:"grid",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"}}>No Conversation Selected yet...</p>)
   const SendTextMessage = async(textMessage,userID,currentchatid) =>{
     
      try{
        if(!textMessage) return alert("You must type something....")
        const response = await axios.post(`${baseURL}/Message`,{
            chatId:currentchatid,
            senderId:userID,
            text:textMessage
            })
            setNewMessage(response.data)
            setMessages((prev)=>[...prev,response.data])
            setTextMessage("")
    }
    catch(error)
    {
        // alert(error.response.data.message)
    }
  
   }
  return (
  <Stack gap={4} className='chat-box'>
   <div className='chat-header '>
    <label style={
        {
            color:"black"
        }
    }>{recipientUser?.username}</label> <BiChat style={{color:"black"}} />  
   </div>
   <Stack gap={3} className='messages'>
  {messages && messages.map((message,index)=><Stack key={index} className={`${message?.senderId === userID ? "message-s bg-secondary p-2 me-3 self align-self-end  flex-grow-0" : 
   "message-r  p-2 ms-3 self align-self-start flex-grow-0" }` }>
    <span style={{fontSize:"18px"}}>{message.text}</span>
    <span style={{fontSize:"12px"}}>{moment(message.createdAt).calendar()}</span>
  </Stack>)}
   </Stack>
   <Stack direction="horizontal"  className='chat-input flex-grow-0'>
   <InputEmoji    value={textMessage} onChange={setTextMessage} fontFamily="monospace"   borderColor='rgb(0,0,0,0.3)'  />
   <button style={{borderRadius:"50%",padding:"5px 7px 8px 10px"}} className='send-btn me-3 border-0 ' onClick={()=>{SendTextMessage(textMessage,userID,currentChat._id)}} ><BiSolidSend 
   style={{
    fontSize:"25px",
    
}} /></button>
   </Stack>
  </Stack>
  )
}

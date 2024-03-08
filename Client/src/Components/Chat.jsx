import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import UserChat from "./Chat/UserChat"
import Chatbox from './Chat/Chatbox'
import "./Styles/Chat.css"
import mycontext from '../Context/Context'
import GetID from './Hooks/Getuserid'
import Spinner from 'react-bootstrap/Spinner';
import PotentialChats from './Chat/PotentialChats'
export default function Chat() {
    const userID = GetID()
   const {baseURL,setPotentialChats,chat,setChat,currentChat,setCurrentChat,messages,setMessages} = useContext(mycontext)
    console.log("currentchat",currentChat)
    console.log("messagesofuser",messages)
    const [loading,setLoading] = useState(true)
   
    // console.log("chatofuser",chat)
    useEffect(()=>{
        fetchuserchat()
   
    },[])
    useEffect(()=>{
      fetchMessages()
    },[currentChat])
    useEffect(()=>{
      getUsers()
       },[chat])
       //fetching user -> recipient (ties)
    const fetchuserchat = async() =>{
        try{
            
            const response = await axios.get(`${baseURL}/Chat/${userID}`)
            setChat(response.data)
            setLoading(false)
        }
      catch(error)
      {
        alert(error.response.data.message)
      }
    }
    //user current chat
    const fetchMessages = async() =>{
      try{
          
          const response = await axios.get(`${baseURL}/Message/${currentChat?._id}`)
          setMessages(response.data)
          setLoading(false)
      }
    catch(error)
    {
      alert(error.response.data.message)
    }
  }
    const getUsers = async() =>{
      try{
          
          const response = await axios.get(`${baseURL}/User/getusers`) 
          //filter=>pchat means potential users that are new
        console.log("allusers",response.data.users)
       const pchats =  response.data.users.filter((u)=>{
        let isChatCreated = false
        if(userID === u._id) return false
          if(chat){
         isChatCreated = chat.some((chat)=>{
              return chat.members[0] === u._id || chat.members[1] === u._id 
            })
          }
          return !isChatCreated
       });
           setPotentialChats(pchats) 
      }
    catch(error)
    {
      alert(error.response.data.message)
    }
  }
  return (
    <div className='main-parent'>
    <div style={{ fontFamily:"monospace",fontSize:"20px",display:"flex",gap:"6px"}}>
      <PotentialChats/>
        {chat.length<1  ? null : 
       
           <div className='message-box  d-flex flex-column  ' >
               <label className='ms-2 fs-6 ' style={{textAlign:"center",margin:"6px 0px 0px 0px"}}>Previous Chats</label>
            {loading===true && <Spinner animation="border" variant="danger" />}
            {chat.map((chat,index)=>{
                return(
                    <div key={index} onClick={()=>setCurrentChat(chat)}>
                    
  <UserChat  chat={chat} userID = {userID}/>

                    </div>
                )
                                
})}
        
           
            </div>
          
        }
          <div className='chat-box-container ms-2'><Chatbox/></div>
    </div>
    </div>
  )
}

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/Login';
import mycontext from "./Context/Context";
import Register from './Components/Register';
import Navbar from "./Components/Navbar";
import GetID from "./Components/Hooks/Getuserid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Components/Chat";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"
import { AdminLogin } from "./Components/AdminLogin";
function App() {
    const [registerdata,setRegisterdata] = useState({username:"",password:""})
    const [loginData,setLogindata] = useState({username:"",password:""})
    const [socket,setSocket] = useState(null)
    //not assigned a chat mainly new users
    const [potentialChats,setPotentialChats] = useState([])
    //userchat
    const [currentChat,setCurrentChat] = useState(null)
    const baseURL = "http://localhost:5000"
    const [chat,setChat] = useState([])
    //recipient messages
    const [messages,setMessages] = useState(null)
    //newmessage
    const [newMessage,setNewMessage] = useState(null)
    //online users
    const [onlineUsers,setOnlineUsers] = useState([])
    console.log("Online users",onlineUsers)
    const userID = GetID()
    useEffect(()=>{
        //establishing socket io connection
  const newSocket = io("http://localhost:8080")
  setSocket(newSocket)
  return ()=>{
    newSocket.disconnect()
  }
    },[userID])
    //add online users
    useEffect(()=>{
        //event triggering
        if(socket === null) return
socket.emit("addNewUser",userID)
//getting response from socket io server via emit
socket.on("getOnlineUsers",(res)=>{
  setOnlineUsers(res)
})
return () =>{
    socket.off("getOnlineUsers")
}

    },[socket])
    //send message

  useEffect(()=>{
        //event triggering
        if(socket === null) return
        const recipientId = currentChat?.members?.find((id)=> id !== userID)
   socket.emit("sendMessage",{...newMessage,recipientId})

    },[newMessage]);
    //recieve message to recipient via socket
    useEffect(()=>{
        //event triggering
        if(socket === null) return
  socket.on("getMessage",(res)=>{
  if(currentChat?._id !== res.chatId) return 
  setMessages((prev)=> [...prev,res])
  })
 return ()=>{
    socket.off("getMessage")
 } 

    },[socket,currentChat]);
const contextdata = {
    registerdata,setRegisterdata,
    loginData,setLogindata,
    chat,setChat,
    potentialChats,setPotentialChats,
    currentChat,setCurrentChat,
    messages,setMessages,
    newMessage,setNewMessage,
    onlineUsers,setOnlineUsers,
    baseURL
}
    return (
        <>
          

         <BrowserRouter>
        <mycontext.Provider value={contextdata}>
        <Navbar/>
         <Routes>
         <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Chat" element={<Chat/>}/>
            <Route path="/Adminlogin" element={<AdminLogin/>}/>
         </Routes>
         </mycontext.Provider>
         </BrowserRouter> 

       
        </>
    );
}

export default App;

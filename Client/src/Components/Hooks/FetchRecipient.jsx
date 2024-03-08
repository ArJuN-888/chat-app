import axios from "axios";
import mycontext from "../../Context/Context";
import { useEffect, useState,useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
export const useFetchRecipient = (chat,userID)=>{
    const {baseURL} = useContext(mycontext)
    const [recipientUser,setRecipientUser] = useState(null)
   
    const recipientid = chat?.members?.find((id)=> id !== userID)
   
   useEffect(()=>{
    const fetchrecipient = async() =>{
        try{
          if(!recipientid) {
            return (<><Spinner animation="border" variant="danger" /></>)
          }
          else
          {
            const response = await axios.get(`${baseURL}/User/find/${recipientid}`)
            setRecipientUser(response.data.user)
          }
      
        }
     catch(error)
     {
       console.log(error.response.data.message)
     }
    }
    fetchrecipient()
   },[recipientid])
   return {recipientUser}
}
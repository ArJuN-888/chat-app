const {user} = require("../Model/Userschema")
const express = require("express")
const router = express.Router()
router.post("/registration",async(req,res)=>{
    try{
        const {username,password} = req.body
        console.log("usernamepassword",username,password)
        if(!username || !password)
        {
            return res.status(400).json({message:"empty fields"}) 
        }
        const User = await user.findOne({username})
        if(User)
        {
            return res.status(400).json({message:"Username already taken"})
        }
        const data = new user({username,password})
        await data.save()
         res.status(200).json({message:"Successfully added to DB"})
    }
    catch(error){
        res.status(400).json({message:"Unable to add",error})
    }
 
})
router.post("/logindata",async(req,res)=>{
    try{
        const {username,password} = req.body
        if(!username || !password)
        {
            return res.status(400).json({message:"empty fields"}) 
        }
        const User = await user.findOne({username}) 
        if(User.password !== password)
        {
            return res.status(400).json({message:"password doesnt match"}) 
        }
        res.status(200).json({message:"Successfully logged in",name:username,id:User._id})
    }
    catch(error){
        res.status(400).json({message:"Unable to login",error})
    }
})
router.get("/getusers",async(req,res)=>{
    try{
       const users = await user.find({})
        res.status(200).json({users:users})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch",error})
    }
})
router.get("/find/:id",async(req,res)=>{
    try{
        console.log("id",req.params.id)
       const User = await user.findById(req.params.id)
        res.status(200).json({user:User})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch individual user",error})
    }
})
module.exports =  router
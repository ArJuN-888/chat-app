const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {adminModel} =require('../Model/Admin.js')


router.post("/register",async(req,res)=>{
    const {email,password}=req.body;

    const admin=await adminModel.findOne({email})

    if(admin){
        return res.json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newAdmin=new adminModel({email,password:hashedPassword})
    await newAdmin.save()
    res.json({message:"Admin registered successfully!!! "})
})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const admin=await adminModel.findOne({email})
    console.log(admin);
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!admin){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,admin.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : admin._id},"secret")
   return res.status(200).json({message:"Successfully logged-in",token:token,adminID:admin._id})
}
catch(error)
{
    return res.status(400).json({message:"error login !!!"})
}


})

module.exports=router
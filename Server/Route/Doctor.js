const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {doctorModel} = require('../Models/Doctor.js')
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const passuser=/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/

router.post("/register",async(req,res)=>{
try
{
    const {username,email,password,passid,department}=req.body;

    const doctor=await teacherModel.findOne({email})
    if( !username || !email || !password || !department || !passid ) 
    {
        return res.json({message:" Empty Fields !!!"})
    }
    if(doctor){
        return res.json({message:" email already in use !!!"})
    }
    if(!username.match(passuser))
    {
        return res.status(400).json({message:" Password should contain Minimum 8 characters,Only contains alphanumeric characters, underscore and dot.Underscore and dot can't be at the end or start of a username.Underscore and dot can't be next to each other.Underscore or dot can't be used multiple times in a row .",}); 
    }
    const isEmailValid = mailformat.test(email) && txt.test(email);
    if (!isEmailValid) {
        return res.status(400).json({ message: "Enter a valid email" });
    }
    if (!password.match(passformat)) 
    {
        return res.status(400).json({message:" Password should contain Minimum 8 characters At least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newDoctor=new doctorModel({email,password:hashedPassword,username,department,passid})
    await newDoctor.save()
    res.json({message:"Doctor Registration Successfull "})
}
catch(error)
{
    return res.status(400).json({message:"Error in Doctor Registration"})
}

})


router.post("/login",async(req,res)=>{
    try{
    const {username,password} = req.body
    const doctor=await doctorModel.findOne({username})
    if(!username || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!doctor){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,doctor.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : doctor._id},"secret")
   return res.status(200).json({message:"Successfully logged-in",token:token,doctorID:doctor._id})
}
catch(error)
{
    return res.status(400).json({message:"Error in Doctor Login!!!"})
}


})

module.exports=router
const express=require("express");
const router=express.Router();
const {User}=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/register",async (req,res)=>{

try {
    const {name,email,gender,password}=req.body
    const user=await User.findOne({email})
    if(user){
        return res.json({msg:"User already exists"})
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const newUser=await User.create({name,email,gender,password:hashedPassword})
    res.status(200).json(newUser);
} catch (error) {
    res.status(400).json({msg:"Error for registring new user"})
}

})


router.post("/login" ,async ()=>{
    try {
        const {email,password}=req.body;
        const user=await User.find({email})

        if(user.length===0){
            return res.json("Sign up first");
        } 
        
        const checkforpassword=await bcrypt.compare(password,user[0].password);
        if(!checkforpassword){
            return res.json("invalid credentials");
        }
 const token =jwt.sign({userId:user[0]._id},process.env.secret)
 res.json({email,token})

    } catch (error) 
    {
        res.status(400).json({msg:"Error"})
        
    }
})

module.exports=router;
const express=require("express");
const router=express.Router();

const jwt=require("jsonwebtoken");
const {Post}=require("../models/postModel");

const middleware=async(req,res,next)=>{
    const token=req.header('Authtoken');
    if(!token){
        return res.status(401).json({msg:"No token provided"});
    }
    try {
        let decoded=jwt.verify(token,process.env.securityKey)
        req.userId=decoded.userId
        next();
    } catch (error) {
        res.status(401).json({msg:"Authorization denied. Invaliad token"});
        
    }
}
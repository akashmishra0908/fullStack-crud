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


router.post("/create",middleware,async(req,res)=>{
try {
    let {title,body,device}=re.body;
    const obj={
        title,
        body,
        device,
        author:req.userId
    }
const post=await Post.create(obj);
res.status(200).json({post})


} catch (error) {
    res.status(400).json({msg:"Error"})
}
})

router.get("/",middleware, async(req,res)=>{
    try {
        const {device,page}=req.query;
        let skip;
        if(page){
            skip=(page-1)*3
        }
        
    else {
        skip=0;
    }
    let query={author:req.userId}
    if(device){
        query.device=device;
    }
const postData=await Post.find(query).skip(skip).limit(3);
res.status(200).json(postData);

    } catch (error) {
        res.status(400).json({msg:"Error"});
    }
})


router.patch("/update/:id",middleware, async(req,res)=>{

    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            res.send("post not there");
        }
        if(post.author.toString()!==req.userId) {
            res.send("Not Authorised");
        }
        const UpdatedPost=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send(UpdatedPost);
    } catch (error) {
        res.status(400).json({msg:"Update-Error"})
    }
})


router.delete("/delete/:id",middleware, async(req,res)=>{

    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            res.send("post not there");
        }
        if(post.author.toString()!==req.userId) {
            res.send("Not Authorised");
        }
        const DeletePost=await Post.findByIdAndDelete(req.params.id)
        res.status(200).send("Post deleted");
    } catch (error) {
        res.status(400).json({msg:"Deleted-Error"})
    }
})



module.exports=router;



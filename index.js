const express=require("express");
const connection=require("./config/db");
require("dotenv").config();

const app=express();
app.use(express.json());
const userRouter=require("./routes/userRoutes");
const postRouter=require("./routes/postRoutes");
 app.use("/user",userRouter);
 app.use("/post",postRouter);


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connected to DB");

    } catch (err) {
        console.log(err);
    }
    console.log("server is running on port 8080");
})
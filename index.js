const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const authRoute=require("./routes/auth");
const usersRoute=require("./routes/users");
const roomsRoute=require("./routes/rooms");
const hotelsRoute=require("./routes/hotels");
const cookieParser=require("cookie-parser");
// const cors=require("cors");


const app=express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.log(err)
});



//middlewares
// app.use(cors())
app.use(cookieParser());             // cookies
app.use(express.json()); 
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/hotels",hotelsRoute);

app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
    
})




app.listen(5000,()=>{
    console.log("Backend server is running!")
})
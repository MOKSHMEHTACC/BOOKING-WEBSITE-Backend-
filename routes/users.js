const express=require('express');
const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/user');
const {verifyToken,verifyUser, verifyAdmin}=require('../utils/verifyToken')

const router=express.Router();


// router.get("/checkauth",verifyToken,(req,res,next)=>{
//     res.send("hello,you are authenticated")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello u are logged in,delete ur account")

// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin u are logged in,delete ur account")

// })





//UPDATE
router.put("/:id",verifyUser,updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUser);

//GET ALL
router.get("/",verifyAdmin,getUsers);


module.exports=router;
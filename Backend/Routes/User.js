const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const user=require('./../Model/User')
const express = require('express');
const userrouter = express.Router();

const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose.Types

mongoose.set("strictQuery", true);

userrouter.get('/hello',async(req,res)=>{
    res.send("hello world")
})

userrouter.post('/login',async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Use findOne from Mongoose
        const data = await user.findOne({ "email": email });
        console.log(process.env.SECRET_KEY)
        const token = jwt.sign({"email":email}, process.env.SECRET_KEY, { expiresIn: '1h' }); // You can customize the expiration time
        if (data) {
            if (password === data.password) {
                data.token=token;
                console.log(data,'data')
                return res.status(200).json({ "status": "success", "data": data,"token":token });
            } else {
                return res.status(401).json({ "status": "fail", "data": 'Invalid password' });
            }
        } else {
            return res.status(401).json({ "status": "fail", "data": 'Email does not exist' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "status": "fail", "data": "An error occurred" });
    }
})

userrouter.post('/register',async(req,res)=>{
   try {
      console.log(req.body,'body')
      const new_user=new user(req.body);
      const response=await new_user.save();
      return res.status(200).json({ "data": response });
    } catch (error) {
      console.log(error,'error')
     return res.status(500).json({ "error": "An error occurred" });
   }
})

module.exports=userrouter

const express = require('express');
const User = require('../Model/user');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const auth=require('../verifytoken')
const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const user = await User.find()
        res.json(user)
    }
    catch(err){
        res.json(err)
    }
})

router.get("/view/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch(err){
        res.json(err)
    }
})
router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({name:req.body.name});
    if(!user){
        return res.send('User Does Not Exist');
    }else{
        const isvalid=await bcrypt.compare(req.body.password,user.password);
        if(!isvalid){
            res.send("Password Incorrect");
        }else{
            // res.send("login successfull");
            const token=jwt.sign({_id:user._id},'privatekey')
            // res.setHeader('Authorization', 'Bearer '+ token);
            console.log(token); 
            res.setHeader('auth-token', token);
            // res.header('Authorization', 'Bearer '+ token);
            res.send("Login Successfully")
        }
    }
    } catch (error) {
        res.send(error);
    }
    
});

router.patch("/update/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        user.name = req.body.name;
        updateResult = await user.save()
        res.json(updateResult)
    }
    catch(err){
        res.json(err)
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndRemove(req.params.id)
        res.json(user)
    }
    catch(err){
        res.json(err)
    }
})

router.post("/register",async(req,res)=>{

   const salt = await bcrypt.genSalt(10)
   var hashPwd = await bcrypt.hash(req.body.password,salt)

   const  UserData = new User({
        name:req.body.name,
        password: hashPwd  

    })
    try{
        const user = await UserData.save()
        res.json(['Register Successfully.'])    

    }catch(err){
        res.send(err).status(200);

    } 
});







module.exports = router;
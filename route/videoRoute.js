const express = require('express');
const video = require('../Model/video');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const auth=require('../verifytoken')
const router = express.Router();
router.post("/add",auth,async(req,res)=>{    

   const  VideoData = new video({
        title:req.body.title,
	    description:req.body.description,
	    posted_by:req.body.posted_by,
	    url:req.body.url,
	    likes:req.body.likes,
	    category:req.body.category 

    })
    try{
        await VideoData.save()
        res.json("Video Added")  
        res.send().status(200)  

    }catch(err){
        res.send(err).status(400);

    } 
});


module.exports = router;
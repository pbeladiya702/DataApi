const mongoose = require('mongoose');


const schema = mongoose.Schema({
    title:String,
    description:String,
    posted_by:String,
    url:String,
    likes:Number,
    category:String
    
},{ timestamps: true })
module.exports = mongoose.model("video",schema);
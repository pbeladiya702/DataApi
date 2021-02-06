const mongoose = require('mongoose');


const schema = mongoose.Schema({
    name:String,
    password:String
    
},{ timestamps: true })
module.exports = mongoose.model("user",schema);
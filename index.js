const express = require('express');
const mongoose = require('mongoose');
const route = require('./route/route');
const videoRoute = require('./route/videoRoute');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var uri = "mongodb+srv://Parth:12345@cluster0.mlh3y.mongodb.net/Videos?retryWrites=true&w=majority";
app.use(express.json());
// mongoose.connect("mongodb://localhost:27017/emp",{useNewUrlParser:true,useUnifiedTopology:true}).then(
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(

    ()=>{
        
        app.use("/",route);
        app.use("/video",videoRoute);
        app.listen(process.env.PORT || 3000,(err)=>{
	        if(err)
	        {
	        	console.log(err);
	        }else{
	        	console.log('Server started')
	    	}
      })
    }

);
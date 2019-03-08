const express = require("express"),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      api_user = require('./routes/userRoute');

let port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(api_user);

mongoose.connect('mongodb://anarchy:Aniket1996@ds349045.mlab.com:49045/api-trial',{useNewUrlParser : true},(err)=>{

    if(err){
        console.error(err.message);
    }
    console.log("Mongodb Connected")
});
app.listen(port,(err)=>{
    if(err){
        console.error(err.message);
    }

    console.log(`Server started on ${port}`);
});


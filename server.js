const express = require("express"),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      request = require("request")

let port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://anarchy:Aniket1996@ds349045.mlab.com:49045/api-trial',{useNewUrlParser : true},(err)=>{

    if(err){
        console.error(err.message);
    }
    console.log("Mongodb Connected")
});

let api_schema = new mongoose.Schema({
    name : String,
    roll : String,
    phone : String,
    address : String

});

var api_model = mongoose.model('apis',api_schema);


app.get('/',(req,res)=>{

    res.redirect('/api/request/search');
});

app.post('/api/request/search',(req,res)=>{
    
    let bruteData = {
        name : req.query.name,
        roll : req.query.roll,
        phone : req.query.phone,
        address : req.query.address
    }

    api_model.create(bruteData,(err,inserted)=>{

        if(err){
            console.error(err.message);
        }

        return res.send(inserted);
    });
});
app.get('/api/request/search',(req,res)=>{
    
    console.log(req.query);
    let getQuery = {name : req.query.name};



    api_model.find(getQuery,(err,found)=>{

        if(err){
            console.error(err.message);
        }

        let JSONstringify = JSON.stringify(found);
        let parseJson = JSON.parse(JSONstringify);
        return res.send(parseJson)


    });
});

request("https://api-trial.herokuapp.com/api/request/search?name=Animesh",(err,res,body)=>{

    if(err){
        console.log(err)
    }

    console.log("This is the req part");
    let parsedJson = JSON.parse(body);
    console.log(parsedJson);

});

app.listen(port,(err)=>{
    if(err){
        console.error(err.message);
    }

    console.log(`Server started on ${port}`);
});


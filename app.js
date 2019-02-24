const express = require("express"),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      request = require("request")

let port = 3000 || PROCESS.ENV.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/api_trial',{useNewUrlParser : true},(err)=>{

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
        name : "Nidhu",
        roll : "1610991108",
        phone : "6280953543",
        address : "137,Sector 8 , Panchkula, Haryana"
    }

    api_model.create(bruteData,(err,inserted)=>{

        if(err){
            console.error(err.message);
        }

        return res.send(inserted);
    });
});
app.get('/api/request/search',(req,res)=>{
    
    let getQuery = {name : req.query.name};



    api_model.find(getQuery,(err,found)=>{

        if(err){
            console.error(err.message);
        }

        let JSONstringify = JSON.stringify(found);
        let parseJson = JSON.parse(JSONstringify);
        return res.send(parseJson[0]);


    });
});


app.listen(port,'127.0.0.1',(err)=>{
    if(err){
        console.error(err.message);
    }

    console.log(`Server started on ${port}`);
});


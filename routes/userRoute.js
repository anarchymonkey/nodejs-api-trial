let express = require('express'),
    app = express.Router(),
    request = require("request"),
    api_model = require('../models/userModel'),
    auth_model = require('../models/authModel')


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
            return res.send(JSONstringify);
        });
    });

    app.post('/api/request/storeUsername',(req,res)=>{
        console.log('hey');
        let userObj = {username : req.query.username , password : req.query.password};
        auth_model.create(userObj,(err,storeAuth)=>{

            if(err){
                console.error(err.message);
            }
            return res.send(storeAuth);
        });
    });

    app.get('/api/request/storeUsername',(req,res)=>{
        let getUserNames = {username : req.query.username};

        auth_model.find(getUserNames,(err,found)=>{

            if(err){
                console.error(err.message);
            }

            let stringifiedJson = JSON.stringify(found);
            return res.send(stringifiedJson);
        });


    });
    
    request("https://api-trial.herokuapp.com/api/request/search?name=Ankur",(err,res,body)=>{

    if(err){
        console.log(err)
    }
    console.log("This is the req part");
    let parsedJson = JSON.parse(body);
});

module.exports = app;

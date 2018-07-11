var db = require("../models");


module.exports = function (app) {
    //Create new user
    app.post("/api/newUser", function (req, res){
        console.log("this is request", req.body)
        db.Profile.create({
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            password: req.body.password
        }).then(function (data){
            res.send(data); 
        })
    }); 

    app.post("/api/login", function (req, res){
        console.log("this is request to login", req.body)
        db.Profile.find({firstName: req.body.firstName}).then(function (data){
            console.log(data);
            if (data.length === 0){
                res.send(false)
            }
            else if (data[0].firstName === req.body.firstName && data[0].password === req.body.password){
                res.send(true)
            }
            else{
                res.send(false)
            }
        })

    })
}
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
    })
}
var db = require("../models");
var ObjectId = require('mongodb').ObjectId;


module.exports = function (app) {
    //Create new user
    app.post("/api/newUser", function (req, res){
        console.log("this is request", req.body)
        db.Profile.create({
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            password: req.body.password, 
            token: "t " + Math.random()
        }).then(function (data){
            req.session.user ={
                auth: true, 
                id: data._id, 
                firstName: data.firstName, 
                lastName: data.lastName, 
            }
            console.log("this is session", req.session.user)
            res.send(data); 
        }).catch(function(err){
            res.send(err);
        })
    }); 
    //login user 
    app.post("/api/login", function (req, res){
        console.log("this is request to login", req.body)
        db.Profile.find({firstName: req.body.firstName}).then(function (data){
            console.log(data);
            if (data.length === 0){
                res.send(false)
            }
            else if (data[0].firstName === req.body.firstName && data[0].password === req.body.password){
                req.session.user = {
                    auth: true, 
                    id: data[0]._id, 
                    firstName: data[0].firstName, 
                    lastName: data[0].lastName 
                }
                res.send(true)
            }
            else{
                res.send(false)
            }
        })

    })
    //get user info
    app.get("/api/user", function (req, res) {
        //console.log(req); 
        var id = req.session.user.id
        var o_id = new ObjectId(id);
        console.log(id, o_id); 
        db.Profile.findOne({ _id: o_id }).then(function (result) {
            res.send(result);
        })
    })

    // check if session
    app.get("/api/session", function (req, res) {
        if (req.session.user) {
            res.send(req.session.user);
        }
        if (!req.session.user) {
            res.send(false)
        }
    })



}
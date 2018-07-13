var db = require("../models");
var ObjectId = require('mongodb').ObjectId;


module.exports = function (app) {
    //Create new user
    app.post("/api/newUser", function (req, res){
        db.Profile.create({
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            password: req.body.password, 
            token: "t" + Math.random()
        }).then(function (data){
            req.session.user ={
                auth: true, 
                id: data._id, 
                firstName: data.firstName, 
                lastName: data.lastName,
                myEvents: data.myEvents 
            }
            res.send(data); 
        }).catch(function(err){
            res.send(err);
        })
    }); 
    //login user 
    app.post("/api/login", function (req, res){
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
                    lastName: data[0].lastName,
                    myEvents: data[0].myEvents, 
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
        var id = req.session.user.id
        var o_id = new ObjectId(id);
        db.Profile.findOne({ _id: o_id }).populate("myEvents").then(function (result) {
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

    //Create new event
    app.post("/api/newEvent", function (req, res){
        db.Events.create({
            eventName: req.body.eventName,
            eventDetails: req.body.eventDetails, 
            eventDate: req.body.eventDate,
            eventMaxPpl: req.body.eventMaxPpl,
            eventLocation: req.body.eventLocation
        }).then(function(data){
            db.Profile.findOneAndUpdate({ _id: req.session.user.id}, 
                     { $push: { myEvents: data._id} }, {new: true}).then(function (eventData){
                         res.json(eventData)
                     })      
        }).catch(function (err) {
                    res.json(err);
        }); 
    })

    //all events
    app.get("/api/allEvents", function (req, res){
        db.Events.find({}).then(function(result){
            res.send(result); 
        })
    })

}
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
                myEvents: data.myEvents, 
                attendingEvents: data.attendingEvents,
                following: data.following
            }
            res.send(data); 
        }).catch(function(err){
            res.send(err);
        })
    }); 
    //login user 
    app.post("/api/login", function (req, res){
        db.Profile.find({firstName: req.body.firstName}).then(function (data){
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
                    attendingEvents: data[0].attendingEvents,
                    following: data[0].following
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
        db.Profile.findOne({ _id: o_id }).populate("myEvents").populate("attendingEvents").then(function (result) {
            console.log(result); 
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
            eventLocation: req.body.eventLocation, 
            eventOwner: req.session.user.id
        }).then(function(data){
            db.Profile.findOneAndUpdate({ _id: req.session.user.id}, 
                     { $push: { myEvents: data._id} }, {new: true}).then(function (eventData){
                         res.json(eventData)
                     })      
        }).catch(function (err) {
                    res.json(err);
        }); 
    })

    //all events from db
    app.get("/api/allEvents", function (req, res){
        // exclude myEvents since im the owner of that event, by looping through myEvents array. 
        var usersEvents = req.session.user.myEvents; 
        var userEventsArray = []; 
        for (let i=0; i <usersEvents.length; i++){
            var o_id = new ObjectId(usersEvents[i]); 
            userEventsArray.push(o_id); 
        };
        db.Events.find({_id: { $nin : userEventsArray } } ).then(function(result){
            res.send(result); 
        })
    })

    //Join event
    app.put("/api/joinEvent", function (req, res){
        //add event id to users profile attendingEvents
        db.Profile.findByIdAndUpdate({_id: req.session.user.id}, 
            { $push: { attendingEvents : req.body.eventID } },
             {new : true}).then(function (data){
                 //add user id to event participants
                db.Events.findByIdAndUpdate({_id:req.body.eventID}, 
                    { $push: { participants : req.session.user.id } }, 
                        {new: true}).then(result => {res.json(result);
                })    
            })
    })

    //Sugested frineds
    app.get("/api/suggestedFriends", function (req, res){
        //filter out everyone that user is following already, and the current user
        var following = req.session.user.following
        var followingArr = [req.session.user.id]; 
        for (let i=0; i < following.length; i++){
            var o_id = new ObjectId(following[i]); 
            followingArr.push(o_id); 
        }
        db.Profile.find({_id: { $nin : followingArr } } ).then(function(data){
           res.send(data); 
        })

    })
}

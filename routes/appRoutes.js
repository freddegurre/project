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
                // firstName: data.firstName, 
                // lastName: data.lastName,
                // myEvents: data.myEvents, 
                // attendingEvents: data.attendingEvents,
                // following: data.following
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
                    // firstName: data[0].firstName, 
                    // lastName: data[0].lastName,
                    // myEvents: data[0].myEvents,
                    // attendingEvents: data[0].attendingEvents,
                    // following: data[0].following
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
        db.Profile.findOne({ _id: o_id }).populate("myEvents").populate("attendingEvents").populate("following").then(function (result) {
            console.log("this is user", result); 
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
        var id = req.session.user.id
        var o_id = new ObjectId(id);
        db.Profile.findOne({ _id: o_id }).populate("following").then(function (result) {
           // need to loop through following array, then loop that persons myEvents Arr, and construct object to send
           //to frontend only with events of people i follow and have not already joined
            var eventsToExclude = (result.attendingEvents.concat(result.myEvents));
            db.Events.find({_id: { $nin : eventsToExclude} } ).populate("participants").then(function(result){
                res.send(result); 
            })
        })
    })

    //New get events should be based on time
    app.get("/api/events", function (req, res){
        // var dt = Date.now()
        // var utcDate = dt.toUTCString();
        // console.log(utcDate); 
        db.Events.find({"timestamp" : {"$lte" : ISODate() } } ).then(function(result){
            console.log(result); 
        })
    }); 

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
        var id = req.session.user.id
        var o_id = new ObjectId(id);
        db.Profile.findOne({ _id: o_id }).then(function (result) {
            db.Profile.find({_id: { $nin : result.following } } ).then(function(data){
               res.json(data);  
            })
        })
    })

    //get al people user is following
    app.get("/api/following", function (req, res) {
        var id = req.session.user.id
        var o_id = new ObjectId(id);
        db.Profile.findOne({_id: o_id}).populate("following").then(function (result){
            res.json(result.following); 
        })
    })


    // FOllow person 
    app.put("/api/follow", function( req, res){
        // add person id to following array for current user
        db.Profile.findByIdAndUpdate({_id: req.session.user.id}, 
        { $push : { following : req.body.id } }, 
        {new : true}).populate("following").then(function (data){
            console.log("when i press follow", data)
            res.json(data); 
        })
    })

}

// userData = (id) => {
//     db.Profile.findOne({ _id: id }).populate("myEvents").populate("attendingEvents").populate("following").then(function (person){
//         return(person)
//     }).then(function (data) {
//         "new api call"
//     })

// }
// app.put("/api/follow", function( req, res){
//     var id = req.session.user.id
//     var o_id = new ObjectId(id);
//     userData(o_id); 
// }).then(function (data) {
//     "new api call"
// })

// app.put("/api/joinEvent", function (req, res){
//     //add event id to users profile attendingEvents
//     db.Profile.findByIdAndUpdate({_id: req.session.user.id}, 
//         { $push: { attendingEvents : req.body.eventID } },
//          {new : true}).then(function (data){
//              //add user id to event participants
//             db.Events.findByIdAndUpdate({_id:req.body.eventID}, 
//                 { $push: { participants : req.session.user.id } }, 
//                     {new: true}).then(result => {res.json(result);
//             })    
//         })
// })


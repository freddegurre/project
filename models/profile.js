const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema ({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }, 
    password: {
        type: String
    }, 
    token: { 
        type: String 
    },
    myEvents: [{
        type: Schema.Types.ObjectId,
        ref: "Events"
      }],
    attendingEvents: [{
        type: Schema.Types.ObjectId,
        ref: "Events"
      }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "Profile"
      }],
    
}); 

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile; 
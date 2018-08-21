const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema ({
    firstName: {
        type: String, 
        trim: true
    },
    lastName: {
        type: String, 
        trim: true
    }, 
    password: {
        type: String,
        trim: true, 
        required: "Password is Required"
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    eventName: {
      type: String,
       //required: true 
    },
    eventDetails: {
      type: String,
       //required: true 
    },
    eventDate: {
      type: String,
       //required: true 
    },
    eventLocation: {
      type: String,
      //required: true 
    },
    eventMaxPpl: {
      type: String,
       //required: true 
    },
    eventOwner: {
      type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: "Profile"
    }],
  });
  
  const Events = mongoose.model("Events", eventsSchema);
  
  module.exports = Events;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    eventName: {
      type: String,
       //required: true 
    },
    timestamp: { 
      type: Date, default: Date.now
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
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    category: {
      type: String,
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
    invited: [{
      type: Schema.Types.ObjectId,
      ref: "Profile"
    }],
    public: {
      type: Boolean, default: true 
    }
  });
  
  const Events = mongoose.model("Events", eventsSchema);
  
  module.exports = Events;
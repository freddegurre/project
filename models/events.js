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
    }
  });
  
  const Events = mongoose.model("Events", eventsSchema);
  
  module.exports = Events;
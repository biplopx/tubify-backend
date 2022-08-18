const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    userName: {
      type: String,
      require:true
      
    },
    userEmail: {
      type: String,
      require:true
     
  
    },
    address: {
      type: String,
      require:true
      
    },
    phoneNum: {
      type: Number,
      require:true
      
    },
    price: {
      type: Number,
      require:true
      
    },
    planName: {
      type: String,
      require:true
      
    },
    plan:{
      type:Boolean,
      require:true
    }
  },{ timestamps: true });
  module.exports = mongoose.model('Booking', orderSchema);
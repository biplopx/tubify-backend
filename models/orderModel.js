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
    statusPending: {
      type: Boolean,
      require:true
      
    },
    planName: {
      type: String,
      require:true
      
    },
  },{ timestamps: true });
  module.exports = mongoose.model('Order', orderSchema);
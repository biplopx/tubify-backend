
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    transactionID: {
      type: String,
      require:true
      
    },
    paid: {
      type: Boolean,
      require:true
     
  
    },
    statusPending: {
      type: Boolean,
      require:true
      
    },
    plan: {
      type: String,
      require:true
     
  
    },
    user:{
      type:Array,
      require: true
    },
    planId:{
      type:String,
      require:true
    },
    price:{
      type:Number,
      require:true
    }
  },{ timestamps: true });
  module.exports = mongoose.model('Subscription', paymentSchema);
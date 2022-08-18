const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pricingSchema = new Schema({
    plan: {
      type: String,
      require:true
      
    },
    price: {
      type: Number,
      require:true
     
  
    },
    services: {
      type: Array,
      require:true
      
    },
  },{ timestamps: true });
  module.exports = mongoose.model('Plan', pricingSchema);
//import package
const mongoose = require('mongoose');
//create schema object for mongoose to match with documents in db
let Schema = mongoose.Schema({
  
  username:{
      type:String,
      required:false
  },

   admin:{
      type:Boolean,
      required:false
  },

  password:{
      type:String,
      required:false
  },

  title:{
      type:String,
      required:false
  },

  category:{
      type:String,
      required:false
  },

  genre:{
      type:String,
      required:false
  },

  rating:{
      type:String,
      required:false
  },

  review:{
      type:String,
      required:false
  },
  
   type:{
      type:String,
      required:false
   }
});

module.exports = mongoose.model("reviews", Schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TokenHistorySchema = new Schema({
  address: {
    type: String,
    required: true
  },
  actiontype : {
    type: String,
    required: true
  },
  amount : {
    type : Number,
    required : true
  },
  toaddress : {
    type : String ,
    required : true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = TokenHistory = mongoose.model("tokenhistorys", TokenHistorySchema);

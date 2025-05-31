const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: {
    type: Boolean,
    default: false,
  },
});

module.exports = { HoldingsSchema };

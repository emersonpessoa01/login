// const mongoose = require("mongoose");
import mongoose from "mongoose";

let schema = mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

const transactionModel = mongoose.model("transaction", schema);

// module.exports = transactionModel;
export { transactionModel };

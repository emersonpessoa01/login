//Responsável pela conexão com o banco de dados remoto
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

export { transactionModel };

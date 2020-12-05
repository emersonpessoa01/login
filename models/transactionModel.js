//Responsável pela conexão com o banco de dados remoto
import mongoose from "mongoose";

let schema = mongoose.Schema({
  description: {
    type:String,
    require:true,
  },
  
  value: {
    type:Number,
    require:true,
  },
  category: {
    type:String,
    require:true,
  },
  year: {
    type:Number,
    require:true,
  },
  month:  {
    type:Number,
    require:true,
  },
  day: {
    type:Number,
    require:true,
  },
  yearMonth:  {
    type:String,
    require:true,
  },
  yearMonthDay:  {
    type:String,
    require:true,
  },
});

const transactionModel = mongoose.model("transaction", schema);

export { transactionModel };

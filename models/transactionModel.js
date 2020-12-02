//responsavel por chamar o Banco de Dados
import mongooseDateFormat from "mongoose-date-format";

export default(mongoose)=>{ 
const transactionSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  yearMonth: {
    type: Number,
    required: true,
  },
  yearMonthDay: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

const transactionModel = mongoose.model("transactions", transactionSchema, "transactions"); //para criar student no singular
transactionSchema.plugin(mongooseDateFormat)
return transactionModel;
}
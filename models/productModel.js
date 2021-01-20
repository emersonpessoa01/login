//responsavel por chamar o Banco de Dados
import mongooseDateFormat from "mongoose-date-format";

export default (mongoose) => {
  const userSchema = mongoose.Schema({
    product: String,
    description: String,
    price: String,
    amount: {
      type: Number,
      default: 0,
    },

    lastModified: {
      type: Date,
      default: Date.now(),
    },
  });

  const productModel = mongoose.model("product", userSchema, "product"); //para criar user no singular
  userSchema.plugin(mongooseDateFormat);
  return productModel;
};

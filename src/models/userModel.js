 // const mongoose = require("mongoose");
import mongoose from "mongoose";
import bcrypt from "bcrypt";

let schema = mongoose.Schema({
  name_user: String,
  email_user: String,
  type_user:{type: Number, default:1},
  password_user: String,

});
schema.pre("save", function (next) {
  if(!this.isModified("password_user")){
    return next();
  }
  this.password_user = bcrypt.hashSync(this.password_user,10)
})

const transactionModel = mongoose.model("user", schema);

//  module.exports = transactionModel;
export { transactionModel };

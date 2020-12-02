//colocando as configurações de banco de dados
import mongoose from "mongoose";
import transactionModel from "./transactionModel.js";

const db = {};
//db = informações de banco
//url, mongoose e podcast = modelo
// db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.transaction = transactionModel(mongoose);

export { db };

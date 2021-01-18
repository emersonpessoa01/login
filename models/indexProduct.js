//colocando as configurações de banco de dados
import mongoose from "mongoose";
import productModel from "./productModel.js";

const db = {};
//db = informações de banco
//url, mongoose e podcast = modelo
// db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.product = productModel(mongoose);

export { db };

//colocando as configurações de banco de dados
import mongoose from "mongoose";
import userModel from "./userModel.js";

const db = {};
//db = informações de banco
//url, mongoose e podcast = modelo
// db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.user = userModel(mongoose);

export { db };

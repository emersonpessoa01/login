import express from 'express'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { transactionRouter } from "./routes/transactionRouter.js";
import dotenv from 'dotenv';
dotenv.config();

//criando variaveis de ambiente
// process.env.USER_DB = "emersonpessoa"

//Conexao com o MongoDB
console.log('Iniciando conexão ao MongoDB...');

(async () => {
  const { DB_CONNECTION } = process.env;
  try {
    await mongoose.connect(
      DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao MongoDb Atlas");
  } catch (err) {
    console.log("Erro ao conectar no MongoDB");
  }
})();

const app = express();
// app.use(express.json());

/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join('client/build')));

/**
 * lIBERANDO ACESSO À TODOS OS HOSTS
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Acessou o Middleware!");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});
app.use("/transaction", transactionRouter);

/**
 * Rota raiz
 */
app.get('/api/', (_, res) => {
  res.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Fala Dev -- APP startado na porta http://localhost:3000");
});

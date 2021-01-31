const express = require("express");
// const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const dotenv = require("dotenv");

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

/**
 * Vinculando o React ao app
 */
// app.use(express.static(path.join("client/build")));

/**
 * Rota raiz
 */
app.get("/", (_, response) => {
  response.send({
    message:
      "Bem-vindo à API de lançamentos. Acesse /api/usuarios ou /admin/login e siga as orientações",
  });
});

/**
 * Rotas principais do app
 */
app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

/**
 * Conexão ao Banco de Dados
 */
(async () => {
  console.log("iniciando conexão ao banco de dados...");
  const { DB_CONNECTION } = process.env;
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Conectado ao MongoDb Atlas");
  } catch (err) {
    console.log("Erro ao conectar no MongoDB");
  }
})();

/**
 * Definição de porta e
 * inicialização do app
 */
const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado em http://localhost:3002`);
});

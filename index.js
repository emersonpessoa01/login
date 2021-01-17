// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const routes = require('./routes/routes');
// const path = require('path');
// const dotenv = require('dotenv');

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { routes } from "./routes/routes.js";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import pathUser from "path";

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(path());


/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join("client/build")));

/**
 * Rota raiz
 */
app.get("/api/", (_, response) => {
  response.send({
    message:
      "Bem-vindo à API de lançamentos. Acesse /users e siga as orientações",
  });
});

/**
 * Rotas principais do app
 */
app.use("/api/user", routes);

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

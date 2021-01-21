//interface para o controller,sendo que o mesmo faz tratamento de persistenca de dados
import express from "express";
import controllerUser from '../controller/userController.js';
import controllerProduct from '../controller/productController.js';
// import { podcastModel } from "./models/podcastModel.js";

const app = express();

//criando o create do CRUD
app.post("/api/users",controllerUser.create);

app.get("/api/users",controllerUser.findAll);

app.get("/api/users.details/:id",controllerUser.details);

// app.get("/api/users/:id",controllerUser.findOne);

app.patch("/api/users/:id",controllerUser.update);

app.delete("/api/users/:id",controllerUser.remove);


app.post("/api/products",controllerProduct.create);

app.get("/api/products",controllerProduct.findAll);

app.get("/api/products/:id",controllerProduct.findOne);

app.patch("/api/products/:id",controllerProduct.update);

app.delete("/api/products/:id",controllerProduct.remove);

export { app as userRouter };


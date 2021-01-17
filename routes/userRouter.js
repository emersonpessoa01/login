//interface para o controller,sendo que o mesmo faz tratamento de persistenca de dados
import express from "express";
import controller from '../controller/userController.js';
// import { podcastModel } from "./models/podcastModel.js";

const app = express();

//criando o create do CRUD
app.post("/",controller.create);

app.get("/",controller.findAll);

app.get("/:id",controller.findOne);

app.patch("/:id",controller.update);

app.delete("/:id",controller.remove);

export { app as userRouter };


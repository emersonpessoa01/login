import express from "express";
import {
  index,
  create
} from "../cotrollers/userController.js";

const userRouter = express.Router();
userRouter.get("/", index);
userRouter.post("/users", create);
export { userRouter as routes };

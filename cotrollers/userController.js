// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import { userModel } from "../models/userModel.js";

const index = (req, res) => {
  res.json({
    message: "Hello world",
  });
};

const create = async (req, res) => {
  try {
    const { name_user, email_user, type_user, password_user } = req.body;

    let data = {};
    let user = await userModel.findOne({ email_user });

    if (!user) {
      data = { name_user, email_user, type_user, password_user };
      user = await userModel.create(data);
      return res.status(200).json(user);

    } else {
      return res(500).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao inserir");
  }
};

export { index, create };

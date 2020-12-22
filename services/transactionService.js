// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
// const transactionModel = require("../models/transactionModel.js");
import {transactionModel} from "../models/transactionModel.js";

const findPeriod = async (req, res) => {
  const { period } = req.query;

  if (!period) {
    res.status(400).send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
  }

  try {
    const data = await transactionModel.find({});
    res.send(data.filter((m) => m.yearMonth === period));
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getPeriods = async (_, res) => {
  try {
    const data = await transactionModel.find().distinct("yearMonth");
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const inserting = async (req, res) => {
  try {
    const {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    } = req.body;

    var model = new transactionModel({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    });

    var data = await model.save();
    return res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao inserir");
  }
};

const removing = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ error: "Não foi encontrado o item" });
  }

  try {
    const data = await transactionModel.findOneAndRemove({ _id: id });

    if (!data) res.status(400).send({ error: "Não foi encontrado o item" });

    res.send("ok");
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const updated = async (req, res) => {
  try {
    const id = req.body._id;

    const data = await transactionModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!data) res.status(400).send("Documento não encontrado");

    res.send(data);
  } catch {
    res.status(500).send({ error: err });
  }
};

export { findPeriod, getPeriods, inserting, removing, updated };

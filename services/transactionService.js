//controller - responsável pelo tratamento e persistência de dados
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import { transactionModel } from "../models/transactionModel.js";

const findAll = async (req, res) => {
  const { period } = req.query;
  try {
    if (period != null && period.length ==7) {
      const transaction = await transactionModel.find({});

      res.send(
        transaction.filter((time) => time.yearMonth === period) && {
          length: 2,
          transactions: ["transaction1", "transaction2"],
        }
      );
    } else {
      res.send(
        'É necessario informar o parâmetro "period", cujo o valor deve estar no formato yyyy-mm'
      );
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await transactionModel.findById({ _id: id });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: `Nenhum objeto encontrado com o id: ${id}` });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar o Documento id: ${id}` });
  }
};

const create = async (req, res) => {
  const transaction = new transactionModel(req.body);

  try {
    await transaction.save();
    res.send(transaction);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(404).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const transaction = await transactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!transaction) {
      res
        .status(404)
        .send({ message: "Nenhuma transaction encontrado para atualizar" });
    }

    res.status(200).send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: `Erro ao atualizar transaction de id: ${id}` });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await transactionModel.findOneAndDelete({ _id: id });
    console.log(transaction);

    if (!transaction) {
      res.status(404).send("Documento nao encontrado");
    }
    res.status(200).send(`${transaction} - Transaction removido com sucesso!`);
  } catch (err) {
    res.status(500).send(err);
  }
};

export { findAll, findOne, create, remove, update };

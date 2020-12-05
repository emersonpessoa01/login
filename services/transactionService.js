//controller - responsável pelo tratamento e persistência de dados
import mongoose from "mongoose";
import { transactionModel } from "../models/transactionModel.js";

const ObjectId = mongoose.Types.ObjectId;

//integração do backend com o mongoDB
// const getTransactions=async(period)=>{
//   const transactions = await transactionModel.find({yearMonth: period});
//   return transactions
// }

const findAll = async (req, res) => {
  const { query } = req;
  try {
    if (!query.period) {
      //apresenta a falha de cara no console
      throw new Error(
        `É necessário informar o parametro "period", cujo valor deve está no formato yyyy-mm`
      );
    } else {
      const { period } = query;
      if (period.length === 7) {
        //itera com o mongoDB
        const filteredTransactions = await transactionModel.find({
          yearMonth: period,
        });

        res.send({
          length: filteredTransactions.length,
          transactions: filteredTransactions,
        });
      } else {
        throw new Error("Período inválido. Use o formato yyyy-mm");
        // res.status(400).send({
        //   message: "Período inválido. Use o formato yyyy-mm"})
      }
    }
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
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
    if (JSON.stringify(req.body) === "{}") {
      res.status(400).send({
        error: 'Inválido.Conteúdo vazio'
      });
    }
    await transaction.save();
    res.send({
      status: "ok",
      transaction
    });
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

    res.status(200).send({
      status:"Atualizado com sucesso",
      transaction,
    });
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
      res.status(404).send("Documento não encontrado");
    }
    res.status(200).send({
      status: "Deletedo com sucesso",
      transaction
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

export { findAll, findOne, create, remove, update };

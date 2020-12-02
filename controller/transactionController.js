//para tratamento e persistencia de dados
import { db } from "../models/index.js";

//criando objeto global
const Transaction = db.transaction;

//função create(metodo post) do CRUD
const create = async (req, res) => {
  // const {name, subject, type,value} = req.body
  //const { description, value, category, year, month, day, yearMonth, yearMonthDay, type } = req.body
  const transaction = new Transaction({
    ...req.body,
  });

  try {
    const data = await transaction.save(); //para persistir os dados

    res.send(data);
  } catch (err) {
    res.status(400).send({ message: `Erro ao inserir transaction ${error}` });
  }
};

//BUSCAR TUDO(método get)
const findAll = async (req, res) => {
  try {
    const data = await Transaction.find({});

    res.send(data);
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao buscar todos transactions ${error}` });
  }
};

//BUSCAR PELO ID(metodo get)
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findById({ _id: id });

    res.send(data);
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao buscar transaction id ${id} ${error}` });
  }
};

//Atualizar dados(metodo put)
const update = async (req, res) => {
  try {
    const data = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      res.send(`Transaction id ${id} nao encontrado`);
    } else {
      res.send("Transaction atualizado com sucesso");
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao atualizar o Transaction id ${id} ${error}` });
  }
};

//deletar documentos(metodo delete)
const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Transaction.findOneAndDelete({ _id: id });

    if (!data) {
      res.send(`Transaction id ${id} nao encontrado`);
    } else {
      res.send(`Transaction excluido com sucesso - ${data}`);
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao excluir o Transaction id ${id} ${error}` });
  }
};

export default { create, findAll, findOne, update, remove };

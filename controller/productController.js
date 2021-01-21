//para tratamento e persistencia de dados
import { db } from "../models/indexProduct.js";

//criando objeto global
const Product = db.product;

//função create(metodo post) do CRUD
const create = async (req, res) => {
  const {product, description,price,amount} = req.body
  const products = new Product({
    product,
    description,
    price,
    amount,
  });

  try {
    const data = await products.save();

    res.send(data);
  } catch (err) {
    res.status(400).send({ message: `Erro ao inserir product ${error}` });
  }
};

//BUSCAR TUDO(método get)
const findAll = async (_, res) => {
  try {
    const data = await Product.find({});

    res.send(data);
  } catch (err) {
    res.status(400).send({ message: `Erro ao buscar todos Products ${error}` });
  }
};

//BUSCAR PELO ID(metodo get)
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Product.findById({ _id: id });

    res.send(data);
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao buscar product id ${id} ${error}` });
  }
};

//Atualizar dados(metodo put)
const update = async (req, res) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      res.send( `Product id ${id} não encontrado`);
    } else {
      res.send("Status: atualizado com sucesso");
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao atualizar o Product id ${id} ${error}` });
  }
};

//deletar documentos(metodo delete)
const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findOneAndDelete({ _id: id });

    if (!data) {
      res.send( `Product id ${id} não encontrado`);
    } else {
    res.send( `Product excluido com sucesso - ${data}`);
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao excluir o Product id ${id} ${error}` });
  }
};

export default { create, findAll, findOne, update, remove };

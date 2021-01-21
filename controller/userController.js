//para tratamento e persistencia de dados
import { db } from "../models/index.js";

//criando objeto global
const User = db.user;

//função create(metodo post) do CRUD
const create = async (req, res) => {
  const { name, email, password, type } = req.body;
  const user = new User({
    name,
    email,
    password,
    type,
  });

  try {
    const data = await user.save();

    res.send(data);
  } catch (err) {
    res.status(400).send({ message: `Erro ao inserir user ${error}` });
  }
};

//BUSCAR TUDO(método get)
const findAll = async (req, res) => {
  try {
    const data = await User.find({});

    res.send(data);
  } catch (err) {
    res.status(400).send({ message: `Erro ao buscar todos users ${error}` });
  }
};

//BUSCAR PELO ID(metodo get)

const details = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findOne({_id:id});

    res.json(data);
  } catch (err) {
    res.status(400).send({ message: `Erro ao buscar todos users ${error}` });
  }
};

//BUSCAR PELO ID(metodo get)
// const details = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const data = await User.findById({ _id: id });

//     res.send(data);
//   } catch (err) {
//     res.status(400).send({ message: `Erro ao buscar user id ${id} ${error}` });
//   }
// };

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

//Atualizar dados(metodo put)
const update = async (req, res) => {

  try {
    const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!data) {
      res.send(`User id ${id} not found`);
    } else {
      res.send("Status: atualizado com sucesso");
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao atualizar o User id ${id} ${error}` });
  }
};

//deletar documentos(metodo delete)

// const remove = async (req, res) => {
//   const { _id } = req.params;
//   try {
//     const user = await User.findOneAndDelete({ id: _id });
//     return res.json(user);
//   } catch (err) {
//     res
//       .status(400)
//       .send({ message: `Erro ao excluir o User id ${id} ${error}` });
//   }
// };
const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findOneAndDelete({ _id: id });

    if (!data) {
      res.send(`User id ${id} not found`);
    } else {
      res.send(`User excluido com sucesso - ${data}`);
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: `Erro ao excluir o User id ${id} ${error}` });
  }
};

export default { create, findAll, details, update, remove };

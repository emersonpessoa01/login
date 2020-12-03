//roteador
import express from "express"
const transactionRouter = express.Router();
import {
  findAll,
  create,
  remove,
  update,
  findOne,
} from "../services/transactionService.js"

transactionRouter.get('/', findAll);
transactionRouter.get('/:id', findOne);
transactionRouter.post('/', create);
transactionRouter.patch('/:id', update);
transactionRouter.delete('/:id', remove);

export {transactionRouter as router};

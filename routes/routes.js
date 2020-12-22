// const express = require('express');
// const service = require('../services/transactionService.js');
import express from "express";
import {
  findPeriod,
  getPeriods,
  inserting,
  removing,
  updated,
} from "../services/transactionService.js";

const transactionRouter = express.Router();
transactionRouter.get("/", findPeriod);
transactionRouter.get("/periods/", getPeriods);
transactionRouter.post("/", inserting);
transactionRouter.delete("/:id", removing);
transactionRouter.put("/", updated);

// module.exports = transactionRouter;
export { transactionRouter as routes };

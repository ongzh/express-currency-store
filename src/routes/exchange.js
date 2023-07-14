const express = require("express");
const router = express.Router();

const exchangeController = require("../controllers/exchangeController");

router.get("/rates", exchangeController.getExchangeRates);

module.exports = router;

const axios = require("axios");
const { get } = require("express/lib/response");
const BASE_URL = "https://api.coinbase.com/v2/exchange-rates";
const exchangeService = require("../services/exchangeService");

const getExchangeRates = async (req, res, next) => {
  try {
    const { base } = req.query;
    if (base != "crypto" && base != "fiat") {
      throw new Error("Invalid base currency");
    }
    const isCrypto = base == "crypto" ? true : false;
    res.json(await exchangeService.getLatestExchangeRates(isCrypto));
  } catch (err) {
    console.error(`Error while getting exchange rates`, err.message);
    next(err);
  }
};

module.exports = {
  getExchangeRates,
};

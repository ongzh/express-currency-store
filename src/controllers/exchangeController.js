const axios = require("axios");
const { get } = require("express/lib/response");
const BASE_URL = "https://api.coinbase.com/v2/exchange-rates";
const exchangeService = require("../services/exchangeService");

const getExchangeRates = async (req, res, next) => {
  try {
    const { base } = req.query;
    if (base === undefined) {
      res.status(400).json({ error: "No base currency given" });
    } else if (base != "crypto" && base != "fiat") {
      res.status(400).json({ error: "Invalid base currency" });
    }
    const isCrypto = base == "crypto" ? true : false;
    res.json(await exchangeService.getLatestExchangeRates(isCrypto));
  } catch (err) {
    console.error(`Error while getting exchange rates`, err.message);
    next(err);
  }
};

const getHistoricalRates = async (req, res, next) => {
  try {
    const { base_currency, target_currency, start, end } = req.query;
    const endDate = end === undefined ? new Date() : new Date(parseInt(end));
    const startDate = new Date(parseInt(start));
    if (base_currency === undefined || target_currency === undefined) {
      res.status(400).json({ error: "No base or target currency given" });
    } else if (isNaN(startDate) || isNaN(endDate)) {
      res.status(400).json({ error: "Invalid start or end date given" });
    } else {
      res.json(
        await exchangeService.getHistoricalRates(
          base_currency,
          target_currency,
          startDate,
          endDate
        )
      );
    }
  } catch (err) {
    console.error(`Error while getting historical rates`, err.message);
    next(err);
  }
};

module.exports = {
  getExchangeRates,
  getHistoricalRates,
};

const axios = require("axios");
const { get } = require("express/lib/response");
const BASE_URL = "https://api.coinbase.com/v2/exchange-rates";
const getExchangeRates = async (req, res) => {
  try {
    const { base } = req.query;

    const quotes = {
      fiat: ["USD", "SGD", "EUR"],
      crypto: ["BTC", "DOGE", "ETH"],
    };

    let exchangeData = {};

    const getExchangeData = async (baseCurs, targets) => {
      for (const baseCur of baseCurs) {
        const response = await axios.get(BASE_URL + `?currency=${baseCur}`);
        const rates = response.data.data.rates;

        let quoteRates = {};
        for (const targetCur of targets) {
          if (targetCur in rates) {
            quoteRates[targetCur] = rates[targetCur];
          }
        }
        exchangeData[baseCur] = quoteRates;
      }
    };

    if (base == "fiat") {
      await getExchangeData(quotes.fiat, quotes.crypto);
    } else if (base == "crypto") {
      await getExchangeData(quotes.crypto, quotes.fiat);
    }
    res.status(200).json(exchangeData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExchangeRates,
};

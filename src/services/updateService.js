const axios = require("axios");
const BASE_URL = "https://api.coinbase.com/v2/exchange-rates";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateExchangeRates = async (fiatList, cryptoList) => {
  const currentTime = new Date();
  //console.log(currentTime);
  fiatBaseRates = await getLatestExchangeDataFromApi(fiatList, cryptoList);
  cryptoBaseRates = await getLatestExchangeDataFromApi(cryptoList, fiatList);
  //ensure timestamp is the same for all rates on each update
  await updateExchangeRatesToDb(fiatBaseRates, currentTime);
  await updateExchangeRatesToDb(cryptoBaseRates, currentTime);
};

//takes in rates in same format as GET /rates and update them to
const updateExchangeRatesToDb = async (rates, currentTime) => {
  for (const baseCur in rates) {
    for (const targetCur in rates[baseCur]) {
      await prisma.exchangeRate.create({
        data: {
          baseCurrency: {
            connect: { code: baseCur },
          },
          targetCurrency: {
            connect: { code: targetCur },
          },

          rate: rates[baseCur][targetCur],
          timeStamp: currentTime,
        },
      });
    }
  }
};

//return exchangeData in the form of {baseCur: {targetCur1: rate, targetCur2: rate, ...}...}
const getLatestExchangeDataFromApi = async (baseCurs, targetCurs) => {
  let exchangeData = {};
  for (const baseCur of baseCurs) {
    const response = await axios.get(BASE_URL + `?currency=${baseCur}`);
    const rates = response.data.data.rates;

    let quoteRates = {};
    for (const targetCur of targetCurs) {
      if (targetCur in rates) {
        quoteRates[targetCur] = rates[targetCur];
      }
    }
    exchangeData[baseCur] = quoteRates;
  }
  return exchangeData;
};

module.exports = {
  updateExchangeRates,
};

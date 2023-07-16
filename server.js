const express = require("express");
const app = express();
const cron = require("node-cron");
require("dotenv").config();
const cronSchedule = process.env.CRON_SCHEDULE;
const updateService = require("./src/services/updateService");

app.use(express.json()); //parse json
const { quotes } = require("./src/utils/utils");

const exchangeRoutes = require("./src/routes/exchange");
app.use("/", exchangeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  //run every 100 seconds
  cron.schedule(cronSchedule, () => {
    console.log("Updating exchange rates...");
    updateService.updateExchangeRates(quotes.fiat, quotes.crypto);
  });
});

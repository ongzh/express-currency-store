const express = require("express");
const app = express();

app.use(express.json()); //parse json

const exchangeRoutes = require("./src/routes/exchange");
app.use("/", exchangeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

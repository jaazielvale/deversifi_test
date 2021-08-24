require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");
const {
  deposit,
  placeOrder,
  cancelOrder,
  getBalances,
  getOrders,
} = require("./controllers/trading");
const authorization = require("./middlewares/authorization");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/deposit", authorization, deposit);
app.post("/placeOrder", authorization, placeOrder);
app.post("/cancelOrder", authorization, cancelOrder);
app.get("/getBalances", authorization, getBalances);
app.get("/getOrders", authorization, getOrders);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

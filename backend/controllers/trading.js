const { recoverPersonalSignature } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { Sequelize, DataTypes } = require("sequelize");
const { Deposit } = require("../models/Deposit");
const { Order } = require("../models/Order");

const sequelize = new Sequelize("db", "", undefined, {
  dialect: "sqlite",
  storage: "db.sqlite",
  logging: false,
});

const deposit = async (req, res) => {
  const { amount, token } = req.body;

  try {
    const existing = await Deposit.findAll({
      where: {
        token,
      },
    });
    //Checking if token balance is exist
    if (!existing.length) {
      const deposit = await Deposit.create({
        amount,
        token,
      });
    } else {
      existing[0].amount += +amount;
      await existing[0].save();
    }
    return res.status(200).json({ deposit: true });
  } catch (err) {
    return res.status(500).json({ deposit: false });
  }
};

const placeOrder = async (req, res) => {
  const { side, amount, token, price } = req.body;

  try {
    const _existing = await Deposit.findAll({
      where: {
        token,
      },
    });

    //Checking if token balance is exist
    if (!_existing.length) {
      return res.status(400).json({ error: "Insufficient funds" });
    } else {
      const total_amount = _existing[0].amount;
      if (total_amount < amount && side == "SELL") {
        return res.status(400).json({ error: "Insufficient funds" });
      } else {
        const order = await Order.create({
          side,
          amount,
          token,
          price,
        });
        if (side === "SELL") {
          _existing[0].amount -= +amount;
          await _existing[0].save();
        }
        const result = order.toJSON();
        console.log(
          "PLACED %s @ %s %f %f",
          result.side,
          result.token,
          result.price,
          result.amount
        );
        return res.status(200).json({ id: result.id });
      }
    }
  } catch (err) {
    console.log(error);
    return res.status(500);
  }
};

const cancelOrder = async (req, res, next) => {
  const { id } = req.body;

  try {
    const order = await Order.findAll({
      where: {
        id: id,
      },
    });
    const result = order[0].toJSON();
    await Order.destroy({
      where: {
        id: id,
      },
    });
    const token = result.token;
    const amount = result.amount;
    const side = result.side;
    if (side === "SELL") {
      const _existing = await Deposit.findAll({
        where: {
          token: token,
        },
      });
      _existing[0].amount += +amount;
      await _existing[0].save();
    }
    console.log(
      "CANCELLED %s @ %s %f %f",
      result.side,
      result.token,
      result.price,
      result.amount
    );
    return res.status(200).json({ cancel: true });
  } catch (err) {
    return res.status(500).json({ cancel: false });
  }
};

const getBalances = async (req, res, next) => {
  try {
    const balances = await sequelize.query(
      "SELECT token, amount FROM `deposits`",
      { type: QueryTypes.SELECT }
    );
    return res.json({ balances });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await sequelize.query("SELECT * FROM `orders`", {
      type: QueryTypes.SELECT,
    });
    return res.json({ orders });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deposit,
  placeOrder,
  cancelOrder,
  getBalances,
  getOrders,
};

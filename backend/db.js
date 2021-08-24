const { Sequelize } = require("sequelize");
const { User } = require("./models/User");
const { Deposit } = require("./models/Deposit");
const { Order } = require("./models/Order");

const sequelize = new Sequelize("db", "", undefined, {
  dialect: "sqlite",
  storage: "db.sqlite",
  logging: false,
});

User.init(
  {
    nonce: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: () => Math.floor(Math.random() * 1000000),
    },
    publicAddress: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: "user" }
);

Deposit.init(
  {
    amount: {
      allowNull: false,
      type: Sequelize.FLOAT,
      defaultValue: () => 0.0,
    },
    token: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  { sequelize, modelName: "deposit" }
);

Order.init(
  {
    side: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    amount: {
      allowNull: false,
      type: Sequelize.FLOAT,
      defaultValue: () => 0.0,
    },
    token: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    price: {
      allowNull: false,
      type: Sequelize.FLOAT,
      defaultValue: () => 0.0,
    },
  },
  { sequelize, modelName: "order" }
);

sequelize.sync();

module.exports = { sequelize };

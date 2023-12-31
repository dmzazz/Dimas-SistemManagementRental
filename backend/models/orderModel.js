import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "./productModel.js";
import OutboundHistory from "./outboundHistoryModel.js"; // Add this line

const { DataTypes } = Sequelize;

const Order = db.define(
  "order",
  {
    code: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Order.belongsTo(Product, { foreignKey: "productId" });
Order.hasMany(OutboundHistory, { foreignKey: "orderId"}); // Add this line

export default Order;

// (async () => {
//   await db.sync();
// })();

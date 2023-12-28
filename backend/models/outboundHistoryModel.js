// outboundHistoryModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "./productModel.js";

const { DataTypes } = Sequelize;

const OutboundHistory = db.define(
  "outboundHistory",
  {
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
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

OutboundHistory.belongsTo(Product, { foreignKey: "productId" });

export default OutboundHistory;

(async () => {
  await db.sync();
})();

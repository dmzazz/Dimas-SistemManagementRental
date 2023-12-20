import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Supplier from "./supplierModel.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "product",
  {
    sku: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    purchasePrice: {
      type: DataTypes.FLOAT,
    },
    sellingPrice: {
      type: DataTypes.FLOAT,
    },
    category: {
      type: DataTypes.STRING,
    },
    supplierId: {
      type: DataTypes.INTEGER,
      references: {
        model: Supplier,
        key: "id", // Atur sesuai dengan kolom kunci utama di model Supplier
        onDelete: "CASCADE", // Agar dapat delete product
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Product.belongsTo(Supplier, { foreignKey: "supplierId" });
Supplier.hasMany(Product, { foreignKey: "supplierId" });

export default Product;

// (async () => {
//   await db.sync();
// })();

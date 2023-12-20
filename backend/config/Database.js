import { Sequelize } from "sequelize";

const db = new Sequelize("db_smr", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

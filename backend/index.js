import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Supplier from "./models/supplierModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(Product)
app.use(Order)
app.use(Supplier)

app.listen(8000, () => console.log("Server running at port 8000"));

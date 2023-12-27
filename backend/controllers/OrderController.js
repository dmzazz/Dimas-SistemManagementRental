import { Op, Sequelize } from "sequelize";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Mengambil Data
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "category", "sellingPrice"],
        },
      ],
      where: {
        status: "Pending",
      },
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Membuat Data Order
export const createOrder = async (req, res) => {
  try {
    // Sertakan supplierId dalam body permintaan
    const order = { ...req.body };

    if (!order.productId) {
      return res.status(400).json({ msg: "productId is required" });
    }

    if (!order.qty) {
      return res.status(400).json({ msg: "qty is required" });
    }

    const product = await Product.findOne({ where: { id: order.productId } });
    if (!product) {
      return res.status(400).json({ msg: "Product not found" });
    }

    order.code = await generateOrderCode();
    order.price = product.sellingPrice;
    order.total = product.sellingPrice * order.qty;
    order.status = "Pending";

    // Buat order
    await Order.create(order);
    res.status(201).json({ msg: "Order Created Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!order) {
      return res.status(404).json({ msg: "not found" });
    }

    const product = await Product.findOne({
      where: { id: order.productId },
    });

    if (product.quantity < order.qty) {
      return res.status(400).json({ msg: "Insufficient product qty" });
    }

    await product.update({ quantity: product.quantity - order.qty });
    await order.update({ status: "Completed" });
    res.status(200).json({ msg: "Confirm Order Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Menghapus Data Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!order) {
      return res.status(404).json({ msg: "not found" });
    }

    await order.destroy();
    res.status(200).json({ msg: "Order Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const generateOrderCode = async () => {
  const now = new Date();
  const count = await Order.count({
    where: {
      [Op.and]: [Sequelize.where(Sequelize.fn("DATE", Sequelize.col("createdAt")), now.toISOString().slice(0, 10))],
    },
  });

  return "INV" + String(now.toISOString().slice(0, 10)).replaceAll("-", "") + String(count + 1).padStart(3, "0");
};

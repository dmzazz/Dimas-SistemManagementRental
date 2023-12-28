import express from "express";
// Import Users
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

// Import Product
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controllers/ProductController.js";

// Import Supplier
import { getSupplier, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from "../controllers/SupplierController.js";

// Import Ordder
import { confirmOrder, createOrder, deleteOrder, getOrder } from "../controllers/OrderController.js";
import { getOutboundHistory } from "../controllers/OutboundHistoryController.js";

const router = express.Router();

// Router Users
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// Router Product
router.get("/product", getProduct);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

// Router Supplier
router.get("/supplier", getSupplier);
router.get("/supplier/:id", getSupplierById);
router.post("/supplier", createSupplier);
router.put("/supplier/:id", updateSupplier);
router.delete("/supplier/:id", deleteSupplier);

// Router Order
router.get("/order", getOrder);
router.post("/order", createOrder);
router.get("/order/confirm/:id", confirmOrder);
router.delete("/order/:id", deleteOrder);

// Router Outbound
router.get("/outbound-history", getOutboundHistory);

export default router;

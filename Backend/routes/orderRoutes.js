import express from "express";
import { createOrders, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrders);
router.get("/orders/:userId", getUserOrders);

export default router;

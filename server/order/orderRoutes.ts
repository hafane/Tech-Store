import { Router } from "express";
import OrderController from "./orderController"
import authMiddleware from "../middleware/authMiddleware"
import checkRoleMiddleware from "../middleware/checkRoleMiddleware"

const router = Router()

router.post("/create", authMiddleware, OrderController.createNewOrder)
router.get("/list", checkRoleMiddleware(["ADMIN"]), OrderController.getAllUserOrders)
router.get("/user-list", authMiddleware, OrderController.getUserOrders)
router.patch("/update-status/:orderId", checkRoleMiddleware(["ADMIN"]), OrderController.changeOrderStatus)

export default router
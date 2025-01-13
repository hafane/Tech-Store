import { Router } from "express";
import CartController from "./cartController"
import authMiddleware from "../middleware/authMiddleware"


const router = Router()


router.get("/", authMiddleware, CartController.getCart)
router.patch('/update', authMiddleware, CartController.updateCartItemQuantity)
router.post("/add", authMiddleware, CartController.addCartItem)
router.delete("/delete", authMiddleware, CartController.deleteOneItem)


export default router
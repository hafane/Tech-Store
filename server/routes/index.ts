import Router from "express"
import userRoutes from "../user/userRoutes";
import cartRoutes from "../cart/cartRoutes";
import itemRoutes from "../item/itemRoutes";
import commentRoutes from "../comments/commentRoutes";
import orderRoutes from "../order/orderRoutes";
import brandRoutes from "../brand/brandRoutes";
import categoryRoutes from "../category/categoryRoutes";
import authRoutes from "../auth/authRoutes";
import paymentRoutes from '../payment/paymentRoutes'

const router = Router()
router.use("/user", userRoutes)
router.use("/cart", cartRoutes)
router.use("/item", itemRoutes)
router.use("/comment", commentRoutes)
router.use("/order", orderRoutes)
router.use("/brand", brandRoutes)
router.use("/category", categoryRoutes)
router.use("/auth", authRoutes)
router.use('/checkout', paymentRoutes)

export default router
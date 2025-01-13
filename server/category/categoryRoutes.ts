import { Router } from "express";
import CategoryController from "./categoryController"
import checkRoleMiddleware from "../middleware/checkRoleMiddleware"

const router = Router()

router.post("/create", checkRoleMiddleware(["ADMIN"]), CategoryController.create)
router.get("/list", CategoryController.getCategories)
router.patch("/change/:categoryId", checkRoleMiddleware(["ADMIN"]), CategoryController.change)
router.delete("/delete/:categoryId", checkRoleMiddleware(["ADMIN"]), CategoryController.delete)

export default router
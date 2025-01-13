import { Router } from "express";
import BrandController from "./brandController"
import checkRoleMiddleware from "../middleware/checkRoleMiddleware"

const router = Router()

router.post("/create", checkRoleMiddleware(["ADMIN"]), BrandController.create)
router.get("/list", BrandController.getBrands)
router.patch("/change/:brandId", checkRoleMiddleware(["ADMIN"]), BrandController.change)
router.delete("/delete/:brandId", checkRoleMiddleware(["ADMIN"]), BrandController.delete)

export default router
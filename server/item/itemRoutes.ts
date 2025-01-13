import { Router } from "express";
import ItemController from "./itemController"
import checkRoleMiddleware from "../middleware/checkRoleMiddleware"
import { uploadItemImages } from "../middleware/fileMiddleware"
import itemController from "./itemController"

const router = Router()

router.post("/create", checkRoleMiddleware(["ADMIN"]), uploadItemImages, ItemController.createItem)
router.get("/search", itemController.searchItems)
router.get("/list", ItemController.getItems)
router.get("/:itemId", ItemController.getOne)
router.delete("/delete/:itemId", checkRoleMiddleware(["ADMIN"]), ItemController.deleteItemWithDependencies)

export default router
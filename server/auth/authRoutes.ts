import { Router } from "express"
import AuthController from "./authController"

const router = Router()

router.post("/registration", AuthController.registration)
router.post("/logout", AuthController.logout)
router.post("/login", AuthController.login)
router.get("/refresh", AuthController.refreshReload)

export default router
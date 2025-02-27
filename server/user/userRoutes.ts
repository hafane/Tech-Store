import Router from "express";
import UserController from "./userController";
import authMiddleware from "../middleware/authMiddleware";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router();

router.patch("/change-personal", authMiddleware, UserController.changePersonal)
router.get("/list", checkRoleMiddleware(["ADMIN"]), UserController.getUsers)
router.post("/activate/create", authMiddleware, UserController.createMailActivateLink)
router.get("/activate/:link", UserController.activateMail)
router.patch("/set-admin/:userId", checkRoleMiddleware(["ADMIN"]), UserController.setUserAdmin)
router.post("/create-reset", UserController.createResetLink)
router.patch("/reset-password/:token", UserController.ResetPassword)
router.get("/reset-password/:token", UserController.checkResetTokenForExpired)

export default router
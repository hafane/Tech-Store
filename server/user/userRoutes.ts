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

export default router
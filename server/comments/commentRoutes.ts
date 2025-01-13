import { Router } from "express";
import CommentsController from "./commentsController"
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

router.post("/:itemId", authMiddleware, CommentsController.addComment)
router.delete("/:itemId", authMiddleware, CommentsController.delete)

export default router
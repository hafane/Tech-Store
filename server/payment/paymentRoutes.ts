import {Router} from 'express'
import paymentController from './paymentController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/', authMiddleware, paymentController.yookassaCallback)

export default router
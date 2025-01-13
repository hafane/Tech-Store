import { Request, Response, NextFunction } from "express"
import { PaymentCallback } from "./types"
import orderService from "../order/orderService"
import { PaymentDTO } from "./PaymentDTO"

class PaymentController {
    async yookassaCallback(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as PaymentCallback
            console.log(data)
            const returnData = new PaymentDTO(data.object)
            await orderService.paymentCallback(returnData.orderId, returnData.status)
            res.status(200).json(returnData)
        } catch (error) {
            next(error)
        }
    }
}

export default new PaymentController()
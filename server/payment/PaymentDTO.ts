interface PaymentData {
    metadata: {
        order_id: string
    }
    status: string
    id: string
    amount: {
        value: string
    }
    created_at: string
    payment_method: {
        title: string
    }
}

export class PaymentDTO {
    orderId
    status
    paymentId
    amount
    paidAt
    method

    constructor(model: PaymentData) {
        this.orderId = model.metadata.order_id
        this.status = model.status
        this.paymentId = model.id
        this.amount = model.amount.value
        this.paidAt = model.created_at
        this.method = model.payment_method.title
    }
}
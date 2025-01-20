import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Order } from "../../../store/orderStore"
import OrderItem from "./OrdersItems/OrderItem"

const CanceledSection = observer(() => {
	useEffect(() => {
		Order.fetchOrdersHistory("CANCELLED")
	}, [])

	return (
		<div className="px-2 space-y-2">
			{Order.ordersHistory.length
				? Order.ordersHistory.map(order => {
						return (
							<OrderItem
								key={order.id}
								orderId={order.id}
								totalAmount={order.totalAmount}
								orderItems={order.items}
								orderClaimer={order.name}
								orderPlaces={order.createAt}
							/>
						)
				  })
				: "Заказы отсутствуют."}
		</div>
	)
})

export default CanceledSection

import { useEffect } from "react"
import { Order } from "../../../store/orderStore"
import OrderItem from "./OrdersItems/OrderItem"
import { observer } from "mobx-react-lite"

const PendingSection = observer(() => {
	useEffect(() => {
		Order.fetchOrdersHistory("PENDING")
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

export default PendingSection

import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Order } from "../../../store/orderStore"
import { orderItemList } from "../../../services/types/OrderTypes"
import OrderItem from "./OrderItem/OrderItem"
import { BiDownArrow } from "react-icons/bi"

const AllOrdersSection = observer(() => {
	const [showItems, setShowItems] = useState<number>(0)

	useEffect(() => {
		Order.fetchAllOrders(10)
	}, [])

	return (
		<div className="px-2 space-y-2">
			{Order.allOrders.length
				? Order.allOrders.map(order => {
						const items = JSON.parse(order.items)
						const time = new Date(order.createAt)
						return (
							<div key={order.id}>
								<div className="py-4 px-8 flex justify-between bg-zinc-300/20 relative rounded-md [&>div]:flex [&>div]:flex-col [&>div]:gap-5 [&>div]:items-center">
									<div className="font-semibold w-80">
										Номер оплаты
										<span className="font-light">{order.paymentId}</span>
									</div>
									<div className="font-semibold">
										Номер заказа
										<span className="font-light">{order.id}</span>
									</div>
									<div className="font-semibold">
										Общая сумма
										<span className="font-light">
											{order.totalAmount} &#8381;
										</span>
									</div>
									<div className="font-semibold">
										Дата заказа
										<span className="font-light">{time.toLocaleDateString()}-{time.toLocaleTimeString()}</span>
									</div>
									<div className="font-semibold w-80">
										Получатель
										<span className="font-light">{order.name}</span>
									</div>
									<span
										role="button"
										onClick={() =>
											setShowItems(showItems === order.id ? 0 : order.id)
										}
										className="absolute bottom-0 right-0 top-1/2"
									>
										<BiDownArrow
											className={`transition-transform ${
												showItems === order.id ? "rotate-180" : ""
											}`}
											size={15}
										/>
									</span>
								</div>
								{showItems === order.id && (
									<ul className="space-y-2 mt-2">
										{items.map((item: orderItemList) => (
											<OrderItem key={item.Item.id} item={item.Item} quantity={item.quantity} />
										))}
									</ul>
								)}
							</div>
						)
				  })
				: "Заказы отсутствуют."}
		</div>
	)
})

export default AllOrdersSection

type props = {
	orderId: number
	totalAmount: number
	orderPlaces: number
	orderClaimer: string
	orderItems: string
}

const OrderItem = ({
	orderClaimer,
	orderId,
	orderPlaces,
	totalAmount,
	orderItems,
}: props) => {
	const items = JSON.parse(orderItems)
	const conv = new Date(orderPlaces)

	return (
		<div>
			<div className="py-4 px-12 flex justify-between bg-zinc-300/20 rounded-md [&>div]:flex [&>div]:flex-col [&>div]:gap-5 [&>div]:items-center">
				<div className="font-semibold">
					Номер заказа
					<span className="font-light">{orderId}</span>
				</div>
				<div className="font-semibold">
					Общая сумма
					<span className="font-light">{totalAmount} &#8381;</span>
				</div>
				<div className="font-semibold">
					Дата заказа
					<span className="font-light">
						{conv.toLocaleDateString()}-{conv.toLocaleTimeString()}
					</span>
				</div>
				<div className="font-semibold">
					Получатель
					<span className="font-light">{orderClaimer}</span>
				</div>
			</div>
			{/* <div className="flex justify-between">
				{items.map((item: any) => (
					<span>
						<img src={item.name} alt={item.name} />
					</span>
				))}
			</div> */}
		</div>
	)
}

export default OrderItem

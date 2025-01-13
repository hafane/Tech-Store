import { Link } from "react-router-dom"

type props = {
	item: {
		id: number
		name: string
		image: string[]
	}
	quantity: number
}

const OrderItem = ({ item, quantity }: props) => {
	return (
		<li
			className="py-4 px-2 rounded-md odd:bg-zinc-100/50 [&>span]:w-[calc(100%/2)] [&>span]:text-zinc-500"
		>
			<Link
				to={`/catalog/item/${item.id}`}
				className="flex items-center justify-between"
			>
				<span>
					<img
						height={64}
						width={64}
						src={import.meta.env.VITE_IMAGE_URL + item.image[0]}
						alt={item.name}
					/>
				</span>
				<p>Название: {item.name}</p>
				<span>Кол. во: {quantity}</span>
			</Link>
		</li>
	)
}

export default OrderItem

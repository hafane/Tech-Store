import { Cart } from "../../store/cartStore"
import CountUI from "../ui/CountUI"
import { BiCheckCircle } from "react-icons/bi"
import { CiDeliveryTruck } from "react-icons/ci"
import { TbTrash } from "react-icons/tb"

type Props = {
	itemId: number
	image: string[]
	name: string
	brand: string
	price: number
	quantity: number
}

const Card = ({itemId, image, name, brand, price, quantity}: Props) => {

	const quantityChange = async (itemId: number, quantity: number, name: string) => {
		const newQuantity = name === "plus" ? quantity + 1 : quantity - 1
		await Cart.updateItemQuantity(itemId, newQuantity)
	}

	return (
		<div className="w-full flex gap-5 h-52 md:h-44 py-1 px-2 shadow-md rounded-md mb-3">
			<img
				className="self-center"
				width="144"
				height="144"
				src={import.meta.env.VITE_IMAGE_URL + image[0]}
				alt=""
			/>
			<div className="w-full flex flex-col justify-between max-h-[168px]">
				<h4 className="text-xl">{name}</h4>
				<span className="text-sm font-light text-zinc-500">{brand}</span>
				<div className="flex flex-col gap-1 mt-3 font-light text-sm text-zinc-500 [&>span]:flex [&>span>svg]:text-blue-600">
					<span className="items-center gap-2">
						<CiDeliveryTruck size={19} /> Free Delivery
					</span>
					<span className="items-center gap-2">
						<BiCheckCircle size={19} /> Guaranteed
					</span>
				</div>
				<div className="w-full flex mb-2 justify-between items-center">
					<span className="text-zinc-500 text-sm">{price} &#8381;</span>
					<span className="flex items-center gap-2">
						<button onClick={() => Cart.deleteItemFromCart(itemId)} className="text-red-600">
							<TbTrash size={18} />
						</button>
						<CountUI value={quantity} onClick={(e) => quantityChange(itemId, quantity, e.currentTarget.name)} />
					</span>
				</div>
			</div>
		</div>
	)
}

export default Card

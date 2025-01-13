import { observer } from "mobx-react-lite"
import { CartItems, CartAside } from "../components/Cart"
import { BsBasket3 } from "react-icons/bs"

const Cart = observer(() => {
	return (
		<div>
			<div className="mb-12">
				<div className="flex flex-col items-center text-blue-600">
					<span className="rounded-full border-2 p-2 border-blue-600">
						<BsBasket3 size={45} />
					</span>
					<span className="text-sm font-light mt-2">Корзина</span>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-12 items-start">
				<CartItems />
				<CartAside/>
			</div>
		</div>
	)
})

export default Cart

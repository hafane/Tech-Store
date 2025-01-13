import { useEffect } from "react"
import { Cart } from "../../store/cartStore"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import { NavbarLinks } from "../../utils/constants/NavbarConsts"
import Card from "../CartDropdown/Card"
import DropdownLayout from "../layouts/dropdownLayout"
import { BiCart } from "react-icons/bi"

type Props = {
	setCartOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CartDropdown = observer(({ setCartOpen }: Props) => {

	useEffect(() => {
		if(Cart.cartLength === 0) {
			Cart.fetchUserCart()
		}
	}, [])

	return (
		<DropdownLayout
			innerDivClass="w-[512px] min-w-[512px] max-h-[680px] py-4"
			setIsDropdown={setCartOpen}
		>
			<h3 className="text-md text-zinc-600 mb-4 px-6">Количество: {Cart.cartLength}</h3>
			<div className="block max-h-[400px] pl-6 pr-12 overflow-y-scroll">
				{(Cart.userCart.CartItem && Cart.userCart.CartItem.length > 0) ? Cart.userCart.CartItem.map(item => (
					<Card
						key={item.id}
						itemId={item.itemId}
						quantity={item.quantity}
						brand={item.Item.brand.name}
						image={item.Item.image}
						name={item.Item.name}
						price={item.Item.price}
					/>
				)) : <div className="text-xl text-center text-zinc-500 mt-3 mb-3">Ваша корзина пуста.</div>}
			</div>
			<div className="flex justify-between px-6 mt-1">
				<span className="flex flex-col font-light text-sm items-center">
					Итого:
					<span className="font-semibold text-lg">{Cart.userCart.totalAmount || 0} &#8381;</span>
				</span>
				<Link
					onClick={() => setCartOpen(false)}
					className="w-[calc(100%/1.5)] flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1 justify-center text-white"
					to={NavbarLinks.Cart}
				>
					Перейти в корзину
					<BiCart size={18} />
				</Link>
			</div>
		</DropdownLayout>
	)
})

export default CartDropdown

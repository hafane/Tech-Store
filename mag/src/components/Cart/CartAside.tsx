import { observer } from "mobx-react-lite"
import { Cart } from "../../store/cartStore"
import { Order } from "../../store/orderStore"
import ButtonUI from "../ui/ButtonUI"

const CartAside = observer(() => {
    
	return (
		<div className="col-span-4 flex flex-col bg-white rounded-md shadow-lg p-5 sticky top-4">
			<span className="text-2xl font-bold">Детали оплаты</span>
			<div className="text-zinc-400 text-sm p-2 [&>p]:flex [&>p]:justify-between [&>p]:mb-2">
				<p>
					Сумма всех товаров:
					<span>{Cart.userCart.totalAmount} &#8381;</span>
				</p>
				<p>
					Скидка:
					<span>0 &#8381;</span>
				</p>
				<p>
					Доставка: <span>Бесплатно</span>
				</p>
				<hr />
			</div>
			<span className="flex justify-between text-lg">
				Итого
				<span>{Cart.userCart.totalAmount} &#8381;</span>
			</span>
			<ButtonUI
                form="cartForm"
                type="submit"
				disabled={Order.isLoading}
				className="mt-5 p-4 disabled:opacity-50 disabled:cursor-not-allowed"
				innerText={Order.isLoading ? "Загрузка..." : "Оформить заказ"}
			/>
		</div>
	)
})

export default CartAside

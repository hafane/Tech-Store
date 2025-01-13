import { useForm } from "react-hook-form"
import { observer } from "mobx-react-lite"
import { Cart } from "../../store/cartStore"
import { Order } from "../../store/orderStore"
import Card from "../CartDropdown/Card"
import InputTextUI from "../ui/InputTextUI"
import { validateOrderRules } from "../../utils/constants/validateConstants"

type TForm = {
	name: string
	phoneNumber: string
	city: string
	postalCode: string
	address: string
}

const CartItems = observer(() => {
	const {
		handleSubmit,
		reset,
		formState: { errors },
		register,
	} = useForm<TForm>()

	const onSubmit = (data: TForm) => {
		Order.createNewOrder(data)
		reset()
	}

	return (
		<div className="col-span-8 space-y-10">
			<div>
				<span className="text-2xl font-bold">1. Корзина</span>
				<div className="overflow-y-scroll mt-3 max-h-[620px]">
					{Cart.userCart.CartItem && Cart.userCart.CartItem.length > 0 ? (
						Cart.userCart.CartItem.map(item => (
							<Card
								key={item.id}
								brand={item.Item.brand.name}
								image={item.Item.image}
								name={item.Item.name}
								price={item.Item.price}
								itemId={item.itemId}
								quantity={item.quantity}
							/>
						))
					) : (
						<div className="text-xl text-center text-zinc-500 mt-3 mb-3">
							Ваша корзина пуста.
						</div>
					)}
				</div>
			</div>
			<div>
				<span className="text-2xl font-bold">2. Персональные данные</span>
				<form
					onSubmit={handleSubmit(onSubmit)}
					id="cartForm"
					className="grid grid-cols-2 gap-4 mt-3 last:[&>fieldset]:col-span-2"
					method="POST"
				>
					<InputTextUI
						register={register("name", validateOrderRules.customerName)}
						placeholder="Полное имя *"
					/>
					<InputTextUI
						register={register("phoneNumber", validateOrderRules.phoneNumber)}
						placeholder="Номер телефона *"
					/>
					<InputTextUI
						register={register("city", { required: true })}
						placeholder="Город *"
					/>
					<InputTextUI
						register={register("postalCode", validateOrderRules.postalCode)}
						placeholder="Почтовый индекс *"
					/>
					<InputTextUI
						register={register("address", { required: true })}
						placeholder="Адрес доставки *"
					/>
				</form>
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}
				{errors.phoneNumber && (
					<span className="text-red-500">{errors.phoneNumber.message}</span>
				)}
				{errors.postalCode && (
					<span className="text-red-500">{errors.postalCode.message}</span>
				)}
				{(errors.address || errors.city) && (
					<span className="text-red-500">Заполните все поля со *</span>
				)}
			</div>
		</div>
	)
})

export default CartItems

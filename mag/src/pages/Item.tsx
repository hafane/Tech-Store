import { observer } from "mobx-react-lite"
import { Item as ItemStore } from "../store/itemStore"
import { User } from "../store/userStore"
import { Cart } from "../store/cartStore"
import ButtonUI from "../components/ui/ButtonUI"
import ItemInfoImage from "../components/ItemPersonal/Main/ItemInfoImage"
import BottomInfo from "../components/ItemPersonal/Main/BottomInfo"

const Item = observer(() => {
	const handleAddToCart = async (id: number) => {
		await Cart.setItemCart(id)
	}

	return (
		<div className="grid grid-cols-6 gap-6">
			<div className="block col-span-5">
				<ItemInfoImage available={ItemStore.oneItem.available} brandName={ItemStore.oneItem.brand.name} categoryName={ItemStore.oneItem.category.name} name={ItemStore.oneItem.name} image={ItemStore.oneItem.image} />
				<BottomInfo />
			</div>
			<aside className="h-full flex flex-col col-span-1 justify-between min-w-[312px] max-h-[418px] bg-white rounded-md shadow-lg p-5">
				<span className="text-xl">{ItemStore.oneItem.price} &#8381;</span>
				<ButtonUI disabled={ItemStore.oneItem.available === 0 || User.isAuth === false} onClick={() => handleAddToCart(ItemStore.oneItem.id)} className="mt-5 p-4 disabled:opacity-50 disabled:cursor-not-allowed" children="Добавить в корзину." />
			</aside>
		</div>
	)
})

export default Item

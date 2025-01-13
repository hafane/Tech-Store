import useDeviceDetect from "../../../hooks/useDeviceDetect"
import { observer } from "mobx-react-lite"
import { Item } from "../../../store/itemStore"
import { Cart } from "../../../store/cartStore"
import { NavbarLinks } from "../../../utils/constants/NavbarConsts"
import ItemCard from "./ItemCard"
import Pagination from "../Pagination/Pagination"
import Sort from "../SortSection/Sort"

const ItemsSection = observer(() => {
	const {isMobile} = useDeviceDetect()
	const handleAddToCart = async (id: number) => {
		await Cart.setItemCart(id)
	}

	return (
		<section className="md:col-span-10">
			{!isMobile && <Sort/>}
			<div className="grid grid-cols-2 md:grid-cols-3 grid-rows-5 gap-6">
				{Item.listItems.map(item => (
					<ItemCard buttonClick={() => handleAddToCart(item.id)} itemPageLink={`${NavbarLinks.Catalog}/item/${item.id}`} image={item.image} available={item.available} name={item.name} price={item.price} key={item.id} />
				))}
			</div>
			<Pagination/>
		</section>
	)
})

export default ItemsSection

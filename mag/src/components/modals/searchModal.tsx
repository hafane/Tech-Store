import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Item } from "../../store/itemStore"
import ModalLayout from "../layouts/modalLayout"
import SearchUI from "../ui/SearchUI"

type props = {
	setSearchModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchModal = observer(({ setSearchModal }: props) => {
	const [searchInput, setSearchInput] = useState<string>("")
	const navigate = useNavigate()
	const debouncedSearch = useDebounce(searchInput, 250)

	useEffect(() => {
		const searchRes = async () => {
			Item.setSearchedItems([])
			if (debouncedSearch) {
				await Item.SearchItems(debouncedSearch)
			}
		}
		searchRes()
	}, [debouncedSearch])

	const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setSearchModal(false)
	}

	const handleItemClick = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
		e.preventDefault()
		navigate("/catalog/item/" + id)
		Item.setSearchedItems([])
		setSearchInput("")
		setSearchModal(false)
	}

	return (
		<ModalLayout handleCloseModal={closeModal} setIsModal={setSearchModal}>
			<div>
				<SearchUI
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					placeholder="Вы что-то ищете?"
				/>
				<ul className="flex flex-col gap-1 mt-4 max-h-96 overflow-y-scroll">
					{Item.searchedItems.length > 0 ? (
						Item.searchedItems.map(item => (
							<li
								key={item.id}
								role="button"
								onClick={e => handleItemClick(e, item.id)}
								className="flex items-center gap-1 hover:bg-zinc-300/20 p-2 rounded-md cursor-pointer"
							>
								<img
									className="w-8 h-8 rounded-full"
									src={import.meta.env.VITE_IMAGE_URL + item.image[0]}
									alt={item.name}
								/>
								{item.name}
							</li>
						))
					) : (
						<li className="text-zinc-300 text-center opacity-80">
							Ничего не найдено.
						</li>
					)}
				</ul>
			</div>
		</ModalLayout>
	)
})

export default SearchModal

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "../../../hooks/useDebounce"
import { Item } from "../../../store/itemStore"
import SearchUI from "../../ui/SearchUI"


const MobileSearch = () => {
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
    
    const handleItemClick = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
        e.stopPropagation()
        navigate("/catalog/item/" + id)
        Item.setSearchedItems([])
        setSearchInput("")
    }

	return (
		<div className="bg-white relative">
			<SearchUI inpClass="border-none bg-zinc-500/10" value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Вы что-то ищете?" />
			<ul className="absolute top-12 left-0 right-0 overflow-y-scroll bg-white">
                {Item.searchedItems.length > 0 && (
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
                )}
            </ul>
		</div>
	)
}

export default MobileSearch

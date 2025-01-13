import { useEffect } from "react"
import { useFilterContext } from "../../context/filterContext"
import { observer } from "mobx-react-lite"
import { Category } from "../../store/categoryStore"
import { CatalogHeadConst } from "../../utils/constants/CatalogHeadContst"

const Header = observer(() => {
    const filters = useFilterContext()

    useEffect(() => {
        Category.fetchList()
    }, [])

    return (
        <div className="flex p-2 items-center justify-center mb-8">
            <ul className="w-full flex justify-around overflow-auto">
                {Category.list.map(item => 
                    <li aria-pressed={filters.state.category === item.name} role="button" onClick={() => filters.change.setCategory(item.name)} className="flex flex-col gap-2 items-center font-light py-1 px-4 rounded-lg hover:bg-zinc-300/20 cursor-pointer" key={item.id}>
                        {CatalogHeadConst[item.name]}
                        <span className={filters.state.category === item.name ? "border-b border-blue-400" : ""}>{item.name}</span>
                    </li>
                )}
            </ul>
        </div>
    );
})

export default Header;
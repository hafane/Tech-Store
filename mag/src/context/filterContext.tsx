import { createContext, ReactNode, useContext } from "react"
import { UseFilter } from "../hooks/useFilter"

type filterContextType = ReturnType<typeof UseFilter> | null

export const FilterContext = createContext<filterContextType>(null)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const filter = UseFilter()
    return <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
}

export const useFilterContext = () => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error("useFilterContext должен быть использован внутри FilterProvider")
    }
    return context
}
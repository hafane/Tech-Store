import React from "react"
import { FiSearch } from "react-icons/fi"
import { twMerge } from "tailwind-merge"

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
    fieldsetClass?: string
    inpClass?: string
}

const SearchUI = ({fieldsetClass, inpClass, ...props}: props) => {
    return (
        <fieldset className={twMerge("flex relative text-zinc-400", fieldsetClass)}>
            <FiSearch className="size-6 absolute right-3 top-[20%]" />
            <input className={twMerge("w-full px-4 py-2 border border-zinc-300 rounded-md", inpClass)} type="search" name="searchInput" placeholder={props.placeholder} {...props} />
        </fieldset>
    );
}

export default SearchUI;

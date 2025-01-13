import { useEffect, useRef } from "react"

export const useOutsideClick = (callback: () => void) => {
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		const keyDownClose = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				callback()
			}
		}

		document.addEventListener("mousedown", handleClick)
		document.addEventListener("touchend", handleClick)
		document.addEventListener("keydown", keyDownClose)
		document.body.style.overflow = "hidden"
		return () => {
			document.removeEventListener("mousedown", handleClick)
			document.removeEventListener("touchend", handleClick)
			document.removeEventListener("keydown", keyDownClose)
			document.body.style.overflow = "unset"
		}
	}, [callback])
	return ref
}

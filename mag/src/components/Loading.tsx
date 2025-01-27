import { BiLoader } from "react-icons/bi"

type props = {
	loaderSize?: number
	spinnerColor?: "lightblue" | "lightgreen" | "red"
}

const Loading = ({ loaderSize = 20, spinnerColor = "lightblue" }: props) => {
	return (
		<BiLoader
            fill={spinnerColor}
			className="animate-spin"
			size={loaderSize}
		/>
	)
}

export default Loading

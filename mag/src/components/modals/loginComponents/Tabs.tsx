import { Dispatch } from "react"

const Tabs = ({
	isPage,
	setIsPage,
}: {
	isPage: string
	setIsPage: Dispatch<React.SetStateAction<"login" | "registration" | "reset">>
}) => {
	return (
		<div className="flex [&>span]:w-[calc(100%/2)] [&>span]:border-b-2 [&>span]:cursor-pointer">
			<span
				onClick={() => setIsPage("login")}
				className={`text-xl text-center font-light ${
					isPage === "login"
						? "border-blue-500 text-blue-500"
						: "text-neutral-500 border-neutral-300"
				}`}
			>
				Логин
			</span>
			<span
				onClick={() => setIsPage("registration")}
				className={`text-xl text-center font-light ${
					isPage === "registration"
						? "border-blue-500 text-blue-500"
						: "text-neutral-500 border-neutral-300"
				}`}
			>
				Регистрация
			</span>
		</div>
	)
}

export default Tabs

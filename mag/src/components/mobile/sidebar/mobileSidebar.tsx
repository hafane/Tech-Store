import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/af457b845c916aafabc5f60a197b5da7.jpg"
import { NavbarUlLis } from "../../../utils/constants/NavbarConsts"
import { IoCloseCircleOutline } from "react-icons/io5"

type props = {
	setState: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileSidebar = ({ setState }: props) => {
	const navigate = useNavigate()
	const handleClose = () => {
		setState(false)
	}

	return (
		<>
			<div className="top-0 left-0 right-0 bottom-0 z-50 absolute bg-black/30"></div>
			<aside className="px-5 py-3 fixed top-0 left-0 w-[300px] h-full bg-white z-50 animate-sidebar-anima">
				<div className="flex justify-between">
					<Link to={"/"}>
						<img className="size-16" src={logo} alt="Tech logo" />
					</Link>
					<button onClick={handleClose}>
						<IoCloseCircleOutline size={24} />
					</button>
				</div>
				<ul className="pl-2 mt-12 space-y-3 [&>li]:text-xl [&>li]:font-light">
					{NavbarUlLis.map(item => (
						<li
							aria-pressed={item.link === window.location.pathname}
							role="button"
							key={item.link}
							onClick={() => navigate(item.link)}
							className={`${
								item.link === window.location.pathname
									? "text-blue-400 underline"
									: "text-neutral-700"
							} cursor-pointer`}
						>
							{item.text}
						</li>
					))}
				</ul>
			</aside>
		</>
	)
}

export default MobileSidebar

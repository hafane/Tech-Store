import { Link, useNavigate } from "react-router-dom"
import { MainCategories } from "../utils/constants/MainCategories"
import { NavbarLinks } from "../utils/constants/NavbarConsts"
import ButtonUI from "../components/ui/ButtonUI"
import mainImage from "../assets/homeMainImage.png"

const Home = () => {
	const nav = useNavigate()
	
	const handleNavigate = () => {
		return nav("/catalog")
	}

	return (
		<div>
			<div className="grid grid-cols-2 mb-12">
				<div className="h-full flex flex-col ml-6 md:ml-0 items-start justify-evenly">
					<h2 className="text-2xl md:text-7xl font-bold">Tech Mag</h2>
					<span className="text-xs md:text-2xl flex items-center gap-3 font-bold">
						"Join the
						<span className="text-orange-600">digital revolution"</span>
					</span>
					<ButtonUI
						onClick={handleNavigate}
						innerText="Explore more"
						type="button"
						className="bg-orange-600 py-2 text-xs md:px-5 md:py-2 text-white w-1/2 md:w-2/5"
					/>
				</div>
				<div className="flex justify-center">
					<img
						loading="lazy"
						className="w-full md:w-2/3"
						src={mainImage}
						alt="MainImage"
					/>
				</div>
			</div>
			<div>
				<ul className="flex justify-evenly gap-2">
					{MainCategories.map(item => (
						<li
							key={item.title}
							role="button"
							className="flex flex-col p-2 md:px-3 md:py-1 bg-white shadow-md rounded-lg text-xs font-light md:text-lg md:font-medium hover:bg-zinc-300/20 transition-colors"
						>
							<Link className="flex flex-col justify-center items-center" to={`${NavbarLinks.Catalog}${item.link}`}>
								<img
									loading="lazy"
									className="w-16 h-16 md:w-44 md:h-44"
									src={item.image}
									alt=""
								/>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Home

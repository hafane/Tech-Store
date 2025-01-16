import InputTextUI from "../ui/InputTextUI"
import { BiMapPin, BiPhone, BiMailSend } from "react-icons/bi"
import { CgMail } from "react-icons/cg"
import {
	RiFacebookCircleLine,
	RiTwitterXFill,
	RiInstagramLine,
	RiYoutubeLine,
} from "react-icons/ri"
import { Link } from "react-router-dom"
import { NavbarLinks } from "../../utils/constants/NavbarConsts"
import AccordionUI from "../ui/AccordionUI"
import ScrollTopButton from "../ui/ScrolltopButton"

const MobileFooter = () => {
	return (
		<footer className="overflow-hidden relative bg-blue-950  before:bg-blue-700 mt-10 before:h-full before:opacity-50 before:w-[calc(100%/2)] before:absolute before:mx-auto before:top-[calc(80%-1rem)] before:left-0 before:right-0 before:rounded-t-full before:blur-3xl">
			<div className="container mx-auto py-6 px-6">
				<div className="flex justify-end">
					<ScrollTopButton />
				</div>
				<div className="flex flex-col gap-4">
					<span className="text-white font-medium text-md">
						Подпишитесь на новости и обновления
					</span>
					<InputTextUI
						Icon={CgMail}
						placeholder="Ваша почта"
						type="email"
						classNames="bg-transparent text-white"
						iconClasses="text-white"
					/>
				</div>
				<div className="block">
					<AccordionUI
						title="Company"
						titleClass="text-white font-medium text-md"
						wrapClass="border-none"
					>
						<ul className="flex flex-col gap-2 [&>li>a]:text-white/50">
							<li>
								<Link to={NavbarLinks.Home}>About</Link>
							</li>
							<li>
								<Link to={NavbarLinks.Blog}>Blog</Link>
							</li>
						</ul>
					</AccordionUI>
				</div>
				<div className="block">
					<AccordionUI
						title="Info"
						titleClass="text-white font-medium text-md"
						wrapClass="border-none"
					>
						<ul className="flex flex-col gap-2 [&>li>a]:text-white/50">
							<li>
								<Link to={NavbarLinks.FAQ}>FAQ</Link>
							</li>
						</ul>
					</AccordionUI>
				</div>
				<div className="block">
					<AccordionUI
						title="Contact Us"
						titleClass="text-white font-medium text-md"
						wrapClass="border-none"
					>
						<ul className="flex flex-col gap-2 [&>li>a]:text-white/50">
							<li>
								<Link
									to={NavbarLinks.Contact}
									className="flex items-center gap-2"
								>
									<BiMapPin size={18} />
									123 Gagarina Street, Krasnodar, Russia
								</Link>
							</li>
							<li>
								<Link
									to={NavbarLinks.Contact}
									className="flex items-center gap-2"
								>
									<BiPhone size={18} />
									+7 (123) 456-78-90
								</Link>
							</li>
							<li>
								<Link
									to={NavbarLinks.Contact}
									className="flex items-center gap-2"
								>
									<BiMailSend size={18} />
									1uNlQ@example.com
								</Link>
							</li>
						</ul>
					</AccordionUI>
				</div>
			</div>
			<div className="py-3 flex bg-[#021736]/80 relative justify-end px-1">
				<div className="flex gap-4 [&>a>svg]:size-6 [&>a]:text-white">
					<Link to="https://www.facebook.com">
						<RiFacebookCircleLine />
					</Link>
					<Link to="https://twitter.com">
						<RiTwitterXFill />
					</Link>
					<Link to="https://www.instagram.com">
						<RiInstagramLine />
					</Link>
					<Link to="https://www.youtube.com">
						<RiYoutubeLine />
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default MobileFooter

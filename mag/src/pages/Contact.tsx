import { contacts } from "../utils/constants/ContactConsts"
import InputTextUI from "../components/ui/InputTextUI"
import ButtonUI from "../components/ui/ButtonUI"
import TextareaUI from "../components/ui/TextareaUI"

const Contact = () => {
	return (
		<div className="container max-w-[1000px] mx-auto">
			<div className="flex mx-auto px-12 justify-between">
				{contacts.map(item => (
					<div key={item.title} className="flex flex-col items-center gap-2">
						<item.svg className="text-blue-500" size={64} />
						<h1 className="text-xl font-bold">{item.title}</h1>
						<p className="text-sm font-light text-wrap text-zinc-500">
							{item.desc}
						</p>
					</div>
				))}
			</div>
			<div className="block sm:flex gap-4 mt-20">
				<div className="w-full">
					<span className="text-xl font-bold mb-3">Напишите нам.</span>
					<p className="font-light text-zinc-500 mt-4">
						We're here to assist you every step of the way. Whether you have a
						question, need technical support, or simply want to share your
						feedback, our dedicated team is ready to listen and provide prompt
						assistance.
					</p>
				</div>
				<div className="flex w-full flex-col gap-4">
					<InputTextUI
						iconClasses="w-6 h-6 text-zinc-400"
						placeholder="Ваше имя"
						type="text"
					/>
					<InputTextUI
						iconClasses="w-6 h-6 text-zinc-400"
						placeholder="Ваша почта"
						type="text"
					/>
					<TextareaUI placeholder="Сообщение" classNames="h-40" />
					<ButtonUI className="w-1/2 self-end p-3" children="Отправить" />
				</div>
			</div>
		</div>
	)
}

export default Contact

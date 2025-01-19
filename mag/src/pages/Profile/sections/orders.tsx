import { useState } from "react"
import { CanceledSection, PendingSection, SuccessSection } from "../../../components/Profile"

const Orders = () => {
	const [section, setSection] = useState<string>("")

	const baseClass = "data-[current-section=true]:text-blue-600 data-[current-section=true]:border-b-2 data-[current-section=true]:border-blue-600 text-zinc-500 cursor-pointer"

	return (
		<>
			<h1 className="mb-4">История заказов</h1>
			<div className="flex flex-col gap-8">
				<div className="border-b">
					<div className="w-full md:w-1/2 flex justify-between">
						<span
							data-current-section={section === "Pending"}
							className={baseClass}
						>
							<button onClick={() => setSection("Pending")}>Pending</button>
						</span>
						<span
							data-current-section={section === "Success"}
							className={baseClass}
						>
							<button onClick={() => setSection("Success")}>Success</button>
						</span>
						<span
							data-current-section={section === "Canceled"}
							className={baseClass}
						>
							<button onClick={() => setSection("Canceled")}>Canceled</button>
						</span>
					</div>
				</div>
				{section === "Pending" && <PendingSection />}
				{section === "Success" && <SuccessSection />}
				{section === "Canceled" && <CanceledSection />}
			</div>
		</>
	)
}

export default Orders
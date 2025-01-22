import frame from "../assets/FAQFrame.png"
import AccordionUI from "../components/ui/AccordionUI"

const FAQ = () => {
	return (
		<div className="container max-w-[1016px] mx-auto">
			<div className="flex px-4 sm:px-0 mb-4">
				<img width="1016" height="426" src={frame} alt="Frequently Asked Questions" loading="lazy" />
			</div>
			<div className="block sm:grid sm:grid-cols-4">
				<aside className="col-span-1 p-4">
					<h3 className="font-bold mb-2">Table of Contents</h3>
					<ul className="space-y-2">
						<li>
							<a href="#general" className="text-blue-500 hover:underline">
								General
							</a>
						</li>
						<li>
							<a href="#trust" className="text-blue-500 hover:underline">
								Trusts & Safety
							</a>
						</li>
						<li>
							<a href="#services" className="text-blue-500 hover:underline">
								Services
							</a>
						</li>
						<li>
							<a href="#billing" className="text-blue-500 hover:underline">
								Billing
							</a>
						</li>
					</ul>
				</aside>
				<section className="col-span-3">
                    <AccordionUI title="Can i purchase products from Tech using installment payments?" children="No, Tech doesn't allow installment payments." titleClass="text-left" />
                    <AccordionUI title="How can I engage with the magazine content on Tech?" children="You can engage with the magazine content on Tech by subscribing to our newsletter or following our social media channels." titleClass="text-left" />
                    <AccordionUI title="Does Tech offer a warranty on its products?" children="No, Tech doesn't offer a warranty on its products." titleClass="text-left" />
                    <AccordionUI title="Is Tech a secure platform for online shopping?" children="Yes, Tech is a secure platform for online shopping." titleClass="text-left" />
                    <AccordionUI title="How can I get assistance with my purchase or any other inquiries?" children="You can get assistance with your purchase or any other inquiries by contacting our customer support team." titleClass="text-left" />
                </section>
			</div>
		</div>
	)
}

export default FAQ

import OrderAnimationWrapper from "@/components/client/order/orderAnimationWrapper"
import OrderImage from "@/components/client/order/orderImage"
import { prisma } from "@repo/db"
import { notFound } from "next/navigation"
import Navbar from "@/components/client/navbar"
import decorationElement from "../../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"

interface Params {
	id: string
}

export default async function Order(props: { params: Promise<Params> }) {
	const params = await props.params

	const { id } = params

	const getDataOrder = await prisma.order.findUnique({
		where: { id },
		include: { events: true },
	})

	if (!getDataOrder) return notFound()

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<div className="max-w-(--breakpoint-2xl) mx-auto w-full py-4 p-2 flex-grow">
					<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 pointer-events-none " />
					<Navbar />
					<div className="flex items-center justify-center gap-24 max-xl:gap-10  max-w-(--breakpoint-xl) mx-auto px-5 mt-20">
						<div className="flex flex-col  w-full">
							<OrderAnimationWrapper data={getDataOrder} />
						</div>
						<OrderImage />
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

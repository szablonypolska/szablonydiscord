import OfferHeader from "@/components/client/offers/offerHeader"
import OfferList from "@/components/client/offers/offerList"
import OfferTopSidebar from "@/components/client/offers/offerTopSidebar"
import { prisma } from "@repo/db"

export default async function Offers() {
	const offers = await prisma.offer.findMany()


	return (
		<>
			<div className="max-w-(--breakpoint-xl) mx-auto">
				<OfferHeader />
				<OfferTopSidebar />
				<OfferList offers={offers} />
			</div>
		</>
	)
}

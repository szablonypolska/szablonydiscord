import OfferBasic from "@/components/client/offers/details/basic/offerBasic"
import OfferPremium from "@/components/client/offers/details/premium/offerPremium"
import FinalizationOrder from "@/components/client/offers/details/finalizationOrder"
import { OrderType } from "@/types/order"

interface Params {
	id: OrderType
}

export default async function OfferType(props: { params: Promise<Params> }) {
	const params = await props.params

	return (
		<>
			<div className="max-w-(--breakpoint-lg) mx-auto mt-20">
				<div className="flex flex-col items-center justify-center  ">
					<FinalizationOrder />
					{params.id === "basic" && <OfferBasic />}
					{params.id === "premium" && <OfferPremium />}
				</div>
			</div>
		</>
	)
}

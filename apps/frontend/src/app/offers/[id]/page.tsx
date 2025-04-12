import OfferBasic from "@/components/client/offers/details/basic/offerBasic"
import FinalizationOrder from "@/components/client/offers/details/finalizationOrder"
import { OrderType } from "@/types/order"

interface Params {
	id: OrderType
}

export default async function OfferType(props: { params: Promise<Params> }) {
	const params = await props.params

	return (
		<>
			<div className="max-w-screen-lg mx-auto my-20">
				<div className="flex flex-col items-center justify-center  ">
					<FinalizationOrder />
					<OfferBasic />
				</div>
			</div>
		</>
	)
}

import OrderHeader from "@/components/client/order/orderHeader"
import OrderImage from "@/components/client/order/orderImage"
import OrderTimeline from "@/components/client/order/orderTimeline"

export default async function Order() {
	return (
		<>
			<div className="flex items-center justify-center gap-20 max-xl:gap-10 mt-20 max-w-screen-xl mx-auto px-5">
				<div className="flex flex-col gap-10 w-full">
					<OrderHeader />
					<OrderTimeline />
				</div>
				<OrderImage />
			</div>
		</>
	)
}

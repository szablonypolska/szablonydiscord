import AccountOrderFilter from "./AccountOrderFilter"
import AccountOrderBox from "./AccountOrderBox"
import { Order } from "@/components/interfaces/order/common"

export function AccountOrder({ order }: { order: Order[] }) {
	return (
		<div className="bg-box-color-dashboard border border-border-color w-full mt-7 rounded-lg">
			<div className=" p-5">
				<h2 className="text-lg font-semibold">Twoje zamówienia</h2>
			</div>
			<div className="w-full bg-border-color h-[1px] my-2"></div>
			<AccountOrderFilter />
			<AccountOrderBox order={order} />
		</div>
	)
}

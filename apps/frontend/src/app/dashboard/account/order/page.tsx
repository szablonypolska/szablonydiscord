import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import { prisma } from "@repo/db"
import { Order } from "@/components/interfaces/order/common"
import AccountOrderFilter from "@/components/client/dashboard/account/order/AccountOrderFilter"
import AccountOrderBox from "@/components/client/dashboard/account/order/AccountOrderBox"

export default async function OrderDashboardPage() {
	const session = await getServerSession(authOptions)

	const order: Order[] = await prisma.order.findMany({
		where: { userId: session?.user.id },
		orderBy: { createdAt: "desc" },
		include: {
			products: {
				include: {
					offer: true,
				},
			},
			events: true,
			promoCode: true,
		},
	})

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

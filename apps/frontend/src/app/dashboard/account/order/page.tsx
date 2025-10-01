import { AccountOrder } from "@/components/client/dashboard/account/order/AcountOrder"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import { prisma } from "@repo/db"

export default async function OrderDashboardPage() {
	const session = await getServerSession(authOptions)

	const order = await prisma.order.findMany({
		where: { userId: session?.user.id },
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

	return <AccountOrder order={order} />
}

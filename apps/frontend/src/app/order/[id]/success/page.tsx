import SuccessOrderBox from "@/components/client/order/success/successOrderBox"
import SuccessOrderHeader from "@/components/client/order/success/successOrderHeader"
import ConfettiBackground from "@/components/ui/confetti-background"
import SuccessOrderHelp from "@/components/client/order/success/successOrderHelp"
import { prisma } from "@repo/db"

export default async function Success(props: { params: Promise<{ id: string }> }) {
	const params = await props.params
	const { id } = params

	const order = await prisma.order.findUnique({
		where: { id },
		include: { products: { include: { offer: true } }, events: true },
	})

	console.log("zwraca1", order)

	return (
		<>
			<div className="flex flex-col items-center justify-center relative min-h-screen">
				<div className="absolute w-full h-full inset-0">
					<ConfettiBackground />
				</div>
				<SuccessOrderHeader />
				<SuccessOrderBox order={order} />
				<SuccessOrderHelp />
			</div>
		</>
	)
}

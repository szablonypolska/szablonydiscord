import { Button } from "@nextui-org/button"
import { CircleAlert, Clock, Loader, Loader2 } from "lucide-react"
import Link from "next/link"
import { PropsOrder } from "@/components/interfaces/order/status/common"

export default function OrderCardInfo({ status, orderPaymentLink, events }: { status: string; orderPaymentLink: string; events: PropsOrder[] }) {
	return (
		<>
			{status === "COMPLETED" && (
				<div className="bg-boxColor p-5 border border-borderColor w-full rounded-lg mt-20">
					<div className="flex items-center gap-3">
						<Clock className="text-primaryColor" />
						<p className="text-primaryColor font-semibold">To zamówienie zostało opłacone i zakończone.</p>
					</div>
				</div>
			)}
			{status === "NEW" && (
				<div className="bg-boxColor p-5 border border-borderColor w-full rounded-lg mt-20">
					<div className="flex items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<CircleAlert className="text-primaryColor" />
							<p className="text-primaryColor font-semibold">Oczekiwanie na płatność</p>
						</div>
						<Link href={orderPaymentLink}>
							<Button className="bg-primaryColor rounded-full px-4 h-8 text-sm">Zapłać teraz</Button>
						</Link>
					</div>
				</div>
			)}

			{status === "PAID" && (
				<div className="bg-boxColor p-5 border border-borderColor w-full rounded-lg mt-20">
					<div className="flex items-center gap-3">
						<Loader2 className="text-primaryColor animate-spin" />
						<p className="text-primaryColor font-semibold">Otrzymano płatność, oczekiwanie na odpowiedz serwera</p>
					</div>
				</div>
			)}

			<div className="flex items-center gap-3 mt-2.5">
				<p className="text-textColor text-xs">*Więcej na temat tego zamówienia znajdziesz w panelu</p>
			</div>
		</>
	)
}

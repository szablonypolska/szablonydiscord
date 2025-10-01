import { Button } from "@nextui-org/button"
import { CircleAlert, Clock, Loader2 } from "lucide-react"
import { OrderEvent } from "@/components/interfaces/order/common"
import Link from "next/link"

export default function OrderCardInfo({ status }: { status: OrderEvent[] }) {
	const lastStatus = status[status.length - 1]?.status
	return (
		<>
			{lastStatus === "COMPLETED" && (
				<div className="bg-box-color p-5 border border-border-color w-full rounded-lg mt-20">
					<div className="flex items-center gap-3">
						<Clock className="text-primary-color" />
						<p className="text-primary-color font-semibold">To zamówienie zostało opłacone i zakończone.</p>
					</div>
				</div>
			)}
			{lastStatus === "NEW" && (
				<div className="bg-box-color p-5 border border-border-color w-full rounded-lg mt-20">
					<div className="flex items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<CircleAlert className="text-primary-color" />
							<p className="text-primary-color font-semibold">Oczekiwanie na płatność</p>
						</div>
						<Link href={""}>
							<Button className="bg-primary-color rounded-full px-4 h-8 text-sm">Zapłać teraz</Button>
						</Link>
					</div>
				</div>
			)}

			{lastStatus === "PAID" && (
				<div className="bg-box-color p-5 border border-border-color w-full rounded-lg mt-20">
					<div className="flex items-center gap-3">
						<Loader2 className="text-primary-color animate-spin" />
						<p className="text-primary-color font-semibold">Otrzymano płatność, oczekiwanie na odpowiedz serwera</p>
					</div>
				</div>
			)}

			<div className="flex items-center gap-3 mt-2.5">
				<p className="text-text-color text-xs">*Więcej na temat tego zamówienia znajdziesz w panelu</p>
			</div>
		</>
	)
}

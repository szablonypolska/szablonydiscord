import { Crown } from "lucide-react"

export default function OfferUpgradeHeader() {
	return (
		<div className="flex flex-col items-center justify-center text-center">
			<div className="flex items-center gap-2 bg-primary-dark/30  border border-primary-dark text-primary-color p-1.5 px-5 rounded-full w-fit">
				<Crown className="text-primary-color w-5 h-5" />
				<p className="font-medium text-sm">Szablony premium</p>
			</div>
			<h1 className="mt-5 text-4xl font-bold">Odblokuj pełen potencjał swoich serwerów</h1>
			<p className="mt-4 text-text-color w-[40rem]">Zyskaj nieograniczony dostęp do wszystkich premium szablonów, narzędzi i funkcji, aby tworzyć jeszcze lepsze serwery Discord. </p>
		</div>
	)
}

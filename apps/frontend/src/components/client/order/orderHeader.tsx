import { WalletMinimal } from "lucide-react"

export default function OrderHeader() {
	return (
		<div className="max-2xl:w-full">
			<div className="flex items-end  gap-3 bg-borderColor p-1.5 px-5 rounded-full w-fit">
				<WalletMinimal className="text-primaryColor w-5 h-5" />
				<p className=" text-sm">Status twojego zamówienia</p>
			</div>
			<h1 className="text-3xl font-semibold mt-5">
				Status twojego zamówienia <span className="text-primaryColor">#533</span>
			</h1>
			<p className="text-textColor mt-2">To jest śledzenie twojego zamówienia, jesli nastąpił błąd skontaktuj się z nami.</p>
		</div>
	)
}

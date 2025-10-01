import { ArrowLeft, Share2, Clock } from "lucide-react"

export default function AccountOrderDetailsOrder() {
	return (
		<div className="fixed top-0 right-0 h-screen w-[40rem] bg-background border-l border-border-color">
			<div className="flex items-center justify-between p-5">
				<button className="cursor-pointer text-primary-color p-2 rounded-lg hover:bg-border-color">
					<ArrowLeft className="w-5 h-5" />
				</button>
				<h3 className="font-semibold text-lg">Szczegóły zamówienia</h3>
				<button className="cursor-pointer text-primary-color p-2 rounded-lg hover:bg-border-color">
					<Share2 className="w-5 h-5" />
				</button>
			</div>
			<div className="w-full  bg-border-color h-[1px]"></div>
			<div className="p-5">
				<div className="bg-box-color border border-border-color rounded-lg p-4 ">
					<div className="flex justify-between items-center">
						<div className="">
							<p className="text-sm text-text-color mb-1">Numer zamówienia</p>
							<span className="font-semibold text-xl">#450</span>
						</div>
						<div className="bg-primary-dark px-3 py-1 rounded-full w-fit">
							<p className="text-primary-color text-sm">Zrealizowane</p>
						</div>
					</div>
					<div className="flex items-center gap-3 mt-5">
						<div className="bg-background p-4 border border-border-color rounded-lg flex-1">
							<p className="text-sm text-text-color/70 mb-1">Data zamówienia</p>
							<span className="font-semibold">12 czerwca 2023</span>
						</div>
						<div className="bg-background p-4 border border-border-color rounded-lg flex-1">
							<p className="text-sm text-text-color/70 mb-1">Liczba produktów</p>
							<span className="font-medium ">2</span>
						</div>
						<div className="bg-background p-4 border border-border-color rounded-lg flex-1">
							<p className="text-sm text-text-color/70 mb-1">Kod promocyjny</p>
							<span className="font-medium">Brak</span>
						</div>{" "}
					</div>
				</div>
				<div className="mt-7">
					<p className="text-lg font-semibold">Status zamówienia</p>
					<div className="relative">
						<div className="absolute top-0 left-[18px] w-[2px] h-full bg-border-color z-[-1]"></div>
						<div className="flex items-start gap-4 mt-4 z-10">
							<div className="bg-border-color p-2.5 rounded-full">
								<Clock className="w-4.5 h-4.5 text-primary-color" />
							</div>
							<div className="flex items-start justify-between bg-box-color border border-border-color rounded-lg w-full p-4">
								<div className="">
									<p className="font-semibold">Nowe</p>
									<span className="text-sm text-text-color">Zamówienie zostało złożone</span>
								</div>
								<span className="text-sm text-text-color">12 czerwca 2023</span>
							</div>
						</div>
						<div className="flex items-start gap-4 mt-5 z-10">
							<div className="bg-border-color p-2.5 rounded-full">
								<Clock className="w-4.5 h-4.5 text-primary-color" />
							</div>
							<div className="flex items-start justify-between bg-box-color border border-border-color rounded-lg w-full p-4">
								<div className="">
									<p className="font-semibold">Nowe</p>
									<span className="text-sm text-text-color">Zamówienie zostało złożone</span>
								</div>
								<span className="text-sm text-text-color">12 czerwca 2023</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

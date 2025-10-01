import { Button } from "@nextui-org/button"
import { ArrowRight, Banana } from "lucide-react"

export default function TemplatesSimiliar() {
	return (
		<div className="lg:mx-20 max-lg:mx-10 mt-10">
			<div className="flex items-center  gap-3 mb-5">
				<div className="w-full h-[2px] bg-border-color"></div>
				<h2 className="text-lg font-semibold  text-nowrap">
					Inne szablony <span className="text-text-color">pasujące</span> do tego wyszukania
				</h2>
				<div className="w-full h-[2px] bg-border-color"></div>
			</div>
			<div className="flex items-center gap-5 mt-5">
				<div className="bg-box-color p-3 rounded-lg border border-border-color flex-grow">
					<div className="flex items-center gap-4">
						<div className="bg-border-color p-2.5 rounded-lg w-fit">
							<Banana className="w-6 h-6 text-gray-200" />
						</div>
						<div className="">
							<p className="font-semibold">Gaming pro</p>
							<p className="text-text-color text-sm">Brak podobnych szablonów</p>
						</div>
					</div>
					<div className="flex items-center gap-3 my-4">
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
					</div>
					<Button className="bg-border-color w-full rounded-lg text-sm h-9">
						<span>Utwórz szablon</span>
						<ArrowRight className="w-4 h-4" />
					</Button>
				</div>
				<div className="bg-box-color p-3 rounded-lg border border-border-color flex-grow">
					<div className="flex items-center gap-4">
						<div className="bg-border-color p-2.5 rounded-lg w-fit">
							<Banana className="w-6 h-6 text-gray-200" />
						</div>
						<div className="">
							<p className="font-semibold">Gaming pro</p>
							<p className="text-text-color text-sm">Brak podobnych szablonów</p>
						</div>
					</div>
					<div className="flex items-center gap-3 my-4">
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
					</div>
					<Button className="bg-border-color w-full rounded-lg text-sm h-9">
						<span>Utwórz szablon</span>
						<ArrowRight className="w-4 h-4" />
					</Button>
				</div>
				<div className="bg-box-color p-3 rounded-lg border border-border-color flex-grow">
					<div className="flex items-center gap-4">
						<div className="bg-border-color p-2.5 rounded-lg w-fit">
							<Banana className="w-6 h-6 text-gray-200" />
						</div>
						<div className="">
							<p className="font-semibold">Gaming pro</p>
							<p className="text-text-color text-sm">Brak podobnych szablonów</p>
						</div>
					</div>
					<div className="flex items-center gap-3 my-4">
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
						<div className="bg-border-color px-3 py-0.5 rounded-full w-fit">
							<p className="text-xs text-text-color">30 kanałów</p>
						</div>
					</div>
					<Button className="bg-border-color w-full rounded-lg text-sm h-9">
						<span>Utwórz szablon</span>
						<ArrowRight className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}

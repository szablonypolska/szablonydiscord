import { Button } from "@nextui-org/button"
import { ArrowRight, Check, Lock, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

export default function OfferList() {
	const packages = [
		{
			id: 1,
			icon: Shield,
			price: 5.5,
			title: "Podstawowa ochrona",
			description: "Dla pojedynczych serwerów",
			features: ["Usunięcie szablonów ze strony", "Potwierdzenie email", "Natychmiastowa realizacja"],
			popular: false,
			label: "popularny",
			link: "/offers/basic",
		},
		{
			id: 2,
			icon: Shield,
			price: 20.5,
			title: "Zaawansowana ochrona",
			description: "Brak możliwości dodania serwera",
			features: ["Usunięcie szablonów ze strony", "Blokada klonowania na shizeclone.eu", "Blokada po ID serwera", "Potwierdzenie email", "Natychmiastowa realizacja"],
			popular: true,
			label: "polecany",
			link: "/offers/basic",
		},
		{
			id: 3,
			icon: Shield,
			price: 12.5,
			title: "Premium ochrona",
			description: "Średnia możliwość dodania serwera",
			features: ["Usunięcie szablonów ze strony", "Blokada po nazwie serwera", "Potwierdzenie email", "Natychmiastowa realizacja"],
			popular: false,
			label: "premium",
			link: "/offers/basic",
		},
	]

	return (
		<div className="flex flex-col items-center justify-center my-20">
			<div className="flex items-center gap-3 bg-borderColor p-1.5 px-5 rounded-full w-fit">
				<Sparkles className="text-primaryColor w-5 h-5" />
				<p className="font-semibold text-sm">Wybierz pakiet ochrony</p>
			</div>
			<div className="mt-5 text-center">
				<h1 className="text-3xl font-semibold">Zabezpiecz swój serwer Discord</h1>
				<p className="text-textColor mt-3 w-[50rem] max-md:w-11/12">
					Wybierz poziom ochrony, który najlepiej odpowiada Twoim potrzebom. Każdy pakiet zawiera różne metody weryfikacji i czasy realizacji.
				</p>
			</div>
			<div className="flex items-center gap-5 mt-14 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
				{packages.map(el => (
					<div className={`flex flex-col  h-[31rem] border xl:w-96 max-xl:flex-grow  p-8 rounded-2xl relative ${el.popular ? "border-primaryColor" : "border-borderColor "}`} key={el.id}>
						<div className={`absolute -top-4 left-1/2 -translate-x-1/2  px-5 rounded-full py-1.5 w-fit ${el.popular ? "bg-primaryColor" : "bg-borderColor"}`}>
							<p className="uppercase text-sm">{el.label}</p>
						</div>
						<div className="flex items-center gap-3 mt-2">
							<div className={`flex items-center justify-center w-14 h-14 rounded-xl ${el.popular ? "bg-primaryColor" : "bg-borderColor"}`}>
								<el.icon />
							</div>
							<div className="">
								<p className="text-xl font-semibold">{el.title}</p>
								<span className="text-sm text-textColor">{el.description}</span>
							</div>
						</div>
						<div className="flex items-center justify-center bg-borderColor h-16 rounded-lg mt-5">
							<p className="text-3xl font-semibold">
								{el.price} zł<span className="text-sm font-normal text-textColor">/serwer</span>
							</p>
						</div>
						<div className="mt-8">
							<ul>
								{el.features.map((features, index) => (
									<li className="flex items-center gap-2 text-sm mb-2 text-gray-200" key={index}>
										<Check className="w-5 h-5 text-primaryColor" /> {features}
									</li>
								))}
							</ul>
						</div>
						<div className="flex-grow"></div>
						{!el.popular && (
							<Link href={el.link} className="w-full ">
								<Button className="bg-borderColor h-14 w-full rounded-xl">
									<span>Wybierz pakiet</span>
									<ArrowRight className="w-5 h-5" />
								</Button>
							</Link>
						)}
						{el.popular && (
							<Link href={el.link} className="w-full">
								<Button className="bg-primaryColor h-14 w-full rounded-xl">
									<Lock className="w-5 h-5" />
									<span>Wybierz pakiet</span>
								</Button>
							</Link>
						)}
					</div>
				))}
			</div>
			<p className="mt-5 text-sm text-textColor">*Niniejsza oferta stanowi współprace ze shizeclone.eu</p>
		</div>
	)
}

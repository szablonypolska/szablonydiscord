"use client"

import { Crown, Bot, Code, Store, ChevronRight, Zap } from "lucide-react"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { motion } from "framer-motion"

function Benefits({ icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
	const IconComponent = icon

	return (
		<div className="flex items-start gap-3">
			<div className="bg-darknes-primary-color p-2 rounded-lg w-fit">
				<IconComponent className="w-5 h-5 text-primary-color" />
			</div>
			<div className="">
				<p className="font-medium">{title}</p>
				<p className="text-text-color text-sm mt-0.5">{description}</p>
			</div>
		</div>
	)
}

export default function OfferPremium() {
	return (
		<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.2 }} className="flex items-center justify-center  w-full mt-32">
			<div className="flex items-stretch w-[67rem] border border-border-color rounded-lg ">
				<div className="w-1/2 bg-box-color  p-10">
					<div className="flex items-center gap-2 bg-primary-dark/30  border border-primary-dark text-primary-color p-1.5 px-3 rounded-full w-fit">
						<Crown className="text-primary-color w-4.5 h-4.5" />
						<p className="font-medium text-sm">Szablony Premium</p>
					</div>
					<h2 className="mt-5 text-3xl font-bold">Potrzebujesz ekskluzywnych szablonów?</h2>
					<p className="text-text-color mt-4">Odkryj naszą ofertę premium z dostępem do ponad 50 profesjonalnych szablonów Discord, narzędzi AI i wielu innych korzyści.</p>
					<div className="flex flex-col gap-5 mt-6">
						<Benefits icon={Bot} title="Wyższe limity Buildera AI" description="Większy limit do generowania szablonów discord" />
						<Benefits icon={Code} title="Wyższe limity API" description="Wyższe limity API do projektów" />
						<Benefits icon={Store} title="Sprzedaż szablonów" description="Możliwość sprzedaży szablonów discord" />
					</div>
					<Link href="">
						<Button className="bg-primary-color mt-6 rounded-lg h-11 px-6 cursor-pointer">
							<span>Przejdź do oferty premium</span>
							<ChevronRight className="w-5 h-5 ml-1" />
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-center w-1/2 bg-border-color/40 p-8 relative overflow-hidden">
					<div className="absolute top-10 right-10 bg-primary-color blur-3xl w-16 h-16 z-[-1]"></div>
					<div className="absolute bottom-10 left-10 bg-advice-bot blur-3xl w-16 h-16 z-[-1]"></div>
					<div className="bg-box-color p-5 border border-border-color rounded-xl w-full">
						<div className="flex items-center gap-2">
							<div className="bg-primary-color p-2.5 rounded-lg w-fit">
								<Crown />
							</div>
							<div className="">
								<p>Premium</p>
								<p className="text-text-color text-sm">Odblokuj pełen potencjał</p>
							</div>
						</div>
						<div className="mt-5">
							<div className="flex items-center justify-between my-3">
								<p className="text-text-color">Miesięcznie</p>
								<div className="flex items-end">
									<strong className="text-xl">12.99 zł</strong>
									<p className="text-text-color ml-1 text-sm">/miesiąc</p>
								</div>
							</div>
							<div className="w-full h-[1px] bg-border-color rounded-xl"></div>
							<div className="flex items-center justify-between my-3">
								<div className="flex items-center gap-2">
									<p className="text-text-color">Rocznie</p>
									<div className="bg-primary-dark/40 px-2 w-fit rounded-full">
										<span className="text-xs text-primary-color">-25%</span>
									</div>
								</div>
								<div className="flex items-end">
									<strong className="text-xl">107,99 zł</strong>
									<p className="text-text-color ml-1 text-sm">/rok</p>
								</div>
							</div>
							<div className="w-full h-[1px] bg-border-color rounded-xl"></div>
							<Link href="offers/account/upgrade">
								<Button className="w-full bg-primary-color rounded-xl mt-5 h-11 cursor-pointer">
									<Zap className="w-5 h-5" /> <span>Rozpocznij subskrybcje</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

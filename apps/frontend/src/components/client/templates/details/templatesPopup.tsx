"use client"

import { Button } from "@nextui-org/button"
import gsap from "gsap"
import { Copy, Server, Share2, BotIcon, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, Dispatch, SetStateAction } from "react"

interface Props {
	link: string
	popup: boolean
	setPopup: Dispatch<SetStateAction<boolean>>
}

export default function TemplatesPopup({ link, popup, setPopup }: Props) {
	const overlayRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!popup) return

		gsap.to(overlayRef.current, {
			opacity: 1,
			duration: 0.2,
		})
		gsap.to(containerRef.current, {
			opacity: 1,
			duration: 0.2,
			y: 30,
		})
	}, [popup])

	const handleClose = () => {
		gsap.to(overlayRef.current, {
			opacity: 0,
			duration: 0.2,
		})
		gsap.to(containerRef.current, {
			opacity: 0,
			duration: 0.2,
			y: -30,
			onComplete: () => {
				setPopup(false)
			},
		})
	}

	if (!popup) return null

	return (
		<>
			{popup && <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-80 z-50 opacity-0" onClick={handleClose} />}

			<div ref={containerRef} className="absolute top-1/2 left-1/2 z-[150] w-[30rem] max-md:w-11/12  bg-altBackgroundColor p-8 rounded-xl border border-borderColor opacity-0 transform -translate-x-1/2 -translate-y-1/2">
				<div className="absolute top-4 right-4">
					<button onClick={handleClose} aria-label="Zamknij popup">
						<X />
					</button>
				</div>

				<div className="mb-6">
					<p className="text-xl font-medium mb-1">Użyj szablonu</p>
					<span className="text-sm text-textColor">Wybierz sposób użycia tego szablonu</span>
				</div>

				<div className="flex flex-col gap-4">
					<Link href={link} className="w-full h-18">
						<Button className="w-full h-full px-0 rounded-xl">
							<div className="flex items-center gap-3 w-full p-4 bg-borderColor rounded-xl">
								<div className="bg-altBorderColor p-2.5 rounded-lg">
									<Server />
								</div>
								<div className="text-left">
									<p className="font-medium text-sm">Utwórz na nowym serwerze</p>
									<span className="text-xs text-textColor">Stwórz nowy serwer używając tego szablonu</span>
								</div>
							</div>
						</Button>
					</Link>

					<Button className="w-full h-18 px-0 rounded-xl relative cursor-not-allowed overflow-visible" disabled>
						<div className="flex items-center gap-3 w-full p-4 bg-borderColor opacity-50 rounded-xl">
							<div className="bg-altBorderColor p-2.5 rounded-lg">
								<BotIcon />
							</div>
							<div className="text-left">
								<p className="font-medium text-sm">Utwórz istniejącym serwerze</p>
								<span className="text-xs text-textColor">Stwórz za pomocą naszego bota!</span>
							</div>
						</div>
						<div className="absolute top-[-0.5rem] right-3 flex items-center gap-1 px-3 py-1 bg-primaryColor rounded-full">
							<Sparkles className="w-3 h-3" />
							<p className="uppercase text-xs">Wkrótce</p>
						</div>
					</Button>
				</div>

				<div className="my-6 h-px bg-borderColor" />

				<div>
					<div className="flex items-center gap-2 mb-2">
						<Share2 className="w-4 h-4" />
						<p className="text-sm font-medium">Link do udostępnienia</p>
					</div>
					<div className="flex items-center w-full h-10 bg-borderColor border border-altBorderColor rounded-lg opacity-80">
						<div className="flex-1 px-3">
							<p className="text-textColor truncate">{link}</p>
						</div>
						<div className="w-px h-full bg-altBorderColor" />
						<button className="px-3" onClick={() => navigator.clipboard.writeText(link)}>
							<Copy className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

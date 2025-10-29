"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Shield, Scale, Copy, Check, GlobeLock, CircleHelp } from "lucide-react"
import { Button as ButtonCopy } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Props {
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	title: string
	description: string
	content: string
}

export default function ContentBuilderMaterials() {
	const { builderData, currentView } = useBuilderContext()

	const Content = () => {
		switch (currentView) {
			case "rules":
				return <ContentBox Icon={Shield} title="Regulamin" description="Podstawowe zasady serwera" content={builderData.materials?.rules || ""} />
			case "tariff":
				return <ContentBox Icon={Scale} title="Taryfikator kar" description="System kar i konsekwencji" content={builderData.materials?.tariff || ""} />
			case "privacyPolicy":
				return <ContentBox Icon={GlobeLock} title="Polityka prywatności" description="Przykładowa polityka prywatnosci serwera" content={builderData.materials?.privacyPolicy || ""} />
			case "faq":
				return <ContentBox Icon={CircleHelp} title="FAQ" description="Pytania i odpowiedzi na najczęściej zadawane pytania" content={builderData.materials?.faq || ""} />
			default:
				return <p>Nie znaleziono</p>
		}
	}

	const ContentBox = ({ Icon, title, description, content }: Props) => {
		const [copied, setCopied] = useState<boolean>(false)

		const handleCopyDescription = () => {
			try {
				navigator.clipboard.writeText(content)
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			} catch (err) {
				console.error(err)
			}
		}

		const formattedContent = content.replace(/\\n/g, "\n")

		return (
			<div className="w-full bg-alt-background-color rounded-xl border border-border-color">
				<div className="flex items-center justify-between gap-4 p-6">
					<div className="flex items-center gap-4">
						<div className="bg-border-color text-primary-color p-3 rounded-lg w-fit">
							<Icon className="w-7 h-7" />
						</div>
						<div className="">
							<p className="text-lg font-medium">{title}</p>
							<p className="text-text-color">{description}</p>
						</div>
					</div>
					<ButtonCopy size="icon" className=" flex cursor-pointer" onClick={() => handleCopyDescription()} aria-label={copied ? "Copied" : "Copy to clipboard"} disabled={copied}>
						<div className={cn("transition-all", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
							<Check className="stroke-primary-color" size={25} strokeWidth={2} aria-hidden="true" />
						</div>
						<div className={cn("absolute transition-all text-text-color", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")}>
							<Copy size={25} strokeWidth={2} aria-hidden="true" />
						</div>
					</ButtonCopy>
				</div>
				<div className="w-full bg-border-color h-px"></div>
				<div className="p-6">
					<pre className="text-gray-300 whitespace-pre-wrap text-sm">{formattedContent}</pre>
				</div>
			</div>
		)
	}

	return <Content />
}

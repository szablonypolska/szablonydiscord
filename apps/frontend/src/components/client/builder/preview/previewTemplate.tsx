"use client"

import TemplatesVisuzalization from "@/components/client/templates/details/templatesVisualizaton"
import { useBuilderContext } from "@/context/BuilderContext"
import { Tooltip } from "@heroui/react"
import { Button } from "@nextui-org/button"
import { Bot, Download, Eye, Plus, Users, Volume2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { TemplatesUserCreator } from "../../templates/details/templatesCreator"

export default function PreviewTemplate() {
	const { builderData } = useBuilderContext()
	const { data: session } = useSession()

	return (
		<div className="flex flex-col items-center">
			<div className="bg-altBackgroundColor w-full p-8 rounded-xl border border-borderColor max-lg:p-5">
				<header>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4 w-full">
							<h1 className="text-2xl max-w-[30rem] truncate max-lg:max-w-96">{}</h1>
							<div className="flex gap-1 max-sm:hidden">
								<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">hujjjjj</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Tooltip content="Odsłony szablonu" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl max-md:hidden">
									<Eye className="font-black" />
									<p className="text-2xl ml-0.2">2</p>
								</div>
							</Tooltip>
							<Tooltip content="Użycia szablonu" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
								<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl max-md:hidden">
									<Download />
									<p className="text-2xl ml-0.2">2</p>
								</div>
							</Tooltip>
						</div>
					</div>
					<p className="text-textColor text-lg md:w-9/12 max-md:w-full">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, magni.</p>
					<div className="max-sm:flex hidden mt-3 gap-2">
						<span className="px-4 py-1 bg-borderColor  text-sm rounded-full w-full  text-center">hhfghf</span>
						<span className="px-4 py-1 bg-borderColor  text-sm rounded-full w-full text-center">Gamingowy</span>
					</div>
				</header>

				<section className="flex items-center gap-2 mt-5 max-sm:flex-col">
					<TemplatesUserCreator avatar={session?.user.image || ""} username={session?.user.name || ""} id={session?.user.id || ""} />
					<div className="flex gap-2 max-sm:mt-2 max-sm:w-full">
						<Tooltip content="Kanały tekstowe" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
								<span className="text-2xl">#</span>
								<p className="text-xl">3</p>
							</div>
						</Tooltip>
						<Tooltip content="Kanały głosowe" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
								<Volume2 />
								<p className="text-xl">5</p>
							</div>
						</Tooltip>
						<Tooltip content="role" className="p-1 px-3 bg-borderColor rounded-xl" delay={300}>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl max-sm:flex-grow max-sm:justify-center">
								<Users />
								<p className="text-xl">30</p>
							</div>
						</Tooltip>
					</div>
				</section>

				<section className="flex items-center gap-3 mt-10 max-sm:flex-col max-sm:w-full max-sm:mt-5">
					<Button className="flex items-center bg-primaryColor px-8 py-6 rounded-xl max-sm:w-full opacity-50">
						<Plus />
						Użyj szablonu
					</Button>

					<Button className="flex items-center bg-adviceBot px-8 py-6 rounded-xl max-sm:w-full opacity-50">
						<Bot />
						Przejdź do podglądu szablonu
					</Button>
				</section>
			</div>
			{/* <TemplatesVisuzalization filtredChannel={builderData.} filtredRoles={filtredRoles} /> */}
		</div>
	)
}

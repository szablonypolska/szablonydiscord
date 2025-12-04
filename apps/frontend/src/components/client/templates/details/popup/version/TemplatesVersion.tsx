"use client"

import { Button } from "@nextui-org/button"
import { History, X } from "lucide-react"
import { Template } from "@/components/interfaces/templates/common"
import { useCallback, useEffect, useState } from "react"
import getFamily from "@/lib/templates/getFamily"
import { TemplatesVersionLoading } from "./TemplatesVersionLoading"
import { TemplatesVersionBox } from "./TemplatesVersionBox"
import { AnimatePresence } from "framer-motion"

export default function TemplatesVersionList({ familyId, versionPopup, setVersionPopup }: { familyId: string; versionPopup: boolean; setVersionPopup: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [versions, setVersions] = useState<Template[]>([])
	const [loader, setLoader] = useState<boolean>(true)

	const loadTemplateFamily = useCallback(async () => {
		try {
			setLoader(true)
			const data = await getFamily(familyId)

			setVersions(data.templates)
			setLoader(false)
		} catch (err) {
			console.log(err)
			setLoader(false)
			throw err
		}
	}, [familyId])

	useEffect(() => {
		loadTemplateFamily()
	}, [loadTemplateFamily])

	const allUsageCount = versions.reduce((acc, version) => (acc += version.usageCount), 0) || 0
	return (
		<AnimatePresence>
			{versionPopup && (
				<>
					<div className="fixed inset-0 bg-black/80 bg-opacity-80 backdrop-blur-xs z-100 z-100"></div>
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-box-color w-[40rem] rounded-lg border border-border-color  z-150">
						<div className="px-4 pt-6 pb-4 border-b border-border-color">
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-3">
									<div className="bg-border-color p-2.5 rounded-lg w-fit">
										<History className="text-primary-color" />
									</div>
									<div className="flex flex-col">
										<p className=" font-medium text-xl">Wersje szablonu</p>
										<span className="text-sm text-text-color">Przeglądaj historię wersji tego szablonu</span>
									</div>
								</div>
								<Button className="text-gray-300 cursor-pointer" onPress={() => setVersionPopup(false)} aria-label="Zamknij popup">
									<X />
								</Button>
							</div>
							<div className="mt-6 bg-border-color w-full h-px"></div>
							<div className="mt-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center ">
										<div className="">
											<p className="text-sm text-text-color mb-1">Wszystkie wersje</p>
											<strong className="text-2xl">{versions.length || 0}</strong>
										</div>
										<div className="w-px h-[3rem] bg-border-color mx-5"></div>
										<div className="">
											<p className="text-sm text-text-color mb-1">Łączne użycia</p>
											<strong className="text-2xl">{allUsageCount || 0}</strong>
										</div>
									</div>
									<div className="flex flex-col items-end">
										<p className="text-sm text-text-color mb-1">Aktualna wersja</p>
										<strong className="text-xl text-primary-color">v{versions[0]?.version || 0}.0</strong>
									</div>
								</div>
							</div>
						</div>
						<div className="p-4 max-h-[30rem] scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto ">
							{""}
							{loader ? <TemplatesVersionLoading /> : <TemplatesVersionBox versions={versions} />}
						</div>
						<div className="flex items-center justify-between bg-box-color border-t border-border-color px-4 py-3">
							<p className="text-sm text-text-color">Dostępne są 3 wersje tego szablonu</p>
							<Button className="bg-border-color rounded-lg px-5 h-8 font-medium">Zamknij</Button>
						</div>
					</div>
				</>
			)}
		</AnimatePresence>
	)
}

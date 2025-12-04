import { Template } from "@/components/interfaces/templates/common"
import { Calendar, TrendingUp, Star, Download, Eye } from "lucide-react"
import clsx from "clsx"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import Link from "next/link"

export function TemplatesVersionBox({ versions }: { versions: Template[] }) {
	const sortVersions = versions.sort((a, b) => b.version - a.version) || []

	return (
		<div className="flex flex-col gap-7 relative h-full my-2">
			<div className="mt-3 absolute w-[2px] h-full bg-border-color left-[20px]"></div>
			{sortVersions.map(v => (
				<div key={v.id} className="flex items-start  relative">
					<div className="relative w-10 mt-3">
						{v.isLatest && <div className="absolute w-5 h-5 top-1/2 left-1/2 -translate-x-1/2 blur-xl bg-primary-color z-[-1]"></div>}
						<div className={clsx("flex h-10 w-10 items-center justify-center rounded-full  ", v.isLatest ? "bg-primary-color" : "bg-border-color")}>{v.isLatest ? <Star className="w-4.5 h-4.5" /> : <div className="w-3 h-3 border-2 border-gray-300/50 rounded-full"></div>}</div>
					</div>
					<div className={clsx("flex-1 ml-6 bg-alt-background-color border border-border-color rounded-lg p-4", v.isLatest && "border-primary-color")}>
						<div className="flex items-center gap-2">
							<p className="font-bold">v{v.version}.0</p>
							{v.isLatest && <span className="px-2 py-0.5 bg-primary-color text-xs rounded-full">Aktualna wersja</span>}
						</div>
						<div className="flex items-center gap-2 mt-2">
							<div className="flex items-center gap-2 text-text-color">
								<Calendar className="w-3 h-3" />
								<span className=" text-sm text-text-color">{format(new Date(v.createdAt), "d MMMM yyyy", { locale: pl })}</span>
							</div>
							<div className="w-2 h-2 bg-border-color rounded-full opacity-75"></div>
							<div className="flex items-center gap-2 text-text-color">
								<TrendingUp className="w-3 h-3" />
								<span className=" text-sm text-text-color">{v.usageCount} użyć</span>
							</div>
						</div>
						<div className="flex items-center gap-2 mt-3">
							<Link href={v.link} className={clsx("flex items-center gap-2 justify-center text-sm font-medium h-9 w-full rounded-lg", v.isLatest ? "bg-primary-color" : "bg-border-color")}>
								<Download className={clsx("w-4 h-4 ", !v.isLatest && "text-text-color")} /> Użyj szablonu
							</Link>
							<Link href={`/templates/${v.slugUrl}`} className="flex items-center gap-2 justify-center text-sm font-medium h-9 w-40 rounded-lg bg-border-color">
								<Eye className="w-4 h-4" /> Podgląd
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

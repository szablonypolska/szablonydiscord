import { ChevronLeft, Zap, Clock, BarChart2 } from "lucide-react"
import Link from "next/link"

export default function ApiSettingsLimit() {
	return (
		<>
			<div className="flex items-center gap-3">
				<Link href="/dashboard" className="hover:bg-borderColor p-2 rounded-lg">
					<ChevronLeft />
				</Link>
				<h1 className="text-2xl font-semibold">Zarządzanie kluczem API</h1>
			</div>
			<div className="bg-sidebarColor p-5 border border-borderColor rounded-xl mt-7">
				<div className="flex items-center gap-3">
					<Zap className="text-primaryColor" />
					<h2 className="text-lg font-medium">Limity zapytań</h2>
				</div>
				<div className="flex flex-col gap-5 mt-5">
					<div className="bg-boxColor p-5 rounded-xl">
						<div className="flex justify-between">
							<div className="flex items-center gap-3">
								<Clock className="text-silverColor" />
								<p>Limit na dzień</p>
							</div>
							<select id="options" className="p-2 bg-sidebarColor rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none border-2 border-borderColor mt-1 pr-5">
								<option value="500">500 zapytań</option>
								<option value="1000">1000 zapytań</option>
								<option value="null">Bez limitu</option>
							</select>
						</div>
						<div className="mt-1">
							<div className="bg-borderColor w-full h-2 rounded-xl">
								<div className="w-11/12 h-full bg-primaryColor rounded-xl"></div>
							</div>
							<div className="flex items-center justify-between mt-2">
								<p className="text-silverColor">45/60 zapytań</p>
								<p className="text-primaryColor">75% wykorzystano</p>
							</div>
						</div>
					</div>
					<div className="bg-boxColor p-5  rounded-xl">
						<div className="flex justify-between">
							<div className="flex items-center gap-3">
								<BarChart2 className="text-silverColor" />
								<p>Limit na miesiąc</p>
							</div>
							<select id="options" className="p-2 bg-sidebarColor rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none border-2 border-borderColor mt-1 pr-5">
								<option value="500">500 zapytań</option>
								<option value="1000">1000 zapytań</option>
								<option value="null">Bez limitu</option>
							</select>
						</div>
						<div className="mt-1">
							<div className="bg-borderColor w-full h-2 rounded-xl">
								<div className="w-11/12 h-full bg-primaryColor rounded-xl"></div>
							</div>
							<div className="flex items-center justify-between mt-2">
								<p className="text-silverColor">45/60 zapytań</p>
								<p className="text-primaryColor">75% wykorzystano</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

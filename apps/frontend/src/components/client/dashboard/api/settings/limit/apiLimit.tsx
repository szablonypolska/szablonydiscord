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
				<div className="flex items-center gap-5 mt-5 max-lg:flex-col">
					<div className="bg-boxColor p-5 rounded-xl flex-grow max-lg:w-full">
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
						<div className="bg-borderColor w-full h-2 rounded-xl mt-2">
							<div className="w-11/12 h-full bg-primaryColor rounded-xl"></div>
						</div>
						<div className="flex items-center justify-between mt-5">
							<div className="mt-2">
								<p className="text-silverColor">Wykorzystano</p>
								<p className="text-2xl my-1 font-medium">45</p>
								<p className="text-silverColor text-sm">z 60 zapytań</p>
							</div>
							<div className="mt-2">
								<p className="text-2xl font-medium text-primaryColor text-right">75%</p>
								<p className="text-silverColor text-sm">Wykorzystano</p>
							</div>
						</div>
						<div className="w-full h-0.5 bg-borderColor my-3"></div>
						<div className="flex items-center justify-between text-silverColor text-md">
							<p>Resetuje się za:</p>
							<p>32 sekundy</p>
						</div>
					</div>
					<div className="bg-boxColor p-5  rounded-xl flex-grow max-lg:w-full">
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
						<div className="bg-borderColor w-full h-2 rounded-xl mt-2">
							<div className="w-11/12 h-full bg-primaryColor rounded-xl"></div>
						</div>
						<div className="flex items-center justify-between mt-5">
							<div className="mt-2">
								<p className="text-silverColor">Wykorzystano</p>
								<p className="text-2xl my-1 font-medium">45</p>
								<p className="text-silverColor text-sm">z 60 zapytań</p>
							</div>
							<div className="mt-2">
								<p className="text-2xl font-medium text-primaryColor text-right">75%</p>
								<p className="text-silverColor text-sm">Wykorzystano</p>
							</div>
						</div>
						<div className="w-full h-0.5 bg-borderColor my-3"></div>
						<div className="flex items-center justify-between text-silverColor text-md">
							<p>Resetuje się za:</p>
							<p>32 sekundy</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

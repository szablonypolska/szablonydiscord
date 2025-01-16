import { Button } from "@nextui-org/button"
import { Key, Plus, Trash2, Eye, Copy } from "lucide-react"
import ApiCard from "./apiCards"

function NoExistsApiKey() {
	return (
		<div className="flex flex-col items-center w-full bg-altBackgroundColor border border-borderColor mt-7 rounded-xl p-10">
			<Key size={75} color="#9ca3af" />
			<h3 className="text-xl mt-5">Nie masz jeszcze kluczy API</h3>
			<p className="text-silverColor mt-2">Stwórz swój pierwszy klucz API i zacznij kodzić razem z nami!</p>
			<Button className="flex items-center bg-primaryColor py-6 rounded-xl mt-8">
				<Plus />
				Stwórz swój klucz api
			</Button>
		</div>
	)
}

function CreateApiKey() {
	return (
		<div className="flex flex-col  w-full bg-altBackgroundColor border border-borderColor mt-7 rounded-xl p-10">
			<div className="flex  justify-between">
				<div>
					<div className="flex items-center gap-5">
						<h3 className="text-xl font-semibold">Twoja nazwa klucza</h3>
						<span className="px-3 py-1 bg-[#18302d] text-primaryColor rounded-full">Aktywny</span>
					</div>
					<p className="text-silverColor text-md">Stworzony: 16.01.2025</p>
				</div>
				<div className="flex items-center gap-2">
					<Button className="flex items-center bg-borderColor rounded-xl py-6 px-5">Wyłącz</Button>
					<Button className="flex items-center hover:bg-borderColor py-6 px-3 rounded-xl">
						<Trash2 className="text-red-500" />
					</Button>
				</div>
			</div>
			<div className="p-5  bg-sidebarColor rounded-xl mt-7">
				<div className="flex justify-between items-center mb-3">
					<p className="text-silverColor">Twój Secret key</p>
					<div className="flex items-center gap-1">
						<Button className="flex items-center hover:bg-borderColor rounded-xl px-3 py-6">
							<Eye />
						</Button>
						<Button className="flex items-center hover:bg-borderColor rounded-xl px-3 py-6">
							<Copy />
						</Button>
					</div>
				</div>
				<input type="password" value="sieasfjsdngdkljggkdjsf ngdskfj ngsdkfljn" className="bg-boxColor rounded-xl w-full p-3 outline-none" readOnly />
			</div>
			<div className="flex items-center gap-5 mt-5">
				<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
					<p className="text-silverColor">Wszystkie zapytania</p>
					<p className="text-2xl mt-1">1,325</p>
					<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
				</div>
				<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
					<p className="text-silverColor">Wskaźnik sukcesu</p>
					<p className="text-2xl mt-1">99,9%</p>
					<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
				</div>
				<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
					<p className="text-silverColor">Ostatnie zapytanie</p>
					<p className="text-2xl mt-1">16.01.2024</p>
					<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
				</div>
				<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
					<p className="text-silverColor">Wskaźnik błędów</p>
					<p className="text-2xl mt-1">0.1%</p>
					<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
				</div>
			</div>
			<div className="mt-8">
				<div className="flex items-center justify-between mb-2">
					<p className="text-silverColor">Miesięczny limit</p>
					<p className="text-silverColor">7,500/10000</p>
				</div>
				<div className="w-full h-2 bg-sidebarColor rounded-full">
					<div className="w-11/12 h-full bg-primaryColor rounded-full"></div>
				</div>
			</div>
		</div>
	)
}

export default function ApiMenagament() {
	return (
		<>
			<div className="p-10">
				<div className="">
					<h2 className="text-2xl font-semibold">Zarządzaj kluczem API</h2>
					<CreateApiKey />
				</div>
				<ApiCard />
			</div>
		</>
	)
}

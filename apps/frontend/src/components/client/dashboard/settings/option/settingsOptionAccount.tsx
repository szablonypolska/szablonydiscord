import { Mail, User } from "lucide-react"
import { Button } from "@nextui-org/button"

export default function SettingsOptionAccount() {
	return (
		<div className="bg-sidebar-color/80 p-6 w-full">
			<div className="">
				<p className="text-lg font-medium">Konto</p>
				<span className="text-text-color text-sm">Zarządzaj swoimi danymi konta</span>
			</div>
			<div className="mt-5 bg-box-color border border-border-color px-5 py-4 rounded-lg w-full">
				<div className="">
					<label htmlFor="username" className="text-sm font-semibold text-text-color">
						Nazwa użytkownika
					</label>
					<div className="relative">
						<input type="text" id="username" className="mt-2 block w-full bg-section-color border border-border-color rounded-md p-2 px-4" value="TheProShizer" onChange={() => {}} />
						<User className="absolute top-1/2 right-2 transform -translate-y-1/2 text-text-color w-5 h-5" />
					</div>
					<p className="text-xs text-text-special mt-1">Twoja unikalna nazwa użytkownika</p>
				</div>
				<div className="mt-5">
					<label htmlFor="email" className="text-sm font-semibold text-text-color">
						Adres e-mail
					</label>
					<div className="relative">
						<input type="text" id="email" className="mt-2 block w-full bg-section-color border border-border-color rounded-md p-2 px-4" value="theproshizer@example.com" onChange={() => {}} />
						<Mail className="absolute top-1/2 right-2 transform -translate-y-1/2 text-text-color w-5 h-5" />
					</div>
					<p className="text-xs text-text-special mt-1">Używamy go do powiadomień</p>
				</div>
				<div className="my-6 bg-border-color w-full h-[1px]"></div>
				<div className="flex items-center justify-between">
					<Button className="bg-border-color rounded-lg">Anuluj</Button>
					<Button className="bg-primary-color rounded-lg">Zapisz zmiany</Button>
				</div>
			</div>
		</div>
	)
}


import { Button } from "@nextui-org/button"
import { Plus, CircleCheck, CircleGauge, Clock, Shield, LockKeyhole, CircleHelp, MessageCircle, Mail, FileCode, BookOpen, Code2, RefreshCcw, FileText } from "lucide-react"

export default function ApiCard() {
	return (
		<div className="flex items-center gap-5 mt-5 max-2xl:grid max-2xl:grid-cols-2 max-sm:grid-cols-1">
			<div className="bg-alt-background-color border border-border-color p-5 rounded-xl grow  ">
				<div className="flex items-center gap-3">
					<Clock size="40" className="bg-border-color p-2 rounded-xl text-primary-color" />
					<p className="text-lg font-semibold">Rate limity</p>
				</div>
				<div className="mt-3">
					<div className="flex justify-between bg-sidebar-color px-2 py-3 rounded-xl">
						<p className="text-silver-color">Requesty/15min</p>
						<p className="font-semibold">50</p>
					</div>
					<div className="flex justify-between mt-4  bg-sidebar-color px-2 py-3 rounded-xl">
						<p className="text-silver-color">Requesty/dzień</p>
						<p className="font-semibold">10,000</p>
					</div>
					<div className="flex justify-between mt-4  bg-sidebar-color px-2 py-3 rounded-xl">
						<p className="text-silver-color">Jednoczesne żądania</p>
						<p className="font-semibold">30</p>
					</div>
				</div>
				<div className="w-full h-0.5 bg-border-color my-4"></div>
				<Button className="flex bg-border-color w-full rounded-xl">
					<Plus />
					Zaktualizuj limit
				</Button>
			</div>
			<div className="bg-alt-background-color border border-border-color p-5 rounded-xl grow  ">
				<div className="flex items-center gap-3">
					<Shield size="40" className="bg-border-color p-2 rounded-xl text-primary-color" />
					<p className="text-lg font-semibold">Rate limity</p>
				</div>
				<div className="mt-3">
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl">
						<CircleCheck className="text-primary-color" />
						<p>Szyfrowanie HTTPS</p>
					</div>
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl mt-4">
						<CircleCheck className="text-primary-color" />
						<p>Rejestrowanie zapytań</p>
					</div>
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl mt-4">
						<CircleCheck color="#00796B" />
						<p>Tajny klucz API</p>
					</div>
				</div>
				<div className="w-full h-0.5 bg-border-color my-4"></div>
				<Button className="flex bg-border-color w-full rounded-xl">
					<LockKeyhole />
					Zaktualizuj limit
				</Button>
			</div>
			<div className="bg-alt-background-color border border-border-color p-5 rounded-xl grow ">
				<div className="flex items-center gap-3">
					<CircleHelp size="40" className="bg-border-color p-2 rounded-xl text-primary-color" />
					<p className="text-lg font-semibold">Support</p>
				</div>
				<div className="mt-3">
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl">
						<CircleGauge />
						<p>Monitorowanie 24/7</p>
					</div>
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl mt-4">
						<CircleCheck />
						<p>100% uptime API</p>
					</div>
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl mt-4">
						<MessageCircle />
						<p>Monitorowanie AI</p>
					</div>
				</div>
				<div className="w-full h-0.5 bg-border-color my-4"></div>
				<Button className="flex bg-border-color w-full rounded-xl">
					<Mail />
					Kontakt support
				</Button>
			</div>
			<div className="bg-alt-background-color border border-border-color p-5 rounded-xl grow  ">
				<div className="flex items-center gap-3">
					<FileCode size="40" className="bg-border-color p-2 rounded-xl text-primary-color" />
					<p className="text-lg font-semibold">Dokumentacja</p>
				</div>
				<div className="mt-3">
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl">
						<BookOpen />
						<p>dokumentacja API</p>
					</div>
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl mt-4">
						<Code2 />
						<p>Przykłady kodów</p>
					</div>
					<div className="flex items-center bg-sidebar-color gap-2 px-2 py-3 rounded-xl mt-4">
						<RefreshCcw />
						<p>Widoczne zmiany</p>
					</div>
				</div>
				<div className="w-full h-0.5 bg-border-color my-4"></div>
				<Button className="flex bg-border-color w-full rounded-xl">
					<FileText />
					Dokumentacja
				</Button>
			</div>
		</div>
	)
}

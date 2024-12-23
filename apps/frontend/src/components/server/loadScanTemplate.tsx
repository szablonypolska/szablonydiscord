import { motion, AnimatePresence } from "framer-motion"
import { connectSocket } from "@/socket"

export default function LoadScanTemplate() {
	const socket = connectSocket()

	const checkCurrentlyScan = () => {
		socket.emit("message", { scan: false })
	}

	const element = [
		{
			title: "Greek Valorant Community",
			id: 53,
			usage: 0,
			dateCreate: "15.12.2024",
		},
		{
			title: "giga kokos",
			id: 523,
			usage: 2,
			dateCreate: "16.12.2024",
		},
	]

	return (
		<>
			<div className="absolute inset-0 z-10 bg-boxColor rounded-lg border border-borderColor p-5 overflow-hidden max-lg:relative max-md:w-full max-lg:w-full max-md:mb-20">
				<p className="mt-2">Ostatnie przeskanowane szablony</p>
				<div className="flex flex-col gap-3 mt-4">
					{element.map((element, index) => (
						<motion.div
							key={element.id || index}
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.5 }}
							layout
							className="flex items-center gap-3 bg-altBackgroundColor border border-borderColor py-3 px-5 rounded-2xl">
							<div className="text-gray-300 w-full">
								<p>{element.title}</p>
								<div className="w-full flex items-center justify-between">
									<p className="font-semibold">{element.dateCreate}</p>
									<p className="font-semibold">{element.usage} użyć</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</>
	)
}

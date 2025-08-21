import { Button } from "@nextui-org/button"
import { AnimatePresence, motion } from "framer-motion"
import { Clock, X, Bell, Mail, CircleCheckBig } from "lucide-react"

interface Props {
	position: number
	waitingInQueue: number
	visible: boolean
	setVisible: React.Dispatch<
		React.SetStateAction<{
			visible: boolean
			position: number
			waitingInQueue: number
		}>
	>
}

export default function PopupStatus({ position, waitingInQueue, visible, setVisible }: Props) {
	const close = () => setVisible(prev => ({ ...prev, visible: false }))

	return (
		<>
			<AnimatePresence mode="wait" initial={false}>
				{visible && (
					<>
						<motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="bg-black/70 w-full h-full fixed inset-0 z-50" onClick={close} />

						<motion.div key="modal" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.25 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[28rem] max-md:w-11/12 bg-alt-background-color border border-border-color rounded-lg">
							<div className="flex justify-between p-4">
								<div className="flex items-center gap-3">
									<Clock className="w-5 h-5 text-primary-color" />
									<p className="font-semibold">Status w kolejce</p>
								</div>
								<button className="cursor-pointer" onClick={close} aria-label="Zamknij">
									<X />
								</button>
							</div>

							<div className="w-full h-px bg-border-color" />

							<div className="flex flex-col items-center p-4">
								<div className="flex items-center justify-center w-18 h-18 bg-darknes-primary-color rounded-full my-3">
									<Clock className="text-primary-color w-8 h-8" />
								</div>
								<div className="flex flex-col justify-center items-center text-center">
									<p className="font-semibold">Szablon w kolejce</p>
									<span className="text-sm text-text-color mt-1.5">Twój szablon został dodany do kolejki i będzie przetwarzany za chwilę.</span>
								</div>
							</div>

							<div className="p-4">
								<div className="bg-border-color p-3 rounded-lg">
									<div className="flex justify-between">
										<p className="text-sm text-text-color">Twoja pozycja</p>
										<span className="text-sm font-semibold">
											{position} z {waitingInQueue}
										</span>
									</div>
									<div className="bg-alt-border-color w-full h-2 rounded-full mt-1.5" />
								</div>

								<div className="flex items-center justify-between bg-border-color p-3 rounded-lg mt-4">
									<div className="flex items-center gap-2">
										<Clock className="w-5 h-5 text-primary-color" />
										<p className="text-sm text-text-color font-medium">Średni czas oczekiwania</p>
									</div>
									<p className="text-sm font-semibold">{(position === 0 ? 1 : position) * 4} min</p>
								</div>

								<div className="bg-border-color p-3 rounded-lg mt-4">
									<div className="flex items-start gap-2">
										<Bell className="text-primary-color w-5 h-5 mt-1" />
										<div>
											<p className="text-xs font-semibold">Powiadomimy Cię, gdy Twój szablon będzie gotowy</p>
											<div className="flex items-center gap-2 mt-1.5">
												<CircleCheckBig className="w-4 h-4 text-primary-color" />
												<p className="text-xs text-text-color">Powiadomienie na stronie</p>
											</div>
											<div className="flex items-center gap-2 mt-1">
												<Mail className="w-4 h-4 text-primary-color" />
												<p className="text-xs text-text-color">Powiadomienia mail</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="px-4 pb-4 mt-2">
								<Button className="bg-primary-color w-full rounded-lg cursor-pointer" onPress={close}>
									<CircleCheckBig className="w-5 h-5" />
									<p className="font">Rozumiem</p>
								</Button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

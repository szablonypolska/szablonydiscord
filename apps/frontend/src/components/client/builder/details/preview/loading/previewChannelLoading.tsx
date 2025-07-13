import { motion } from "framer-motion"

export default function PreviewChannelLoading() {
	return (
		<>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex flex-col items-center w-full">
				<section className="items-center  w-full">
					<div className="flex  max-xl:w-full gap-5 rounded-xl  w-full">
						<article className="bg-altBackgroundColor border border-borderColor rounded-xl p-8  w-full h-96">
							<div className="animate-pulse">
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
								<div className="bg-borderColor w-72 h-6 rounded-full mt-3 max-sm:w-9/12"></div>
							</div>
						</article>
					</div>
				</section>
			</motion.div>
		</>
	)
}

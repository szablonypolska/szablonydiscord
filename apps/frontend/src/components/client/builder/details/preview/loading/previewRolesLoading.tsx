import { motion } from "framer-motion"

export default function PreviewRolesLoading() {
	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="flex flex-col items-center w-full">
			<section className="items-center  w-full">
				<div className="flex  max-xl:w-full gap-5 rounded-xl max-lg:flex-col w-full">
					<article className="bg-alt-background-color border border-border-color rounded-xl w-full p-8 h-96">
						<div className="animate-pulse">
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
							<div className="flex">
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
								<div className="bg-border-color h-7 rounded-full mt-3 mx-1 grow"></div>
							</div>
						</div>
					</article>
				</div>
			</section>
		</motion.div>
	)
}

"use client"

export default function TemplatesLoading() {
	return (
		<>
			<div className="flex flex-col items-center my-32">
				<div className="bg-altBackgroundColor w-[70rem] max-xl:w-11/12 p-8 rounded-xl border border-borderColor max-lg:p-5">
					<header className="animate-pulse">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4 w-full">
								<h1 className="w-96 h-7 bg-borderColor rounded-full max-sm:w-full"></h1>
								<div className="flex gap-1 max-sm:hidden">
									<span className="bg-borderColor w-28 h-7 rounded-full"></span>
									<span className="bg-borderColor w-28 h-7 rounded-full"></span>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-14 h-10 rounded-xl max-md:hidden"></div>
								<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-16 h-10 rounded-xl max-md:hidden"></div>
							</div>
						</div>
						<p className="w-80 h-6 bg-borderColor rounded-full max-sm:w-full max-md:mt-3 mt-2"></p>
						<div className="max-sm:flex hidden mt-3 gap-2">
							<span className="bg-borderColor w-1/2 h-7 rounded-full"></span>
							<span className="bg-borderColor w-1/2 h-7 rounded-full"></span>
						</div>
					</header>

					<section className="flex items-center gap-2 mt-5 max-sm:flex-col animate-pulse">
						<div className="px-3 h-12  bg-borderColor w-52 rounded-xl max-sm:w-full"></div>
						<div className="flex gap-2 max-sm:mt-2 max-sm:w-full">
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-16 rounded-xl max-sm:flex-grow max-sm:justify-center"></div>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-16 rounded-xl max-sm:flex-grow max-sm:justify-center"></div>
							<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-16 rounded-xl max-sm:flex-grow max-sm:justify-center"></div>
						</div>
					</section>

					<section className="flex items-center gap-3 mt-10 max-sm:flex-col max-sm:w-full max-sm:mt-5 animate-pulse">
						<div className="w-52 bg-borderColor h-12 rounded-xl max-sm:w-full"></div>
						<div className="w-72 bg-borderColor h-12 rounded-xl max-sm:w-full"></div>
					</section>
				</div>
				<section className="items-center mt-5 max-xl:w-11/12">
					<div className="flex w-[70rem] max-xl:w-full gap-5 rounded-xl max-lg:flex-col max-lg:w-full">
						<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8 max-lg:w-full">
							<div className="animate-pulse">
								<div className="bg-borderColor w-96 h-5 rounded-full max-sm:w-11/12"></div>
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
						<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8 max-lg:w-full">
							<div className="animate-pulse">
								<div className="flex">
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
								</div>
								<div className="flex">
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
								</div>
								<div className="flex">
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
								</div>
								<div className="flex">
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
								</div>
								<div className="flex">
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
									<div className="bg-borderColor h-7 rounded-full mt-3 mx-1 flex-grow"></div>
								</div>
							</div>
						</article>
					</div>
				</section>
			</div>
		</>
	)
}

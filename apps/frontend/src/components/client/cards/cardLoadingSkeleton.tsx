export default function CardsLoadingSkeleton() {
	return (
		<div className="flex flex-col bg-background border border-borderColor p-5 rounded-lg w-full">
			<h3 className="text-xl w-80 h-8 bg-borderColor rounded-full"></h3>
			<p className="mt-3 text-textColor h-5 bg-borderColor rounded-full w-96"></p>
			<div className="flex-grow"></div>
			<div className="flex items-center w-full bg-altBackgroundColor border border-borderColor mt-5  rounded-lg h-14">
				<div className="p-5 w-1/2">
					<div className="bg-borderColor h-8 w-full  rounded-full"></div>
				</div>
				<div className="w-[1px] h-full bg-borderColor"></div>
				<div className="p-5 w-1/2">
					<div className="bg-borderColor h-8 w-full  rounded-full"></div>
				</div>
			</div>
			<div className="mt-5 h-10 rounded-xl bg-borderColor"></div>
		</div>
	)
}

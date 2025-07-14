export default function CardsLoadingSkeleton() {
	return (
		<div className="flex flex-col bg-background border border-border-color p-5 rounded-lg w-full">
			<h3 className="text-xl w-80 h-8 bg-border-color rounded-full"></h3>
			<p className="mt-3 text-text-color h-5 bg-border-color rounded-full w-96"></p>
			<div className="grow"></div>
			<div className="flex items-center w-full bg-alt-background-color border border-border-color mt-5  rounded-lg h-14">
				<div className="p-5 w-1/2">
					<div className="bg-border-color h-8 w-full  rounded-full"></div>
				</div>
				<div className="w-px h-full bg-border-color"></div>
				<div className="p-5 w-1/2">
					<div className="bg-border-color h-8 w-full  rounded-full"></div>
				</div>
			</div>
			<div className="mt-5 h-10 rounded-xl bg-border-color"></div>
		</div>
	)
}

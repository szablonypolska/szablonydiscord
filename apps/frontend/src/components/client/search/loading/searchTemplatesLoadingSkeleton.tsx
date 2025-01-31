import CardsLoadingSkeleton from "../../cards/cardLoadingSkeleton"

export default function SearchTemplatesLoadingSkeleton() {
	return (
		<div className="flex flex-col w-full animate-pulse">
			<div className="flex items-center justify-between  p-3 px-6 rounded-xl w-full border border-borderColor">
				<div className="bg-borderColor rounded-full w-52 h-5"></div>
				<div className="flex items-center gap-5  max-md:gap-2 h-11 ">
					<div className="relative bg-borderColor rounded-full h-full w-44"></div>
					<div className=" px-1 py-1 relative bg-borderColor rounded-full h-full w-20"></div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-5 mt-5">
				<CardsLoadingSkeleton />
				<CardsLoadingSkeleton />
				<CardsLoadingSkeleton />
				<CardsLoadingSkeleton />
				<CardsLoadingSkeleton />
				<CardsLoadingSkeleton />
			</div>
		</div>
	)
}

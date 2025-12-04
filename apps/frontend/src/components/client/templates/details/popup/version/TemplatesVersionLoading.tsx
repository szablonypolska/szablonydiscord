export function TemplatesVersionLoading() {
	return (
		<div className="flex flex-col gap-7 relative h-full my-2">
			<div className="mt-3 absolute w-[2px] h-full bg-border-color left-[20px]"></div>
			{Array.from({ length: 2 }).map((_, index) => (
				<div className="flex items-start  relative" key={index}>
					<div className="relative w-10 mt-3">
						<div className="flex h-10 w-10 bg-border-color items-center justify-center rounded-full"></div>
					</div>

					<div className="flex-1 ml-6 bg-alt-background-color border border-border-color rounded-lg p-4">
						<div className="flex items-center gap-2 h-6 w-8 bg-border-color animate-pulse rounded-lg"></div>

						<div className="flex items-center gap-2 mt-2">
							<div className="flex items-center gap-2 text-text-color w-12 h-3 bg-border-color animate-pulse"></div>
							<div className="w-2 h-2 bg-border-color rounded-full opacity-75"></div>
							<div className="flex items-center gap-2 text-text-color w-12 h-3 bg-border-color animate-pulse"></div>
						</div>
						<div className="flex items-center gap-2 mt-3">
							<div className="h-9 w-full bg-border-color animate-pulse rounded-lg"></div>
							<div className="h-9 w-40 bg-border-color animate-pulse rounded-lg"></div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

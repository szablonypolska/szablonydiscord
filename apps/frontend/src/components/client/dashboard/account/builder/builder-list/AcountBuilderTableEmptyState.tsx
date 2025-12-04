export function AccountBuilderTableEmptyState() {
	return (
		<div className="grid grid-cols-8 border-b border-border-color text-sm px-5 py-3  ">
			<div className="flex items-center gap-2 font-medium col-span-2   ">-</div>
			<div className="text-gray-300 truncate px-2 mt-1">-</div>
			<div className="text-gray-300 px-2 mt-1">-</div>
			<div className="px-2 mt-1">
				<p>-</p>
			</div>
			<div className="max-lg:hidden px-6 mt-1">
				<div className="bg-sidebar-color p-1 px-3 font-medium rounded-lg w-fit">-</div>
			</div>
			<div className="max-lg:hidden px-2 mt-1">
				<div className="bg-sidebar-color p-1 px-3 font-medium rounded-lg w-fit">-</div>
			</div>
			<div className="flex items-center justify-end gap-2 mt-1">
				<div className="">-</div>
				<div className="">-</div>
			</div>
		</div>
	)
}

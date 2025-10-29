import { AccountBuilderBox } from "./AccountBuilderBox"
import { AccountBuilderTable } from "./builder-list/AccountBuilderTable"
import { AccountBuilderLimit } from "./AccountBuilderLimit"

export function AccountBuilder() {
	return (
		<div className="bg-box-color-dashboard border border-border-color w-full mt-7 rounded-lg">
			<div className=" p-5">
				<h2 className="text-lg font-semibold">Builder AI</h2>
			</div>
			<div className="w-full bg-border-color h-[1px] my-2"></div>

			<AccountBuilderBox />
			<div className="flex items-start gap-5 w-full p-5 min-w-0 max-2xl:flex-col ">
				<AccountBuilderTable />
				<AccountBuilderLimit />
			</div>
		</div>
	)
}

"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AccountHeader() {
	const pathname = usePathname()

	const options = [
		{
			label: "Konto",
			value: "account",
			route: "/dashboard/account",
		},
		{
			label: "Zamówienia",
			value: "orders",
			route: "/dashboard/account/order",
		},
		{
			label: "Subskrybcje",
			value: "subscriptions",
			route: "/dashboard/account/subscriptions",
		},
	]

	return (
		<div className="">
			<h1 className="text-2xl font-semibold">Zarządzanie kontem</h1>
			<div className="mt-7 border-b-2 border-border-color w-full">
				<div className="mb-[10px] ">
					{options.map(option => (
						<Link key={option.value} href={option.route} className={clsx("px-6 py-3 cursor-pointer text-sm border-b-2 text-primary-color font-medium -mb-[2px]", pathname === option.route ? "border-primary-color text-primary-color font-medium" : "border-transparent text-text-special")}>
							{option.label}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

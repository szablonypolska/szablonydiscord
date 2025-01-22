export function formatData(date: Date) {
	const deteFormat = new Date(date)
	return deteFormat.toLocaleDateString("pl-PL", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

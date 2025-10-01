export function translateOrderEvents(event: string) {
	switch (event) {
		case "NEW":
			return "Nowe"
		case "PAID":
			return "Opłacone"
		case "COMPLETED":
			return "Zrealizowane"
		case "CANCELED":
			return "Anulowane"
		default:
			return event
	}
}

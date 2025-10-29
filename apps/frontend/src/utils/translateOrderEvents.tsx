export function translateOrderEvents(event: string): { title: string; description: string } {
	switch (event) {
		case "NEW":
			return { title: "Nowe", description: "Zamówienie zostało złożone" }
		case "PAID":
			return { title: "Opłacone", description: "Płatność została zrealizowana" }
		case "COMPLETED":
			return { title: "Zrealizowane", description: "Zamówienie wysłane do klienta" }
		case "CANCELED":
			return { title: "Anulowane", description: "Zamówienie zostało anulowane" }
		case "REFUND_PENDING":
			return { title: "Zwrot w toku", description: "Zwrot środków jest w trakcie realizacji" }
		case "REFUNDED":
			return { title: "Zwrócone", description: "Zamówienie zostało zwrócone" }
		case "PARTIALLY_REFUNDED":
			return { title: "Częściowo zwrócone", description: "Część zamówienia została zwrócona" }
		default:
			return { title: event, description: event }
	}
}

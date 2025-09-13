export const translateCategoryOffer = (category: "PROTECTION" | "SUBSCRIPTION" | "OTHER"): string => {
	console.log(category)
	switch (category) {
		case "PROTECTION":
			return "Ochrona"
		case "SUBSCRIPTION":
			return "Subskrypcja"
		case "OTHER":
			return "Inne"
	}
}

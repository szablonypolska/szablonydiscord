import vetifyDiscountCode from "@/lib/payments/verifyPromoCode"

export const applyCode = async (offer: string, code: string) => {
	try {
		const checkCode = await vetifyDiscountCode(offer, code)

		if (checkCode.statusCode === 404) {
			return { message: "Wpisany kod promocyjny nie istnieje", success: false }
		}

		if (checkCode.type === "lowPrice") {
			return { message: "Kwota zamówienia nie moze byc nizsza niz 2.50 zł", success: false }
		}

		if (checkCode.type === "exceededLimit") {
			return { message: "Wykorzystano limit użyć kodu promocyjnego", success: false }
		}

		return { message: "Kod promocyjny został pomyślnie zastosowany", success: true, code: checkCode.code, percentDiscount: checkCode.percentDiscount }
	} catch (err) {
		console.log(err)
		return { message: "Wystąpił błąd serwera, spróbuj ponownie później", success: false }
	}
}

import verifyDiscountCode from "@/lib/payments/verifyPromoCode"

export const applyCode = async (code: string) => {
	try {
		const checkCode = await verifyDiscountCode(code)

		if (checkCode.type === "notFound") {
			return { message: "Wpisany kod promocyjny nie istnieje", ok: false }
		}

		if (checkCode.type === "exceededLimit") {
			return { message: "Wykorzystano limit użyć kodu promocyjnego", ok: false }
		}

		const { ...rest } = checkCode

		return { message: "Kod promocyjny został pomyślnie zastosowany", ok: true, data: { ...rest } }
	} catch (err) {
		console.log(err)
		return { message: "Wystąpił błąd serwera, spróbuj ponownie później", ok: false }
	}
}

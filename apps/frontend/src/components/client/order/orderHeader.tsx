export default function OrderHeader({ code }: { code: string }) {
	return (
		<div className="max-2xl:w-full">
			<h1 className="text-3xl font-semibold mt-5">
				Status twojego zamówienia <span className="text-primary-color">#{code}</span>
			</h1>
			<p className="text-text-color mt-2">To jest śledzenie twojego zamówienia, jesli nastąpił błąd skontaktuj się z nami.</p>
		</div>
	)
}

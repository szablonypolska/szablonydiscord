export default function ApiSettingsNotificationVariables() {
	return (
		<>
			<div className="bg-sidebarColor border border-borderColor p-5 rounded-xl mt-5">
				<div className="flex items-center gap-2">
					<div className="w-1.5 h-6 bg-primaryColor rounded-xl"></div>
					<p className="font-medium">Dostępne zmienne</p>
				</div>
				<div className="grid grid-cols-3 mt-3 max-2xl:grid-cols-2 max-md:grid-cols-1 max-2xl:gap-5">
					<div className="flex flex-col gap-5">
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${name}"}</span>
							<p className="text-silverColor">Nazwa klucza</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${reqCount}"}</span>
							<p className="text-silverColor">Ilość wszystkich zapytań</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${successCount}"}</span>
							<p className="text-silverColor">Zapytania zakończone sukcesem</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${errorCount}"}</span>
							<p className="text-silverColor">Zapytania zakończone błędem</p>
						</div>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${dailyCount}"}</span>
							<p className="text-silverColor">Ilość dzisiejszych użyć</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${monthlyCount}"}</span>
							<p className="text-silverColor">Ilość miesięcznych użyć</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${dailyLimit}"}</span>
							<p className="text-silverColor">Dzienny limit użyć</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${monthlyLimit}"}</span>
							<p className="text-silverColor">Miesięczny limit użyć</p>
						</div>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex gap-3">
							<span className="text-primaryColor">{"${usageDailyPercent}"}</span>
							<p className="text-silverColor">Dzienne użycia w %</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

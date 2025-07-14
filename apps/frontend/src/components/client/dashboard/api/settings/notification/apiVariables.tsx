export default function ApiSettingsNotificationVariables() {
	return (
		<>
			<div className="bg-sidebar-color border border-border-color p-5 rounded-xl mt-5">
				<div className="flex items-center gap-2">
					<div className="w-1.5 h-6 bg-primary-color rounded-xl"></div>
					<p className="font-medium">Dostępne zmienne</p>
				</div>
				<div className="grid grid-cols-3 mt-3 max-2xl:grid-cols-2 max-md:grid-cols-1 max-2xl:gap-5">
					<div className="flex flex-col gap-5">
						<div className="flex gap-3">
							<span className="text-primary-color">{"${name}"}</span>
							<p className="text-silver-color">Nazwa klucza</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primary-color">{"${reqCount}"}</span>
							<p className="text-silver-color">Ilość wszystkich zapytań</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primary-color">{"${successCount}"}</span>
							<p className="text-silver-color">Zapytania zakończone sukcesem</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primary-color">{"${errorCount}"}</span>
							<p className="text-silver-color">Zapytania zakończone błędem</p>
						</div>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex gap-3">
							<span className="text-primary-color">{"${dailyCount}"}</span>
							<p className="text-silver-color">Ilość dzisiejszych użyć</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primary-color">{"${monthlyCount}"}</span>
							<p className="text-silver-color">Ilość miesięcznych użyć</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primary-color">{"${dailyLimit}"}</span>
							<p className="text-silver-color">Dzienny limit użyć</p>
						</div>
						<div className="flex gap-3">
							<span className="text-primary-color">{"${monthlyLimit}"}</span>
							<p className="text-silver-color">Miesięczny limit użyć</p>
						</div>
					</div>
					<div className="flex flex-col gap-5">
						<div className="flex gap-3">
							<span className="text-primary-color">{"${usageDailyPercent}"}</span>
							<p className="text-silver-color">Dzienne użycia w %</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

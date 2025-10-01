export default function ToggleButton({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
	const handleChange = (show: boolean) => {
		return !show
	}
	return (
		<label className="inline-flex items-center cursor-pointer">
			<input type="checkbox" checked={checked} onChange={() => onChange(handleChange(checked))} className="sr-only peer" />
			<div className={`relative w-12 h-6 bg-border-color peer-focus:outline-hidden  rounded-full peer dark:bg-silver-color peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-color`}></div>
		</label>
	)
}

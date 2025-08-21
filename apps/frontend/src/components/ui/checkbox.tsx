import React from "react"

interface CheckboxProps {
	checked?: boolean
	onChange?: (checked: boolean) => void
	disabled?: boolean
	indeterminate?: boolean
}

const getInputClasses = (checked: boolean, disabled: boolean, indeterminate: boolean) => {
	let className = "relative border w-5 h-5 duration-200 rounded-md inline-flex items-center justify-center"
	if (disabled) {
		if (!checked || indeterminate) {
			className += " bg-gray-100 border-gray-500"
			if (indeterminate) {
				className += " stroke-gray-500"
			} else {
				className += " fill-gray-100 stroke-gray-100"
			}
		} else {
			className += " bg-primary-color border-gray-600 fill-gray-600 stroke-gray-100"
		}
	} else {
		if (!checked || indeterminate) {
			className += " bg-border-color border border-alt-border-color   "
			if (indeterminate) {
				className += " stroke-gray-700"
			} else {
				className += " fill-background-100 stroke-background-100 "
			}
		} else {
			className += " bg-primary-color border-border-color fill-gray-1000 stroke-gray-100"
		}
	}

	return className
}

export const Checkbox = ({ checked = false, onChange, disabled = false, indeterminate = false }: CheckboxProps) => {
	const handleChange = () => {
		if (onChange && !indeterminate) {
			onChange(!checked)
		}
	}

	return (
		<div className={`flex items-center cursor-pointer text-[13px] font-sans group ${disabled ? "text-gray-500" : "text-gray-1000"}`} onClick={() => onChange && !indeterminate && onChange(!checked)}>
			<input disabled={disabled} type="checkbox" checked={checked} className="absolute w-[1px] h-[1px] p-0 overflow-hidden whitespace-nowrap border-none" onChange={handleChange} />
			<span className={getInputClasses(checked, disabled, indeterminate)}>
				{checked && (
					<svg className="shrink-0" height="20" viewBox="0 0 20 20" width="20">
						{indeterminate ? <line strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="15" y1="10" y2="10" /> : <path d="M14 7L8.5 12.5L6 10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />}
					</svg>
				)}
			</span>
		</div>
	)
}

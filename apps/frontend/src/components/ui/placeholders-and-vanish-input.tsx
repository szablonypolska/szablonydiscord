"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type PixelData = {
	x: number
	y: number
	color: [number, number, number, number]
}

type RenderData = {
	x: number
	y: number
	r: number
	color: string
}

interface PlaceholdersAndVanishInputProps {
	placeholders: string[]
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function PlaceholdersAndVanishInput({ placeholders, onChange, onSubmit }: PlaceholdersAndVanishInputProps) {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Funkcja startAnimation z użyciem useCallback
	const startAnimation = useCallback(() => {
		intervalRef.current = setInterval(() => {
			setCurrentPlaceholder(prev => (prev + 1) % placeholders.length)
		}, 3000)
	}, [placeholders.length])

	// Funkcja reagująca na zmianę widoczności zakładki
	const handleVisibilityChange = useCallback(() => {
		if (document.visibilityState !== "visible" && intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		} else if (document.visibilityState === "visible") {
			startAnimation()
		}
	}, [startAnimation])

	// useEffect z poprawioną tablicą zależności
	useEffect(() => {
		startAnimation()
		document.addEventListener("visibilitychange", handleVisibilityChange)
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
			document.removeEventListener("visibilitychange", handleVisibilityChange)
		}
	}, [handleVisibilityChange, startAnimation])

	const canvasRef = useRef<HTMLCanvasElement>(null)
	const newDataRef = useRef<RenderData[]>([])
	const inputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState("")
	const [animating, setAnimating] = useState(false)

	// Rysowanie punktów na canvas
	const draw = useCallback(() => {
		if (!inputRef.current) return
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		if (!ctx) return

		canvas.width = 800
		canvas.height = 800
		ctx.clearRect(0, 0, 800, 800)

		const computedStyles = getComputedStyle(inputRef.current)
		const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"))

		ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
		ctx.fillStyle = "#FFF"
		ctx.fillText(value, 16, 40)

		const imageData = ctx.getImageData(0, 0, 800, 800)
		const pixelData = imageData.data
		const newData: PixelData[] = []

		for (let t = 0; t < 800; t++) {
			const i = 4 * t * 800 // używamy const
			for (let n = 0; n < 800; n++) {
				const e = i + 4 * n // używamy const
				if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
					newData.push({
						x: n,
						y: t,
						color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
					})
				}
			}
		}

		newDataRef.current = newData.map(({ x, y, color }) => ({
			x,
			y,
			r: 1,
			color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		}))
	}, [value])

	useEffect(() => {
		draw()
	}, [value, draw])

	// Funkcja animująca znikanie liter
	const animate = useCallback((start: number) => {
		const animateFrame = (pos = 0) => {
			requestAnimationFrame(() => {
				const newArr: RenderData[] = []
				for (let i = 0; i < newDataRef.current.length; i++) {
					const current = newDataRef.current[i]
					if (current.x < pos) {
						newArr.push(current)
					} else {
						if (current.r <= 0) {
							current.r = 0
							continue
						}
						current.x += Math.random() > 0.5 ? 1 : -1
						current.y += Math.random() > 0.5 ? 1 : -1
						current.r -= 0.05 * Math.random()
						newArr.push(current)
					}
				}
				newDataRef.current = newArr
				const ctx = canvasRef.current?.getContext("2d")
				if (ctx) {
					ctx.clearRect(pos, 0, 800, 800)
					newDataRef.current.forEach(t => {
						const { x: n, y: i, r: s, color } = t
						if (n > pos) {
							ctx.beginPath()
							ctx.rect(n, i, s, s)
							ctx.fillStyle = color
							ctx.strokeStyle = color
							ctx.stroke()
						}
					})
				}
				if (newDataRef.current.length > 0) {
					animateFrame(pos - 8)
				} else {
					setValue("")
					setAnimating(false)
				}
			})
		}
		animateFrame(start)
	}, [])

	// Funkcja spinająca rysowanie i animowanie
	const vanishAndSubmit = useCallback(() => {
		setAnimating(true)
		draw()

		const val = inputRef.current?.value || ""
		if (val && inputRef.current) {
			const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0)
			animate(maxX)
		}
	}, [animate, draw])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && !animating) {
				vanishAndSubmit()
			}
		},
		[animating, vanishAndSubmit]
	)

	// Obsługa submitu formularza
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		vanishAndSubmit()
		onSubmit?.(e) // unikamy no-unused-expressions
	}

	return (
		<form
			className={cn("relative w-full bg-[#212121] placeholder:text-textColor pl-2 py-2 border border-borderColor rounded-xl overflow-hidden transition duration-200", value && "bg-[#212121]")}
			onSubmit={handleSubmit}>
			<canvas
				className={cn(
					"absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
					!animating ? "opacity-0" : "opacity-100"
				)}
				ref={canvasRef}
			/>
			<input
				onChange={e => {
					if (!animating) {
						setValue(e.target.value)
						onChange?.(e) // zamiast onChange && onChange(e)
					}
				}}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				value={value}
				type="text"
				className={cn(
					"w-full relative text-sm sm:text-base z-50 border-none bg-transparent text-white h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
					animating && "text-transparent dark:text-transparent"
				)}
			/>

			<div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
				<AnimatePresence mode="wait">
					{!value && (
						<motion.p
							initial={{ y: 5, opacity: 0 }}
							key={`current-placeholder-${currentPlaceholder}`}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -15, opacity: 0 }}
							transition={{ duration: 0.3, ease: "linear" }}
							className="text-sm sm:text-base font-normal text-textColor pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate">
							{placeholders[currentPlaceholder]}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</form>
	)
}

"use client"

import { useEffect, useRef } from "react"

interface ConfettiPiece {
	x: number
	y: number
	z: number
	velocityX: number
	velocityY: number
	velocityZ: number
	rotation: number
	rotationSpeed: number
	baseSize: number
	opacity: number
	shape: "rectangle" | "circle" | "star" | "diamond"
	color: string
	floatPhase: number
	swayAmplitude: number
	bobAmplitude: number
	fadeStart: number
	isFading: boolean
	// Explosion properties
	explosionX: number
	explosionY: number
	explosionForce: number
	explosionAngle: number
	age: number
	maxAge: number
}

export default function ConfettiBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number | null>(null)
	const confettiRef = useRef<ConfettiPiece[]>([])

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		resizeCanvas()
		window.addEventListener("resize", resizeCanvas)

		const confettiColors = ["rgba(255, 107, 107, 0.9)", "rgba(54, 162, 235, 0.9)", "rgba(255, 206, 84, 0.9)", "rgba(75, 192, 192, 0.9)", "rgba(153, 102, 255, 0.9)", "rgba(255, 159, 64, 0.9)", "rgba(255, 99, 132, 0.9)", "rgba(50, 205, 50, 0.9)", "rgba(255, 20, 147, 0.9)", "rgba(0, 191, 255, 0.9)"]

		// Create explosion at specific point
		const createExplosion = (x: number, y: number, particleCount: number = 40) => {
			for (let i = 0; i < particleCount; i++) {
				const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
				const force = Math.random() * 8 + 4
				const maxAge = Math.random() * 180 + 120 // 2-5 seconds at 60fps

				confettiRef.current.push({
					x: x,
					y: y,
					z: Math.random() * 200 + 800,
					velocityX: Math.cos(angle) * force + (Math.random() - 0.5) * 2,
					velocityY: Math.sin(angle) * force + (Math.random() - 0.5) * 2,
					velocityZ: -(Math.random() * 0.8 + 0.4),
					rotation: Math.random() * Math.PI * 2,
					rotationSpeed: (Math.random() - 0.5) * 0.08,
					baseSize: Math.random() * 10 + 5,
					opacity: 1,
					shape: ["rectangle", "circle", "star", "diamond"][Math.floor(Math.random() * 4)] as "rectangle" | "circle" | "star" | "diamond",
					color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
					floatPhase: Math.random() * Math.PI * 2,
					swayAmplitude: Math.random() * 0.3 + 0.1,
					bobAmplitude: Math.random() * 0.2 + 0.05,
					fadeStart: 0,
					isFading: false,
					explosionX: x,
					explosionY: y,
					explosionForce: force,
					explosionAngle: angle,
					age: 0,
					maxAge: maxAge,
				})
			}
		}

		// Create multiple explosion points with staggered timing
		const initExplosionPoints = () => {
			const points = [
				{ x: canvas.width * 0.2, y: canvas.height * 0.3, delay: 0 },
				{ x: canvas.width * 0.5, y: canvas.height * 0.2, delay: 300 },
				{ x: canvas.width * 0.8, y: canvas.height * 0.4, delay: 600 },
				{ x: canvas.width * 0.3, y: canvas.height * 0.6, delay: 900 },
				{ x: canvas.width * 0.7, y: canvas.height * 0.7, delay: 1200 },
				{ x: canvas.width * 0.1, y: canvas.height * 0.8, delay: 1500 },
				{ x: canvas.width * 0.9, y: canvas.height * 0.1, delay: 1800 },
			]

			points.forEach(point => {
				setTimeout(() => {
					createExplosion(point.x, point.y, 35)
				}, point.delay)
			})

			// Continue creating random explosions
			const createRandomExplosion = () => {
				if (confettiRef.current.length < 200) {
					const x = Math.random() * canvas.width
					const y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1
					createExplosion(x, y, Math.random() * 25 + 15)
				}
				setTimeout(createRandomExplosion, Math.random() * 2000 + 1500)
			}
			setTimeout(createRandomExplosion, 2500)
		}

		const drawConfetti = (piece: ConfettiPiece) => {
			const perspective = 800
			const scale = perspective / (perspective + piece.z)
			const projectedX = piece.x + (piece.x - canvas.width / 2) * (1 - scale)
			const projectedY = piece.y + (piece.y - canvas.height / 2) * (1 - scale)

			if (scale <= 0.01 || scale > 2) return

			const size = piece.baseSize * scale
			const ageRatio = piece.age / piece.maxAge
			let opacity = piece.opacity * scale * 1.5

			// Fade out based on age
			if (ageRatio > 0.7) {
				opacity *= 1 - (ageRatio - 0.7) / 0.3
			}

			opacity = Math.min(opacity, 1)

			ctx.save()
			ctx.translate(projectedX, projectedY)
			ctx.rotate(piece.rotation)
			ctx.globalAlpha = opacity

			const shadowIntensity = Math.min(scale * 0.3, 0.2)
			ctx.shadowColor = `rgba(0, 0, 0, ${shadowIntensity})`
			ctx.shadowBlur = scale * 4
			ctx.shadowOffsetX = scale * 3
			ctx.shadowOffsetY = scale * 3

			ctx.fillStyle = piece.color

			switch (piece.shape) {
				case "rectangle":
					const width = size * 1.5
					const height = size * 0.8
					ctx.fillRect(-width / 2, -height / 2, width, height)
					break
				case "circle":
					ctx.beginPath()
					ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
					ctx.fill()
					break
				case "star":
					ctx.beginPath()
					const starSize = size * 0.7
					for (let i = 0; i < 6; i++) {
						const angle = (i * Math.PI) / 3
						const x = Math.cos(angle) * starSize
						const y = Math.sin(angle) * starSize
						if (i === 0) ctx.moveTo(x, y)
						else ctx.lineTo(x, y)

						const innerAngle = ((i + 0.5) * Math.PI) / 3
						const innerX = Math.cos(innerAngle) * starSize * 0.5
						const innerY = Math.sin(innerAngle) * starSize * 0.5
						ctx.lineTo(innerX, innerY)
					}
					ctx.closePath()
					ctx.fill()
					break
				case "diamond":
					ctx.beginPath()
					const diamondSize = size * 0.8
					ctx.moveTo(0, -diamondSize)
					ctx.lineTo(diamondSize * 0.6, 0)
					ctx.lineTo(0, diamondSize)
					ctx.lineTo(-diamondSize * 0.6, 0)
					ctx.closePath()
					ctx.fill()
					break
			}

			ctx.restore()
		}

		const updateConfetti = () => {
			confettiRef.current = confettiRef.current.filter(piece => {
				piece.age++
				piece.floatPhase += 0.02

				// Early explosion phase - rapid expansion
				if (piece.age < 15) {
					const explosionProgress = piece.age / 15
					const currentForce = piece.explosionForce * (1 - explosionProgress * 0.3)
					piece.x += Math.cos(piece.explosionAngle) * currentForce
					piece.y += Math.sin(piece.explosionAngle) * currentForce
				} else {
					// Later phase - gravity and air resistance
					const swayX = Math.sin(piece.floatPhase) * piece.swayAmplitude * 0.3
					const bobY = Math.cos(piece.floatPhase * 0.7) * piece.bobAmplitude * 0.2

					piece.x += piece.velocityX + swayX
					piece.y += piece.velocityY + bobY

					// Apply gravity
					piece.velocityY += 0.08
					piece.velocityX *= 0.995
					piece.velocityY *= 0.998

					// Add some random drift
					piece.velocityX += (Math.random() - 0.5) * 0.02
				}

				piece.z += piece.velocityZ
				piece.rotation += piece.rotationSpeed

				// Remove old confetti
				return piece.age < piece.maxAge && piece.y < canvas.height + 100
			})
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			updateConfetti()
			confettiRef.current.forEach(drawConfetti)

			animationRef.current = requestAnimationFrame(animate)
		}

		// Start the show
		initExplosionPoints()
		animate()

		return () => {
			window.removeEventListener("resize", resizeCanvas)
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-[-1]"
			style={{
				background: "transparent",
			}}
		/>
	)
}

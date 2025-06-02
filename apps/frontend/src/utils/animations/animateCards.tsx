import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function animateCards(container: HTMLDivElement | null) {
	if (!container) return

	const cards = container.querySelectorAll<HTMLElement>(".card")

	cards.forEach(card => {
		gsap.fromTo(
			card,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: "power2.out",
				scrollTrigger: {
					trigger: card,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			}
		)
	})
}

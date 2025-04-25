import gsap from "gsap"

export default function animateCards(container: HTMLDivElement | null) {
	if (container) {
		gsap.fromTo(
			container.querySelectorAll(".card"),
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.1,
				ease: "power2.out",
			}
		)
	}
}

import gsap from "gsap"

export default function animateChangeSectionChat(animation: HTMLDivElement | null) {
	if (animation) {
		gsap.to(animation, {
			opacity: 1,
			y: -5,
			duration: 0.5,
		})
	}
}

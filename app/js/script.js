const menuIcon = document.querySelector('.nav__menu');
const navbar = document.querySelector('.menu__layout');
const menuLink = document.querySelector('.navbar__list-link');
const header = document.querySelector('.site-nav-js');
const a = document.querySelectorAll('a');
//when the hamburger is clicked, menu opens
menuIcon.addEventListener('click', () => {
	navbar.classList.toggle('change');
	header.classList.toggle('change-nav');
});
//when a link is clicked, menu closes
a.forEach(item => {
	item.addEventListener('click', () => {
		navbar.classList.remove('change');
	});
});


gsap.registerPlugin(ScrollTrigger);



// --- ORANGE PANEL ---

const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".orangeWrapper",
			scrub: true,
			pin: true,

			start: "50% 50%",
			end: "+=100%"
		}
	})

	.from(".orange", {
		scale: 0.2,
		ease: "none"
	})
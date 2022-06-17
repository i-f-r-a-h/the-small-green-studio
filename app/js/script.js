const menuIcon = document.querySelector('.nav__menu');
const navbar = document.querySelector('.menu__layout');
const menuLink = document.querySelector('.navbar__list-link');
const a = document.querySelectorAll('a');
//when the hamburger is clicked, menu opens
menuIcon.addEventListener('click', () => {
	navbar.classList.toggle('change');
});
//when a link is clicked, menu closes
a.forEach(item => {
	item.addEventListener('click', () => {
		navbar.classList.remove('nav__menu');
	});
});
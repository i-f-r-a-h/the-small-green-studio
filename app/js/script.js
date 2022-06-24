// const menuIcon = document.querySelector('.nav__menu');
// const navbar = document.querySelector('.menu__layout');
// const menuLink = document.querySelector('.navbar__list-link');
// const header = document.querySelector('.site-nav-js');
// const a = document.querySelectorAll('a');
// //when the hamburger is clicked, menu opens
// menuIcon.addEventListener('click', () => {
// 	navbar.classList.toggle('change');
// 	header.classList.toggle('change-nav');
// });
// //when a link is clicked, menu closes
// a.forEach(item => {
// 	item.addEventListener('click', () => {
// 		navbar.classList.remove('change');
// 	});
// });


gsap.registerPlugin(ScrollTrigger);



// --- ORANGE PANEL ---








// menu
const menu_open = gsap.timeline({
	paused: "true",
	reversed: "true",
});
menu_open.to(".menu-container", {
	display: "flex",
});
menu_open.to("#menuBtnDiv", {
	duration: 0.2,
	y: 50,
});
menu_open.fromTo(
	"#menuBtnDiv2", {
		duration: 0.2,
		y: -100,
	}, {
		y: -50,
	},
	"-=.15"
);
menu_open.from(
	".menu-container-1", {
		duration: 0.5,
		y: "100%",
	},
	"-=.5"
);
menu_open.from(
	".menu-container-1 .menu-container-header li span, .menu-container-1 .menu-container-footer li span", {
		stagger: {
			amount: 0.15,
		},
		y: 100,
		duration: 0.5,
	},
	"-=.1"
);
menu_open.from(
	".menu-container-2", {
		duration: 0.5,
		y: "-100%",
	},
	"-=1"
);
menu_open.from(
	".menu-container-2 .menu-container-footer li span", {
		stagger: {
			amount: 0.15,
		},
		y: 100,
		duration: 0.5,
	},
	"-=.5"
);

function menuOpen() {
	menu_open.reversed() ? menu_open.play() : menu_open.reverse();
};


const tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".orangeWrapper",
		scrub: true,
		pin: true,

		start: "50% 50%",
		end: "+=100%"
	}
});

tl.from(".orange", {
	scale: 0.3,
	ease: "none"
});

tl.to(".marquee", {
	opacity: 0,
	ease: "none"
});

tl.to(".hero__content", {
	opacity: 1,
	ease: "none"
});



// on hover image effect
// .active--cursor 

//variables
let cursor = $(".cursor"),
	follower = $(".cursor__follower");

let posX = 0,
	posY = 0,
	mouseX = 0,
	mouseY = 0;

//cursor change effect
TweenMax.to({}, 0.016, {
	repeat: -1,
	onRepeat: function () {
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;

		TweenMax.set(follower, {
			css: {
				left: posX - 20,
				top: posY - 20
			}
		});

		TweenMax.set(cursor, {
			css: {
				left: mouseX,
				top: mouseY
			}
		});

	}
});

//event listeners
$(document).on("mousemove", function (e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

$(".team-js img").on("mouseenter", function () {
	cursor.addClass("active--cursor");
	follower.addClass("active--cursor");
	if ($('.about__info-js').is(":visible")) {
		$(".active--cursor").attr('data-before', 'close');
	} else {
		$(".active--cursor").attr('data-before', 'view');
	}
});

$(".team-js img").on("mouseleave", function () {
	cursor.removeClass("active--cursor");
	follower.removeClass("active--cursor");
});


$(".team-js").on("click", function () {
	$('.about__info-js').slideToggle("slow", function () {
		if ($('.about__info-js').is(":visible")) {
			$(".active--cursor").attr('data-before', 'close');
		} else {
			$(".active--cursor").attr('data-before', 'view');
		}
	});
});
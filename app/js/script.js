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




//how we can help



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

//how we can help
gsap.registerPlugin(Flip);
gsap.set('.categories__article', {
	autoAlpha: 0
})
const sections = gsap.utils.toArray(".principles__item");
let maxWidth = 0;

const getMaxWidth = () => {
	maxWidth = 0;
	sections.forEach((section) => {
		maxWidth += section.offsetWidth;
		maxWidth += gsap.getProperty(section, 'marginLeft');
	});
	maxWidth += 20;
	maxWidth += window.innerWidth;
	maxWidth -= sections[0].offsetWidth;
	return maxWidth;
};

getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

gsap.set('section.spacer', {
	minHeight: window.innerHeight - document.querySelector('.principles').offsetHeight
})

gsap.to(sections, {
	x: () => `-${maxWidth - window.innerWidth}`,
	ease: "none",
	scrollTrigger: {
		trigger: ".principles",
		pin: true,
		scrub: 0.5,
		markers: true,
		end: () => `+=${maxWidth}`,
		invalidateOnRefresh: true
	}
});

sections.forEach((sct, i) => {
	const smallTimeline = gsap.timeline();
	const content = document.querySelector('.categories__wrapper');
	const relevantContent = content.querySelector('article.categories__article-' + i);

	ScrollTrigger.create({
		trigger: sct,
		start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 1.5) * (maxWidth / (maxWidth - window.innerWidth)),
		end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
		animation: smallTimeline,
		toggleActions: "play reverse play reverse",

	});

	smallTimeline
		//.to(elem,{ duration: 0.25, fontSize: "40px", color: "orange"}, 0)  
		.to(sct, {
			duration: 0.25,
			color: "orange"
		}, 0)
		.to(sct, {
			duration: 0.25,
			opacity: 1,
		}, 0)
		.to(relevantContent, {
			duration: 0.25,
			y: 0,
			autoAlpha: 1
		}, 0)

	// modal



	const modal = document.querySelector('.principles__container');


	sct.addEventListener("click", () => {
		const state = Flip.getState(modal);
		modal.classList.toggle("gallery-modal");
		Flip.from(state);
		$(".active--cursor").attr('data-before', 'close');
	});

});




/// introduction date 
var prnDt = new Date().toLocaleDateString('en-us', {
	weekday: 'long'
});
console.log(prnDt);

document.querySelector('.intro__date-js').innerHTML = `${prnDt}`;




//cursor
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

$(".categories__article, .principles__item").on("mouseenter", function () {
	cursor.addClass("active--cursor");
	follower.addClass("active--cursor");

	$(".active--cursor").attr('data-before', 'view');

});

$(".categories__article, .principles__item").on("mouseleave", function () {
	cursor.removeClass("active--cursor");
	follower.removeClass("active--cursor");
});

//modal on click display close - TO DO
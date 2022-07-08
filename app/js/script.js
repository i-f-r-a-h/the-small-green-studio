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
		$("body, #modal-content, #modal-background").toggleClass("active");
		console.log('article.categories__article-' + i);
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

//modal dynamic dom



//modal on click display close - TO DO
$(function () {
	$("#modal-background, #modal-close").click(function () {
		$("body, #modal-content, #modal-background").toggleClass("active");
		$(".carousel-inner, .gallery__title").empty();
	});
});



$(".principles__item").on("click", function () {
	var dir = "app/assets/images/GALLERY/"; // folder location
	var fileextension = ".webp"; // image format
	var index = 0;
	// var j = "2"; // dynamic
	let imgLength = +$(this).data("length");
	let imgStart = +$(this).data("index");
	let file_type = $(this).data("type");

	// check if video or image

	var folder = "app/assets/images/GALLERY/";
	// if ($.inArray($this.data('video'), $this.data('video')) !== -1) {
	// 	$this.children('.status').text('New text value');
	// }
	$(".gallery__title").html($('.categories__article-' + imgStart + ' h2').html() + ' Gallery');
	console.log(jQuery.type(file_type));

	function imageloop() {

		if (index <= imgLength) {

			let source = "";

			if ($.inArray(index, file_type) !== -1) {
				source += '<video class="rounded-lg w-2/3 mx-auto mt-8" autoplay loop controls muted> <source src="' + dir + imgStart + '-' + index + '-' + index + '.mp4" type="video/webm">Your browser does not support the video tag.</video>';
			} else {
				source += '<img class="rounded-lg h-[60vh]  shadow-lg mx-auto" src="' + dir + imgStart + '-' + index + '.webp" alt="avatar"/>';
			}


			//active
			if (index == 0) {
				$('<div class="carousel-item active relative float-left w-full">' + source + '</div>"').appendTo(".carousel-inner");

			} else {
				$('<div class="carousel-item relative float-left w-full">' + source + '</div>"').appendTo(".carousel-inner");

			}
			index++;
			imageloop();
		}
	}
	imageloop();
});


//purpose led projects
$(document).ready(function () {
	TweenMax.set(".project-preview", {
		width: 0
	});

	var tl = new TimelineLite();

	$(document)
		.on("mouseover", ".navigation-item", function (evt) {
			tl = new TimelineLite();
			tl.to($(".project-preview"), 1, {
				width: "600px",
				ease: Expo.easeInOut
			});
		})
		.on("mouseout", ".navigation-item", function (evt) {
			tl = new TimelineLite();
			tl.to($(".project-preview"), 0.5, {
				width: 0,
				ease: Expo.easeInOut
			});
		});
});

$(".navigation-link-1").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-1.jpg)"
	});
});

$(".navigation-link-2").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-2.jpg)"
	});
});

$(".navigation-link-3").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-3.jpg)"
	});
});

$(".navigation-link-4").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-4.jpg)"
	});
});

$(".navigation-link-5").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-5.jpg)"
	});
});

$(".navigation-link-6").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-6.jpg)"
	});
});

$(".navigation-link-7").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-7.jpg)"
	});
});

$(".navigation-link-8").hover(function () {
	$(".project-preview").css({
		"background-image": "url(img-8.jpg)"
	});
});
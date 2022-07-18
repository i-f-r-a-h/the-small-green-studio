gsap.registerPlugin(ScrollTrigger);


//footer date
setInterval(() => {
	document.querySelector('.time-js').innerHTML = 'Currently ' + refreshDate(new Date());
}, 1000)


function refreshDate(footertime) {
	return footertime.toLocaleString('en-GB', {
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'Europe/London',
		hourCycle: 'h12'

	});
}




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
	$(".menu-container a").on("click", function () {
		menu_open.reverse();
	});
};


//hero
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

gsap.set('.categories__article', {
	autoAlpha: 0
})

const sections = gsap.utils.toArray(".principles__item");

let maxWidth = 0;
let maxStart;

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
		end: () => `+=${maxWidth}`,
		invalidateOnRefresh: true
	}
});
ScrollTrigger.matchMedia({
	"(min-width: 1500px)"() {
		maxStart = 3;
	},
	"(max-width: 1500px)"() {
		maxStart = 1.5;
	},
})

sections.forEach((sct, i) => {
	const smallTimeline = gsap.timeline();
	const content = document.querySelector('.categories__wrapper');
	const viewmore = sct.querySelector('span');
	const relevantContent = content.querySelector('article.categories__article-' + i);

	ScrollTrigger.create({
		trigger: sct,
		start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / maxStart) * (maxWidth / (maxWidth - window.innerWidth)),
		end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
		animation: smallTimeline,
		toggleActions: "play reverse play reverse",

	});

	smallTimeline
		//.to(elem,{ duration: 0.25, fontSize: "40px", color: "orange"}, 0)  
		.to(viewmore, {
			duration: 0.25,
			opacity: 1,
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






	sct.addEventListener("click", () => {
		$("body, #modal-content, #modal-background").toggleClass("active");
		console.log('article.categories__article-' + i);
	});


});



if ($(".principles__item").css('opacity') == 1) {
	$(".view-more").css("opacity", 1);
}
/// introduction date 
var prnDt = new Date().toLocaleDateString('en-us', {
	weekday: 'long'
});
console.log(prnDt);

document.querySelector('.intro__date-js').innerHTML = `${prnDt}`;





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
				source += '<video class="rounded-lg w-2/3 mx-auto mt-8" autoplay loop controls muted> <source src="' +
					dir + imgStart + '-' + index + '-' + index + '.mp4" type="video/webm">Your browser does not support the video tag.</video>';
			} else {
				source += '<img class="rounded-lg h-[60vh]  shadow-lg mx-auto" src="' +
					dir + imgStart + '-' + index + '.webp" alt="avatar"/>';
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

// purpose led projects
var desktop = window.matchMedia("(min-width: 700px)")
const link = document.querySelectorAll('.accordion-item');
const linkHoverReveal = document.querySelectorAll('.hover-reveal');
const linkImages = document.querySelectorAll('.hidden-img');


for (let i = 0; i < link.length; i++) {
	link[i].addEventListener('mousemove', (e) => {
		linkHoverReveal[i].style.opacity = 1;
		linkHoverReveal[i].style.transform = `translate(0%, -20% ) rotate(-10deg)`;
		linkImages[i].style.transform = 'scale(1, 1)';
		linkHoverReveal[i].style.left = e.clientX + "px";
	})

	link[i].addEventListener('mouseleave', (e) => {
		linkHoverReveal[i].style.opacity = 0;
		linkHoverReveal[i].style.transform = `translate(50%, 50%) rotate(-5deg)`;
		linkImages[i].style.transform = 'scale(0.8, 0.8)';
	})
}


//team
let team = document.querySelector(".team");
let bgreveal = document.querySelector(".bgreveal");
let teambtn = document.querySelector(".team-content");
team.onmousemove = (e) => {
	bgreveal.style.display = "block";
	bgreveal.style.top = e.clientY + "px";
	bgreveal.style.left = e.clientX + "px";
}

team.onmouseleave = (e) => {
	bgreveal.style.display = "none";
}

teambtn.addEventListener('mousemove', () => {
	bgreveal.style.display = "none";
})




//footer
function setup() {

	var clientHeight = document.getElementById('footer-js').clientHeight;
	var clientWidth = document.getElementById('footer-js').clientWidth;
	var cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent("footer-js");
	background(0);
}


function windowResized() {
	sketchWidth = document.getElementById("footer-js").offsetWidth;
	sketchHeight = document.getElementById("footer-js").offsetHeight;
	resizeCanvas(sketchWidth, sketchHeight);
	background(0);
}

function draw() {
	fill('hsla(120, 100%, 75%, 0.3)');
	noStroke();
	ellipse(mouseX, mouseY, 20);

}


function mousePressed() {
	var cnv;
	background(0);
}
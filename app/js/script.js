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
	const section_video = document.querySelectorAll(".principles__item__video");


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

});

gsap.registerPlugin(Flip);
window.addEventListener('load', () => {
	const headshots = gsap.utils.toArray('.leadershipCard'),
		expandedContainer = document.querySelector('.leadershipExpandedContainer'),
		expandedBioContainer = document.querySelector('.leadershipExpandedContainer__bio'),
		expandedImage = document.querySelector('.leadershipExpandedContainer__headshot img'),
		expandedName = document.querySelector('.leadershipExpandedContainer__bio .name'),
		expandedTitle = document.querySelector('.leadershipExpandedContainer__bio .title'),
		expandedBio = document.querySelector('.leadershipExpandedContainer__bio .bio'),
		expandedSocial = document.querySelector('.leadershipExpandedContainer__bio .social')

	let activeHeadshot;

	gsap.set(expandedBioContainer, {
		xPercent: 15,
		opacity: 0
	});

	function expandHeadshot(card) {
		//If someone clicks on element behind expanded headshot, then we should 
		//just close the currently expanded headshot
		if (activeHeadshot) {
			return closeHeadshot()
		}

		//If we're on a small screen, just return. The bios are expanded via css
		if (window.innerWidth < 800) {
			return;
		}

		//When the image in the detail DOM is loaded, we run the GSAP flip stuff.
		//Anything outside this function isn't related to FLIPing the headshot
		const onload = () => {

			//Position the expanded container on top of the headshot.
			//Make sure to use fitChild on the image so that's what looks like
			//it's growing. 
			Flip.fit(expandedContainer, card, {
				scale: true,
				fitChild: expandedImage
			})

			//Record the state that everything is in.
			const state = Flip.getState(expandedContainer);

			//Set the final state
			gsap.set(expandedContainer, {
				clearProps: true
			});
			gsap.set(expandedContainer, {
				visibility: 'visible'
			});

			Flip.from(state, {
				duration: 0.75,
				scale: true,
				ease: "power2.inOut",
				absolute: true
			}).to(expandedBioContainer, {
				xPercent: 0,
				opacity: 1
			}, .75)

			expandedImage.removeEventListener('load', onload);
			document.addEventListener('click', closeHeadshot);

		}


		//Change image and text
		const data = card.dataset;
		expandedImage.addEventListener('load', onload);
		expandedImage.src = data.headshot;
		expandedName.innerText = data.name;
		expandedTitle.innerText = data.titles;
		expandedBio.innerText = data.bio;

		//Fade out the other items
		gsap.to(headshots, {
			opacity: 0.3,
			stagger: {
				amount: 0.7,
				from: headshots.indexOf(card),
				grid: 'auto'
			}
		});
		activeHeadshot = card;

	}

	function closeHeadshot() {
		console.log('Closing headshot');
		document.removeEventListener('click', closeHeadshot);

		//Record current state
		const state = Flip.getState(expandedContainer);

		//Scale details down so that it's image fits exactly on top of the active headshot
		Flip.fit(expandedContainer, activeHeadshot, {
			scale: true,
			fitChild: expandedImage
		});

		//Put the bio container back and then fade in the other headshots
		const tl = gsap.timeline();
		tl.to(expandedBioContainer, {
				xPercent: 15,
				opacity: 0
			})
			.to(expandedContainer, {
				visibility: 'hidden'
			})
			.to(headshots, {
				opacity: 1,
				stagger: {
					amount: 0.7,
					from: headshots.indexOf(activeHeadshot),
					grid: 'auto'
				}
			});

		Flip.from(state, {
			scale: true,
			duration: 0.5,
			delay: 0.2
		})

		activeHeadshot = null;


	}

	//Add click events
	gsap.utils.toArray('.leadershipCard').forEach(item => {
		item.addEventListener('click', () => {
			expandHeadshot(item);
		});
	});

	gsap.set('.leadershipCard', {
		autoAlpha: 1
	});
	gsap.from('.leadershipCard', {
		opacity: 0,
		yPercent: 30,
		stagger: 0.14
	})
});

/// introduction date 
var prnDt = new Date().toLocaleDateString('en-us', {
	weekday: 'long'
});
console.log(prnDt);

document.querySelector('.intro__date-js').innerHTML = `${prnDt}`;
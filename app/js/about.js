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




//variables
let maincursor = $(".cursor"),
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

        TweenMax.set(maincursor, {
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

$(".team-js").on("mouseenter", function () {
    maincursor.addClass("active--cursor");
    follower.addClass("active--cursor");
    if ($(this).find(".about__info-js").is(":visible")) {
        $(".active--cursor").attr('data-before', 'close');
    } else {
        $(".active--cursor").attr('data-before', 'view');
    }
});

$(".team-js img").on("mouseleave", function () {
    maincursor.removeClass("active--cursor");
    follower.removeClass("active--cursor");
});


$(".team-js").on("click", function () {
    $(this).find(".about__info-js").slideToggle("slow", function () {
        if ($(".about__info-js").is(":visible")) {
            $(".active--cursor").attr('data-before', 'close');
        } else {
            $(".active--cursor").attr('data-before', 'view');
        }
    });
});

//gallery
// gsap.from(".reel", {
//     scrollTrigger: {
//         trigger: ".reel",
//         toggleActions: "restart pause reverse pause"
//     },
//     y: -200,
//     opacity: 0,
//     duration: 2
// })
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
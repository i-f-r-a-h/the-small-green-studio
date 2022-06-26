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

$(".team-js").on("mouseenter", function () {
    cursor.addClass("active--cursor");
    follower.addClass("active--cursor");
    if ($(this).find(".about__info-js").is(":visible")) {
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
    $(this).find(".about__info-js").slideToggle("slow", function () {
        if ($(".about__info-js").is(":visible")) {
            $(".active--cursor").attr('data-before', 'close');
        } else {
            $(".active--cursor").attr('data-before', 'view');
        }
    });
});
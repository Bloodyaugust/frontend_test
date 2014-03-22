// All globals should be declared in an obvious way
var SLIDE_INTERVAL = 5000,
    SLIDE_TRANSITION_TIME = 1500,
    SLIDE_HEIGHT = 266;

// I decided to show off some custom-bult tweening, I use this kind of thing all the time in my games
// This particular tween is popular in carousels such as this
function bounceOut (i) {
    if (i < (1 / 2.75)) {
        return 7.5625 * i * i;
    } else if (i < (2 / 2.75)) {
        return 7.5625 * (i -= (1.5 / 2.75)) * i + 0.75;
    } else if (i < (2.5 / 2.75)) {
        return 7.5625 * (i -= (2.25 / 2.75)) * i + 0.9375;
    } else {
        return 7.5625 * (i -= (2.625 / 2.75)) * i + 0.984375;
    }
}

// Showing off the OOP nature of the code
function buildCarousel () {
    var carousel = new Carousel();
}

// I prefer to write in an OOP manner when I can, it allows for easy code re-use, and is IMHO easier to manipulate and understand
function Carousel () {
    var innerCarousel = document.getElementsByClassName('carousel-inner')[0],
        carouselBlocks = document.getElementsByClassName('carousel-content'),
        numBlocks = carouselBlocks.length,
        curBlock = 1,
        endOffset = (numBlocks - 1) * SLIDE_HEIGHT,
        timeToSlide = SLIDE_INTERVAL,
        lastTime = new Date().getTime(),
        sliding = false,
        slideTime = 0;

// Here, we'll use a setInterval at 60FPS for buttery smooth transitions across all browsers, no CSS3 support needed
    setInterval(function () {
        var deltaTime = new Date - lastTime;

        if (sliding) {
            slideTime += deltaTime;
            slideTime = slideTime > SLIDE_TRANSITION_TIME ? SLIDE_TRANSITION_TIME : slideTime;

            if (curBlock === 0) {
                innerCarousel.style.marginTop = -endOffset + (bounceOut(slideTime / SLIDE_TRANSITION_TIME) * endOffset)  + 'px';
            } else {
                innerCarousel.style.marginTop = -(((curBlock - 1) * SLIDE_HEIGHT) + (bounceOut(slideTime / SLIDE_TRANSITION_TIME)) * SLIDE_HEIGHT)  + 'px';
            }

            if (slideTime === SLIDE_TRANSITION_TIME) {
                slideTime = 0;
                sliding = false;

                curBlock = curBlock === carouselBlocks.length - 1 ? 0 : curBlock + 1;
            }
        } else {
            timeToSlide -= deltaTime;

             if (timeToSlide <= 0) {
                timeToSlide = SLIDE_INTERVAL;
                sliding = true;
             }
        }

        lastTime = new Date;
    }, 1000 / 60);
}
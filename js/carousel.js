document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GENERIC CAROUSEL ENGINE
       ===================================================== */

    function createCarousel(options) {

        const {
            root,
            slides,
            dots,
            previousButton,
            nextButton,
            interval = 5500
        } = options;

        if (!root || !slides.length) {
            return;
        }

        let currentIndex = 0;
        let autoplayTimer = null;


        /* -------------------------------------------------
           SHOW SLIDE
           ------------------------------------------------- */

        function showSlide(index) {

            if (index < 0) {
                index = slides.length - 1;
            }

            if (index >= slides.length) {
                index = 0;
            }

            currentIndex = index;


            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === currentIndex
                );

                slide.setAttribute(
                    "aria-hidden",
                    i === currentIndex
                        ? "false"
                        : "true"
                );

            });


            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentIndex
                );

                dot.setAttribute(
                    "aria-selected",
                    i === currentIndex
                        ? "true"
                        : "false"
                );

            });

        }


        /* -------------------------------------------------
           NEXT
           ------------------------------------------------- */

        function nextSlide() {
            showSlide(currentIndex + 1);
        }


        /* -------------------------------------------------
           PREVIOUS
           ------------------------------------------------- */

        function previousSlide() {
            showSlide(currentIndex - 1);
        }


        /* -------------------------------------------------
           AUTOPLAY
           ------------------------------------------------- */

        function startAutoplay() {

            stopAutoplay();

            autoplayTimer =
                window.setInterval(
                    nextSlide,
                    interval
                );
        }


        function stopAutoplay() {

            if (autoplayTimer !== null) {

                window.clearInterval(
                    autoplayTimer
                );

                autoplayTimer = null;
            }
        }


        /* -------------------------------------------------
           BUTTONS
           ------------------------------------------------- */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                () => {

                    nextSlide();

                    startAutoplay();

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                () => {

                    previousSlide();

                    startAutoplay();

                }
            );

        }


        /* -------------------------------------------------
           DOTS
           ------------------------------------------------- */

        dots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                    startAutoplay();

                }
            );

        });


        /* -------------------------------------------------
           PAUSE WHEN HOVERING
           ------------------------------------------------- */

        root.addEventListener(
            "mouseenter",
            stopAutoplay
        );

        root.addEventListener(
            "mouseleave",
            startAutoplay
        );


        /* -------------------------------------------------
           TOUCH / SWIPE SUPPORT
           ------------------------------------------------- */

        let touchStartX = 0;
        let touchEndX = 0;


        root.addEventListener(
            "touchstart",
            event => {

                if (!event.touches.length) {
                    return;
                }

                touchStartX =
                    event.touches[0].clientX;

                stopAutoplay();

            },
            { passive: true }
        );


        root.addEventListener(
            "touchend",
            event => {

                if (!event.changedTouches.length) {
                    return;
                }

                touchEndX =
                    event.changedTouches[0].clientX;

                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) > 50) {

                    if (distance < 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }

                }

                startAutoplay();

            },
            { passive: true }
        );


        /* -------------------------------------------------
           KEYBOARD SUPPORT
           ------------------------------------------------- */

        root.addEventListener(
            "keydown",
            event => {

                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    nextSlide();

                    startAutoplay();

                }


                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    previousSlide();

                    startAutoplay();

                }

            }
        );


        /* -------------------------------------------------
           VISIBILITY API
           ------------------------------------------------- */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {
                    stopAutoplay();
                } else {
                    startAutoplay();
                }

            }
        );


        /* -------------------------------------------------
           INITIAL STATE
           ------------------------------------------------- */

        showSlide(0);

        startAutoplay();

    }



    /* =====================================================
       TRANSFORMATION CAROUSEL
       ===================================================== */

    const transformationCarousel =
        document.querySelector(
            '[data-carousel="transformations"]'
        );


    if (transformationCarousel) {

        const slides =
            transformationCarousel.querySelectorAll(
                ".transformation-slide"
            );

        const dots =
            transformationCarousel.querySelectorAll(
                ".carousel-dot"
            );

        const previousButton =
            transformationCarousel.querySelector(
                ".carousel-prev"
            );

        const nextButton =
            transformationCarousel.querySelector(
                ".carousel-next"
            );


        createCarousel({

            root: transformationCarousel,

            slides: Array.from(slides),

            dots: Array.from(dots),

            previousButton,

            nextButton,

            interval: 6000

        });

    }



    /* =====================================================
       SPECIALIST CAROUSEL
       ===================================================== */

    const specialistCarousel =
        document.querySelector(
            '[data-carousel="specialists"]'
        );


    if (specialistCarousel) {

        const slides =
            specialistCarousel.querySelectorAll(
                ".specialist-slide"
            );

        const dots =
            specialistCarousel.querySelectorAll(
                ".specialist-dot"
            );

        const previousButton =
            specialistCarousel.querySelector(
                ".specialist-prev"
            );

        const nextButton =
            specialistCarousel.querySelector(
                ".specialist-next"
            );


        createCarousel({

            root: specialistCarousel,

            slides: Array.from(slides),

            dots: Array.from(dots),

            previousButton,

            nextButton,

            interval: 6500

        });

    }

});

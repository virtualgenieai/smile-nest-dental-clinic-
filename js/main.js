document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileNavigation = document.querySelector(".mobile-navigation");

    if (menuButton && mobileNavigation) {

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileNavigation.classList.contains("open");

            mobileNavigation.classList.toggle(
                "open",
                !isOpen
            );

            menuButton.classList.toggle(
                "active",
                !isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                !isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );
        });


        /* Close mobile menu after clicking a link */

        const mobileLinks =
            mobileNavigation.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNavigation.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            });

        });
    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 35) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, " +
            ".reveal-left, " +
            ".reveal-right, " +
            ".reveal-scale, " +
            ".stagger"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });
    }


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       WHATSAPP
       ===================================================== */

    const whatsappNumber =
        "919496041577";


    const whatsappLinks =
        document.querySelectorAll(
            '[data-action="whatsapp"]'
        );


    whatsappLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();


            const message =
                "Hello Smile Nest Dental Clinic, I would like to book a dental appointment. Please let me know the available appointment timings.";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-load-error"
                );

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (mobileNavigation) {

                mobileNavigation.classList.remove(
                    "open"
                );

            }


            if (menuButton) {

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileNavigation ||
                !menuButton
            ) {
                return;
            }


            const clickedInsideMenu =
                mobileNavigation.contains(
                    event.target
                );

            const clickedMenuButton =
                menuButton.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedMenuButton &&
                mobileNavigation.classList.contains("open")
            ) {

                mobileNavigation.classList.remove(
                    "open"
                );

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        }
    );


    /* =====================================================
       PREVENT EMPTY WHATSAPP LINKS
       ===================================================== */

    document
        .querySelectorAll(
            '[data-action="whatsapp"]'
        )
        .forEach(link => {

            link.setAttribute(
                "href",
                "https://wa.me/919496041577"
            );

        });

});

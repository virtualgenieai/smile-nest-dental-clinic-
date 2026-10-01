document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuButton =
        document.querySelector(".mobile-menu-button") ||
        document.querySelector(".mobile-menu-toggle");

    const mobileNavigation =
        document.querySelector(".mobile-navigation") ||
        document.querySelector(".main-nav");

    if (menuButton && mobileNavigation) {

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
        });

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
            });

        });
    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
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
            ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
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
       TEAM DROPDOWN
       ===================================================== */

    const teamDropdown =
        document.querySelector(".team-dropdown");

    const teamHeader =
        document.querySelector(".team-dropdown-header");

    if (teamDropdown && teamHeader) {

        teamHeader.setAttribute(
            "aria-expanded",
            "false"
        );

        teamHeader.addEventListener("click", () => {

            const isOpen =
                teamDropdown.classList.contains("open");

            teamDropdown.classList.toggle(
                "open",
                !isOpen
            );

            teamHeader.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
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
       WHATSAPP LINKS
       ===================================================== */

    const phoneNumber =
        "919496041577";

    const whatsappLinks =
        document.querySelectorAll(
            '[data-action="whatsapp"]'
        );

    whatsappLinks.forEach(link => {

        link.addEventListener("click", () => {

            const message =
                "Hello Smile Nest Dental Clinic, I would like to book a dental appointment.";

            const whatsappURL =
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            link.href = whatsappURL;

        });

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add(
                "image-load-error"
            );

        });

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
            }

            if (teamDropdown) {

                teamDropdown.classList.remove(
                    "open"
                );
            }

            if (teamHeader) {

                teamHeader.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }
    );

});

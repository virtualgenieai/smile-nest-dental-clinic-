document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CLINIC CONTACT DETAILS
       ===================================================== */

    const clinicPhone = "9496041577";
    const whatsappNumber = "919496041577";


    /* =====================================================
       WHATSAPP APPOINTMENT BUTTONS
       ===================================================== */

    const whatsappButtons =
        document.querySelectorAll(
            '[data-appointment="whatsapp"]'
        );


    whatsappButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();


            const message =
                `Hello Smile Nest Dental Clinic,

I would like to book an appointment.

Please let me know the available appointment timings.`;


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
       CALL BUTTONS
       ===================================================== */

    const callButtons =
        document.querySelectorAll(
            '[data-appointment="call"]'
        );


    callButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href =
                `tel:${clinicPhone}`;

        });

    });


    /* =====================================================
       SERVICE / SPECIALITY ENQUIRIES
       ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );


    serviceButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();


            const service =
                button.getAttribute(
                    "data-service"
                );


            const message =
                `Hello Smile Nest Dental Clinic,

I would like to enquire about ${service} and would like to book an appointment.

Please let me know the available timings.`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });

});

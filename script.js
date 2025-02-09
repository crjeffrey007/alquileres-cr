// Galería de imágenes con Lightbox
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".gallery-container img");
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImg.src = images[currentIndex].src;
        lightbox.classList.add("show");
    }

    function closeLightbox() {
        lightbox.classList.remove("show");
    }

    function changeImage(step) {
        currentIndex += step;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        openLightbox();
    }

    function loadMoreImages() {
        document.querySelectorAll(".hidden").forEach(img => img.classList.remove("hidden"));
        document.querySelector(".load-more").style.display = "none";
    }

    // Formulario de contacto y envío de email con Brevo
    async function sendEmail(data) {
        // Obtener el título de la entrada del blog
        let postTitle = document.title || "Interesado en la Propiedad";

        await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": "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"
            },
            body: JSON.stringify({
                sender: { email: "info@alquileres-cr.com", name: "Alquileres CR" },
                to: [{ email: "crjeffrey7@gmail.com", name: "Administrador" }],
                subject: `Nuevo Interesado en ${postTitle}`,
                htmlContent: `
                  <p><strong>Nombre:</strong> ${data.name}</p>
                  <p><strong>Email:</strong> ${data.email}</p>
                  <p><strong>Teléfono:</strong> ${data.phone}</p>
                  <p><strong>Mensaje:</strong> ${data.message}</p>
                  <p><strong>Desea visita:</strong> ${data.visit}</p>
                `
            })
        });
    }

    document.getElementById("contact-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value,
            visit: document.getElementById("visit").value
        };
        await sendEmail(formData);
        alert("Tu solicitud ha sido enviada.");
    });
});

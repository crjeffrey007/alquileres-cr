// 📸 Lightbox para la galería de imágenes
document.addEventListener("DOMContentLoaded", () => {
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

  document.querySelector(".close-lightbox").addEventListener("click", closeLightbox);
  document.querySelector(".prev").addEventListener("click", () => changeImage(-1));
  document.querySelector(".next").addEventListener("click", () => changeImage(1));
  document.querySelector(".load-more").addEventListener("click", loadMoreImages);
});

// 📩 Envío de correos con Brevo
async function sendEmail(data) {
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY, // 🔒 Se obtiene desde GitHub Actions Secrets
    },
    body: JSON.stringify({
      sender: { email: "info@alquileres-cr.com", name: "Alquileres CR" },
      to: [{ email: "crjeffrey7@gmail.com", name: "Administrador" }],
      subject: `Nuevo Interesado en ${document.title}`, // 🏡 Usa el título de la entrada
      htmlContent: `
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
        <p><strong>Desea visita:</strong> ${data.visit}</p>
      `,
    }),
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

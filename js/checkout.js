// Checkout handler — Quality360
(function () {
  if (typeof window === "undefined") return;

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]')?.value || "";
      if (!email) {
        alert("Por favor ingresa tu email para continuar.");
        return;
      }

      // Aquí podrías enviar datos a tu backend o a Instagram DM
      alert(`Checkout iniciado para: ${email}`);
      window.location.href = "success.html";
    });
  });
})();
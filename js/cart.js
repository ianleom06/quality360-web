// Cart page / drawer UI — usa el carrito compartido definido en app.js
(function () {
  if (typeof window === "undefined") return;

  document.addEventListener("DOMContentLoaded", () => {
    // Render inicial si existe el contenedor (cart.html o drawer)
    if (typeof renderCart === "function") {
      try { renderCart(); } catch {}
    }

    // Botón "Vaciar carrito" (si existe)
    const clear = document.getElementById("clearCart");
    if (clear && typeof clearCart === "function") {
      clear.addEventListener("click", () => clearCart());
    }

    // Botones genéricos .addToCart (opcional)
    const buttons = document.querySelectorAll(".addToCart");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const sku = btn.dataset.sku || (window.CONFIG && CONFIG.product.sku);
        const name = btn.dataset.name || (window.CONFIG && CONFIG.product.name);
        const price = +(btn.dataset.price || (window.CONFIG && CONFIG.product.priceUSD) || 0);
        if (typeof addProduct === "function") addProduct(sku, name, price);
      });
    });
  });
})();
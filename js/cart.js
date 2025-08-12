// Simple cart store
const cart = [];
function addToCart(item) {
  cart.push(item);
  renderCart();
}
function clearCart() {
  cart.length = 0;
  renderCart();
}
function renderCart() {
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (list) list.textContent = cart.map(c => c.name).join(', ');
  if (totalEl) totalEl.textContent = '$' + cart.length * 100;
}
if (typeof window !== 'undefined') {
  window.cart = { addToCart, clearCart, items: cart };
}

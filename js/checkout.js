// Checkout handler
function submitCheckout() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;
  alert('Checkout submitted for ' + form.querySelector('input[type=email]').value);
  window.location.href = 'success.html';
}

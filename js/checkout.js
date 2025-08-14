function renderSummary(){
  const list = document.getElementById('summary-items');
  const cart = getCart();
  let subtotal = 0;
  cart.forEach(item=>{
    subtotal += item.price*item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - $${item.price*item.qty}`;
    list.appendChild(li);
  });
  document.getElementById('summary-subtotal').textContent = `$${subtotal}`;
  const envio = 0;
  document.getElementById('summary-total').textContent = `$${subtotal+envio}`;
}

function initPickup(){
  const chk = document.getElementById('pickup');
  const addressFields = $$('#shipping input[data-addr]');
  chk.addEventListener('change',()=>{
    if(chk.checked){
      addressFields.forEach(i=>{i.value='';i.disabled=true;});
      $('#pickup-info').textContent = 'Retiro en: Av. Demo 1234, Ciudad';
    } else {
      addressFields.forEach(i=>{i.disabled=false;});
      $('#pickup-info').textContent = '';
    }
  });
}

function initCheckout(){
  const form = document.getElementById('checkout-form');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    alert('Pedido recibido (demo)');
    clearCart();
    window.location.href = 'success.html';
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  renderSummary();
  initPickup();
  initCheckout();
});

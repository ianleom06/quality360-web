const CART_KEY = 'q360_cart';
const NOTE_KEY = 'q360_cart_note';

function getCart(){
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function addProduct(sku,name,price){
  const cart = getCart();
  const existing = cart.find(i=>i.sku===sku);
  if(existing){existing.qty+=1;} else {cart.push({sku,name,price,qty:1});}
  saveCart(cart);
  updateCartBadge();
  renderCart();
}
function removeItem(idx){
  const cart = getCart();
  cart.splice(idx,1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}
function updateQty(idx,delta){
  const cart = getCart();
  cart[idx].qty += delta;
  if(cart[idx].qty<=0) cart.splice(idx,1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}
function clearCart(){
  saveCart([]);
  updateCartBadge();
  renderCart();
}
function updateCartBadge(){
  const badge = document.getElementById('cart-count');
  if(!badge) return;
  const count = getCart().reduce((n,i)=>n+i.qty,0);
  badge.textContent = count;
}
function renderCart(){
  const drawer = document.getElementById('cart-drawer');
  if(!drawer) return;
  drawer.innerHTML = `
    <div class="overlay"></div>
    <div class="drawer-panel">
      <div class="drawer-header">
        <h2>Carrito</h2>
        <button class="drawer-close" aria-label="Cerrar">×</button>
      </div>
      <div class="drawer-content" id="cart-items"></div>
      <div class="drawer-footer">
        <textarea id="cart-note" placeholder="Nota de pedido">${localStorage.getItem(NOTE_KEY)||''}</textarea>
        <p>Subtotal: <span id="cart-subtotal">$0</span></p>
        <button class="btn btn--primary" id="checkout-btn">Verificar</button>
      </div>
    </div>`;
  const itemsEl = document.getElementById('cart-items');
  const cart = getCart();
  let subtotal = 0;
  cart.forEach((item,idx)=>{
    subtotal += item.price*item.qty;
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML = `<span>${item.name}</span>
    <div><button onclick="updateQty(${idx},-1)">-</button> ${item.qty} <button onclick="updateQty(${idx},1)">+</button></div>
    <span>$${item.price*item.qty}</span>
    <button onclick="removeItem(${idx})">x</button>`;
    itemsEl.appendChild(div);
  });
  $('#cart-subtotal').textContent = `$${subtotal}`;
  $('#cart-note').addEventListener('input',e=> localStorage.setItem(NOTE_KEY,e.target.value));
  $('#checkout-btn').addEventListener('click',()=>{window.location.href='checkout.html';});
}

// Helpers
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Producto
const PRODUCT = {
  sku: "KUKIRIN-G2PRO",
  nombre: "KuKirin G2 Pro",
  precioUSD: 1100,
  precioAntesUSD: 1299,
  rating: 4.9,
  reseñas: 16, // recalcula desde REVIEWS
  quick: [
    {label:"Velocidad", value:"45 km/h"},
    {label:"Autonomía", value:"55–58 km"},
    {label:"Motor", value:"600 W (brushless)"},
    {label:"Batería", value:"48 V • 15–15.6 Ah"},
    {label:"Peso", value:"25 kg"},
    {label:"Carga máx.", value:"120 kg"},
    {label:"Impermeabilidad", value:"IP54"}
  ],
  specs: [
    ["Velocidad máx.", "45 km/h"],
    ["Autonomía", "55–58 km"],
    ["Motor", "600 W (brushless)"],
    ["Batería", "48 V • 15–15.6 Ah"],
    ["Tiempo de carga", "7–8 h"],
    ["Peso", "25 kg"],
    ["Carga máxima", "120 kg / 265 lb"],
    ["Ruedas", "9\" neumáticas (vacuum)"],
    ["Frenos", "Doble disco + E-ABS"],
    ["Grado de subida", "≈19°"],
    ["Impermeabilidad", "IP54"]
  ],
  images: {
    hero: "assets/g2pro_main.jpg",
    thumbs: ["assets/g2pro_th1.jpg","assets/g2pro_th2.jpg","assets/g2pro_th3.jpg"]
  }
};

// Reseñas
const REVIEWS = [
  {name:"Ana M.", date:"2024-05-02", rating:5, text:"Llegó rapidísimo y la potencia sorprende."},
  {name:"Carlos R.", date:"2024-04-18", rating:4, text:"Buen alcance, ideal para ir al trabajo."},
  {name:"Lucía P.", date:"2024-03-29", rating:5, text:"El frenado doble da mucha seguridad."},
  {name:"Miguel S.", date:"2024-03-10", rating:5, text:"Sube cuestas sin esfuerzo."},
  {name:"Verónica L.", date:"2024-02-21", rating:4, text:"El peso es algo alto pero vale la pena."},
  {name:"Diego F.", date:"2024-02-05", rating:5, text:"Autonomía real de más de 50 km en ciudad."},
  {name:"Sofía G.", date:"2024-01-17", rating:5, text:"Se siente robusto y estable."},
  {name:"Javier T.", date:"2024-01-02", rating:4, text:"La suspensión ayuda mucho en calles rotas."},
  {name:"Patricia V.", date:"2023-12-15", rating:5, text:"Excelente atención y envío rápido."},
  {name:"Andrés C.", date:"2023-11-30", rating:5, text:"Mejoró mi movilidad diaria."},
  {name:"Isabel H.", date:"2023-11-05", rating:5, text:"La iluminación es perfecta para la noche."},
  {name:"Ricardo N.", date:"2023-10-20", rating:4, text:"Sería genial que fuera plegado más liviano."}
];

// Rating promedio
const avg = REVIEWS.reduce((a,r)=>a+r.rating,0)/REVIEWS.length;
PRODUCT.rating = Math.round(avg*10)/10;
PRODUCT.reseñas = REVIEWS.length;

// Render header & footer
function renderHeader(){
  const header = document.getElementById('site-header');
  if(!header) return;
  header.innerHTML = `
  <div class="header">
    <div class="topbar container">
      <a class="logo" href="index.html"><img src="assets/logo.png" alt="Quality360"></a>
      <nav class="nav" aria-label="Principal">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li class="has-sub"><button aria-haspopup="true" aria-expanded="false">Monopatines ▾</button>
            <div class="submenu" role="menu" hidden>
              <a href="g2-pro.html" role="menuitem">KuKirin G2 Pro</a>
            </div>
          </li>
          <li class="has-sub"><button aria-haspopup="true" aria-expanded="false">Servicio ▾</button>
            <div class="submenu" role="menu" hidden>
              <a href="service.html#ayuda" role="menuitem">Centro de ayuda</a>
              <a href="service.html#faq" role="menuitem">Preguntas frecuentes</a>
              <a href="service.html#montaje" role="menuitem">Fácil montaje</a>
              <a href="service.html#manual" role="menuitem">Manual del patinete</a>
              <a href="service.html#garantia" role="menuitem">Garantía</a>
              <a href="service.html#envios" role="menuitem">Política de envíos</a>
              <a href="service.html#reembolso" role="menuitem">Política de reembolso</a>
              <a href="service.html#seguimiento" role="menuitem">Seguimiento de pedidos</a>
              <a href="service.html#distribuidor" role="menuitem">Conviértete en distribuidor</a>
            </div>
          </li>
          <li><a href="index.html#reviews">Reseñas</a></li>
        </ul>
      </nav>
      <div class="actions">
        <button id="contact-btn" aria-controls="contactDrawer" aria-expanded="false">Contacto</button>
        <button id="cart-btn" aria-label="Carrito">🛒<span id="cart-count" class="badge">0</span></button>
      </div>
    </div>
  </div>`;
}

function renderFooter(){
  const footer = document.getElementById('site-footer');
  if(!footer) return;
  const year = new Date().getFullYear();
  footer.innerHTML = `
  <div class="footer">
    <div class="container footer-columns">
      <div>
        <h4>Contacto</h4>
        <p><a href="mailto:quality360store@gmail.com">quality360store@gmail.com</a></p>
        <p><a href="#">Instagram</a> · <a href="#">Facebook</a></p>
      </div>
      <div>
        <h4>Políticas</h4>
        <p><a href="service.html#envios">Envíos</a></p>
        <p><a href="service.html#reembolso">Reembolso</a></p>
        <p><a href="service.html#garantia">Garantía</a></p>
      </div>
      <div>
        <h4>Newsletter</h4>
        <form onsubmit="event.preventDefault();alert('Demo');">
          <input type="email" placeholder="Tu email" aria-label="Email">
          <button class="btn" type="submit">Suscribirme</button>
        </form>
      </div>
    </div>
    <p class="container" style="margin-top:1rem;">© ${year} Quality360</p>
  </div>`;
}

// Render reviews
function renderReviews(targetId, list){
  const el = document.getElementById(targetId);
  if(!el) return;
  const ul = document.createElement('ul');
  ul.className = 'reviews-list';
  list.forEach(r=>{
    const li = document.createElement('li');
    li.className = 'review';
    li.innerHTML = `<strong>${r.name}</strong> <span class="rating">${'★'.repeat(r.rating)}</span><br><small>${r.date}</small><p>${r.text}</p>`;
    ul.appendChild(li);
  });
  el.innerHTML = '';
  el.appendChild(ul);
}

// Quick specs
function renderQuickSpecs(){
  const list = $('#quick-specs');
  if(!list) return;
  PRODUCT.quick.forEach(q=>{
    const li = document.createElement('li');
    li.textContent = `${q.label}: ${q.value}`;
    list.appendChild(li);
  });
}

// Specs table
function renderSpecs(){
  const tbl = $('#specs-table tbody');
  if(!tbl) return;
  PRODUCT.specs.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<th>${r[0]}</th><td>${r[1]}</td>`;
    tbl.appendChild(tr);
  });
}

// Product gallery
function initGallery(){
  const main = $('#main-img');
  const thumbs = $('#thumbs');
  if(!main||!thumbs) return;
  main.src = PRODUCT.images.hero;
  PRODUCT.images.thumbs.forEach(src=>{
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.addEventListener('click',()=> main.src = src);
    thumbs.appendChild(img);
  });
}

// Buy box
function renderBuyBox(){
  const price = $('#price');
  const old = $('#old-price');
  const rating = $('#rating');
  if(price){price.textContent = `$${PRODUCT.precioUSD}`;}
  if(old){old.textContent = `$${PRODUCT.precioAntesUSD}`;}
  if(rating){rating.textContent = `${PRODUCT.rating} (${PRODUCT.reseñas})`;}
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  updateCartBadge();
  renderCart();
  if($('#reviews-preview')) renderReviews('reviews-preview', REVIEWS.slice(0,3));
  if($('#reviews-list')) renderReviews('reviews-list', REVIEWS);
  renderQuickSpecs();
  renderSpecs();
  initGallery();
  renderBuyBox();
});

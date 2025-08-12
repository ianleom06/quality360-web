// Quality360 shared JS — cart, PDP wiring, newsletter (original)
const CONFIG = {
  brand: "Quality360",
  email: "quality360store@gmail.com",
  instagram: "goquality360",
  facebook: "https://www.facebook.com/share/161vEEHG8r/?mibextid=wwXIfr",
  product: {
    sku: "KUKIRIN-G2PRO",
    name: "KuKirin G2 Pro",
    priceUSD: 1100,
    rating: 4.9,
    reviewsCount: 16,
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
    whatsInBox: [
      "Patinete KuKirin G2 Pro",
      "Cargador 48V",
      "Herramientas básicas",
      "Manual de usuario"
    ]
  }
};

// Helpers
const $ = (s, c=document)=>c.querySelector(s);
const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));
const fmtUSD = (n)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);

// Header + footer
function setupHeader(){
  const mail = $("#mailto");
  if(mail) mail.href = `mailto:${CONFIG.email}?subject=Consulta%20${encodeURIComponent(CONFIG.product.name)}`;
  const year = $("#year"); if(year) year.textContent = new Date().getFullYear();
}

// Cart
const CART_KEY="q360_cart";
const getCart=()=>{ try{return JSON.parse(localStorage.getItem(CART_KEY)||"[]");}catch{return[];} };
const setCart=(x)=>{ localStorage.setItem(CART_KEY, JSON.stringify(x)); updateCartBadge(); };
const addProduct=(sku,name,price)=>{ const c=getCart(); const i=c.findIndex(x=>x.sku===sku); if(i>-1) c[i].qty++; else c.push({sku,name,price,qty:1}); setCart(c); openCart(); };
const clearCart=()=>{ setCart([]); renderCart(); };
const total=c=>c.reduce((s,i)=>s+i.price*i.qty,0);
function updateCartBadge(){ const b=$("#cartCount"); if(!b) return; b.textContent = getCart().reduce((n,i)=>n+i.qty,0); }

function renderCart(){
  const items=getCart(); const body=$("#cartItems"); if(!body) return;
  body.innerHTML="";
  if(!items.length){ body.innerHTML='<p style="color:#6b7280">Tu carrito está vacío.</p>'; }
  else items.forEach((i,idx)=>{
    const row=document.createElement("div");
    row.style="display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #e5eaf0;border-radius:10px;padding:10px;";
    row.innerHTML=`<div><strong>${i.name}</strong><div style="color:#6b7280">${fmtUSD(i.price)}</div></div>
    <div style="display:flex;gap:6px;align-items:center">
      <button class="btn btn--ghost btnQty" data-idx="${idx}">−</button>
      <span>${i.qty}</span>
      <button class="btn btn--ghost btnQty" data-idx="${idx}">+</button>
    </div>`;
    body.appendChild(row);
  });
  const ttl=$("#cartTotal"); if(ttl) ttl.textContent = fmtUSD(total(items));
}
function openCart(){ const d=$("#cartDrawer"); if(!d) return; d.classList.add("open"); d.setAttribute("aria-hidden","false"); renderCart(); }
function closeCart(){ const d=$("#cartDrawer"); if(!d) return; d.classList.remove("open"); d.setAttribute("aria-hidden","true"); }

function cartBindings(){
  const cartBtn=$("#cartBtn"); if(cartBtn) cartBtn.addEventListener("click", openCart);
  const close=$("#closeCart"); if(close) close.addEventListener("click", closeCart);
  const back=$("#cartBackdrop"); if(back) back.addEventListener("click", closeCart);
  const clear=$("#clearCart"); if(clear) clear.addEventListener("click", ()=>clearCart());
  document.body.addEventListener("click",(e)=>{
    if(e.target.classList.contains("btnQty")){
      const idx=+e.target.dataset.idx; const plus=e.target.textContent.trim()==="+"; const c=getCart();
      if(plus) c[idx].qty++; else c[idx].qty=Math.max(0,c[idx].qty-1);
      if(c[idx].qty===0) c.splice(idx,1);
      setCart(c); renderCart();
    }
  });
  updateCartBadge();
}

// Reviews DEMO (marcadas)
const DEMO_REVIEWS=[
  {name:"Andrés", rating:5, text:"Me encantó, muy buena fuerza y la batería rinde lo prometido. (Demo)", date:"2025-08-09"},
  {name:"Lucía", rating:5, text:"Estable y cómodo, frenos responden perfecto. (Demo)", date:"2025-08-05"},
  {name:"Marco", rating:4, text:"Buen torque en pendientes, ligera vibración en adoquín. (Demo)", date:"2025-08-01"},
  {name:"Sofía", rating:5, text:"Lo uso a diario (15 km), cero dramas. (Demo)", date:"2025-07-28"},
  {name:"Juan", rating:5, text:"Calidad/precio 🔝. (Demo)", date:"2025-07-20"},
  {name:"Paula", rating:5, text:"Iluminación potente y panel claro. (Demo)", date:"2025-07-11"},
  {name:"Diego", rating:5, text:"Frenos muy sólidos, llegó rápido. (Demo)", date:"2025-07-03"},
  {name:"Nico", rating:4, text:"Montaje simple, buena autonomía. (Demo)", date:"2025-06-30"}
];

function renderReviews(list){
  const wrap=$("#reviewsList"); const empty=$("#noReviews");
  if(!wrap) return;
  wrap.innerHTML="";
  if(!list.length){ if(empty) empty.style.display="block"; return; }
  if(empty) empty.style.display="none";
  list.forEach(r=>{
    const div=document.createElement("div"); div.className="review";
    div.innerHTML=`<div><strong>${r.name}</strong> · ${"★".repeat(r.rating)} <small>${r.date}</small></div><p>${r.text}</p>`;
    wrap.appendChild(div);
  });
  const count=$("#ratingCount"); if(count) count.textContent = `(${list.length} reseñas demo)`;
}

// PDP wiring
function setupPDP(){
  if(!$("#pdp")) return;
  const price=$("#priceCurrent"); if(price) price.textContent = fmtUSD(CONFIG.product.priceUSD);
  const stickyPrice=$("#stickyPrice"); if(stickyPrice) stickyPrice.textContent = fmtUSD(CONFIG.product.priceUSD);
  const rTxt=$("#ratingText"); if(rTxt) rTxt.textContent = `${CONFIG.product.rating} ★ · ${CONFIG.product.reviewsCount} reseñas`;

  // thumbs → main
  $$(".gallery__thumbs img").forEach(img=>{
    img.addEventListener("click", ()=>{ $("#mainImg").src = img.dataset.src; });
  });

  // quick specs
  const quick=$("#quickSpecs");
  if(quick){
    CONFIG.product.quick.forEach(q=>{
      const li=document.createElement("li");
      li.className="high__item";
      li.innerHTML=`<strong>${q.value}</strong><small>${q.label}</small>`;
      quick.appendChild(li);
    });
  }

  // spec table
  const specTable=$("#specTable");
  if(specTable){
    specTable.innerHTML="<thead><tr><th>Parámetro</th><th>Valor</th></tr></thead>";
    const tb=document.createElement("tbody");
    CONFIG.product.specs.forEach(([k,v])=>{
      const tr=document.createElement("tr"); tr.innerHTML=`<td>${k}</td><td>${v}</td>`;
      tb.appendChild(tr);
    });
    specTable.appendChild(tb);
  }

  // accordion
  setupAccordion();

  // cart add
  const SKU=CONFIG.product.sku, Name=CONFIG.product.name, Price=CONFIG.product.priceUSD;
  const add1=$("#addToCart"); if(add1) add1.addEventListener("click", ()=>addProduct(SKU,Name,Price));
  const add2=$("#stickyAdd"); if(add2) add2.addEventListener("click", ()=>addProduct(SKU,Name,Price));

  // sticky on scroll
  document.addEventListener("scroll", ()=>{
    const y=window.scrollY||0; const st=$("#sticky"); if(!st) return;
    st.style.display = y>400 ? "flex" : "none";
  });

  // demo reviews
  renderReviews(DEMO_REVIEWS);
}

// Reviews page wiring
function setupReviewsPage(){
  if(location.pathname.endsWith("reviews.html")) renderReviews(DEMO_REVIEWS);
}

// Accordion generic
function setupAccordion(){
  $$(".accordion__button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const panel = btn.nextElementSibling;
      const open = panel.style.display==="block";
      panel.style.display = open ? "none" : "block";
      btn.lastElementChild.textContent = open ? "＋" : "−";
    });
  });
}

// Newsletter
function setupNewsletter(){
  const form=$("#nlForm"); if(!form) return;
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=$("#nlEmail").value.trim();
    if(email){ alert("Gracias, te avisaremos por email."); $("#nlEmail").value=""; }
  });
}

// Global init
setupHeader();
cartBindings();
setupPDP();
setupReviewsPage();
setupNewsletter();

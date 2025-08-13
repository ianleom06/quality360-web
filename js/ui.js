// Toggle submenus
function initNav(){
  $$('.nav .has-sub > button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const li = btn.parentElement;
      li.classList.toggle('open');
    });
  });
}

// Cart drawer
function initDrawer(){
  const btn = document.getElementById('cart-btn');
  const drawer = document.getElementById('cart-drawer');
  if(!btn || !drawer) return;
  btn.addEventListener('click',()=> drawer.classList.add('open'));
  drawer.addEventListener('click',e=>{
    if(e.target.classList.contains('drawer-close')||e.target===drawer) drawer.classList.remove('open');
  });
}

// Accordion
function initAccordion(){
  $$('.accordion-button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item = btn.parentElement;
      item.classList.toggle('open');
    });
  });
}

// Sticky buy bar
function initStickyBar(){
  const bar = document.getElementById('buy-bar');
  if(!bar) return;
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400){bar.classList.add('show');}else{bar.classList.remove('show');}
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  initNav();
  initDrawer();
  initAccordion();
  initStickyBar();
});

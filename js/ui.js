let closeNavMenus = () => {};

function initNav(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  const buttons = $$('.has-sub > button', nav);
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function hide(menu){
    menu.classList.remove('open');
    menu.addEventListener('transitionend', ()=>{menu.hidden = true;}, {once:true});
  }
  function closeAll(){
    buttons.forEach(btn => {
      const submenu = btn.nextElementSibling;
      if(!submenu.hidden){
        btn.setAttribute('aria-expanded','false');
        hide(submenu);
      }
    });
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  closeNavMenus = closeAll;

  buttons.forEach(btn => {
    const submenu = btn.nextElementSibling;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isDesktop = window.matchMedia('(min-width:768px)').matches;
      if(btn.getAttribute('aria-expanded') === 'true'){
        closeAll();
      }else{
        closeAll();
        submenu.hidden = false;
        requestAnimationFrame(()=> submenu.classList.add('open'));
        btn.setAttribute('aria-expanded','true');
        if(!isDesktop){
          overlay.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      }
    });
    btn.parentElement.addEventListener('mouseenter', () => {
      if(window.matchMedia('(min-width:768px)').matches){
        if(btn.getAttribute('aria-expanded') !== 'true'){
          closeAll();
          submenu.hidden = false;
          requestAnimationFrame(()=> submenu.classList.add('open'));
          btn.setAttribute('aria-expanded','true');
        }
      }
    });
  });

  nav.addEventListener('mouseleave', () => {
    if(window.matchMedia('(min-width:768px)').matches) closeAll();
  });

  overlay.addEventListener('click', closeAll);
  document.addEventListener('click', e => {
    if(!nav.contains(e.target)) closeAll();
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeAll(); });
  window.addEventListener('scroll', closeAll);
  $$('.nav a').forEach(a => a.addEventListener('click', closeAll));
}

function initCartDrawer(){
  const btn = document.getElementById('cart-btn');
  const drawer = document.getElementById('cart-drawer');
  if(!btn || !drawer) return;
  btn.addEventListener('click', () => {
    closeNavMenus();
    drawer.classList.add('open');
  });
  drawer.addEventListener('click', e => {
    if(e.target.classList.contains('drawer-close') || e.target === drawer) drawer.classList.remove('open');
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') drawer.classList.remove('open'); });
}

function initContactDrawer(){
  const btn = document.getElementById('contact-btn');
  const drawer = document.getElementById('contactDrawer');
  if(!btn || !drawer) return;
  const overlay = drawer.querySelector('.overlay');
  const closeBtn = drawer.querySelector('.drawer-close');
  const form = drawer.querySelector('form');

  function open(){
    closeNavMenus();
    btn.setAttribute('aria-expanded','true');
    drawer.hidden = false;
    requestAnimationFrame(()=> drawer.classList.add('open'));
  }
  function close(){
    btn.setAttribute('aria-expanded','false');
    drawer.classList.remove('open');
    drawer.addEventListener('transitionend', ()=>{drawer.hidden = true;}, {once:true});
  }

  btn.addEventListener('click', e => { e.preventDefault(); open(); });
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  window.addEventListener('scroll', close);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = encodeURIComponent($('#contactName').value);
    const email = encodeURIComponent($('#contactEmail').value);
    const msg = encodeURIComponent($('#contactMessage').value);
    const body = `Nombre: ${name}%0AEmail: ${email}%0AMensaje: ${msg}`;
    window.location.href = `mailto:quality360store@gmail.com?subject=Consulta%20Quality360&body=${body}`;
    close();
  });
}

function initAccordion(){
  $$('.accordion-button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item = btn.parentElement;
      item.classList.toggle('open');
    });
  });
}

function initStickyBar(){
  const bar = document.getElementById('buy-bar');
  if(!bar) return;
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400){bar.classList.add('show');}else{bar.classList.remove('show');}
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  initNav();
  initCartDrawer();
  initContactDrawer();
  initAccordion();
  initStickyBar();
});


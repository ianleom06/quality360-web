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
  const count = document.getElementById('cart-count');
  if(count) count.remove();
  const overlay = drawer.querySelector('.overlay');
  const closeBtn = drawer.querySelector('.drawer-close');

  function open(){
    closeNavMenus();
    drawer.hidden = false;
    requestAnimationFrame(()=> drawer.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }
  function close(){
    drawer.classList.remove('open');
    drawer.addEventListener('transitionend',()=>{drawer.hidden=true;},{once:true});
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', open);
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
}

function initMenuDrawer(){
  const btn = document.getElementById('menu-btn');
  const drawer = document.getElementById('navDrawer');
  if(!btn || !drawer) return;
  const overlay = drawer.querySelector('.overlay');
  const closeBtn = drawer.querySelector('.drawer-close');

  function open(){
    closeNavMenus();
    btn.setAttribute('aria-expanded','true');
    drawer.hidden = false;
    requestAnimationFrame(()=> drawer.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }
  function close(){
    btn.setAttribute('aria-expanded','false');
    drawer.classList.remove('open');
    drawer.addEventListener('transitionend',()=>{drawer.hidden=true;}, {once:true});
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', open);
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e=>{if(e.key==='Escape') close();});
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

function initFadeUp(){
  const els = document.querySelectorAll('.fade-up');
  if(!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  });
  els.forEach(el=>io.observe(el));
}

function initHeroCarousel(){
  const hero = document.querySelector('.hero');
  if(!hero) return;
  const slides = Array.from(hero.querySelectorAll('.hero__slide'));
  // remove slides with missing images
  slides.forEach(slide=>{
    const src = slide.dataset.bg;
    const img = new Image();
    img.src = src;
    img.onload = () => slide.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,.35), rgba(0,0,0,.10)), url('${src}')`;
    img.onerror = () => slide.remove();
  });
  let current = 0;
  const dots = document.createElement('div');
  dots.className = 'hero__dots';
  hero.appendChild(dots);

  function go(i){
    const slidesArr = hero.querySelectorAll('.hero__slide');
    if(!slidesArr.length) return;
    slidesArr[current].classList.remove('is-active');
    slidesArr[current].classList.add('is-leaving');
    setTimeout(()=>slidesArr[current].classList.remove('is-leaving'),600);
    current = i;
    slidesArr[current].classList.add('is-active');
    dots.querySelectorAll('button').forEach((b,idx)=>b.setAttribute('aria-current', idx===current));
  }

  function next(){
    const slidesArr = hero.querySelectorAll('.hero__slide');
    go((current+1)%slidesArr.length);
  }

  function start(){
    timer = setInterval(next,2000);
  }
  function stop(){clearInterval(timer);}

  let timer;

  function initDots(){
    const slidesArr = hero.querySelectorAll('.hero__slide');
    dots.innerHTML = '';
    slidesArr.forEach((_,i)=>{
      const b = document.createElement('button');
      b.type='button';
      b.setAttribute('aria-controls', `hero-slide-${i}`);
      if(i===0) b.setAttribute('aria-current','true');
      b.addEventListener('click', ()=>{stop(); go(i); start();});
      dots.appendChild(b);
    });
    if(slidesArr.length<=1) dots.style.display='none';
  }

  initDots();
  hero.querySelectorAll('.hero__slide').forEach((s,i)=>{s.id=`hero-slide-${i}`;});
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', ()=>{document.hidden?stop():start();});
  let startX;
  hero.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;});
  hero.addEventListener('touchend',e=>{if(startX==null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>40){dx>0?go((current-1+hero.querySelectorAll('.hero__slide').length)%hero.querySelectorAll('.hero__slide').length):next();}startX=null;});

  hero.querySelectorAll('.hero__slide')[0]?.classList.add('is-active');
  start();
}

window.addEventListener('DOMContentLoaded',()=>{
  initNav();
  initCartDrawer();
  initMenuDrawer();
  initContactDrawer();
  initAccordion();
  initStickyBar();
  initFadeUp();
  initHeroCarousel();
});


const loader=document.querySelector('.page-loader');
if(loader){
  const hideLoader=()=>loader.classList.add('loaded');
  window.addEventListener('load',()=>setTimeout(hideLoader,350));
  setTimeout(hideLoader,4000);
}

const header=document.querySelector('.site-header');
const progress=document.querySelector('.scroll-progress');
if(header && progress){window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>30);const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${Math.max(0,scrollY/h*100)}%`})}

const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const toggle=document.querySelector('.menu-toggle'), menu=document.querySelector('.mobile-menu');
if(toggle && menu){
  toggle.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open);
  });
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

// Accordion - Who We Help
const accordionItems=document.querySelectorAll('[data-accordion-item]');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getContentHeight(content){
  const inner=content.querySelector('.accordion-inner');
  return inner ? inner.offsetHeight : 0;
}

function openAccordion(item){
  const trigger=item.querySelector('.accordion-trigger');
  const content=item.querySelector('.accordion-content');
  if(!trigger || !content) return;

  // Close other items
  accordionItems.forEach(other=>{
    if(other !== item && other.classList.contains('open')){
      closeAccordion(other);
    }
  });

  item.classList.add('open');
  trigger.setAttribute('aria-expanded','true');
  content.setAttribute('aria-hidden','false');

  if(!reducedMotion){
    content.style.height=getContentHeight(content)+'px';
  }else{
    content.style.height='auto';
  }
}

function closeAccordion(item){
  const trigger=item.querySelector('.accordion-trigger');
  const content=item.querySelector('.accordion-content');
  if(!trigger || !content) return;

  item.classList.remove('open');
  trigger.setAttribute('aria-expanded','false');
  content.setAttribute('aria-hidden','true');

  if(!reducedMotion){
    content.style.height='0';
  }else{
    content.style.height='auto';
  }
}

accordionItems.forEach(item=>{
  const trigger=item.querySelector('.accordion-trigger');
  if(!trigger) return;

  trigger.addEventListener('click',()=>{
    const isOpen=item.classList.contains('open');
    if(isOpen){
      closeAccordion(item);
    }else{
      openAccordion(item);
    }
  });

  // Keyboard support
  trigger.addEventListener('keydown',(e)=>{
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      const isOpen=item.classList.contains('open');
      if(isOpen){
        closeAccordion(item);
      }else{
        openAccordion(item);
      }
    }
  });
});

// Handle window resize to update open accordion height
let resizeTimer;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{
    document.querySelectorAll('.accordion-item.open .accordion-content').forEach(content=>{
      if(!reducedMotion){
        content.style.height=getContentHeight(content)+'px';
      }
    });
  },150);
});

if(!reducedMotion){document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.10}px,${y*.10}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}

const yearEl=document.getElementById('year');
if(yearEl){yearEl.textContent=new Date().getFullYear();}

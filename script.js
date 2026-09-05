const loader=document.querySelector('.page-loader');
if(loader){window.addEventListener('load',()=>{setTimeout(()=>loader.classList.add('loaded'),350)})}

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

const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.10}px,${y*.10}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}

document.getElementById('year')?.textContent=new Date().getFullYear();

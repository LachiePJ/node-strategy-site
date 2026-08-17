document.documentElement.classList.add('js');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=[...document.querySelectorAll('.reveal')];
if(reduce||!('IntersectionObserver' in window)){
  reveals.forEach(el=>el.classList.add('in'));
}else{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.08,rootMargin:'0px 0px -4%'});
  reveals.forEach(el=>io.observe(el));
}
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.mobile-nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
}
if(!reduce&&window.innerWidth>720){
  const silos=document.querySelector('.silos');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{if(silos)silos.style.backgroundPosition=`center ${50+(window.scrollY*.006)}%`;ticking=false;});
  },{passive:true});
}
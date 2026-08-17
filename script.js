const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=[...document.querySelectorAll('.reveal')];
if(reduce){reveals.forEach(el=>el.classList.add('in'));}else{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -5%'});
  reveals.forEach(el=>io.observe(el));
}
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.mobile-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
if(!reduce&&window.innerWidth>720){const silos=document.querySelector('.silos');const cards=document.querySelector('.advisory-cards');let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=window.scrollY;if(silos)silos.style.backgroundPosition=`center ${50+(y*.012)}%`;if(cards)cards.style.backgroundPosition=`center ${80-(y*.006)}%`;ticking=false;});},{passive:true});}
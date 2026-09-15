const assetStyles=document.createElement('link');
assetStyles.rel='stylesheet';
assetStyles.href='asset-overrides.css';
document.head.appendChild(assetStyles);

const typographyStyles=document.createElement('link');
typographyStyles.rel='stylesheet';
typographyStyles.href='typography.css';
document.head.appendChild(typographyStyles);

const fidelityStyles=document.createElement('link');
fidelityStyles.rel='stylesheet';
fidelityStyles.href='fidelity.css';
document.head.appendChild(fidelityStyles);

// Replace placeholder advisory glyphs with clean vector icons.
const iconMarkup=[
`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M24 5v7M24 36v7M5 24h7M36 24h7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l15 9v20l-15 9-15-9V14z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M9 14l15 10 15-10M24 24v19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l15 19-15 19L9 24z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15 24h18M24 12v24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`
];
document.querySelectorAll('.cap-icon').forEach((el,i)=>{el.innerHTML=iconMarkup[i]||'';});

document.documentElement.classList.add('js');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=[...document.querySelectorAll('.reveal')];
if(reduce||!('IntersectionObserver' in window)){
  reveals.forEach(el=>el.classList.add('in'));
}else{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.06,rootMargin:'0px 0px -6%'});
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
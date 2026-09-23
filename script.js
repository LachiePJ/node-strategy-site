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

const layoutStyles=document.createElement('link');
layoutStyles.rel='stylesheet';
layoutStyles.href='layout-pass.css';
document.head.appendChild(layoutStyles);

const sourceStyles=document.createElement('link');
sourceStyles.rel='stylesheet';
sourceStyles.href='source-fidelity.css';
document.head.appendChild(sourceStyles);

const motionStyles=document.createElement('link');
motionStyles.rel='stylesheet';
motionStyles.href='motion-fidelity.css';
document.head.appendChild(motionStyles);

document.documentElement.classList.add('js');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Map the staging DOM onto the component-specific Wix motion system. */
const motionMap=[
  ['.hero-content','motion-fade'],
  ['.silos-grid','motion-fade'],
  ['.overview-block','motion-grow'],
  ['.benchmark-module','motion-fade'],
  ['.pulse-product .report-img','motion-float'],
  ['.pulse-product .product-copy','motion-fade'],
  ['.system-product .system-add','motion-fade'],
  ['.system-product .system-img','motion-float'],
  ['.advisory-wrap>h2,.advisory-wrap>h4,.advisory-wrap>p,.cap-title,.advisory-close','motion-fade'],
  ['.cap-card','motion-float'],
  ['.cap-card .cap-icon,.cap-card h3,.cap-card h5,.cap-card p','motion-slide-left'],
  ['.client-wrap','motion-fade'],
  ['.team-title','motion-fade'],
  ['.person','motion-float'],
  ['.footer-left,.contact-form','motion-fade']
];

const motionEls=[];
motionMap.forEach(([selector,type])=>{
  document.querySelectorAll(selector).forEach(el=>{
    el.classList.add('node-motion',type);
    motionEls.push(el);
  });
});

if(reduce||!('IntersectionObserver' in window)){
  motionEls.forEach(el=>el.classList.add('motion-in'));
}else{
  const motionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('motion-in');
        motionObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -8%'});
  motionEls.forEach(el=>motionObserver.observe(el));
}

/* Premium anchor scroll: prevent the native hash snap and use a distance-aware eased glide. */
function easeInOutQuart(t){
  return t<.5 ? 8*t*t*t*t : 1-Math.pow(-2*t+2,4)/2;
}
function smoothScrollTo(target){
  if(!target)return;
  const start=window.scrollY;
  const targetY=target.getBoundingClientRect().top+window.scrollY;
  const distance=targetY-start;
  if(reduce||Math.abs(distance)<2){
    window.scrollTo(0,targetY);
    return;
  }
  const duration=Math.min(1100,Math.max(650,Math.abs(distance)*0.42));
  const startTime=performance.now();
  function frame(now){
    const elapsed=now-startTime;
    const progress=Math.min(1,elapsed/duration);
    window.scrollTo(0,start+distance*easeInOutQuart(progress));
    if(progress<1)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.addEventListener('click',e=>{
  const link=e.target.closest('a[href^="#"]');
  if(!link)return;
  const href=link.getAttribute('href');
  if(!href||href==='#')return;
  const target=document.querySelector(href);
  if(!target)return;
  e.preventDefault();
  smoothScrollTo(target);
  history.replaceState(null,'',href);
});

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.mobile-nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
}

/* Keep the subtle silos background movement, but make it frame-synced and low amplitude. */
if(!reduce&&window.innerWidth>720){
  const silos=document.querySelector('.silos');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      if(silos){
        const rect=silos.getBoundingClientRect();
        const viewport=window.innerHeight;
        if(rect.bottom>0&&rect.top<viewport){
          const progress=(viewport-rect.top)/(viewport+rect.height);
          silos.style.backgroundPosition='center '+(48+progress*4)+'%';
        }
      }
      ticking=false;
    });
  },{passive:true});
}

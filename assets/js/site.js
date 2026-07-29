const SITE={
  email:"",
  github:"",
  linkedin:"",
  scholar:"",};

document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-btn');
  const links=document.querySelector('.nav-links');
  if(menu&&links)menu.addEventListener('click',()=>links.classList.toggle('open'));
  document.querySelectorAll('[data-site]').forEach(el=>{
    const key=el.dataset.site;
    const value=SITE[key];
    if(!value){el.style.display='none';return;}
    el.href=key==='email'?`mailto:${value}`:value;
    if(el.dataset.text==='true')el.textContent=value;
  });
  const year=document.querySelector('[data-year]');
  if(year)year.textContent=new Date().getFullYear();
  const status=document.querySelector('[data-degree-status]');
  if(status){
    const d=new Date();
    status.textContent=d>=new Date('2026-09-01')?'M.S. Student':'Incoming M.S. Student';
  }

  const visual=document.querySelector('[data-interactive-visual]');
  if(visual){
    const cursorDot=visual.querySelector('.visual-cursor-dot');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const updateVisual=(event)=>{
      const rect=visual.getBoundingClientRect();
      const x=event.clientX-rect.left;
      const y=event.clientY-rect.top;
      const nx=(x/rect.width-.5);
      const ny=(y/rect.height-.5);
      if(!reduced){
        const px=nx*15, py=ny*15;
        const set=(name,value)=>visual.style.setProperty(name,`${value.toFixed(2)}px`);
        set('--p1x',px); set('--p1y',py);
        set('--p2x',px*-.65); set('--p2y',py*-.65);
        set('--p3x',px*.38); set('--p3y',py*.38);
        set('--grid-x',px*-.22); set('--grid-y',py*-.22);
        set('--n1x',px*-.55); set('--n1y',py*-.55);
        set('--n2x',px*.75); set('--n2y',py*.75);
        set('--n3x',px*-.3); set('--n3y',py*.3);
      }
      if(cursorDot){
        cursorDot.style.left=`${x}px`;
        cursorDot.style.top=`${y}px`;
      }
    };
    visual.addEventListener('pointerenter',event=>{
      visual.classList.add('is-active');
      updateVisual(event);
    });
    visual.addEventListener('pointermove',updateVisual);
    visual.addEventListener('pointerleave',()=>{
      visual.classList.remove('is-active','is-pressing');
      ['--p1x','--p1y','--p2x','--p2y','--p3x','--p3y','--grid-x','--grid-y','--n1x','--n1y','--n2x','--n2y','--n3x','--n3y'].forEach(name=>visual.style.setProperty(name,'0px'));
    });
    visual.addEventListener('pointerdown',()=>visual.classList.add('is-pressing'));
    visual.addEventListener('pointerup',event=>{
      visual.classList.remove('is-pressing');
      const rect=visual.getBoundingClientRect();
      const ripple=document.createElement('span');
      ripple.className='visual-ripple';
      ripple.style.left=`${event.clientX-rect.left}px`;
      ripple.style.top=`${event.clientY-rect.top}px`;
      visual.appendChild(ripple);
      ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
    });
  }

});

/* ============================================================
   Portfolio Universe — engine
   ============================================================ */
(function(){
'use strict';
const $  = (s,r)=> (r||document).querySelector(s);
const $$ = (s,r)=> Array.from((r||document).querySelectorAll(s));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------- LOADER */
const LOAD_MSGS = ['Loading Projects...','Loading AI Models...','Loading Memories...','Loading Creativity...'];
function runLoader(){
  const btn=$('#enterBtn');
  const cinematicTime = reduced ? 1200 : 24000;
  setTimeout(()=>$('#loader').classList.add('cinematic-ready'), cinematicTime * .72);
  btn.addEventListener('click',()=>{
    $('#loader').classList.add('gone');
    document.body.classList.remove('locked');
    $('#map').classList.add('show');
    $('#brand').classList.add('show');
    setTimeout(()=>$('#loader').remove(),1000);
  });
}

/* loader background starfield */
function loaderStars(){
  const c=$('#loadCanvas'); if(!c) return; const x=c.getContext('2d');
  let st=[],w,h;
  const init=()=>{w=c.width=innerWidth;h=c.height=innerHeight;st=[];
    for(let i=0;i<220;i++)st.push({x:Math.random()*w,y:Math.random()*h,z:Math.random()*w});};
  const draw=()=>{
    x.fillStyle='#03030a';x.fillRect(0,0,w,h);
    for(const s of st){
      s.z-=2.4; if(s.z<=0){s.z=w;s.x=Math.random()*w;s.y=Math.random()*h;}
      const k=128/s.z, px=(s.x-w/2)*k+w/2, py=(s.y-h/2)*k+h/2, r=Math.max(.2,(1-s.z/w)*1.8);
      x.beginPath();x.arc(px,py,r,0,6.283);
      x.fillStyle='rgba(185,166,255,'+(1-s.z/w)*.85+')';x.fill();
    }
    if($('#loadCanvas')) requestAnimationFrame(draw);
  };
  init();draw();addEventListener('resize',init);
}

/* ---------------------------------------------------------- THREE.JS UNIVERSE */
function universe(){
  if(typeof THREE==='undefined' || reduced) return;
  const canvas=$('#universe');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  const scene=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,2200);
  cam.position.set(0,0,120);

  // starfield
  const starGeo=new THREE.BufferGeometry();
  const N=3200, pos=new Float32Array(N*3), col=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const r=260+Math.random()*760, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
    pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.sin(ph)*Math.sin(th); pos[i*3+2]=r*Math.cos(ph);
    const t=Math.random();
    col[i*3]=.62+t*.38; col[i*3+1]=.62+t*.3; col[i*3+2]=1;
  }
  starGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  starGeo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({size:1.7,vertexColors:true,transparent:true,opacity:.85,sizeAttenuation:true}));
  scene.add(stars);

  // accretion disk texture
  function diskTex(){
    const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');
    const grd=g.createRadialGradient(256,256,60,256,256,256);
    grd.addColorStop(0,'rgba(0,0,0,0)');
    grd.addColorStop(.34,'rgba(139,92,255,.95)');
    grd.addColorStop(.56,'rgba(0,229,207,.75)');
    grd.addColorStop(.8,'rgba(61,123,255,.28)');
    grd.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=grd;g.fillRect(0,0,512,512);
    return new THREE.CanvasTexture(c);
  }
  const hole=new THREE.Group();
  const core=new THREE.Mesh(new THREE.SphereGeometry(11,48,48),new THREE.MeshBasicMaterial({color:0x000000}));
  hole.add(core);
  const halo=new THREE.Mesh(new THREE.RingGeometry(11.5,13.2,96),new THREE.MeshBasicMaterial({color:0xb9a6ff,side:THREE.DoubleSide,transparent:true,opacity:.75}));
  hole.add(halo);
  const disk=new THREE.Mesh(new THREE.RingGeometry(13,42,128),new THREE.MeshBasicMaterial({map:diskTex(),side:THREE.DoubleSide,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));
  disk.rotation.x=-Math.PI/2.42; hole.add(disk);
  const disk2=disk.clone(); disk2.scale.setScalar(1.4); disk2.material=disk.material.clone(); disk2.material.opacity=.32; hole.add(disk2);
  hole.position.set(28,6,-40); hole.rotation.z=.32;
  scene.add(hole);

  // planets
  const planets=[];
  const P=[[0x8b5cff,5.2,-70,-24,-60],[0x00e5cf,3.4,74,32,-120],[0x3d7bff,4.1,-96,42,-190],[0xffc453,2.6,96,-34,-90]];
  P.forEach(([c,r,x,y,z])=>{
    const m=new THREE.Mesh(new THREE.SphereGeometry(r,32,32),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55}));
    m.position.set(x,y,z);
    const g=new THREE.Mesh(new THREE.SphereGeometry(r*1.7,24,24),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.09}));
    m.add(g); scene.add(m); planets.push({m,base:y,sp:.3+Math.random()*.5,ph:Math.random()*6});
  });

  let mx=0,my=0,tx=0,ty=0,scrollY=0;
  addEventListener('mousemove',e=>{tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5);});
  addEventListener('scroll',()=>{scrollY=window.scrollY;},{passive:true});
  addEventListener('resize',()=>{
    cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);
  });

  let t=0;
  (function loop(){
    requestAnimationFrame(loop);
    t+=.006;
    mx+=(tx-mx)*.045; my+=(ty-my)*.045;
    stars.rotation.y+=.00035; stars.rotation.x+=.00012;
    disk.rotation.z+=.0032; disk2.rotation.z-=.0021; halo.rotation.z+=.001;
    planets.forEach(p=>{p.m.position.y=p.base+Math.sin(t*p.sp+p.ph)*7;p.m.rotation.y+=.004;});
    cam.position.x += (mx*26 - cam.position.x)*.045;
    cam.position.y += (-my*16 - scrollY*.045 - cam.position.y)*.045;
    cam.lookAt(0,-scrollY*.02,-40);
    renderer.render(scene,cam);
  })();

  // fade the webgl out past the hero
  addEventListener('scroll',()=>{
    const f=Math.max(0,1-window.scrollY/(innerHeight*1.25));
    canvas.style.opacity=(.18+f*.82).toFixed(3);
  },{passive:true});
}

/* ---------------------------------------------------------- AURA ORBIT NODES */
function orbitNodes(){
  const box=$('#orbitBox'); if(!box) return;
  const labels=['Voice','Memory','AI','Routing','Research','Demo','Architecture','GitHub'];
  labels.forEach((l,i)=>{
    const el=document.createElement('div');
    el.className='node'; el.textContent=l;
    box.appendChild(el);
    el.dataset.a=(i/labels.length)*Math.PI*2;
  });
  let t=0;
  const place=()=>{
    const R=box.clientWidth*0.42;
    $$('.node',box).forEach(el=>{
      const a=parseFloat(el.dataset.a)+t;
      el.style.transform=`translate(-50%,-50%) translate(${(Math.cos(a)*R).toFixed(1)}px, ${(Math.sin(a)*R*.6).toFixed(1)}px)`;
      el.style.opacity=(.5+.5*((Math.sin(a)+1)/2)).toFixed(2);
      el.style.zIndex=Math.sin(a)>0?5:1;
    });
  };
  place();
  (function spin(){
    if(reduced) return;
    requestAnimationFrame(spin);
    t+=.0022; place();
  })();
  addEventListener('resize',place);
}

/* ---------------------------------------------------------- CITY DRONES */
function drones(){
  const city=$('#cityScene'); if(!city||reduced) return;
  for(let i=0;i<5;i++){
    const d=document.createElement('div'); d.className='drone'; city.appendChild(d);
    const dur=9000+Math.random()*9000, y=10+Math.random()*45, dir=Math.random()>.5?1:-1;
    d.animate([
      {transform:`translate(${dir>0?-30:city.clientWidth+30}px, ${y}px)`},
      {transform:`translate(${dir>0?city.clientWidth+30:-30}px, ${y+20}px)`}
    ],{duration:dur,iterations:Infinity,delay:-Math.random()*dur,easing:'linear'});
  }
}

/* ---------------------------------------------------------- CAMPUS NPCs */
function npcs(){
  const c=$('#campusScene'); if(!c||reduced) return;
  for(let i=0;i<12;i++){
    const n=document.createElement('div');
    n.className='npc'+(Math.random()>.6?' p':''); c.appendChild(n);
    const path=[];
    for(let k=0;k<4;k++) path.push({transform:`translate(${Math.random()*92}%, ${Math.random()*85}%)`});
    path.push(path[0]);
    n.animate(path,{duration:16000+Math.random()*14000,iterations:Infinity,delay:-Math.random()*15000,easing:'ease-in-out'});
  }
}

/* ---------------------------------------------------------- SKILLS COMMAND CENTER */
function commandCenter(){
  const tabs=$('#ccTabs'), holo=$('#holo'); if(!tabs) return;
  const cats=Object.keys(SKILLS);
  cats.forEach((c,i)=>{
    const b=document.createElement('button');
    b.className='cc-tab'+(i===0?' on':''); b.textContent=c;
    b.onclick=()=>{$$('.cc-tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');render(c);};
    tabs.appendChild(b);
  });
  function render(c){
    holo.innerHTML='';
    SKILLS[c].forEach((t,i)=>{
      const el=document.createElement('div');
      el.className='tech'; el.textContent=t; el.style.animationDelay=(i*45)+'ms';
      holo.appendChild(el);
    });
  }
  render(cats[0]);
}

/* ---------------------------------------------------------- TIMELINE */
function timeline(){
  const rail=$('#rail'); if(!rail) return;
  TIMELINE.forEach(([yr,title,det])=>{
    const d=document.createElement('div'); d.className='stop';
    d.innerHTML=`<div class="yr">${yr}</div><h4>${title}</h4><div class="det">${det}</div>`;
    d.onclick=()=>d.classList.toggle('open');
    rail.appendChild(d);
  });
}

/* ---------------------------------------------------------- ACHIEVEMENTS */
function achievements(){
  const box=$('#cases'); if(!box) return;
  ACHIEVEMENTS.forEach(([g,t,p])=>{
    const d=document.createElement('div'); d.className='case';
    d.innerHTML=`<span class="g">${g}</span><h4>${t}</h4><p>${p}</p>`;
    box.appendChild(d);
  });
}

/* ---------------------------------------------------------- COUNTERS */
function counters(){
  const box=$('#counters'); if(!box) return;
  STATS.forEach(([n,suf,label])=>{
    const d=document.createElement('div'); d.className='ctr';
    d.innerHTML=`<b data-n="${n}" data-s="${suf}">0</b><span>${label}</span>`;
    box.appendChild(d);
  });
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return; io.unobserve(e.target);
    $$('b',e.target).forEach(b=>{
      const n=+b.dataset.n, s=b.dataset.s;
      if(n===0){b.textContent=s;return;}
      let cur=0; const dur=1500, t0=performance.now();
      (function tick(now){
        const k=Math.min(1,(now-t0)/dur), e2=1-Math.pow(1-k,3);
        b.textContent=Math.floor(n*e2).toLocaleString()+(k===1?s:'');
        if(k<1) requestAnimationFrame(tick);
      })(t0);
    });
  }),{threshold:.4});
  io.observe(box);
}

/* ---------------------------------------------------------- LANTERNS */
function lanterns(){
  const c=$('#lanterns'); if(!c||reduced) return;
  for(let i=0;i<16;i++){
    const l=document.createElement('div');
    const size=4+Math.random()*7;
    l.style.cssText=`position:absolute;width:${size}px;height:${size*1.25}px;border-radius:50% 50% 45% 45%;
      background:rgba(255,196,83,${.5+Math.random()*.4});box-shadow:0 0 ${10+size*2}px rgba(255,196,83,.7);
      left:${Math.random()*100}%;bottom:-10%;`;
    c.appendChild(l);
    l.animate([{transform:'translateY(0)',opacity:0},{opacity:1,offset:.15},{opacity:.9,offset:.8},{transform:`translateY(-${60+Math.random()*40}vh) translateX(${(Math.random()-.5)*120}px)`,opacity:0}],
      {duration:14000+Math.random()*12000,iterations:Infinity,delay:-Math.random()*20000,easing:'ease-out'});
  }
}

/* ---------------------------------------------------------- PROJECT PAGE */
function chipRow(obj){
  return Object.entries(obj).map(([k,v])=>
    `<div style="margin-bottom:18px"><div class="mono" style="font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin-bottom:9px">${k}</div>
     <div class="chips">${v.map(t=>`<span class="chip">${t}</span>`).join('')}</div></div>`).join('');
}
function openProject(id){
  const p=PROJECTS[id]; if(!p) return;
  const page=$('#page');
  page.innerHTML=`
  <button class="page-close" aria-label="Close">✕</button>
  <div class="p-hero"><div class="wrap">
    <span class="p-badge ${p.status}">${p.statusLabel}</span>
    <h1>${p.glyph} ${p.name}</h1>
    <p class="tagline">${p.tagline}</p>
    ${p.metrics.length?`<div class="metrics" style="margin-top:36px">${p.metrics.map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join('')}</div>`:''}
  </div></div>

  <div class="p-block"><div class="wrap"><h3>Overview</h3><p>${p.overview}</p></div></div>
  <div class="p-block"><div class="wrap"><h3>The Problem</h3><p>${p.problem}</p></div></div>
  <div class="p-block"><div class="wrap"><h3>The Solution</h3><p>${p.solution}</p></div></div>

  <div class="p-block"><div class="wrap"><h3>Architecture</h3>
    <div class="flow">${p.architecture.map((s,i)=>`<span>${s}</span>${i<p.architecture.length-1?'<b>→</b>':''}`).join('')}</div>
  </div></div>

  <div class="p-block"><div class="wrap"><h3>Features</h3>
    <ul>${p.features.map(([t,d])=>`<li><i>◆</i><span><b>${t}</b> — ${d}</span></li>`).join('')}</ul>
  </div></div>

  <div class="p-block"><div class="wrap"><h3>Tech Stack</h3>${chipRow(p.stack)}</div></div>

  <div class="p-block"><div class="wrap"><h3>Screenshots</h3>
    <div class="shots">
      <div class="shot">Screenshot slot 1<br><span style="opacity:.6">drop an image path in data.js</span></div>
      <div class="shot">Screenshot slot 2</div>
      <div class="shot">Video demo slot</div>
    </div>
  </div></div>

  <div class="p-block"><div class="wrap"><h3>Timeline</h3>
    <ul>${p.timeline.map(([s,d])=>`<li><i>◆</i><span><b>${s}</b> — ${d}</span></li>`).join('')}</ul>
  </div></div>

  <div class="p-block"><div class="wrap"><h3>Challenges</h3>
    <ul>${p.challenges.map(c=>`<li><i>◆</i><span>${c}</span></li>`).join('')}</ul>
  </div></div>

  <div class="p-block"><div class="wrap"><h3>Future Work</h3>
    <div class="chips">${p.future.map(f=>`<span class="chip">${f}</span>`).join('')}</div>
  </div></div>

  <div class="wrap"><div class="p-links">
    ${p.repo?`<a class="lnk solid" href="${p.repo}" target="_blank" rel="noopener">GitHub ↗</a>`:`<span class="lnk" style="opacity:.45">GitHub — coming</span>`}
    ${p.demo?`<a class="lnk" href="${p.demo}" target="_blank" rel="noopener">Live Demo ↗</a>`:`<span class="lnk" style="opacity:.45">Live Demo — coming</span>`}
    <button class="lnk" data-back>← Back to the universe</button>
  </div></div>`;

  page.classList.add('open'); page.scrollTop=0; document.body.classList.add('locked');
  $('.page-close',page).onclick=closeProject;
  $('[data-back]',page).onclick=closeProject;
  history.pushState({project:id},'','#'+id);
}
function closeProject(){
  $('#page').classList.remove('open');
  document.body.classList.remove('locked');
  if(location.hash) history.pushState('','',location.pathname);
}
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#page').classList.contains('open'))closeProject();});
addEventListener('popstate',()=>{if($('#page').classList.contains('open'))closeProject();});

/* ---------------------------------------------------------- MAP NAV */
function mapNav(){
  const map=$('#map');
  const secs=$$('[data-sec]');
  secs.forEach(s=>{
    const b=document.createElement('button');
    b.className='mapdot'; b.innerHTML=`<span>${s.dataset.sec}</span><i></i>`;
    b.onclick=()=>s.scrollIntoView({behavior:'smooth'});
    map.appendChild(b);
  });
  const dots=$$('.mapdot',map);
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    const i=secs.indexOf(e.target);
    dots.forEach((d,k)=>d.classList.toggle('on',k===i));
  }),{threshold:.35,rootMargin:'-15% 0px -35% 0px'});
  secs.forEach(s=>io.observe(s));
}

/* ---------------------------------------------------------- REVEAL */
function reveal(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  }),{threshold:.1});
  $$('.rise').forEach(el=>io.observe(el));
}

/* ---------------------------------------------------------- BOOT */
document.addEventListener('DOMContentLoaded',()=>{
  document.body.classList.add('locked');
  loaderStars(); runLoader(); universe();
  orbitNodes(); drones(); npcs();
  commandCenter(); timeline(); achievements(); counters(); lanterns();
  mapNav(); reveal();
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-project]');
    if(t) openProject(t.dataset.project);
  });
});
})();

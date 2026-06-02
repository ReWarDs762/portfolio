import{L as R}from"./lenis-BEW9yqGz.js";import{S as v,g as i}from"./gsap-CiEuWA-R.js";import{i as B,k as N,P as $,W as O,m as T,D as b,G as S,B as g,b as h,M as f,E as D,e as F,f as H,d as E,p as z,q as Y,r as G,h as W,g as X,t as j,u as K,v as U,w as V}from"./three-DXV1pcfC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();let p=null;function Z(){return p||(p=new R({duration:1.1,easing:n=>Math.min(1,1.001-Math.pow(2,-10*n)),smoothWheel:!0,wheelMultiplier:1,touchMultiplier:1.5}),p.on("scroll",v.update),i.ticker.add(n=>p.raf(n*1e3)),i.ticker.lagSmoothing(0),document.querySelectorAll("[data-lenis-prevent]").forEach(n=>{n.addEventListener("wheel",o=>o.stopPropagation(),{passive:!0})}),p)}function x(){return p}i.registerPlugin(v);const u="power3.out";function J(){const n=document.querySelector(".hero");if(!n)return;const o=n.querySelector(".hero-meta"),t=n.querySelector(".hero-title"),s=n.querySelector(".hero-subtitle"),e=n.querySelector(".hero-actions"),a=n.querySelector(".hero-index"),r=n.querySelectorAll(".hero-index-item"),c=n.querySelector(".hero-hud"),l=n.querySelector(".hero-scroll");i.set([o,s,e,c,l].filter(Boolean),{autoAlpha:0,y:16}),i.set(a,{autoAlpha:0}),i.set(r,{autoAlpha:0,y:14}),t&&i.set(t,{autoAlpha:0,y:24}),o&&i.to(o,{autoAlpha:1,y:0,duration:.6,ease:u,delay:0}),t&&i.to(t,{autoAlpha:1,y:0,duration:.9,ease:u,delay:.1}),s&&i.to(s,{autoAlpha:1,y:0,duration:.6,ease:u,delay:.45}),e&&i.to(e,{autoAlpha:1,y:0,duration:.6,ease:u,delay:.6}),a&&i.to(a,{autoAlpha:1,duration:.4,ease:u,delay:.3}),r.length&&i.to(r,{autoAlpha:1,y:0,duration:.5,ease:u,delay:.4,stagger:.07}),c&&i.to(c,{autoAlpha:1,y:0,duration:.5,ease:u,delay:.85}),l&&i.to(l,{autoAlpha:1,y:0,duration:.5,ease:u,delay:1})}function Q(){const n=document.querySelector(".page-header");if(!n)return;const o=n.querySelector(".page-eyebrow"),t=n.querySelector(".page-title"),s=n.querySelector(".page-subtitle"),e=n.querySelector(".page-meta"),a=[o,t,s,e].filter(Boolean);i.set(a,{autoAlpha:0,y:18}),a.forEach((r,c)=>{i.to(r,{autoAlpha:1,y:0,duration:.7,ease:u,delay:.05+c*.08})})}function ee(){[".section-header",".about-grid > *",".timeline-item",".project-card",".skill-category",".cert-card",".contact-card",".contact-actions > *",".equipment-table",".scene-wrapper",".detail-panel",".empty-state",".about-stats",".split-grid > .card"].forEach(o=>{document.querySelectorAll(o).forEach(t=>{t.closest(".hero")||t.closest(".page-header")||i.from(t,{autoAlpha:0,y:28,duration:.7,ease:u,scrollTrigger:{trigger:t,start:"top 88%",toggleActions:"play none none none"}})})})}function te(){document.querySelectorAll("[data-counter]").forEach(n=>{const o=parseFloat(n.dataset.counter);if(isNaN(o))return;const t={v:0},s=n.dataset.counterSuffix||"",e=Number.isInteger(o);i.to(t,{v:o,duration:1.6,ease:"power2.out",onUpdate:()=>{n.textContent=(e?Math.round(t.v):t.v.toFixed(1))+s},scrollTrigger:{trigger:n,start:"top 92%",once:!0}})})}function oe(){document.querySelectorAll(".btn").forEach(n=>{const o=n.classList.contains("btn-primary")?.35:.25;let t=null;const s=()=>{t=n.getBoundingClientRect()},e=r=>{t||(t=n.getBoundingClientRect());const c=(r.clientX-(t.left+t.width/2))*o,l=(r.clientY-(t.top+t.height/2))*o;i.to(n,{x:c,y:l,duration:.3,ease:"power2.out"})},a=()=>{i.to(n,{x:0,y:0,duration:.5,ease:"elastic.out(1, 0.5)"}),t=null};n.addEventListener("mouseenter",s),n.addEventListener("mousemove",e),n.addEventListener("mouseleave",a)})}function se(){document.querySelectorAll(".contact-cta, .article-row").forEach(n=>{n.addEventListener("mouseenter",()=>{i.to(n,{y:-4,duration:.3,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{i.to(n,{y:0,duration:.5,ease:"power3.out"})})})}function ne(){J(),Q(),ee(),te(),oe(),se(),v.refresh()}class ae{constructor(o){this.canvas=o,this.clock=new B,this.packets=[],this._init(),this._buildScene(),this._bindEvents(),this._animate=this._animate.bind(this),requestAnimationFrame(this._animate)}_init(){const o=this.canvas.clientWidth,t=this.canvas.clientHeight;this.scene=new N,this.camera=new $(35,o/t,.1,100),this.camera.position.set(0,1.5,14),this.camera.lookAt(0,0,0),this.renderer=new O({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(o,t,!1),this.renderer.setClearColor(0,0);const s=new T(16777215,.25);this.scene.add(s);const e=new b(16777215,.7);e.position.set(6,8,4),this.scene.add(e);const a=new b(6607615,.5);a.position.set(-8,4,-4),this.scene.add(a)}_buildScene(){this.group=new S,this.scene.add(this.group);const o=[{pos:[-3.5,.5,0],color:6607615,kind:"router"},{pos:[0,-.8,1],color:16729402,kind:"firewall"},{pos:[3.5,.6,-.5],color:3199320,kind:"server"}];this.nodeMeshes=[];for(const s of o){const e=this._buildNode(s);e.position.set(...s.pos),this.group.add(e),this.nodeMeshes.push(e)}this.cables=[];const t=[[0,1],[1,2],[0,2]];for(const[s,e]of t){const a=this._buildCable(this.nodeMeshes[s].position,this.nodeMeshes[e].position,o[s].color,o[e].color);this.group.add(a.mesh),this.cables.push(a);for(let r=0;r<2;r++)this.packets.push(this._buildPacket(a,r/2))}this._buildParticles()}_buildNode({color:o,kind:t}){const s=new S;let e;t==="router"?e=new g(1.4,.3,.8):t==="firewall"?e=new g(1.6,.5,.9):e=new g(.6,1.2,.7);const a=new h(e,new f({color:1315860,roughness:.5,metalness:.6}));s.add(a);const r=new D(e),c=new F(r,new H({color:o,transparent:!0,opacity:.5}));s.add(c);const l=new h(new E(.07,12,12),new f({color:o,emissive:o,emissiveIntensity:2.5}));l.position.y=.05,s.add(l);const d=new h(new z(.6,.65,32),new Y({color:o,transparent:!0,opacity:.3,side:G}));return d.rotation.x=-Math.PI/2,d.position.y=-.6,s.add(d),s.userData.ring=d,s}_buildCable(o,t,s,e){const a=o.clone(),r=t.clone(),c=a.clone().add(r).multiplyScalar(.5);c.y-=.3;const l=new W([a,c,r]),d=new X(l,32,.015,6,!1),m=new f({color:s,emissive:s,emissiveIntensity:.4,transparent:!0,opacity:.4});return{mesh:new h(d,m),curve:l,color:s}}_buildPacket(o,t){const s=new f({color:o.color,emissive:o.color,emissiveIntensity:3}),e=new h(new E(.06,10,10),s);return this.group.add(e),{mesh:e,curve:o.curve,t,speed:.15+Math.random()*.15}}_buildParticles(){const t=new Float32Array(240);for(let a=0;a<80;a++)t[a*3]=(Math.random()-.5)*22,t[a*3+1]=(Math.random()-.5)*8,t[a*3+2]=(Math.random()-.5)*10-2;const s=new j;s.setAttribute("position",new K(t,3));const e=new U({color:13159892,size:.03,transparent:!0,opacity:.4,sizeAttenuation:!0});this.particles=new V(s,e),this.scene.add(this.particles)}_bindEvents(){this._onResize=this._onResize.bind(this),this._onMouse=this._onMouse.bind(this),window.addEventListener("resize",this._onResize),window.addEventListener("mousemove",this._onMouse),this.mouse={x:0,y:0}}_onResize(){const o=this.canvas.clientWidth,t=this.canvas.clientHeight;this.camera.aspect=o/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(o,t,!1)}_onMouse(o){this.mouse.x=o.clientX/window.innerWidth*2-1,this.mouse.y=o.clientY/window.innerHeight*2-1}_animate(){const o=this.clock.getDelta(),t=this.clock.elapsedTime;if(this.group){const s=this.mouse.x*.25+t*.06,e=-this.mouse.y*.1+Math.sin(t*.3)*.05;this.group.rotation.y+=(s-this.group.rotation.y)*.04,this.group.rotation.x+=(e-this.group.rotation.x)*.04}this.nodeMeshes.forEach((s,e)=>{s.position.y=s.position.y*.98+(Math.sin(t*.6+e*1.5)*.08+(e===1?-.8:e===0?.5:.6))*.02,s.userData.ring&&(s.userData.ring.material.opacity=.25+Math.sin(t*1.2+e)*.1)});for(const s of this.packets){s.t+=o*s.speed,s.t>1&&(s.t-=1);const e=s.curve.getPointAt(s.t);s.mesh.position.copy(e)}this.particles&&(this.particles.rotation.y+=o*.02),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this._animate)}dispose(){window.removeEventListener("resize",this._onResize),window.removeEventListener("mousemove",this._onMouse),this.renderer.dispose()}}const L="vanta-preloader-seen",re=[{tag:"[ INIT ]",status:"boot",text:"System bootstrap",ms:0},{tag:"[  OK  ]",status:"ok",text:"Loading kernel · v0.1.0",ms:180},{tag:"[  OK  ]",status:"ok",text:"Mounting design system VANTA",ms:320},{tag:"[  OK  ]",status:"ok",text:"Connecting to /portfolio",ms:460},{tag:"[  OK  ]",status:"ok",text:"Streaming assets · 12 modules",ms:600},{tag:"[ READY ]",status:"ready",text:"Welcome.",ms:780}];function ie(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem(L)==="1")return null;const n=document.createElement("div");n.className="preloader",n.setAttribute("aria-hidden","true"),n.innerHTML=`
    <div class="preloader-inner">
      <div class="preloader-head">
        <span class="preloader-mark">EL</span>
        <span class="preloader-title">Lefebvre — Portfolio Engine</span>
        <span class="preloader-status">Boot</span>
      </div>

      <div class="preloader-log" data-log></div>

      <div class="preloader-progress">
        <div class="preloader-progress-meta">
          <span>Loading</span>
          <span>v0.1.0 · build —</span>
        </div>
        <div class="preloader-progress-track">
          <div class="preloader-progress-bar"></div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(n),document.documentElement.style.overflow="hidden";const o=n.querySelector("[data-log]");for(const s of re){const e=document.createElement("div");e.className="preloader-line",e.dataset.status=s.status,e.style.animationDelay=`${s.ms}ms`,e.innerHTML=`
      <span class="preloader-line-tag">${s.tag}</span>
      <span class="preloader-line-text">${s.text}</span>
      <span class="preloader-line-time">+${String(s.ms).padStart(4,"0")}ms</span>
    `,o.appendChild(e)}return n.querySelector(".preloader-progress-meta span:last-child").textContent=`v0.1.0 · ${new Date().toISOString().slice(11,19)}`,setTimeout(()=>{n.classList.add("is-leaving"),document.documentElement.style.overflow="",sessionStorage.setItem(L,"1"),setTimeout(()=>n.remove(),800)},1500),n}const ce=".project-card, .veille-card, .skill-category, .contact-card, .cert-card",M=4;function le(){if(window.matchMedia("(max-width: 900px)").matches||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.querySelectorAll(ce).forEach(o=>{let t=null,s=0,e=0,a=0,r=0;const c=d=>{const m=o.getBoundingClientRect(),y=(d.clientX-m.left)/m.width-.5,I=(d.clientY-m.top)/m.height-.5;if(e=y*M,s=-I*M,!t){const w=()=>{a+=(s-a)*.18,r+=(e-r)*.18,o.style.transform=`perspective(1100px) rotateX(${a.toFixed(2)}deg) rotateY(${r.toFixed(2)}deg) translateZ(0)`,Math.abs(a-s)>.05||Math.abs(r-e)>.05?t=requestAnimationFrame(w):t=null};t=requestAnimationFrame(w)}},l=()=>{s=0,e=0;const d=()=>{a+=(0-a)*.12,r+=(0-r)*.12,o.style.transform=`perspective(1100px) rotateX(${a.toFixed(2)}deg) rotateY(${r.toFixed(2)}deg) translateZ(0)`,Math.abs(a)>.02||Math.abs(r)>.02?t=requestAnimationFrame(d):(o.style.transform="",t=null)};t||(t=requestAnimationFrame(d))};o.style.willChange="transform",o.addEventListener("mousemove",c),o.addEventListener("mouseleave",l)})}function de(){const n=document.querySelector(".footer");if(!n)return;const t=`
    <footer class="mega-footer">
      <div class="container mega-footer-inner">

        <!-- Mega filigrane EL en arrière-plan -->
        <div class="mega-footer-mark" aria-hidden="true">EL</div>

        <!-- Statement -->
        <div class="mega-footer-statement">
          <div>
            <div class="mega-footer-eyebrow">
              <span>End of feed</span>
              <span class="mono">— · 06 / 06</span>
            </div>
            <h2 class="mega-footer-line">
              Let&rsquo;s build<br/>
              <span class="accent">something secure</span>
            </h2>
          </div>
          <div class="mega-footer-cta">
            <p class="mega-footer-cta-text">
              Disponible pour une alternance Bachelor Cybersécurité — démarrage septembre 2026.
            </p>
            <a href="mailto:enzolefebvrepro@gmail.com" class="mega-footer-cta-btn">
              Démarrer la conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <!-- Grille colonnes -->
        <div class="mega-footer-grid">
          <div class="mega-footer-col">
            <div class="mega-footer-col-title">Profil</div>
            <p class="mega-footer-bio">
              <strong>Enzo Lefebvre</strong> — étudiant BTS SIO option SISR,
              passionné par les <em>réseaux</em>, l&rsquo;<em>infrastructure</em>
              et la <em>cybersécurité</em>.
            </p>
          </div>

          <div class="mega-footer-col">
            <div class="mega-footer-col-title">Navigation</div>
            <a href="/">Accueil</a>
            <a href="/parcours.html">Parcours</a>
            <a href="/projets.html">Projets</a>
            <a href="/infra-3d.html">Infra 3D</a>
            <a href="/competences.html">Compétences</a>
            <a href="/veille.html">Veille</a>
          </div>

          <div class="mega-footer-col">
            <div class="mega-footer-col-title">Contact</div>
            <a href="mailto:enzolefebvrepro@gmail.com">enzolefebvrepro@gmail.com</a>
            <a href="tel:+33627701283">06 27 70 12 83</a>
            <span class="contact-line">Bolbec, 76 — Normandie</span>
          </div>

          <div class="mega-footer-col">
            <div class="mega-footer-col-title">Statut</div>
            <span class="contact-line"><span class="signal"></span> Disponible</span>
            <span class="contact-line">Alternance · Sept 2026</span>
            <span class="contact-line">Réponse sous 48h</span>
          </div>
        </div>

        <!-- Bottom -->
        <div class="mega-footer-bottom">
          <div class="mega-footer-bottom-left">
            <span>© ${new Date().getFullYear()} · Enzo Lefebvre</span>
            <span>· BTS SIO · SISR · Le Havre</span>
          </div>
          <div class="mega-footer-bottom-right">
            <span>v0.1.0 — alpha</span>
            <span><span class="signal"></span> System Online · <span data-clock>--:--:--</span></span>
          </div>
        </div>

      </div>
    </footer>
  `,s=document.createElement("div");s.innerHTML=t,n.replaceWith(s.firstElementChild)}const _=window.matchMedia("(prefers-reduced-motion: reduce)").matches,P=window.matchMedia("(max-width: 900px)").matches,ue=window.matchMedia("(hover: hover) and (pointer: fine)").matches;function me(){if(!ue||_)return;const n=document.createElement("div");n.className="cursor-system",n.innerHTML='<div class="cursor-ring"></div><div class="cursor-dot"></div>',document.body.appendChild(n);let o=window.innerWidth/2,t=window.innerHeight/2,s=o,e=t;window.addEventListener("mousemove",r=>{o=r.clientX,t=r.clientY}),document.addEventListener("mouseover",r=>{const c=r.target;!c||!c.closest||(c.closest('a, button, .nav-toggle, .hero-index-item, .veille-card, .project-card, .scene-btn, [role="button"]')?(n.classList.add("is-hover"),n.classList.remove("is-text")):c.closest("p, h1, h2, h3, h4, .hero-subtitle, .hero-tagline, .timeline-content, .veille-card-text")?(n.classList.add("is-text"),n.classList.remove("is-hover")):n.classList.remove("is-hover","is-text"))}),document.addEventListener("mouseleave",()=>{n.style.opacity="0"}),document.addEventListener("mouseenter",()=>{n.style.opacity="1"});const a=()=>{s+=(o-s)*.22,e+=(t-e)*.22,n.style.transform=`translate3d(${s}px, ${e}px, 0)`,requestAnimationFrame(a)};a()}function pe(){if(window.matchMedia("(max-width: 600px)").matches)return;const n=[{type:"accent",dot:!0,text:"System Online"},{type:"normal",text:"Portfolio · v0.1.0 — alpha"},{type:"normal",text:"Lefebvre Enzo · BTS SIO Option SISR"},{type:"normal",text:"Bolbec — Normandie · 49.5765°N · 0.4794°E"},{type:"accent",text:"Available for Bachelor Cybersécurité — Sept 2026"},{type:"normal",text:"Live ",clock:!0}],o=()=>n.map(s=>{const e=s.type==="accent"?"ticker-item ticker-item--accent":"ticker-item",a=s.dot?'<span class="ticker-dot"></span>':"",r=s.clock?"<span data-clock>--:--:--</span>":"";return`<span class="${e}">${a}${s.text}${r}</span><span class="ticker-sep"></span>`}).join(""),t=document.createElement("div");t.className="ticker-bar",t.setAttribute("aria-hidden","true"),t.innerHTML=`<div class="ticker-track">${o()}${o()}</div>`,document.body.insertBefore(t,document.body.firstChild)}function he(){const n=document.createElement("div");n.className="scroll-progress",document.body.appendChild(n);const o=()=>{const t=document.documentElement.scrollHeight-window.innerHeight,s=t>0?window.scrollY/t*100:0;n.style.width=s+"%"};o(),window.addEventListener("scroll",o,{passive:!0})}function fe(){if(P)return;document.querySelectorAll(".card, .project-card, .skill-category, .contact-card, .veille-card").forEach(o=>{o.addEventListener("mousemove",t=>{const s=o.getBoundingClientRect(),e=(t.clientX-s.left)/s.width*100,a=(t.clientY-s.top)/s.height*100;o.style.setProperty("--mx",e+"%"),o.style.setProperty("--my",a+"%")})})}function ge(){const n=document.querySelector(".nav-inner"),o=document.querySelector(".nav-links");if(!n||!o)return;const t=document.createElement("button");t.className="nav-toggle",t.setAttribute("aria-label","Ouvrir le menu"),t.setAttribute("aria-expanded","false"),t.setAttribute("type","button"),t.innerHTML="<span></span><span></span>",n.appendChild(t);const s=()=>{o.classList.remove("is-open"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-label","Ouvrir le menu"),document.body.style.overflow="",x()?.start()},e=()=>{o.classList.add("is-open"),t.setAttribute("aria-expanded","true"),t.setAttribute("aria-label","Fermer le menu"),document.body.style.overflow="hidden",x()?.stop()};t.addEventListener("click",()=>{o.classList.contains("is-open")?s():e()}),o.querySelectorAll("a").forEach(a=>{a.addEventListener("click",()=>s())}),document.addEventListener("keydown",a=>{a.key==="Escape"&&s()}),window.addEventListener("resize",()=>{window.innerWidth>900&&s()})}const A=()=>{try{ie()}catch(e){console.warn("[preloader]",e)}try{de()}catch(e){console.warn("[mega-footer]",e)}const n=window.location.pathname.replace(/\/$/,"")||"/";document.querySelectorAll(".nav-links a").forEach(e=>{const a=e.getAttribute("href");(a===n||n==="/"&&a==="/")&&e.classList.add("is-active")}),ge();try{pe()}catch(e){console.warn("[ticker]",e)}try{me()}catch(e){console.warn("[cursor]",e)}try{he()}catch(e){console.warn("[scroll]",e)}try{fe()}catch(e){console.warn("[glow]",e)}try{le()}catch(e){console.warn("[tilt]",e)}try{Z()}catch(e){console.warn("[lenis]",e)}try{ne()}catch(e){console.warn("[animations]",e)}const o=document.querySelector("#hero-canvas");if(o&&!P&&!_)try{new ae(o)}catch(e){console.warn("[hero3d]",e)}else o&&o.remove();const t=document.querySelectorAll("[data-clock]");if(t.length){const e=()=>{const a=new Date,r=String(a.getHours()).padStart(2,"0"),c=String(a.getMinutes()).padStart(2,"0"),l=String(a.getSeconds()).padStart(2,"0"),d=`${r}:${c}:${l}`;t.forEach(m=>{m.textContent=d})};e(),setInterval(e,1e3)}const s=document.querySelector("[data-year]");s&&(s.textContent=new Date().getFullYear())};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",A,{once:!0}):A();const k=document.querySelector("[data-clock]");if(k){const n=()=>{const o=new Date,t=String(o.getHours()).padStart(2,"0"),s=String(o.getMinutes()).padStart(2,"0"),e=String(o.getSeconds()).padStart(2,"0");k.textContent=`${t}:${s}:${e}`};n(),setInterval(n,1e3)}const q=document.querySelector("[data-year]");q&&(q.textContent=new Date().getFullYear());const C=window.location.pathname.replace(/\/$/,"")||"/";document.querySelectorAll(".nav-links a").forEach(n=>{const o=n.getAttribute("href");(o===C||C==="/"&&o==="/")&&n.classList.add("is-active")});

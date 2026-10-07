/* ===== 作品資料 ===== */
const MV = [
  {id:"cR81G_JNs_E", title:"我墜落你自由",  artist:"陳勢安 Andrew Tan", role:"導演助理"},
  {id:"JxBYZQreiUs", title:"I Know That",   artist:"陳勢安 Andrew Tan", role:"導演助理"},
  {id:"t9Ij3BHdOTg", title:"遼闊 Boundless", artist:"陳勢安 Andrew Tan", role:"剪接後期", note:"後期製作"},
  {id:"sc65Tz4dss8", title:"這號人 Invisible Ones", artist:"徐暐翔 Vash Hsu", role:"導演助理"},
  {id:"u1R5nqy5BNM", title:"不要救我 Burn Me Down", artist:"徐暐翔 Vash Hsu feat. 閻奕格", role:"導演助理"},
  {id:"q92kBcPn-R4", title:"起始畫面 Reset", artist:"閻奕格 Janice Yan", role:"導演助理"},
  {id:"hVbpMQ1PT2c", title:"愛的沙漏", artist:"HAKU", role:"導演助理"},
  {id:"qqObdQF9Ykk", title:"見面這麼甜 分開這麼冷", artist:"俊希 Junxi", role:"導演助理"},
  {id:"_pcqDiLBVcE", title:"My Life", artist:"莉森", role:"導演助理"},
  {id:"A1x6pZlpAqQ", title:"抖一抖", artist:"LUVSSI", role:"導演助理"},
  {id:"fINHNk36uxM", title:"緋紅之夜", artist:"Rakuten Girls", role:"導演助理", note:"2026 全新單曲"},
];
const DANCE = [
  {id:"Gt6WDYP4WCM", title:"《SYNC 同•步》決賽", artist:"臺大盃第 32 屆熱門流行舞蹈大賽", role:"現場拍攝", note:"Views 決賽 01 NGUVU"},
  {id:"5QeKObZDD_Q", title:"Angel 舞蹈形象片", artist:"SMOKE / Don Toliver, HVN, Sofaygo", role:"拍攝"},
];
const COMMERCIAL = [
  {id:"pKdg696NdJ4", title:"紀念二戰暨抗戰勝利 80 週年音樂會", artist:"SR 艾思爾娛樂 · 2025", role:"攝影師"},
  {id:"e5AlTINkf_g", title:"黃埔軍校建軍百年音樂會", artist:"SR 艾思爾娛樂 · 2024", role:"攝影師"},
];
const ART = [
  {id:"IoyIll7KBAQ", title:"《青視》行為藝術展", artist:"Performance Art Exhibition", role:"策展"},
  {id:"yXvIQPEY3ak", title:"Breath", artist:"2023 亞洲國際兒童電影節", role:"入選", note:"Asian International Children's Film Festival"},
];

function card(v,i){
  return `<article class="vcard rv" data-id="${v.id}" style="--d:${(i%3)*90}ms">
    <div class="vthumb">
      <img loading="lazy" src="https://img.youtube.com/vi/${v.id}/maxresdefault.jpg"
           onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${v.id}/hqdefault.jpg'" alt="${v.title}">
      <span class="play"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
    </div>
    <div class="vmeta">
      <p class="vrole">${v.role}</p>
      <p class="vtitle">${v.title}</p>
      <p class="vnote">${v.artist}${v.note ? " · " + v.note : ""}</p>
    </div>
  </article>`;
}
const put=(sel,arr)=>{const el=document.querySelector(sel); if(el) el.innerHTML=arr.map(card).join("")};
put("#mvgrid",MV); put("#dancegrid",DANCE); put("#comgrid",COMMERCIAL); put("#artgrid",ART);

/* 點擊換成 iframe 播放 */
document.addEventListener("click",e=>{
  const c=e.target.closest(".vcard"); if(!c||c.dataset.playing) return;
  const id=c.dataset.id; c.dataset.playing="1";
  const t=c.querySelector(".vthumb").getBoundingClientRect();
  c.innerHTML=`<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0"
    style="height:${Math.round(t.width*9/16)}px" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
});

/* ===== 攝影組（209 張，無小標） ===== */
const CATNAME={PORTRAIT:"人像",DANCE:"舞蹈",STAGE:"舞台",SPORTS:"運動",FILM:"實驗片"};

/* 版面節奏：依索引決定大小，讓瀑布流有呼吸 */
const LAYOUT=["big","","wide","","tall","","","wide","","","big","tall","","","wide","","tall","","","wide","","","tall","","","wide","","","big",""];
const mos=document.getElementById("mosaic");
mos.innerHTML=GALLERY.map((g,i)=>{
  const cls=LAYOUT[i%LAYOUT.length]||"";
  return `<a href="assets/gallery2/${g.f}" data-cat="${g.c}" class="${cls} rv" style="--d:${(i%6)*60}ms">
    <img loading="lazy" src="assets/gallery2/${g.f}" alt="">
  </a>`;
}).join("");

document.getElementById("galcount").textContent = GALLERY.length;
document.getElementById("filters").addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("on",x===b));
  const f=b.dataset.f;
  document.querySelectorAll(".mosaic a").forEach(a=>{
    a.classList.toggle("hide", f!=="ALL" && a.dataset.cat!==f);
  });
});

/* Lightbox（含前後切換） */
const lb=document.getElementById("lb"), lbi=document.getElementById("lbimg"), lbc=document.getElementById("lbcap");
let gv=[], gc=0;
function galShow(){
  const a=gv[gc]; if(!a) return;
  lbi.src=a.getAttribute("href");
  const total=gv.length;
  lbc.textContent=`${gc+1} / ${total}`;
  lb.classList.add("open");
}
mos.addEventListener("click",e=>{
  const a=e.target.closest("a"); if(!a) return;
  e.preventDefault();
  gv=[...document.querySelectorAll(".mosaic a")].filter(x=>!x.classList.contains("hide"));
  gc=gv.indexOf(a); galShow();
});
const close=()=>{lb.classList.remove("open");lbi.src=""};
document.getElementById("lbclose").onclick=close;
lb.onclick=e=>{if(e.target===lb)close()};
document.addEventListener("keydown",e=>{
  if(!lb.classList.contains("open"))return;
  if(e.key==="Escape")close();
  if(e.key==="ArrowLeft"){gc=(gc-1+gv.length)%gv.length;galShow()}
  if(e.key==="ArrowRight"){gc=(gc+1)%gv.length;galShow()}
});

/* ===== 導覽列 ===== */
const nav=document.getElementById("nav");
addEventListener("scroll",()=>nav.classList.toggle("solid",scrollY>60),{passive:true});

/* ===== 進場動畫 ===== */
const io=new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}
}),{threshold:.1,rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".reveal,.rv").forEach(el=>io.observe(el));

/* ===== HERO 視差（穩健版：只在可見範圍內計算，捲回一定還原） ===== */
const heroBg=document.querySelector(".hero-bg");
const heroInner=document.querySelector(".hero-inner");
function heroUpdate(){
  const y=Math.max(0,scrollY), vh=innerHeight;
  if(y>vh) return;                       // hero 已離開畫面，不需要處理
  if(heroBg) heroBg.style.transform=`scale(1.04) translateY(${y*0.22}px)`;
  if(heroInner) heroInner.style.opacity=Math.max(0,1-y/(vh*0.86));
}
heroUpdate();
addEventListener("scroll",()=>requestAnimationFrame(heroUpdate),{passive:true});
addEventListener("resize",heroUpdate,{passive:true});
addEventListener("pageshow",heroUpdate);

/* 標題進場 —— 逐字，但保留 <br> 換行 */
addEventListener("load",()=>{
  const h=document.querySelector("h1");
  if(!h) return;
  const lines=h.innerHTML.split(/<br\s*\/?>/i);
  let n=0;
  h.innerHTML=lines.map(line=>
    [...line].map(ch=>`<span class="ch" style="transition-delay:${(n++)*42}ms">${ch===" "?"&nbsp;":ch}</span>`).join("")
  ).join("<br>");
  requestAnimationFrame(()=>document.querySelectorAll("h1 .ch").forEach(c=>c.classList.add("in")));
});

/* 數字滾動已移除 —— stats 改為工作項目，不再使用數字 */

document.getElementById("yr").textContent=new Date().getFullYear();

/* ===== 自訂游標光暈 ===== */
const glow=document.createElement("div");
glow.className="cursor-glow";
document.body.appendChild(glow);
let gx=innerWidth/2, gy=innerHeight/2, tx=gx, ty=gy;
addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY},{passive:true});
(function loop(){
  gx+=(tx-gx)*0.07; gy+=(ty-gy)*0.07;
  glow.style.transform=`translate(${gx}px,${gy}px)`;
  requestAnimationFrame(loop);
})();

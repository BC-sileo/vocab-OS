const WORDS=[
["commit","自分をある行動・状態に送り込み、確定させる","v"],
["compare","複数のものを並べ、違い・共通点を見比べる","v"],
["complain","不満を外へ訴える","v"],
["complex","多くの要素が絡み合い、単純ではない","adj"],
["concentrate","注意や力を一点へ集める","v"],
["confirm","不確かなものを照合し、確かだとする","v"],
["consider","対象を頭の中に置き、判断材料として扱う","v"],
["contain","何かを内側に収め、外へ出さない","v"],
["contract","条件を定め、複数者を結びつける","n/v"],
["contribute","全体に対して自分の一部を差し出す","v"],
["crop","全体から一部分を切り取る","n/v"],
["cruel","相手の苦痛を顧みず傷つける","adj"],
["debate","異なる主張をぶつけ合って論じる","n/v"],
["deny","そうではないと認めることを拒む","v"],
["desire","欲しいものへ強く心が向く","n/v"],
["disturb","平常の状態を乱す・邪魔する","v"],
["efficient","無駄を減らし、少ない資源で結果を出す","adj"],
["emphasize","重要な部分を目立たせる","v"],
["encourage","相手が進めるよう後押しする","v"],
["exist","そこに実際に存在している","v"]
].map(([word,translation,pos],i)=>({id:i+1,word,translation,pos}));

const KEY="vocabOS_v01";
const saved=JSON.parse(localStorage.getItem(KEY)||"{}");
let pageSize=Number(saved.pageSize)||10;
let page=Number(saved.page)||1;
let order=saved.order||WORDS.map(w=>w.id);
let states=saved.states||{};
let sheetY=Number(saved.sheetY)||window.innerHeight*.45;
let dragging=false,startX=0,touchMoved=false;

const $=s=>document.querySelector(s);
const pageSizeEl=$("#pageSize"),pageSelect=$("#pageSelect"),list=$("#wordList");
pageSizeEl.value=String(pageSize);

function save(){localStorage.setItem(KEY,JSON.stringify({pageSize,page,order,states,sheetY}));}
function pageCount(){return Math.max(1,Math.ceil(order.length/pageSize))}
function pageIds(){return order.slice((page-1)*pageSize,page*pageSize)}
function words(){const ids=new Set(pageIds());return order.filter(id=>ids.has(id)).map(id=>WORDS[id-1])}
function render(){
  const count=pageCount(); if(page>count)page=count;
  pageSelect.innerHTML=Array.from({length:count},(_,i)=>'<option value="'+(i+1)+'">ページ '+(i+1)+'</option>').join("");
  pageSelect.value=String(page);
  list.innerHTML="";
  words().forEach((w,i)=>{
    const el=document.createElement("article"); el.className="word"; el.id="word-"+w.id;
    const state=states[w.id]||"";
    el.innerHTML='<div class="word-head"><h2>'+w.word+'</h2><span class="pos">'+w.pos+'</span></div>'+
      '<div class="translation answer">'+w.translation+'</div>'+
      '<div class="helper">必要な情報をここに追加できます。</div>'+
      '<div class="state-row">'+["即答","遅い","曖昧","不正解"].map(s=>'<button data-state="'+s+'" class="'+(state===s?"active":"")+'">'+s+'</button>').join("")+'</div>';
    el.querySelectorAll("[data-state]").forEach(b=>b.onclick=()=>{states[w.id]=b.dataset.state;save();render();});
    list.appendChild(el);
  });
  $("#progressText").textContent=pageIds().length+" / "+order.length+"語";
  $("#pageText").textContent="Page "+page+" / "+count;
  $("#progressBar").style.width=(page/count*100)+"%";
  renderToc(); applySheet(); save();
}
function renderToc(){
  $("#tocItems").innerHTML=words().map((w,i)=>'<button class="toc-item" data-target="'+w.id+'">'+(i+1)+". "+w.word+'<small>'+w.translation+'</small></button>').join("");
  $("#tocItems").querySelectorAll(".toc-item").forEach(b=>b.onclick=()=>{document.getElementById("word-"+b.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"});closeToc();});
}
function applySheet(){
  document.querySelectorAll(".answer").forEach(el=>{
    const r=el.getBoundingClientRect(), hidden=r.top>sheetY;
    el.classList.toggle("sheet-hidden",hidden);
  });
}
function setSheet(y){sheetY=Math.max(80,Math.min(window.innerHeight-40,y));$("#sheetLine").style.top=sheetY+"px";applySheet();save();}
function shufflePage(){
  const start=(page-1)*pageSize,end=Math.min(start+pageSize,order.length),part=order.slice(start,end);
  for(let i=part.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[part[i],part[j]]=[part[j],part[i]]}
  order.splice(start,part.length,...part);save();render();
}
function resetPage(){
  const canonical=WORDS.map(w=>w.id),start=(page-1)*pageSize,end=Math.min(start+pageSize,order.length);
  const original=canonical.slice(start,end);order.splice(start,original.length,...original);save();render();
}
function openToc(){$("#toc").classList.add("open");$("#toc").setAttribute("aria-hidden","false")}
function closeToc(){$("#toc").classList.remove("open");$("#toc").setAttribute("aria-hidden","true")}
pageSizeEl.onchange=e=>{pageSize=Number(e.target.value);page=1;order=WORDS.map(w=>w.id);save();render()};
pageSelect.onchange=e=>{page=Number(e.target.value);save();render()};
$("#shuffleBtn").onclick=shufflePage;$("#resetBtn").onclick=resetPage;$("#tocBtn").onclick=openToc;$("#tocClose").onclick=closeToc;
$("#toc").onclick=e=>{if(e.target.id==="toc")closeToc()};

const line=$("#sheetLine");
line.addEventListener("pointerdown",e=>{dragging=true;line.setPointerCapture(e.pointerId);});
line.addEventListener("pointermove",e=>{if(dragging)setSheet(e.clientY)});
line.addEventListener("pointerup",()=>{dragging=false});
line.addEventListener("keydown",e=>{if(e.key==="ArrowUp"){e.preventDefault();setSheet(sheetY-20)}if(e.key==="ArrowDown"){e.preventDefault();setSheet(sheetY+20)}});
let touchStartX=0;
document.addEventListener("touchstart",e=>{touchStartX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener("touchend",e=>{const x=e.changedTouches[0].clientX;if(touchStartX>window.innerWidth-35&&x<touchStartX-60)openToc()},{passive:true});
window.addEventListener("resize",()=>{sheetY=Math.min(sheetY,window.innerHeight-40);setSheet(sheetY)});
render();

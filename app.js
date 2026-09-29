const WORDS=[
["commit","自分をある行動・状態に送り込み、確定させる","v","決めた行動へ自分を送り込む","commit action decision"],
["compare","複数のものを並べ、違い・共通点を見比べる","v","横に並べて違いを見る","compare two things"],
["complain","不満を外へ訴える","v","不満を外へ押し出す","complain complaint"],
["complex","多くの要素が絡み合い、単純ではない","adj","要素が絡み合っている","complex system"],
["concentrate","注意や力を一点へ集める","v","散った力を一点に集める","concentrate focus"],
["confirm","不確かなものを照合し、確かだとする","v","照合して確定する","confirm check"],
["consider","対象を頭の中に置き、判断材料として扱う","v","頭の中に置いて考える","consider think"],
["contain","何かを内側に収め、外へ出さない","v","内側に収める","contain container"],
["contract","条件を定め、複数者を結びつける","n/v","条件で人や物を結びつける","contract agreement"],
["contribute","全体に対して自分の一部を差し出す","v","全体へ自分の一部を足す","contribute teamwork"],
["crop","全体から一部分を切り取る","n/v","全体から一部を切り出す","crop photograph"],
["cruel","相手の苦痛を顧みず傷つける","adj","苦痛を顧みない","cruel behavior"],
["debate","異なる主張をぶつけ合って論じる","n/v","主張をぶつけて論じる","debate discussion"],
["deny","そうではないと認めることを拒む","v","認めることを拒む","deny refusal"],
["desire","欲しいものへ強く心が向く","n/v","欲しいものへ心が向く","desire want"],
["disturb","平常の状態を乱す・邪魔する","v","平常を乱す","disturb interruption"],
["efficient","無駄を減らし、少ない資源で結果を出す","adj","少ない資源で結果を出す","efficient work"],
["emphasize","重要な部分を目立たせる","v","重要部分を強く目立たせる","emphasize highlight"],
["encourage","相手が進めるよう後押しする","v","進めるよう背中を押す","encourage support"],
["exist","そこに実際に存在している","v","実際にそこにある","exist presence"]
].map(([word,translation,pos,coreImage,imageSearch],i)=>({id:i+1,word,translation,pos,coreImage,imageSearch}));

const KEY="vocabOS_v02";
const saved=JSON.parse(localStorage.getItem(KEY)||"{}");
let pageSize=Number(saved.pageSize)||10;
let sessionPages=Number(saved.sessionPages)||1;
let mode=saved.mode||"sheet";
let order=saved.order||WORDS.map(w=>w.id);
let states=saved.states||{};
let sheetY=Number(saved.sheetY)||window.innerHeight*.45;
let reviewPageIndex=0;
let sessionStartPage=1;
let sessionWordIds=[];
let resultIds=[];
let dragging=false;

const $=s=>document.querySelector(s);
const pageSizeEl=$("#pageSize"),sessionPagesEl=$("#sessionPages"),list=$("#wordList");

function save(){localStorage.setItem(KEY,JSON.stringify({pageSize,sessionPages,mode,order,states,sheetY}));}
function pageCount(){return Math.max(1,Math.ceil(order.length/pageSize))}
function pageIds(p){const n=p||1;return order.slice((n-1)*pageSize,n*pageSize)}
function wordsFor(p){const ids=new Set(pageIds(p));return order.filter(id=>ids.has(id)).map(id=>WORDS[id-1])}
function showView(id){["homeView","setupView","reviewView","resultView"].forEach(x=>$("#"+x).classList.toggle("hidden",x!==id));}
function populateSessionPages(){
  const max=pageCount();
  sessionPages=Math.max(1,Math.min(sessionPages,max));
  sessionPagesEl.innerHTML=Array.from({length:max},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+"ページ ("+(Math.min(pageSize,order.length-i*pageSize))+"語)"+'</option>').join("");
  sessionPagesEl.value=String(sessionPages);
}
function openSetup(){
  pageSizeEl.value=String(pageSize);
  populateSessionPages();
  document.querySelectorAll(".mode-btn").forEach(b=>b.classList.toggle("active",b.dataset.mode===mode));
  showView("setupView");
}
function startReview(){
  pageSize=Number(pageSizeEl.value);
  sessionPages=Number(sessionPagesEl.value);
  order=WORDS.map(w=>w.id);
  reviewPageIndex=0;
  sessionStartPage=1;
  sessionWordIds=[];
  showView("reviewView");
  renderReviewPage();
}
function currentReviewPage(){return reviewPageIndex+1}
function allEvaluated(ids){return ids.every(id=>!!states[id])}
function renderReviewPage(){
  const p=currentReviewPage(), ids=pageIds(p), ws=wordsFor(p);
  sessionWordIds=[...new Set([...sessionWordIds,...ids])];
  list.innerHTML="";
  ws.forEach((w,i)=>{
    const state=states[w.id]||"";
    const el=document.createElement("article");
    el.className="word"; el.id="word-"+w.id;
    const img='<img class="image-cue" loading="lazy" src="https://loremflickr.com/720/405/'+encodeURIComponent(w.imageSearch)+'?lock='+w.id+'" alt="'+w.word+'の画像">';
    const answer='<div class="image-answer"><div class="word-head"><h3>'+w.word+'</h3><span class="pos">'+w.pos+'</span></div><div class="translation">'+w.translation+'</div><div class="core-line">コアイメージ：'+w.coreImage+'</div></div>';
    const sheet='<div class="word-head"><h3>'+w.word+'</h3><span class="pos">'+w.pos+'</span></div><div class="translation answer">'+w.translation+'</div><div class="core-line">コアイメージ：'+w.coreImage+'</div>';
    el.innerHTML=mode==="image"
      ? img+'<button class="image-reveal" type="button">答えを見る</button>'+answer
      : sheet;
    if(mode==="image"){
      el.querySelector(".image-reveal").onclick=e=>{e.currentTarget.style.display="none";el.querySelector(".image-answer").classList.add("revealed");};
    }
    const row=document.createElement("div"); row.className="state-row";
    ["即答","遅い","曖昧","不正解"].forEach(s=>{const b=document.createElement("button");b.textContent=s;b.dataset.state=s;if(state===s)b.classList.add("active");b.onclick=()=>setState(w.id,s);row.appendChild(b)});
    el.appendChild(row); list.appendChild(el);
  });
  $("#progressText").textContent=(reviewPageIndex*pageSize+ids.length)+" / "+Math.min(sessionPages*pageSize,order.length)+"語";
  $("#pageText").textContent="Page "+p+" / "+sessionPages;
  $("#progressBar").style.width=(p/sessionPages*100)+"%";
  $("#modeHint").textContent=mode==="sheet"?"赤い境界線より下が隠れます。思い出したら線を動かして答え合わせ。":"画像を手掛かりに単語を想起。答えを見てから自己評価します。";
  $("#sheetLine").classList.toggle("hidden",mode!=="sheet");
  if(mode==="sheet")applySheet();
  renderToc();
  window.scrollTo({top:0,behavior:"instant"});
}
function setState(id,state){
  states[id]=state; save();
  const ids=pageIds(currentReviewPage());
  if(allEvaluated(ids)){
    setTimeout(()=>{
      if(reviewPageIndex+1<sessionPages){reviewPageIndex++;renderReviewPage();}
      else finishReview();
    },220);
  }else renderReviewPage();
}
function finishReview(){
  resultIds=sessionWordIds.filter(id=>states[id]&&states[id]!=="即答");
  resultIds.sort((a,b)=>severity(states[b])-severity(states[a]));
  renderResults();
  showView("resultView");
  window.scrollTo({top:0,behavior:"instant"});
}
function severity(s){return s==="不正解"?3:s==="曖昧"?2:s==="遅い"?1:0}
function imageUrl(w){return "https://loremflickr.com/720/405/"+encodeURIComponent(w.imageSearch)+"?lock="+w.id}
function renderResults(){
  const weak=resultIds.length;
  $("#resultSummary").textContent=weak?weak+"語が今回の再接触対象です。":"今回はすべて即答でした。";
  $("#resultList").innerHTML=resultIds.length?resultIds.map(id=>{
    const w=WORDS[id-1],s=states[id];
    return '<article class="result-card"><img loading="lazy" src="'+imageUrl(w)+'" alt="'+w.word+'の画像"><div class="result-meta"><div class="result-word">'+w.word+'</div><span class="status">'+s+'</span></div><div class="result-label">コアイメージ</div><div class="result-core">'+w.coreImage+'</div></article>';
  }).join(""):'<section class="card"><strong>苦手語はありません。</strong><p class="hint">今回の接触はここで完了です。</p></section>';
  $("#finishBtn").disabled=true;
  $("#finishHint").textContent="一番下までスクロールすると終了できます。";
}
function enableFinish(){if(!$("#resultView").classList.contains("hidden")){$("#finishBtn").disabled=false;$("#finishHint").textContent="ここまで見たら終了できます。";}}
function applySheet(){document.querySelectorAll(".answer").forEach(el=>{const r=el.getBoundingClientRect();el.classList.toggle("sheet-hidden",r.top>sheetY)})}
function setSheet(y){sheetY=Math.max(80,Math.min(window.innerHeight-40,y));$("#sheetLine").style.top=sheetY+"px";applySheet();save()}
function renderToc(){
  $("#tocItems").innerHTML=wordsFor(currentReviewPage()).map((w,i)=>'<button class="toc-item" data-target="'+w.id+'">'+(i+1)+". "+w.word+'<small>'+w.translation+'</small></button>').join("");
  $("#tocItems").querySelectorAll(".toc-item").forEach(b=>b.onclick=()=>{document.getElementById("word-"+b.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"});closeToc()});
}
function openToc(){$("#toc").classList.add("open");$("#toc").setAttribute("aria-hidden","false")}
function closeToc(){$("#toc").classList.remove("open");$("#toc").setAttribute("aria-hidden","true")}

$("#reviewBtn").onclick=openSetup;
$("#setupBack").onclick=()=>showView("homeView");
pageSizeEl.onchange=()=>{pageSize=Number(pageSizeEl.value);populateSessionPages();save()};
sessionPagesEl.onchange=e=>{sessionPages=Number(e.target.value);save()};
document.querySelectorAll(".mode-btn").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;document.querySelectorAll(".mode-btn").forEach(x=>x.classList.toggle("active",x===b));save()});
$("#startReview").onclick=startReview;
$("#finishBtn").onclick=()=>{showView("homeView");window.scrollTo({top:0,behavior:"instant"})};
$("#tocBtn").onclick=openToc;$("#tocClose").onclick=closeToc;$("#toc").onclick=e=>{if(e.target.id==="toc")closeToc()};
window.addEventListener("scroll",()=>{if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-20)enableFinish()});

const line=$("#sheetLine");
line.addEventListener("pointerdown",e=>{dragging=true;line.setPointerCapture(e.pointerId)});
line.addEventListener("pointermove",e=>{if(dragging)setSheet(e.clientY)});
line.addEventListener("pointerup",()=>{dragging=false});
line.addEventListener("keydown",e=>{if(e.key==="ArrowUp"){e.preventDefault();setSheet(sheetY-20)}if(e.key==="ArrowDown"){e.preventDefault();setSheet(sheetY+20)}});

let touchStartX=0;
document.addEventListener("touchstart",e=>{touchStartX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener("touchend",e=>{const x=e.changedTouches[0].clientX;if(touchStartX>window.innerWidth-35&&x<touchStartX-60)openToc()},{passive:true});
window.addEventListener("resize",()=>{sheetY=Math.min(sheetY,window.innerHeight-40);setSheet(sheetY)});
openSetup();

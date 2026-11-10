const WORDS=[
["commit","自分をある行動・状態に送り込み、確定させる","v","決めた行動へ自分を送り込む","commit action decision"],
["compare","複数のものを並べ、違い・共通点を見比べる","v","横に並べて違いを見る","compare two things"],
["complain","不満を外へ訴える","v","不満を外へ押し出す","complain complaint"],
["complex","多くの要素が絡み合い、単純ではない","a","要素が絡み合っている","complex system"],
["concentrate","注意や力を一点へ集める","v","散った力を一点に集める","concentrate focus"],
["confirm","不確かなものを照合し、確かだとする","v","照合して確定する","confirm check"],
["consider","対象を頭の中に置き、判断材料として扱う","v","頭の中に置いて考える","consider think"],
["contain","何かを内側に収め、外へ出さない","v","内側に収める","contain container"],
["contract","条件を定め、複数者を結びつける","n/v","条件で人や物を結びつける","contract agreement"],
["contribute","全体に対して自分の一部を差し出す","v","全体へ自分の一部を足す","contribute teamwork"],
["crop","全体から一部分を切り取る","n/v","全体から一部を切り出す","crop photograph"],
["cruel","相手の苦痛を顧みず傷つける","a","苦痛を顧みない","cruel behavior"],
["debate","異なる主張をぶつけ合って論じる","n/v","主張をぶつけて論じる","debate discussion"],
["deny","そうではないと認めることを拒む","v","認めることを拒む","deny refusal"],
["desire","欲しいものへ強く心が向く","n/v","欲しいものへ心が向く","desire want"],
["disturb","平常の状態を乱す・邪魔する","v","平常を乱す","disturb interruption"],
["efficient","無駄を減らし、少ない資源で結果を出す","a","少ない資源で結果を出す","efficient work"],
["emphasize","重要な部分を目立たせる","v","重要部分を強く目立たせる","emphasize highlight"],
["encourage","相手が進めるよう後押しする","v","進めるよう背中を押す","encourage support"],
["exist","そこに実際に存在している","v","実際にそこにある","exist presence"],
["get","何かを得る／ある状態・結果に至る","v","状態や結果に至る","get become understand"],
["abandon","人・物・計画などを手放して離れる／続けるのをやめる","v","手放して離れる・続けるのをやめる","abandon leaving something"],
["with","〜と一緒に／〜で／〜を持つなど（文脈による）","prep","後ろの名詞句が主語や動作とどう関係するかを示す","with person scissors blue eyes"],
["about","〜について／〜の周辺に／およそ。be about to do は「まさに〜しようとしている」","prep/ad/a/conj","対象・範囲・概数などを表す。be about to do は独立した構文として扱う","about surrounding topic approximate"],
["arm","肩から手までの腕／機械などの腕・組織の部門。動詞では武装させる","n/v","身体の腕、機械の腕、組織の部門。動詞は武器を装備させる","human arm shoulder hand mechanical arm"],
["attend","行事・学校などに出席する。attend to は注意を向ける／対処する・世話をする","v","ある場に出る。attend to は対象に注意や対応を向ける構文","attend class meeting take care"],
["associate","関連づける／仲間・同僚／関連した・共同の。associate professor は准教授","v/n/a","人・物・考えを結びつける。名詞・形容詞用法も区別する","associate connection colleague related"]
].map(([word,translation,pos,coreImage,imageSearch],i)=>({id:i+1,word,translation,pos,coreImage,imageSearch}));
// VEN度 metadata. The original 27 note IDs remain unchanged.
const HIGH_VEN_WORDS = [{"word":"appropriate","ven":20},{"word":"appreciate","ven":19},{"word":"aspect","ven":19},{"word":"atmosphere","ven":19},{"word":"attempt","ven":19},{"word":"available","ven":19},{"word":"abandon","ven":18},{"word":"account","ven":18},{"word":"adapt","ven":18},{"word":"admire","ven":18},{"word":"admit","ven":18},{"word":"advance","ven":18},{"word":"aesthetic","ven":18},{"word":"affect","ven":18},{"word":"affluence","ven":18},{"word":"afford","ven":18},{"word":"aim","ven":18},{"word":"ancestor","ven":18},{"word":"apply","ven":18},{"word":"approach","ven":18},{"word":"argue","ven":18},{"word":"arrest","ven":18},{"word":"associate","ven":18},{"word":"assume","ven":18},{"word":"attach","ven":18},{"word":"attitude","ven":18},{"word":"avoid","ven":18},{"word":"awful","ven":18},{"word":"absorb","ven":17},{"word":"abstract","ven":17},{"word":"accurate","ven":17},{"word":"achieve","ven":17},{"word":"adequate","ven":17},{"word":"adjust","ven":17},{"word":"adopt","ven":17},{"word":"aggressive","ven":17},{"word":"allow","ven":17},{"word":"amount","ven":17},{"word":"annual","ven":17},{"word":"apologize","ven":17},{"word":"arise","ven":17},{"word":"article","ven":17},{"word":"artificial","ven":17},{"word":"ashamed","ven":17},{"word":"authority","ven":17},{"word":"award","ven":17},{"word":"abundant","ven":16},{"word":"abuse","ven":16},{"word":"accept","ven":16},{"word":"access","ven":16},{"word":"accompany","ven":16},{"word":"accomplish","ven":16},{"word":"accuse","ven":16},{"word":"acquaintance","ven":16},{"word":"acquire","ven":16},{"word":"add","ven":16},{"word":"administration","ven":16},{"word":"advantage","ven":16},{"word":"agriculture","ven":16},{"word":"alternative","ven":16},{"word":"annoy","ven":16},{"word":"anxious","ven":16},{"word":"appeal","ven":16},{"word":"appetite","ven":16},{"word":"attend","ven":16},{"word":"attribute","ven":16},{"word":"author","ven":16},{"word":"aware","ven":16},{"word":"abolish","ven":15},{"word":"absurd","ven":15},{"word":"accumulate","ven":15},{"word":"acknowledge","ven":15},{"word":"advertise","ven":15},{"word":"agree","ven":15},{"word":"alter","ven":15},{"word":"announce","ven":15},{"word":"architecture","ven":15},{"word":"assign","ven":15},{"word":"audience","ven":15},{"word":"average","ven":15},{"word":"awkward","ven":15},{"word":"address","ven":14},{"word":"amaze","ven":14},{"word":"ambiguous","ven":14},{"word":"ancient","ven":14},{"word":"anticipate","ven":14},{"word":"approve","ven":14},{"word":"arrange","ven":14},{"word":"assemble","ven":14},{"word":"assert","ven":14},{"word":"astronomy","ven":14},{"word":"attain","ven":14},{"word":"attract","ven":14},{"word":"aid","ven":13},{"word":"alarm","ven":13},{"word":"alert","ven":13},{"word":"alien","ven":13},{"word":"amuse","ven":13},{"word":"anniversary","ven":13},{"word":"appear","ven":13},{"word":"assess","ven":13},{"word":"assure","ven":13},{"word":"astonish","ven":13},{"word":"academic","ven":12},{"word":"active","ven":12},{"word":"acute","ven":12},{"word":"agent","ven":12},{"word":"alike","ven":12},{"word":"ape","ven":12},{"word":"apparent","ven":12},{"word":"appointment","ven":12},{"word":"acid","ven":11},{"word":"actually","ven":11},{"word":"ally","ven":11},{"word":"ambassador","ven":11},{"word":"ambulance","ven":11},{"word":"analysis","ven":11},{"word":"analyze","ven":11},{"word":"appoint","ven":11},{"word":"approximately","ven":11},{"word":"apt","ven":11},{"word":"assault","ven":11},{"word":"awake","ven":11},{"word":"absolutely","ven":10},{"word":"accommodate","ven":10},{"word":"adviser","ven":10},{"word":"affluent","ven":10},{"word":"altitude","ven":10},{"word":"ambition","ven":10},{"word":"ample","ven":10},{"word":"arctic","ven":10},{"word":"arrogant","ven":10},{"word":"asset","ven":10},{"word":"assist","ven":10},{"word":"athlete","ven":10}];
for (const entry of HIGH_VEN_WORDS) {
  const existing = WORDS.find(w => w.word.toLowerCase() === entry.word.toLowerCase());
  if (existing) { existing.ven = entry.ven; continue; }
  WORDS.push({
    id: WORDS.length + 1,
    word: entry.word,
    translation: "意味データ登録待ち",
    pos: "未登録",
    coreImage: "語義・コアイメージ登録待ち",
    imageSearch: entry.word,
    ven: entry.ven,
    pending: true
  });
}
for (const [word, ven] of Object.entries({"abandon":18,"associate":18,"attend":16,"about":3,"arm":3})) {
  const existing = WORDS.find(w => w.word.toLowerCase() === word);
  if (existing) existing.ven = ven;
}
function compareByVEN(a,b) {
  const av = Number.isFinite(a.ven) ? a.ven : -1;
  const bv = Number.isFinite(b.ven) ? b.ven : -1;
  return bv - av || a.word.localeCompare(b.word);
}
function sortedReviewWords() {
  return WORDS.filter(w => !w.pending).slice().sort(compareByVEN);
}


const KEY="vocabOS_v02";
const saved=JSON.parse(localStorage.getItem(KEY)||"{}");
let pageSize=Number(saved.pageSize)||10;
let sessionPages=Number(saved.sessionPages)||1;
let mode=saved.mode==="sheet"||!saved.mode?"swipe":saved.mode;
let order=sortedReviewWords().map(w=>w.id);
let states=saved.states||{};
// 評価履歴(states)と、今回の復習セッション内の評価(sessionStates)を分離する。
let sessionStates={};
let notesById=saved.notes||{};
let reviewPageIndex=0;
let sessionStartPage=1;
let sessionWordIds=[];
let resultIds=[];

const $=s=>document.querySelector(s);
const pageSizeEl=$("#pageSize"),sessionPagesEl=$("#sessionPages"),list=$("#wordList");

function save(){localStorage.setItem(KEY,JSON.stringify({pageSize,sessionPages,mode,order,states,notes:notesById}));}
function pageCount(){return Math.max(1,Math.ceil(order.length/pageSize))}
function pageIds(p){const n=p||1;return order.slice((n-1)*pageSize,n*pageSize)}
function wordsFor(p){const ids=new Set(pageIds(p));return order.filter(id=>ids.has(id)).map(id=>WORDS[id-1])}
function showView(id){["homeView","notesView","setupView","reviewView","resultView"].forEach(x=>$("#"+x).classList.toggle("hidden",x!==id));}
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
  order=sortedReviewWords().map(w=>w.id);
  reviewPageIndex=0;
  sessionStartPage=1;
  sessionWordIds=[];
  sessionStates={};
  showView("reviewView");
  renderReviewPage();
}
function currentReviewPage(){return reviewPageIndex+1}
function allEvaluated(ids){return ids.every(id=>!!sessionStates[id])}
function renderReviewPage(){
  const p=currentReviewPage(), ids=pageIds(p), ws=wordsFor(p);
  sessionWordIds=[...new Set([...sessionWordIds,...ids])];
  list.innerHTML="";
  ws.forEach((w,i)=>{
    const state=sessionStates[w.id]||"";
    const el=document.createElement("article");
    el.className="word"; el.id="word-"+w.id;
    const img=imageCueMarkup(w);
    const answer='<div class="swipe-answer"><div class="translation">'+w.translation+'</div><div class="core-line">コアイメージ：'+w.coreImage+'</div></div>';
    const swipe='<div class="swipe-target"><div class="word-head"><h3>'+w.word+'</h3><span class="pos">'+w.pos+'</span></div></div>'+answer;
    const imageAnswer='<div class="image-answer"><div class="word-head"><h3>'+w.word+'</h3><span class="pos">'+w.pos+'</span></div><div class="translation">'+w.translation+'</div><div class="core-line">コアイメージ：'+w.coreImage+'</div></div>';
    el.innerHTML=mode==="image"
      ? img+'<button class="image-reveal" type="button">答えを見る</button>'+imageAnswer
      : swipe;
    if(mode==="image"){
      el.querySelector(".image-reveal").onclick=e=>{e.currentTarget.style.display="none";el.querySelector(".image-answer").classList.add("revealed");};
    }else{
      const target=el.querySelector(".swipe-target"),answerEl=el.querySelector(".swipe-answer");
      let startX=0,startY=0;
      target.addEventListener("touchstart",e=>{
        const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY;
      },{passive:true});
      target.addEventListener("touchend",e=>{
        const t=e.changedTouches[0],dx=t.clientX-startX,dy=Math.abs(t.clientY-startY);
        if(dx>55&&dx>dy*1.2){
          answerEl.classList.add("revealed");
          target.classList.add("revealed");
        }
      },{passive:true});
    }
    const row=document.createElement("div"); row.className="state-row";
    ["即答","遅い","曖昧","不正解"].forEach(s=>{const b=document.createElement("button");b.textContent=s;b.dataset.state=s;if(state===s)b.classList.add("active");b.onclick=()=>setState(w.id,s);row.appendChild(b)});
    el.appendChild(row); list.appendChild(el);
  });
  $("#progressText").textContent=(reviewPageIndex*pageSize+ids.length)+" / "+Math.min(sessionPages*pageSize,order.length)+"語";
  $("#pageText").textContent="Page "+p+" / "+sessionPages;
  $("#progressBar").style.width=(p/sessionPages*100)+"%";
  $("#modeHint").textContent=mode==="swipe"?"スペルを右へスワイプすると、意味とコアイメージが出ます。":"画像を手掛かりに単語を想起。答えを見てから自己評価します.";
  renderToc();
  window.scrollTo({top:0,behavior:"instant"});
}
function setState(id,state){
  sessionStates[id]=state;
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
  resultIds=sessionWordIds.filter(id=>sessionStates[id]&&sessionStates[id]!=="即答");
  resultIds.sort((a,b)=>severity(sessionStates[b])-severity(sessionStates[a]));
  renderResults();
  showView("resultView");
  window.scrollTo({top:0,behavior:"instant"});
}
function severity(s){return s==="不正解"?3:s==="曖昧"?2:s==="遅い"?1:0}
function imageUrl(w){const note=notesById[w.id]||{};return note.imageDataUrl||note.imageUrl||""}
function renderResults(){
  const weak=resultIds.length;
  $("#resultSummary").textContent=weak?weak+"語が今回の再接触対象です。":"今回はすべて即答でした。";
  $("#resultList").innerHTML=resultIds.length?resultIds.map(id=>{
    const w=WORDS[id-1],s=sessionStates[id];
    return '<article class="result-card">'+imageCueMarkup(w)+'<div class="result-meta"><div class="result-word">'+w.word+'</div><span class="status">'+s+'</span></div><div class="result-label">コアイメージ</div><div class="result-core">'+w.coreImage+'</div></article>';
  }).join(""):'<section class="card"><strong>苦手語はありません。</strong><p class="hint">今回の接触はここで完了です。</p></section>';
  $("#finishBtn").disabled=true;
  $("#finishHint").textContent="一番下までスクロールすると終了できます。";
}
function enableFinish(){if(!$("#resultView").classList.contains("hidden")){$("#finishBtn").disabled=false;$("#finishHint").textContent="ここまで見たら終了できます。";}}
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

showView("homeView");

/* Shared word selection and learning flow for Vocab OS. */
(function(){
  "use strict";

  const STORAGE_KEY = "vocabOS_learning_v1";
  const DEFAULT_WORD_COUNT = 5;
  const MAX_WORD_COUNT = 20;
  const CRITERIA = [
    {id:"ven",label:"VEN度",description:"VEN度が高い単語を優先"},
    {id:"etymology",label:"語源・分解",description:"語源・分解情報が登録された単語を優先"},
    {id:"collocation",label:"コロケーション",description:"具体的な用法パターンが登録された単語を優先"},
    {id:"memory",label:"記憶度",description:"完了テストで想起が不安定だった単語を優先"},
    {id:"weak",label:"苦手マーク",description:"自分で苦手に指定した単語を優先"},
    {id:"random",label:"無作為",description:"同じ評価の単語の中からランダムに選択"}
  ];

  let store = {records:{},activeSession:null,pendingSelection:null,wordCount:DEFAULT_WORD_COUNT};
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
    if(parsed && typeof parsed==="object"){
      store.records = parsed.records && typeof parsed.records==="object" ? parsed.records : {};
      store.activeSession = parsed.activeSession || null;
      store.pendingSelection = parsed.pendingSelection || null;
      store.wordCount = Number(parsed.wordCount)||DEFAULT_WORD_COUNT;
    }
  } catch(error) {
    console.warn("Learning data could not be loaded.",error);
  }

  let setupMode = "first";
  let timerId = null;
  let timerEndAt = 0;
  let timerRemaining = 10000;
  let reviewFinishHandled = false;

  function saveLearning(){
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(store)); }
    catch(error){ console.warn("Learning data could not be saved.",error); }
    refreshResumeButton();
  }
  function recordFor(id){
    if(!store.records[id]) store.records[id]={weak:false,completedFirstRun:false,scores:{},attempts:0};
    return store.records[id];
  }
  function byId(id){return WORDS.find(function(w){return w.id===Number(id);});}
  function safeText(value){
    return String(value==null?"":value).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function view(id){
    document.querySelectorAll("main").forEach(function(node){node.classList.toggle("hidden",node.id!==id);});
    window.scrollTo({top:0,behavior:"instant"});
  }
  function setSetupMessage(text){
    const el=document.getElementById("learningEligibility");
    if(el)el.textContent=text;
  }
  function hasEtymology(w){
    const n=noteFor(w);
    const text=String(n.decomp||"").trim();
    return !!text && text!=="語源情報は未登録です。" && text!=="語源情報は未登録";
  }
  function usageItems(w){
    const data=USAGE_COMPONENTS[w.id];
    return data && Array.isArray(data.items) ? data.items : [];
  }
  function usageReference(w){
    const n=noteFor(w);
    const items=usageItems(w);
    if(!items.length)return String(n.usage||"").trim();
    return items.flatMap(function(item){
      const options=(item.options&&item.options.length)?item.options:[item];
      return options.map(function(option){
        const parts=(item.parts||[]).map(function(part){
          if(part && typeof part==="object"){
            if(part.choice)return option.label||option.value||"選択";
            return String(part.text||part.label||part.value||"");
          }
          return String(part);
        });
        const explanation=option.explanation||option.meaning||item.explanation||"";
        return parts.join(" ") + (explanation ? " — "+explanation : "");
      });
    }).join("\n");
  }
  function exampleReference(w){
    const n=noteFor(w);
    return {en:String(n.example||"").trim(),ja:String(n.ja||"").trim()};
  }
  function memoryWeakness(id){
    const scores=recordFor(id).scores||{};
    const values=Object.values(scores).filter(function(v){return v==="good"||v==="partial"||v==="retry";});
    if(!values.length)return null;
    const mean=values.reduce(function(sum,v){return sum+(v==="good"?2:v==="partial"?1:0);},0)/values.length;
    return 2-mean;
  }
  function eligibleWords(mode){
    return WORDS.filter(function(w){
      if(w.pending)return false;
      const r=recordFor(w.id);
      if(mode==="first")return !r.completedFirstRun || !!r.weak;
      return !!r.completedFirstRun;
    });
  }
  function refreshEligibility(){
    const candidates=eligibleWords(setupMode);
    const label=setupMode==="first"?"初見単語・苦手単語":"初見モード完了済みの単語";
    if(!candidates.length){
      setSetupMessage(label+"は現在0語です。");
      const choose=document.getElementById("chooseLearningWords");
      if(choose)choose.disabled=true;
      return;
    }
    setSetupMessage("選択可能："+candidates.length+"語（"+label+"）");
    const choose=document.getElementById("chooseLearningWords");
    if(choose)choose.disabled=false;
  }
  function selectedCriteria(){
    return Array.from(document.querySelectorAll("[data-learning-criterion]:checked")).map(function(el){return el.dataset.learningCriterion;});
  }
  function getSelection(mode,count,criteria){
    const candidates=eligibleWords(mode);
    const maxVen=Math.max(1,...candidates.map(function(w){return Number(w.ven)||0;}));
    const scored=candidates.map(function(w){
      const n=noteFor(w),r=recordFor(w.id);
      let hits=0,strength=0;
      if(criteria.includes("ven") && Number.isFinite(w.ven)){
        hits++;strength+=Number(w.ven)/maxVen;
      }
      if(criteria.includes("etymology") && hasEtymology(w)){hits++;strength+=1;}
      if(criteria.includes("collocation") && usageItems(w).length){hits++;strength+=1;}
      if(criteria.includes("memory")){
        const weakness=memoryWeakness(w.id);
        if(weakness!==null && weakness>0){hits++;strength+=weakness/2;}
      }
      if(criteria.includes("weak") && r.weak){hits++;strength+=1;}
      return {word:w,hits:hits,strength:strength,random:Math.random()};
    });
    scored.sort(function(a,b){
      return b.hits-a.hits || b.strength-a.strength || a.random-b.random;
    });
    return scored.slice(0,Math.min(count,scored.length)).map(function(item){return item.word.id;});
  }
  function criteriaNamesFor(w,criteria){
    const tags=[];
    if(criteria.includes("ven")&&Number.isFinite(w.ven))tags.push("VEN度");
    if(criteria.includes("etymology")&&hasEtymology(w))tags.push("語源");
    if(criteria.includes("collocation")&&usageItems(w).length)tags.push("コロケーション");
    if(criteria.includes("memory")&&memoryWeakness(w.id)>0)tags.push("記憶");
    if(criteria.includes("weak")&&recordFor(w.id).weak)tags.push("苦手");
    if(criteria.includes("random"))tags.push("無作為");
    return tags;
  }
  function refreshEligibility(){
    const pool=eligibleWords(setupMode);
    const countEl=document.getElementById("learningEligibility");
    const label=setupMode==="first"?"初見単語または苦手マーク済み":"初見モード完了済み";
    if(countEl)countEl.textContent=label+"：現在 "+pool.length+" 語が選択対象";
  }
  function renderPreview(ids,criteria){
    const panel=document.getElementById("learningSelectionPreview");
    const start=document.getElementById("startLearningSelection");
    if(!panel||!start)return;
    if(!ids.length){
      panel.innerHTML='<p class="learning-empty">この条件で選べる単語がありません。</p>';
      start.disabled=true;
      return;
    }
    panel.innerHTML='<p class="learning-preview-title">'+ids.length+'語を選びました</p><ol class="learning-preview-list">'+ids.map(function(id){
      const w=byId(id),tags=criteriaNamesFor(w,criteria);
      return '<li><strong>'+safeText(w.word)+'</strong><small>'+(Number.isFinite(w.ven)?"VEN度 "+w.ven:"VEN度未設定")+(tags.length?" · "+safeText(tags.join(" / ")):"")+'</small></li>';
    }).join("")+'</ol>';
    start.disabled=false;
  }
  function openSetup(mode){
    if(store.activeSession){
      alert("進行中の学習があります。先に「学習を再開」してください。");
      return;
    }
    setupMode=mode==="review"?"review":"first";
    store.pendingSelection=null;
    const title=document.getElementById("learningSetupTitle");
    const description=document.getElementById("learningSetupDescription");
    const start=document.getElementById("startLearningSelection");
    if(title)title.textContent=setupMode==="first"?"初見モード":"復習モード";
    if(description)description.textContent=setupMode==="first"
      ?"初見単語、または自分で苦手にした単語だけが対象です。"
      :"初見モードを完了した単語だけが対象です。未完了の初見単語は含まれません。";
    document.querySelectorAll("[data-learning-criterion]").forEach(function(el){el.checked=false;});
    const count=document.getElementById("learningWordCount");
    if(count)count.value=String(Math.min(MAX_WORD_COUNT,Math.max(1,store.wordCount||DEFAULT_WORD_COUNT)));
    const panel=document.getElementById("learningSelectionPreview");
    if(panel)panel.innerHTML="";
    if(start)start.disabled=true;
    refreshEligibility();
    view("learningSetupView");
  }
  function makeSession(mode,ids){
    return {
      kind:mode,
      phase:mode==="first"?"intro":"review",
      wordIds:ids.slice(),
      index:0,
      remainingMs:10000,
      reviewStates:{},
      reviewPageIndex:0,
      answers:{},
      testGrades:{}
    };
  }
  function beginReviewPhase(resuming){
    const session=store.activeSession;
    if(!session)return;
    session.phase="review";
    reviewFinishHandled=false;
    order=session.wordIds.slice();
    pageSize=Math.max(1,session.wordIds.length);
    sessionPages=1;
    reviewPageIndex=Number(session.reviewPageIndex)||0;
    sessionStartPage=1;
    sessionWordIds=[];
    sessionStates={...(session.reviewStates||{})};
    if(Object.keys(sessionStates).length){
      sessionWordIds=session.wordIds.filter(function(id){return !!sessionStates[id];});
    }
    saveLearning();
    view("reviewView");
    const pause=document.getElementById("learningReviewPause");
    if(pause)pause.classList.remove("hidden");
    renderReviewPage();
    if(session.wordIds.every(function(id){return !!sessionStates[id];}))finishReview();
  }
  function startSelectedSession(){
    const ids=store.pendingSelection||[];
    if(!ids.length)return;
    store.wordCount=ids.length;
    const mode=setupMode;
    store.activeSession=makeSession(mode,ids);
    store.pendingSelection=null;
    saveLearning();
    if(mode==="first")renderIntroWord();
    else beginReviewPhase(false);
  }
  function stopIntroTimer(persist){
    if(timerId!==null){clearInterval(timerId);timerId=null;}
    if(timerEndAt){
      timerRemaining=Math.max(0,timerEndAt-Date.now());
      timerEndAt=0;
    }
    if(store.activeSession && store.activeSession.phase==="intro"){
      store.activeSession.remainingMs=timerRemaining;
      if(persist!==false)saveLearning();
    }
  }
  function startIntroTimer(){
    stopIntroTimer(false);
    const session=store.activeSession;
    if(!session || session.phase!=="intro" || document.hidden)return;
    timerRemaining=Math.max(0,Number(session.remainingMs)||10000);
    timerEndAt=Date.now()+timerRemaining;
    const fill=document.getElementById("learningTimerFill");
    const text=document.getElementById("learningTimerText");
    const update=function(){
      const remaining=Math.max(0,timerEndAt-Date.now());
      if(fill)fill.style.width=(remaining/10000*100)+"%";
      if(text)text.textContent=(remaining/1000).toFixed(1)+"秒";
      if(remaining<=0){
        stopIntroTimer(false);
        if(store.activeSession)store.activeSession.remainingMs=10000;
        advanceIntro();
      }
    };
    update();
    if(timerEndAt)timerId=setInterval(update,100);
  }
  function renderLearningNote(id,kind){
    const list=document.getElementById("notesListPanel");
    const detail=document.getElementById("noteDetailPanel");
    if(!list||!detail)return;
    view("notesView");
    list.classList.remove("hidden");
    detail.classList.add("hidden");
    if(typeof openNote!=="function")return;
    openNote(id,false);
    list.classList.add("hidden");
    const back=detail.querySelector("#noteBack");
    if(back)back.remove();
    const session=store.activeSession;
    const word=byId(id);
    let nav="";
    if(kind==="intro"){
      const index=session.index+1,total=session.wordIds.length;
      nav='<section class="learning-nav"><div class="learning-nav-top"><strong>初回閲覧 '+index+' / '+total+'</strong><span id="learningTimerText">10.0秒</span></div><div class="learning-timer"><div id="learningTimerFill"></div></div><p class="hint">10秒で自動的に次へ進みます。読み終えたら手動で進めても構いません。</p><div class="learning-nav-actions"><button type="button" class="subtle-btn" id="learningPause">中断してホームへ</button><button type="button" class="primary-btn" id="learningNext">次の単語</button></div></section>';
    }else{
      const index=session.index+1,total=session.wordIds.length;
      nav='<section class="learning-nav"><div class="learning-nav-top"><strong>自由閲覧 '+index+' / '+total+'</strong><span>時間制限なし</span></div><p class="hint">ノートを見比べながら、必要な単語へ行き来できます。</p><div class="learning-nav-actions"><button type="button" class="subtle-btn" id="learningPause">中断してホームへ</button><button type="button" id="learningPrev" '+(session.index===0?"disabled":"")+'>前の単語</button><button type="button" class="primary-btn" id="learningNext" '+(session.index>=total-1?"disabled":"")+'>次の単語</button></div><button type="button" class="primary-btn learning-test-entry" id="learningStartTest">完了テストへ</button></section>';
    }
    detail.insertAdjacentHTML("afterbegin",nav);
    const pause=document.getElementById("learningPause");
    if(pause)pause.onclick=pauseLearning;
    const next=document.getElementById("learningNext");
    if(next)next.onclick=kind==="intro"?advanceIntro:nextBrowse;
    const prev=document.getElementById("learningPrev");
    if(prev)prev.onclick=previousBrowse;
    const test=document.getElementById("learningStartTest");
    if(test)test.onclick=startTestPhase;
    refreshWeakToggles();
    if(kind==="intro")startIntroTimer();
  }
  function renderIntroWord(){
    const session=store.activeSession;
    if(!session || session.phase!=="intro")return;
    const id=session.wordIds[session.index];
    if(!id){beginReviewPhase(false);return;}
    if(!Number.isFinite(Number(session.remainingMs))||session.remainingMs<=0)session.remainingMs=10000;
    timerRemaining=session.remainingMs;
    renderLearningNote(id,"intro");
  }
  function advanceIntro(){
    stopIntroTimer(false);
    const session=store.activeSession;
    if(!session || session.phase!=="intro")return;
    session.index++;
    session.remainingMs=10000;
    if(session.index>=session.wordIds.length){beginReviewPhase(false);return;}
    saveLearning();
    renderIntroWord();
  }
  function startBrowsePhase(){
    const session=store.activeSession;
    if(!session)return;
    session.phase="browse";
    session.index=0;
    saveLearning();
    renderBrowseWord();
  }
  function renderBrowseWord(){
    const session=store.activeSession;
    if(!session || session.phase!=="browse")return;
    const id=session.wordIds[session.index];
    if(!id){startTestPhase();return;}
    renderLearningNote(id,"browse");
    saveLearning();
  }
  function nextBrowse(){
    const session=store.activeSession;
    if(!session || session.phase!=="browse")return;
    if(session.index<session.wordIds.length-1){session.index++;renderBrowseWord();}
  }
  function previousBrowse(){
    const session=store.activeSession;
    if(!session || session.phase!=="browse")return;
    if(session.index>0){session.index--;renderBrowseWord();}
  }
  function pauseLearning(){
    const session=store.activeSession;
    if(!session)return;
    if(session.phase==="review" && session.wordIds.every(function(id){return !!sessionStates[id];})){
      finishReview();
      return;
    }
    if(session.phase==="intro")stopIntroTimer(true);
    if(session.phase==="review"){
      session.reviewStates={...sessionStates};
      session.reviewPageIndex=reviewPageIndex;
    }
    saveLearning();
    const pause=document.getElementById("learningReviewPause");
    if(pause)pause.classList.add("hidden");
    view("homeView");
  }
  function refreshResumeButton(){
    const button=document.getElementById("resumeLearningBtn");
    if(!button)return;
    button.classList.toggle("hidden",!store.activeSession);
    if(store.activeSession){
      const phases={intro:"初回閲覧",review:"復習",browse:"自由閲覧",test:"完了テスト"};
      button.textContent=(phases[store.activeSession.phase]||"学習")+"を再開";
    }
  }
  function resumeLearning(){
    const session=store.activeSession;
    if(!session)return;
    if(session.phase==="intro")renderIntroWord();
    else if(session.phase==="review")beginReviewPhase(true);
    else if(session.phase==="browse")renderBrowseWord();
    else if(session.phase==="test")renderTestWord();
    else {store.activeSession=null;saveLearning();view("homeView");}
  }
  function collocationPrompt(w){
    const n=noteFor(w);
    return usageReference(w) || String(n.usage||"").trim();
  }
  function testItemMarkup(id,title,prompt,reference,draft,gradeKey){
    if(!reference)return "";
    return '<section class="learning-test-item"><h3>'+safeText(title)+'</h3><p class="learning-test-prompt">'+safeText(prompt)+'</p><textarea class="learning-answer" rows="3" data-answer="'+safeText(gradeKey)+'" placeholder="思い出した内容を自由に書く">'+safeText(draft||"")+'</textarea><details class="learning-reference"><summary>答え・基準を確認</summary><pre>'+safeText(reference)+'</pre></details><label class="learning-grade-label">自己採点<select data-grade="'+safeText(gradeKey)+'"><option value="">採点を選ぶ</option><option value="good">できた</option><option value="partial">一部できた</option><option value="retry">できなかった</option></select></label></section>';
  }
  function testItemsFor(w){
    const n=noteFor(w);
    const core=effectiveCoreImage(w,n);
    const collocation=collocationPrompt(w);
    const example=exampleReference(w);
    const items=[];
    if(core)items.push({key:"core",title:"コアイメージ",prompt:"この単語のコアイメージを自分の言葉で書く。",reference:core});
    if(collocation)items.push({key:"collocation",title:"コロケーション・語法",prompt:"思い出せる語のつながりや構文を書き出す。",reference:collocation});
    if(example.en && example.ja)items.push({key:"translation",title:"例文の和訳",prompt:example.en,reference:example.ja});
    return items;
  }
  function renderTestWord(){
    const session=store.activeSession;
    if(!session || session.phase!=="test")return;
    const id=session.wordIds[session.index],w=byId(id);
    if(!w){completeLearning();return;}
    const items=testItemsFor(w);
    const savedAnswers=session.answers[id]||{};
    const drafts=savedAnswers.drafts||{};
    const grades=savedAnswers.grades||{};
    const html='<section class="card learning-test-head"><div class="learning-nav-top"><strong>完了テスト '+(session.index+1)+' / '+session.wordIds.length+'</strong><button type="button" class="subtle-btn" id="learningPauseTest">中断してホームへ</button></div><h2>'+safeText(w.word)+'</h2><p class="hint">答えを見ずに自由記述し、参考を確認して自分で採点してください。</p></section>'+
      items.map(function(item){return testItemMarkup(id,item.title,item.prompt,item.reference,drafts[item.key],item.key);}).join("")+
      '<button type="button" class="primary-btn learning-test-next" id="learningSubmitTest">採点して次へ</button>';
    const panel=document.getElementById("learningTestContent");
    panel.innerHTML=html;
    panel.querySelector("#learningPauseTest").onclick=pauseLearning;
    panel.querySelectorAll("[data-answer]").forEach(function(field){
      field.addEventListener("input",function(){
        if(!session.answers[id])session.answers[id]={drafts:{},grades:{}};
        session.answers[id].drafts[field.dataset.answer]=field.value;
        saveLearning();
      });
    });
    panel.querySelectorAll("[data-grade]").forEach(function(select){
      select.value=grades[select.dataset.grade]||"";
      select.addEventListener("change",function(){
        if(!session.answers[id])session.answers[id]={drafts:{},grades:{}};
        session.answers[id].grades[select.dataset.grade]=select.value;
        saveLearning();
      });
    });
    panel.querySelector("#learningSubmitTest").onclick=submitTestForWord;
    view("learningTestView");
  }
  function startTestPhase(){
    const session=store.activeSession;
    if(!session)return;
    session.phase="test";
    session.index=0;
    saveLearning();
    renderTestWord();
  }
  function submitTestForWord(){
    const session=store.activeSession;
    if(!session)return;
    const id=session.wordIds[session.index],w=byId(id);
    if(!w)return;
    const items=testItemsFor(w);
    const response=session.answers[id]||{drafts:{},grades:{}};
    const missing=items.filter(function(item){return !response.grades||!response.grades[item.key];});
    if(missing.length){
      alert("各項目の自己採点を選んでください。");
      return;
    }
    const r=recordFor(id);
    r.scores={...(r.scores||{}),...response.grades};
    r.attempts=(Number(r.attempts)||0)+1;
    r.lastTestAt=Date.now();
    session.index++;
    saveLearning();
    if(session.index>=session.wordIds.length){completeLearning();return;}
    renderTestWord();
  }
  function completeLearning(){
    const session=store.activeSession;
    if(session && session.kind==="first"){
      session.wordIds.forEach(function(id){
        const r=recordFor(id);
        r.completedFirstRun=true;
        r.firstRunCompletedAt=Date.now();
      });
    }
    store.activeSession=null;
    saveLearning();
    const title=document.getElementById("learningDoneTitle");
    const summary=document.getElementById("learningDoneSummary");
    if(title)title.textContent="学習を完了しました";
    if(summary)summary.textContent="今回の "+(session?session.wordIds.length:0)+" 語は、初見学習の完了テストまで終了しました。次回から復習モードの対象になります。";
    view("learningDoneView");
  }
  window.learningBadgeFor=function(id){
    const r=recordFor(Number(id));
    const tags=[];
    if(r.weak)tags.push("苦手");
    if(r.completedFirstRun)tags.push("初見済み");
    return tags.length?" · "+tags.join(" / "):"";
  };
  function refreshWeakToggles(){
    document.querySelectorAll("[data-weak-toggle]").forEach(function(button){
      const id=Number(button.dataset.weakToggle);
      const weak=!!recordFor(id).weak;
      button.textContent=weak?"苦手を解除":"苦手にする";
      button.classList.toggle("is-weak",weak);
      button.setAttribute("aria-pressed",String(weak));
    });
  }
  window.syncWeakToggleButtons=refreshWeakToggles;

  const baseSetState=setState;
  setState=function(id,state){
    if(store.activeSession && store.activeSession.phase==="review"){
      store.activeSession.reviewStates={...(store.activeSession.reviewStates||{}),[id]:state};
      saveLearning();
    }
    return baseSetState(id,state);
  };
  const baseFinishReview=finishReview;
  finishReview=function(){
    if(reviewFinishHandled)return;
    const session=store.activeSession;
    if(session && session.phase==="review"){
      reviewFinishHandled=true;
      if(session.kind==="first"){
        resultIds=sessionWordIds.filter(function(id){return sessionStates[id]&&sessionStates[id]!=="即答";});
        session.reviewStates={...sessionStates};
        startBrowsePhase();
        return;
      }
      if(session.kind==="review"){
        store.activeSession=null;
        saveLearning();
        baseFinishReview();
        return;
      }
    }
    if(session && (session.phase==="browse" || session.phase==="test"))return;
    reviewFinishHandled=true;
    baseFinishReview();
  };

  document.addEventListener("click",function(event){
    const button=event.target.closest("[data-weak-toggle]");
    if(!button)return;
    const id=Number(button.dataset.weakToggle);
    if(!id || !byId(id))return;
    const record=recordFor(id);
    record.weak=!record.weak;
    saveLearning();
    refreshWeakToggles();
  });
  document.addEventListener("visibilitychange",function(){
    if(!store.activeSession || store.activeSession.phase!=="intro")return;
    if(document.hidden)stopIntroTimer(true);
    else startIntroTimer();
  });
  window.addEventListener("pagehide",function(){if(store.activeSession && store.activeSession.phase==="intro")stopIntroTimer(true);});

  const firstButton=document.getElementById("firstModeBtn");
  const reviewButton=document.getElementById("reviewBtn");
  if(firstButton)firstButton.onclick=function(){openSetup("first");};
  if(reviewButton)reviewButton.onclick=function(){openSetup("review");};
  const back=document.getElementById("learningSetupBack");
  if(back)back.onclick=function(){view("homeView");};
  const choose=document.getElementById("chooseLearningWords");
  if(choose)choose.onclick=function(){
    const count=Math.max(1,Math.min(MAX_WORD_COUNT,Number(document.getElementById("learningWordCount").value)||DEFAULT_WORD_COUNT));
    const criteria=selectedCriteria();
    const ids=getSelection(setupMode,count,criteria);
    store.pendingSelection=ids;
    store.wordCount=count;
    saveLearning();
    renderPreview(ids,criteria);
  };
  const start=document.getElementById("startLearningSelection");
  if(start)start.onclick=startSelectedSession;
  const resume=document.getElementById("resumeLearningBtn");
  if(resume)resume.onclick=resumeLearning;
  const done=document.getElementById("learningDoneHome");
  if(done)done.onclick=function(){view("homeView");};
  const reviewPause=document.getElementById("learningReviewPause");
  if(reviewPause)reviewPause.onclick=pauseLearning;
  const finish=document.getElementById("finishBtn");
  if(finish)finish.addEventListener("click",function(){refreshResumeButton();});
  document.querySelectorAll("[data-learning-criterion]").forEach(function(el){
    el.addEventListener("change",function(){store.pendingSelection=null;const panel=document.getElementById("learningSelectionPreview");if(panel)panel.innerHTML="";const startButton=document.getElementById("startLearningSelection");if(startButton)startButton.disabled=true;});
  });
  const countInput=document.getElementById("learningWordCount");
  if(countInput)countInput.addEventListener("input",function(){store.pendingSelection=null;const panel=document.getElementById("learningSelectionPreview");if(panel)panel.innerHTML="";const startButton=document.getElementById("startLearningSelection");if(startButton)startButton.disabled=true;});
  refreshResumeButton();
  if(store.activeSession)refreshResumeButton();
})();

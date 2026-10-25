// Word-note module. Loaded after app.js so it can reuse WORDS, notesById, save(), showView() and imageUrl().
const NOTE_CONTENT = {
  1: { meaning:"自分をある行動・状態へ送り込み、引き受ける", usage:"commit to + 名詞 / 動名詞。「何かに自分を結びつける」感覚。commit a crime のように行為を実行する意味もある。", decomp:"ラテン語 committere（結びつける・委ねる）に由来。", example:"She committed herself to learning English.", ja:"彼女は英語を学ぶことに本腰を入れた。", mixed:"彼女は新しい学習計画に {{word}} した。", mixedToken:"commit", mixedTarget:"責任を持って取り組むと決めた", caution:"commit は「決める」だけでなく、約束や責任を引き受ける含みが出ることがある。" },
  2: { meaning:"複数のものを並べ、共通点や違いを見比べる", usage:"compare A with B：AとBを並べ、共通点・相違点を検討する。compare A to B：AをBになぞらえ、似ている点を示す。例：Compare this poem with that one.（2つの詩を比較して違いも検討する）／She compared his voice to the sound of rain.（声を雨音にたとえた）。⚠️ これは傾向で、完全な二分法ではない。with でも類似点を扱い、to でも比較の意味になることがある。文脈で判断する。", decomp:"ラテン語 comparare（比べる・並べる）に由来する。", example:"Compare the two plans before you decide.", ja:"決める前に、その2つの計画を比較しなさい。", mixed:"二つの案を並べて、長所と短所を {{word}} した。", mixedToken:"compare", mixedTarget:"比較", caution:"" },
  3: { meaning:"不満や苦情を言葉にして外へ出す", usage:"complain about + 対象 / complain to + 人。何について不満なのか、誰に言うのかを分ける。", decomp:"ラテン語 complangere（嘆き悲しむ）に由来する。", example:"He complained about the noise.", ja:"彼は騒音について苦情を言った。", mixed:"彼は店員に、商品の不具合について {{word}} した。", mixedToken:"complain", mixedTarget:"苦情を申し立て", caution:"complain は必ずしも「文句ばかり言う」という人格評価を含まない。" },
  4: { meaning:"多くの要素が絡み合い、単純には扱えない", usage:"a complex problem / a complex system。名詞 complex は「複合施設・複合体」など。", decomp:"ラテン語 complexus（絡み合ったもの）に由来し、com-（共に）+ plectere（編む・絡める）と関係する。", example:"The problem is more complex than it seems.", ja:"その問題は見た目より複雑だ。", mixed:"このゲームの攻略法は、見た目よりずっと {{word}} だ。", mixedToken:"complex", mixedTarget:"複雑", caution:"complex は「難しい」と完全に同義ではなく、要素や関係が入り組んでいることに焦点がある。" },
  5: { meaning:"注意・力・資源を一点へ集める", usage:"concentrate on + 対象。集中する先には on を使う。", decomp:"center（中心）と関連づけ、「中心へ集める」と覚える学習用の連想が役立つ。", example:"I can't concentrate on this task.", ja:"この作業に集中できない。", mixed:"騒がしい場所でも、彼女は課題に {{word}} できた。", mixedToken:"concentrate", mixedTarget:"集中", caution:"集中する対象を言うときは concentrate on が基本。" },
  6: { meaning:"照合して、不確かだったことを確かなものにする", usage:"confirm a booking / confirm that ...。情報・予定・事実などを確かめ、確定させる。", decomp:"firm（堅い）と関連づけ、「確かな状態にする」と捉える。", example:"Please confirm your email address.", ja:"メールアドレスを確認してください。", mixed:"予約を確定する前に、日時を {{word}} してください。", mixedToken:"confirm", mixedTarget:"確認", caution:"check は広く「確認する」、confirm は正しい・確かだと確定させるニュアンスが出やすい。" },
  7: { meaning:"対象を頭の中に置き、判断材料としてよく考える", usage:"consider doing（〜することを検討する）/ consider A (to be) B。", decomp:"ラテン語 considerare に由来する。現代英語では、対象を判断材料としてよく考える意味で使う。", example:"We're considering moving to Kyoto.", ja:"私たちは京都へ引っ越すことを検討している。", mixed:"彼らは新しい勉強法を {{word}} している。", mixedToken:"consider", mixedTarget:"検討", caution:"consider の後ろは通常、動名詞 doing。consider to do とはしない。" },
  8: { meaning:"何かを内側に収め、範囲の中に含む", usage:"contain A（Aを含む・収容する）。物理的な容器にも抽象的な内容にも使う。", decomp:"ラテン語 continere（中に保つ）に由来し、con-（共に・完全に）+ tenere（保つ）と関係する。", example:"This bottle contains clean water.", ja:"この瓶にはきれいな水が入っている。", mixed:"この資料は、今回必要なデータをすべて {{word}} している。", mixedToken:"contain", mixedTarget:"含んで", caution:"contain は「含む／収容する」。include は全体の一部として含めることに焦点がある。" },
  9: { meaning:"条件を定めて当事者を結びつける契約／契約する", usage:"sign a contract（契約に署名する）/ contract with a company。動詞には「縮む」「病気にかかる」など別の意味もある。", decomp:"ラテン語 contractus（合意・契約）に由来し、con-（共に）+ trahere（引く）と関係する。", example:"They signed a contract yesterday.", ja:"彼らは昨日、契約に署名した。", mixed:"その会社と正式に {{word}} を結んだ。", mixedToken:"contract", mixedTarget:"契約", caution:"contract は名詞・動詞で発音が変わる場合があり、意味も文脈で判断する。" },
  10: { meaning:"全体に対して、自分の一部を差し出す・寄与する", usage:"contribute to + 名詞 / 動名詞。to は前置詞なので後ろに名詞相当が来る。", decomp:"con-（共に）と tribuere（割り当てる・与える）に関連し、全体や目的に何かを提供する意味につながる。", example:"Everyone contributed to the project.", ja:"全員がそのプロジェクトに貢献した。", mixed:"地域の活動に少しでも {{word}} したい。", mixedToken:"contribute", mixedTarget:"貢献", caution:"contribute to doing の形では to の後ろが動名詞になる。" },
  11: { meaning:"全体から一部分を切り取る／切り取られた部分", usage:"crop a photo（写真をトリミングする）/ a crop of rice（米の作物・収穫）。", decomp:"画像編集では「枠の外を切り落として一部を残す」という動きを思い浮かべる。", example:"Crop the image to remove the empty space.", ja:"余白を取り除くために画像をトリミングして。", mixed:"SNSに載せる前に、写真を正方形に {{word}} しておこう。", mixedToken:"crop", mixedTarget:"トリミング", caution:"crop は写真の切り抜きだけでなく、農作物・収穫という意味もある。" },
  12: { meaning:"相手の苦痛を顧みず、残酷なことをする", usage:"be cruel to + 人・動物。人や動物に対して残酷である、という形を取る。", decomp:"ラテン語 crudelis（残酷な）に由来する。", example:"It is cruel to laugh at someone in pain.", ja:"苦しんでいる人を笑うのは残酷だ。", mixed:"弱い立場の人を笑うのは {{word}} な行為だ。", mixedToken:"cruel", mixedTarget:"残酷", caution:"cruel は行為や扱いを評価する語で、単に厳しい（strict）とは異なる。" },
  13: { meaning:"異なる主張を出し合い、理由をぶつけて論じる", usage:"debate an issue / debate with someone / a debate about education。", decomp:"主張をぶつけ合う場面を想像すると、単なる雑談との違いが見える。", example:"The students debated the proposal.", ja:"生徒たちはその提案について議論した。", mixed:"委員会では予算案について長時間 {{word}} した。", mixedToken:"debate", mixedTarget:"議論", caution:"debate は対立する立場や論点のぶつかり合いが前景化しやすい。" },
  14: { meaning:"事実・要求・許可などを認めることを拒む", usage:"deny a claim / deny doing（〜したことを否定する）/ deny that ...。", decomp:"ラテン語 denegare（否定する・拒む）に由来する。", example:"She denied taking the money.", ja:"彼女はそのお金を取ったことを否定した。", mixed:"彼女はその発言をしたことを {{word}} した。", mixedToken:"deny", mixedTarget:"否定", caution:"deny doing は「〜したことを否定する」。refuse to do は「〜することを拒む」。" },
  15: { meaning:"欲しいもの・望む状態へ強く心が向くこと", usage:"desire something / desire to do。名詞・動詞の両方で使う。", decomp:"欲求が対象へ向かうことを意味の核にする。", example:"She desires to understand the reason.", ja:"彼女はその理由を理解したいと強く望んでいる。", mixed:"彼の最大の {{word}} は、世界の仕組みを理解することだ。", mixedToken:"desire", mixedTarget:"願望", caution:"desire は want より改まった語で、強い願望を表すことが多い。" },
  16: { meaning:"普段の流れ・状態を乱す、邪魔する", usage:"disturb someone / disturb the peace / Do not disturb。", decomp:"ラテン語 disturbare（乱す）に由来し、dis-（ばらばらに）+ turbare（乱す）と関係する。", example:"Sorry to disturb you so late.", ja:"こんな遅い時間にお邪魔してすみません。", mixed:"夜遅くに電話して、彼の休息を {{word}} してしまった。", mixedToken:"disturb", mixedTarget:"邪魔", caution:"interrupt は進行中の行為を途中で遮ること、disturb は平穏・状態を乱すことに焦点がある。" },
  17: { meaning:"無駄を抑え、少ない資源で望む結果を出す", usage:"an efficient method / efficient use of time。方法・仕組み・仕事の進め方に使う。", decomp:"effect（効果）と同じ語族。efficient は資源や手間の無駄が少ないことに焦点を置く。", example:"This is a more efficient way to study.", ja:"これはより効率的な勉強法だ。", mixed:"この新しい仕組みなら、作業をもっと {{word}} に進められる。", mixedToken:"efficient", mixedTarget:"効率的", caution:"efficient は「無駄が少ない」、effective は「狙った効果がある」。両者は同じではない。" },
  18: { meaning:"重要な部分を強く目立たせる・強調する", usage:"emphasize a point / emphasize that ...。", decomp:"名詞 emphasis（強調）と同じ語族。emphasize は重要な点を明確に示すこと。", example:"The report emphasizes the need for change.", ja:"その報告書は変化の必要性を強調している。", mixed:"発表では、先生がこの点を特に {{word}} した。", mixedToken:"emphasize", mixedTarget:"強調", caution:"emphasize は言葉や説明で強調すること。highlight は視覚的に目立たせる意味でも使う。" },
  19: { meaning:"相手が前へ進めるよう、勇気や支えを与える", usage:"encourage someone to do。人に何かをするよう促す・励ます。", decomp:"courage（勇気）と関連づけ、「勇気を与える」と考えると覚えやすい。", example:"My teacher encouraged me to ask questions.", ja:"先生は私に質問するよう促してくれた。", mixed:"先生は私が挑戦できるように {{word}} してくれた。", mixedToken:"encourage", mixedTarget:"励まして", caution:"encourage は「励ます」だけでなく、行動を促す意味でも使う。" },
  20: { meaning:"実際にそこにある・存在する", usage:"exist in a place / exist as a problem。通常、存在する対象を目的語には取らない。", decomp:"ラテン語 exsistere（現れる・存在する）に由来し、ex-（外へ）+ sistere（立たせる）と関係する。", example:"Life may exist on other planets.", ja:"ほかの惑星にも生命が存在するかもしれない。", mixed:"この森には、珍しい種類の鳥が {{word}} している。", mixedToken:"exist", mixedTarget:"存在", caution:"exist は自動詞。there is/are と exist を使い分ける。" },
  21: { meaning:"何かを得る／ある状態や結果に至る。構文によって「理解する」「人に行動してもらう」などの意味にもなる。", usage:"get + noun（得る・受け取る）／get + adjective（〜の状態になる）／get it（理解する）／get + person + to do（人に〜してもらう）。意味を構文ごとに整理する。", decomp:"意味は一つの語源イメージに無理に押し込まず、頻出構文と意味のつながりを優先する。", example:"It's getting dark.", ja:"暗くなってきている。", mixed:"説明を聞いて、ようやくその意味が {{word}} できた。", mixedToken:"get", mixedTarget:"理解", caution:"「状態・結果に至る」は有用な核だが、get の全用法を一つのイメージだけで説明できるわけではない。構文ごとに確認する。" },
  22: { meaning:"人・物・場所・計画などを手放して離れる／続けるのをやめる。", usage:"abandon a plan（計画を断念する）／abandon a place（場所を去る・捨てる）／abandon oneself to ...（感情などに身を任せる）。最後の形は独立した構文として扱う。", decomp:"語源情報よりも、目的語と構文による訳の違いを優先する。", example:"They abandoned the plan after the costs increased.", ja:"費用が増えたため、彼らはその計画を断念した。", mixed:"費用が増えたため、彼らはその計画を {{word}} した。", mixedToken:"abandon", mixedTarget:"断念", caution:"abandon oneself to ... は通常の「対象を手放す」と同じ訳にせず、構文ごとに覚える。" },
  23: { meaning:"人・物・状態などを別のものに結びつけて示す前置詞。意味は関係の種類と文脈によって変わる。", usage:"with + person（同伴）／with + tool（道具）／with + feature（特徴）／happy with + result（感情・評価の対象）。「関係」だけで済ませず、具体的な関係の種類を見分ける。", decomp:"語源情報よりも、同伴・道具・特徴・対象などの用法群を区別することを優先する。", example:"She cut the paper with scissors.", ja:"彼女ははさみで紙を切った。", mixed:"彼女は {{word}} を使って紙を切った。", mixedToken:"with", mixedTarget:"道具・手段", caution:"with を常に「一緒に」と訳さない。後ろの名詞句と文全体の関係から意味を判断する。" }
};
const IMAGE_QUERIES = {
  1:"person making a commitment handshake promise", 2:"two objects side by side comparison", 3:"person complaining customer service", 4:"complex network of connected parts", 5:"person focusing on one task", 6:"checking confirming a document", 7:"person thinking considering options", 8:"container holding water inside", 9:"people signing a contract", 10:"team contributing pieces to a project", 11:"photo cropping frame", 12:"cruel act unfair treatment", 13:"two people debating discussion", 14:"person denying accusation gesture", 15:"person reaching for desired object", 16:"disturbing a quiet room interruption", 17:"efficient workflow organized tools", 18:"highlighting important text", 19:"teacher encouraging student", 20:"plant existing growing in soil", 21:"person understanding a concept", 22:"abandoning a plan", 23:"scissors cutting paper with tool"
};
const DECOMP_ELEMENTS = {
 "com-":{meaning:"共に・一緒に",kind:"接頭辞"},
 "con-":{meaning:"共に・一緒に",kind:"接頭辞"},
 "de-":{meaning:"離れる・下へ・反対方向など（語により異なる）",kind:"接頭辞"},
 "dis-":{meaning:"分離・反対・否定など（語により異なる）",kind:"接頭辞"},
 "ex-":{meaning:"外へ・外に",kind:"接頭辞"},
 "en-":{meaning:"〜にする・中へ（語により異なる）",kind:"接頭辞"},
 "mittere":{meaning:"送る・委ねる",kind:"語根"},
 "tenere":{meaning:"保つ・つかむ",kind:"語根"},
 "trahere":{meaning:"引く",kind:"語根"},
 "firm":{meaning:"堅い・確かな",kind:"語根に関係"},
 "ness":{meaning:"性質・状態を表す",kind:"接尾辞"}
};
const NOTE_PARTS = {
 1:["com-","mittere"],2:["com-"],3:["com-"],4:["com-"],5:["con-"],6:["con-","firm"],8:["con-","tenere"],9:["con-","trahere"],10:["con-"],14:["de-"],16:["dis-"],19:["en-"],20:["ex-"]
};
let activeDecompFilter="";
function renderDecompParts(w){
 const parts=NOTE_PARTS[w.id]||[];
 if(!parts.length)return "";
 return '<div class="decomp-parts"><p class="hint">分解要素（タップで関連語）</p><div class="decomp-chips">'+parts.map(part=>{
  const meta=DECOMP_ELEMENTS[part]||{meaning:"関連要素",kind:"要素"};
  return '<button type="button" class="decomp-chip" data-part="'+escapeHtml(part)+'"><strong>'+escapeHtml(part)+'</strong><span>'+escapeHtml(meta.meaning)+'</span></button>';
 }).join("")+'</div></div>';
}
const USAGE_FRAMES={
  2:{selected:"with",open:false,showExample:false,options:[
    {value:"with",label:"with",parts:["compare","A","__choice__","B"],explanation:"AとBを並べ、共通点や相違点を検討する。",example:"I compared the two phones with each other.",ja:"私はその2台のスマートフォンを互いに比較した。"},
    {value:"to",label:"to",parts:["compare","A","__choice__","B"],explanation:"AをBになぞらえ、類似性に注目する傾向がある。with / to の使い分けは絶対ではなく、文脈によって重なる。",example:"She compared his voice to the sound of rain.",ja:"彼女は彼の声を雨音にたとえた。"}
  ]},
  21:{selected:"state",open:false,showExample:false,options:[
    {value:"state",label:"adjective",parts:["get","__choice__"],explanation:"get + 形容詞は「ある状態になる」。主語の状態変化を表す。",example:"It's getting dark.",ja:"暗くなってきている。"},
    {value:"understand",label:"it",parts:["get","__choice__"],explanation:"get it は「それを得る」ではなく、文脈や意味を理解すること。構文として覚える。",example:"I get it now.",ja:"今はその意味が分かる。"},
    {value:"persuade",label:"object + to do",parts:["get","__choice__"],explanation:"get + 人 + to do は、頼む・説得するなどして人に行動してもらう型。",example:"I got him to help me.",ja:"彼に手伝ってもらえるよう頼んだ／説得した。"}
  ]},
  22:{selected:"object",open:false,showExample:false,options:[
    {value:"object",label:"object",parts:["abandon","__choice__"],explanation:"人・場所・物・計画などを手放して離れる、または続けるのをやめる。目的語によって自然な訳が変わる。",example:"They abandoned the plan.",ja:"彼らはその計画を断念した。"},
    {value:"oneself",label:"oneself to + noun",parts:["abandon","__choice__"],explanation:"abandon oneself to ... は「感情などに身を任せる」。通常の他動詞用法と区別して構文ごと覚える。",example:"He abandoned himself to despair.",ja:"彼は絶望に身を任せた。"}
  ]},
  23:{selected:"person",open:false,showExample:false,options:[
    {value:"person",label:"person",parts:["with","__choice__"],explanation:"同伴する人を表す。with は「一緒に」という関係を示す。",example:"I went with my brother.",ja:"私は兄弟と一緒に行った。"},
    {value:"tool",label:"tool",parts:["with","__choice__"],explanation:"道具・手段を表す。単に「一緒に」と訳すのではなく、何を使って行うかを示す。",example:"She cut the paper with scissors.",ja:"彼女ははさみで紙を切った。"},
    {value:"feature",label:"feature",parts:["with","__choice__"],explanation:"人や物が持つ特徴・付帯情報を示す。",example:"A girl with blue eyes stood there.",ja:"青い目の少女がそこに立っていた。"},
    {value:"feeling",label:"feeling / result",parts:["with","__choice__"],explanation:"感情や評価が向けられる対象を示すことがある。",example:"I'm happy with the result.",ja:"私はその結果に満足している。"}
  ]}
};
function renderUsageFrame(w){
 const f=USAGE_FRAMES[w.id];
 if(!f)return "<p>"+escapeHtml(noteFor(w).usage||"使い方メモは未登録です。")+"</p>";
 const o=f.options.find(x=>x.value===f.selected)||f.options[0];
 const parts=o.parts||f.parts||[];
 const diagram='<div class="usage-diagram">'+parts.map(p=>{
  if(p==="A"||p==="B")return '<span class="usage-part usage-slot">'+escapeHtml(p)+'</span>';
  if(p==="__choice__")return '<span class="usage-choice-wrap"><button type="button" class="usage-choice" data-usage-toggle="1" aria-expanded="'+f.open+'">'+escapeHtml(o.label||o.value)+'</button><span class="usage-choice-list'+(f.open?"":" hidden")+'">'+f.options.map(x=>'<button type="button" class="usage-choice-option'+(x.value===f.selected?" is-selected":"")+'" data-usage-value="'+escapeHtml(x.value)+'">'+escapeHtml(x.label||x.value)+'</button>').join("")+'</span></span>';
  return '<span class="usage-part">'+escapeHtml(p)+'</span>';
 }).join('<span class="usage-join"> </span>')+'</div>';
 const example=f.showExample?'<div class="usage-example"><p class="usage-example-en">'+escapeHtml(o.example)+'</p><p class="usage-example-ja">'+escapeHtml(o.ja)+'</p><button type="button" class="subtle-btn usage-example-button" data-usage-back="1">骨格に戻る</button></div>':diagram;
 return '<div class="usage-frame"><div class="usage-topline">'+example+(f.showExample?'':'<button type="button" class="subtle-btn usage-example-button" data-usage-example="1">例</button>')+'</div><p class="usage-explanation">'+escapeHtml(o.explanation)+'</p></div>';
}function noteFor(w){return {...(NOTE_CONTENT[w.id]||{}),...(notesById[w.id]||{})};}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function visualSearchQuery(w){return IMAGE_QUERIES[w.id]||w.imageSearch||w.word;}
function commonsSearchUrl(w){return "https://commons.wikimedia.org/w/index.php?search="+encodeURIComponent(visualSearchQuery(w))+"&title=Special:MediaSearch&type=image";}
function mixedExampleMarkup(n){
 const template=n.mixed||"混合例文は未登録です。";
 const token=n.mixedToken||"";
 const parts=template.split("{{word}}");
 if(parts.length<2||!token)return escapeHtml(template);
 return escapeHtml(parts[0])+'<button id="mixedWordToken" class="mixed-token" type="button" aria-expanded="false">'+escapeHtml(token)+'</button>'+escapeHtml(parts.slice(1).join("{{word}}"))+'<span id="mixedTarget" class="mixed-target hidden">'+escapeHtml(n.mixedTarget||"")+'</span>';
}
function imageCueMarkup(w){
 const url=imageUrl(w);
 return url ? '<img class="image-cue" loading="lazy" src="'+escapeHtml(url)+'" alt="'+escapeHtml(w.word)+'の画像" onerror="this.remove()">' : "";
}
let noteListScrollY=0;
function openNotes(){activeDecompFilter="";noteListScrollY=0;showView("notesView");$("#notesListPanel").classList.remove("hidden");$("#noteDetailPanel").classList.add("hidden");$("#noteSearch").value="";renderNoteList();window.scrollTo({top:0,behavior:"instant"});}
function renderNoteList(){
 const q=$("#noteSearch").value.trim().toLowerCase();
 const rows=WORDS.filter(w=>{const n=noteFor(w),text=[w.word,w.translation,w.coreImage,n.meaning,n.usage].join(" ").toLowerCase();return text.includes(q)&&(!activeDecompFilter||(NOTE_PARTS[w.id]||[]).includes(activeDecompFilter));});
 $("#notesListPanel").innerHTML=(activeDecompFilter?'<button class="subtle-btn" id="clearDecompFilter">← 全単語に戻る：'+escapeHtml(activeDecompFilter)+'</button>':"")+rows.map(w=>{const n=noteFor(w);return '<button class="note-list-item" data-id="'+w.id+'"><span class="note-list-word">'+escapeHtml(w.word)+'</span><span class="note-list-core">'+escapeHtml(n.meaning||w.translation)+'</span><span class="note-list-meta">'+escapeHtml(w.pos)+' · '+(imageUrl(w)?'画像あり':'画像未設定')+'</span></button>';}).join("")||'<div class="card">該当する単語がありません。</div>';
 const clear=$("#clearDecompFilter");if(clear)clear.onclick=()=>{activeDecompFilter="";renderNoteList();};
 $("#notesListPanel").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>openNote(Number(b.dataset.id)));
}
function openNote(id,autoplay=true){
 if(!$("#notesListPanel").classList.contains("hidden"))noteListScrollY=window.scrollY;
 const w=WORDS.find(x=>x.id===id);if(!w)return;const n=noteFor(w);
 $("#notesListPanel").classList.add("hidden");const d=$("#noteDetailPanel");d.classList.remove("hidden");
 d.innerHTML='<button class="subtle-btn note-back" id="noteBack">← 単語一覧へ</button>'+
 '<div class="note-hero">'+imageCueMarkup(w)+'<div class="note-title-row"><div class="note-word-line"><h2>'+escapeHtml(w.word)+'</h2><span class="pos">'+escapeHtml(w.pos)+'</span></div><button id="playWordAudio" class="audio-btn" type="button" aria-label="英単語の発音を再生">🔊 発音</button></div>'+
 '<p class="note-core">'+escapeHtml(w.coreImage||n.meaning||w.translation)+'</p></div>'+
 '<section class="note-section"><p>'+escapeHtml(n.decomp||"語源情報は未登録です。")+'</p>'+renderDecompParts(w)+'</section>'+
 '<section class="note-section">'+renderUsageFrame(w)+'<p class="example-en">'+escapeHtml(n.example||"例文は未登録です。")+'</p>'+(w.id===2?'<p class="hint">before you decide＝「決める前に」。時を表す節で、compare の語法の例外ではない。</p>':'')+'<button class="reveal-translation" id="revealExample">日本語訳を見る</button><p id="exampleJa" class="example-ja hidden">'+escapeHtml(n.ja||"")+'</p>'+(n.caution?'<p class="usage-warning">⚠️ '+escapeHtml(n.caution)+'</p>':'')+'</section>'+
 
 '<section class="note-section"><p class="mixed-sentence">'+mixedExampleMarkup(n)+'</p><p class="hint">英語部分をタップすると、元の日本語表現を表示。</p></section>'+

 '<details class="note-fold"><summary>画像の設定・出典情報</summary><div class="image-workflow"><p>画像を端末から選ぶか、画像検索で候補を探して登録できます。</p>'+
 '<div class="image-pick-row"><button id="chooseLocalImage" class="secondary-wide-btn" type="button">📁 端末から画像を選ぶ</button><input id="noteImageFile" type="file" accept="image/*" hidden></div>'+
 '<div class="commons-search"><label>画像を検索<input id="commonsImageQuery" type="search" value="'+escapeHtml(visualSearchQuery(w))+'" placeholder="例：person making a promise"></label><button id="searchCommonsImages" class="secondary-wide-btn" type="button">🔎 候補画像をアプリ内で検索</button><p id="commonsSearchStatus" class="hint" aria-live="polite"></p><div id="commonsImageResults" class="commons-image-results"></div><a class="search-image-link" href="'+commonsSearchUrl(w)+'" target="_blank" rel="noopener">Wikimedia Commonsを別画面で開く ↗</a></div>'+
 '<label>画像ファイルURL<input id="noteImageUrl" type="url" placeholder="URLで登録する場合 https://…" value="'+escapeHtml(n.imageUrl||"")+'"></label>'+
 '<label>出典ページURL<input id="noteImageSource" type="url" placeholder="画像の掲載ページURL" value="'+escapeHtml(n.imageSource||"")+'"></label>'+
 '<div class="image-meta-grid"><label>作者・権利者<input id="noteImageCreator" placeholder="作者名／不明" value="'+escapeHtml(n.imageCreator||"")+'"></label><label>ライセンス<input id="noteImageLicense" placeholder="例：CC BY-SA 4.0" value="'+escapeHtml(n.imageLicense||"")+'"></label></div>'+
 '<button id="saveImageData" class="primary-btn">画像情報を保存</button><p id="imageSaveStatus" class="hint" aria-live="polite"></p>'+
 '<p class="hint">端末から選んだ画像は縮小してこのブラウザ内に保存します。URL画像と同じく、出典・作者・ライセンスは必要に応じて記録してください。別端末への同期はありません。</p></div></details>';
 $("#noteBack").onclick=()=>{d.classList.add("hidden");$("#notesListPanel").classList.remove("hidden");renderNoteList();requestAnimationFrame(()=>window.scrollTo({top:noteListScrollY,behavior:"instant"}));};
 d.querySelectorAll("[data-part]").forEach(btn=>btn.onclick=()=>{activeDecompFilter=btn.dataset.part;d.classList.add("hidden");$("#notesListPanel").classList.remove("hidden");$("#noteSearch").value="";renderNoteList();window.scrollTo({top:0,behavior:"instant"});});
 d.addEventListener("click",event=>{
  const target=event.target.closest("[data-usage-toggle],[data-usage-value],[data-usage-example],[data-usage-back]");
  if(!target||!d.contains(target))return;
  const f=USAGE_FRAMES[w.id];if(!f)return;
  const scrollY=window.scrollY;
  if(target.hasAttribute("data-usage-toggle")){f.open=!f.open;}
  else if(target.hasAttribute("data-usage-value")){f.selected=target.dataset.usageValue;f.open=false;f.showExample=false;}
  else if(target.hasAttribute("data-usage-example")){f.showExample=true;f.open=false;}
  else if(target.hasAttribute("data-usage-back")){f.showExample=false;}
  const frame=d.querySelector(".usage-frame");
  if(frame)frame.outerHTML=renderUsageFrame(w);
  requestAnimationFrame(()=>window.scrollTo({top:scrollY,behavior:"instant"}));
 });
 $("#playWordAudio").onclick=()=>speakWord(w);
 if(autoplay)speakWord(w);
 $("#revealExample").onclick=()=>{$("#exampleJa").classList.toggle("hidden");$("#revealExample").textContent=$("#exampleJa").classList.contains("hidden")?"日本語訳を見る":"日本語訳を隠す";};
 const mixedToken=$("#mixedWordToken"),mixedTarget=$("#mixedTarget");
 if(mixedToken&&mixedTarget)mixedToken.onclick=()=>{mixedTarget.classList.toggle("hidden");mixedToken.setAttribute("aria-expanded",String(!mixedTarget.classList.contains("hidden")));};
 $("#saveImageData").onclick=()=>saveImageData(id);
 $("#chooseLocalImage").onclick=()=>$("#noteImageFile").click();
 $("#searchCommonsImages").onclick=()=>searchCommonsImages(w,id);
 $("#commonsImageQuery").addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();searchCommonsImages(w,id);}});
 $("#noteImageFile").onchange=async event=>{
  const file=event.target.files&&event.target.files[0];if(!file)return;
  const status=$("#imageSaveStatus");status.textContent="画像を読み込んでいます…";
  try{
   const dataUrl=await compressImageFile(file);
   notesById[id]={...(notesById[id]||{}),imageDataUrl:dataUrl,imageUrl:""};
   save();openNote(id,false);
   $("#imageSaveStatus").textContent="端末の画像を保存しました。";
  }catch(error){status.textContent=error.message||"画像を保存できませんでした。別の画像を試してください。";}
 };
 window.scrollTo({top:0,behavior:"instant"});
}
function speakWord(w){
 if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window))return;
 window.speechSynthesis.cancel();
 const utterance=new SpeechSynthesisUtterance(w.word);
 utterance.lang="en-US";utterance.rate=0.86;utterance.pitch=1;
 window.speechSynthesis.speak(utterance);
}
async function searchCommonsImages(w,id){
 const query=$("#commonsImageQuery").value.trim(),status=$("#commonsSearchStatus"),results=$("#commonsImageResults"),button=$("#searchCommonsImages");
 if(!query){status.textContent="検索語を入力してください。";return;}
 status.textContent="画像候補を検索しています…";results.innerHTML="";button.disabled=true;
 try{
  const params=new URLSearchParams({action:"query",format:"json",origin:"*",generator:"search",gsrsearch:"filetype:bitmap "+query,gsrnamespace:"6",gsrlimit:"12",gsrwhat:"text",prop:"imageinfo",iiprop:"url|extmetadata",iiurlwidth:"480"});
  const response=await fetch("https://commons.wikimedia.org/w/api.php?"+params.toString());
  if(!response.ok)throw new Error("画像検索サービスがHTTP "+response.status+" を返しました。通信状態を確認して、もう一度試してください。");
  const data=await response.json();
  if(data.error)throw new Error("画像検索サービスのエラー："+(data.error.info||data.error.code||"詳細不明"));
  const pages=Object.values(data.query&&data.query.pages||{});
  const candidates=pages.map(page=>{
   const info=(page.imageinfo||[])[0]||{},meta=info.extmetadata||{};
   const metaText=key=>String(meta[key]&&meta[key].value||"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
   return {title:page.title||"",thumb:info.thumburl||info.url||"",url:info.url||"",source:info.descriptionurl||("https://commons.wikimedia.org/wiki/"+encodeURIComponent((page.title||"").replace(/ /g,"_"))),creator:metaText("Artist"),license:metaText("LicenseShortName")||metaText("UsageTerms")};
  }).filter(item=>item.thumb&&item.url);
  if(!candidates.length){status.textContent="候補が見つかりません。別の検索語を試してください。";return;}
  results.innerHTML=candidates.map((item,index)=>'<button class="commons-image-option" type="button" data-index="'+index+'"><img loading="lazy" src="'+escapeHtml(item.thumb)+'" alt=""><span>'+escapeHtml(item.title.replace(/^File:/,""))+'</span><small>'+escapeHtml(item.license||"ライセンス情報を確認してください")+'</small></button>').join("");
  results.querySelectorAll("[data-index]").forEach(btn=>btn.onclick=()=>{
   const item=candidates[Number(btn.dataset.index)];
   notesById[id]={...(notesById[id]||{}),imageUrl:item.url,imageDataUrl:"",imageSource:item.source,imageCreator:item.creator||"不明",imageLicense:item.license||"要確認"};
   save();openNote(id,false);
   const savedStatus=$("#imageSaveStatus");if(savedStatus)savedStatus.textContent="画像候補を登録しました。利用条件を確認してください。";
  });
  status.textContent=candidates.length+"件の候補。画像をタップすると登録します。作者・ライセンスを確認してから利用してください。";
 }catch(error){status.textContent=(error&&error.message)||"検索に失敗しました。通信状態を確認してください。";}
 finally{button.disabled=false;}
}
function compressImageFile(file){
 return new Promise((resolve,reject)=>{
  if(!file.type.startsWith("image/")){reject(new Error("画像ファイルを選んでください。"));return;}
  const reader=new FileReader();
  reader.onerror=()=>reject(new Error("画像ファイルを読み込めませんでした。"));
  reader.onload=()=>{
   const img=new Image();
   img.onerror=()=>reject(new Error("この画像形式は読み込めませんでした。JPEGまたはPNGを試してください。"));
   img.onload=()=>{
    const maxSide=1200,scale=Math.min(1,maxSide/Math.max(img.naturalWidth,img.naturalHeight));
    const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
    const ctx=canvas.getContext("2d");if(!ctx){reject(new Error("画像処理を開始できませんでした。"));return;}
    ctx.fillStyle="#ffffff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const dataUrl=canvas.toDataURL("image/jpeg",0.78);
    if(dataUrl.length>900000){reject(new Error("画像が大きすぎます。小さい画像を選んでください。"));return;}
    resolve(dataUrl);
   };
   img.src=reader.result;
  };
  reader.readAsDataURL(file);
 });
}
function saveImageData(id){
 const url=$("#noteImageUrl").value.trim(),source=$("#noteImageSource").value.trim();
 if(url&&!url.toLowerCase().startsWith("http://")&&!url.toLowerCase().startsWith("https://")){$("#imageSaveStatus").textContent="画像URLは http:// または https:// から始めてください。";return;}
 if(source&&!source.toLowerCase().startsWith("http://")&&!source.toLowerCase().startsWith("https://")){$("#imageSaveStatus").textContent="出典ページURLは http:// または https:// から始めてください。";return;}
 notesById[id]={...(notesById[id]||{}),imageUrl:url,imageDataUrl:url?"":(notesById[id]||{}).imageDataUrl||"",imageSource:source,imageCreator:$("#noteImageCreator").value.trim(),imageLicense:$("#noteImageLicense").value.trim()};
 save();openNote(id,false);$("#imageSaveStatus").textContent="画像情報を保存しました。";
}
$("#notesBtn").onclick=openNotes;
$("#notesHomeBtn").onclick=()=>showView("homeView");
$("#noteSearch").addEventListener("input",renderNoteList);

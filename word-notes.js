// Word-note module. Loaded after app.js so it can reuse WORDS, notesById, save(), showView() and imageUrl().
const NOTE_CONTENT = {
  1: { meaning:"自分をある行動・状態へ送り込み、引き受ける", usage:"commit to + 名詞 / 動名詞。「何かに自分を結びつける」感覚。commit a crime のように行為を実行する意味もある。", decomp:"ラテン語 committere（結びつける・委ねる）に由来。com-（共に）+ mittere（送る）から成る。", example:"She committed herself to learning English.", ja:"彼女は英語を学ぶことに本腰を入れた。", mixed:"彼女は新しい学習計画に {{word}} した。", mixedToken:"commit", mixedTarget:"責任を持って取り組むと決めた", caution:"commit は「決める」だけでなく、約束や責任を引き受ける含みが出ることがある。" },
  2: { meaning:"複数のものを並べ、共通点や違いを見比べる", usage:"compare A with B / compare A to B。文脈によって使い分けは重なる。", decomp:"ラテン語 comparare（比べる・並べる）に由来する。", example:"Compare the two plans before you decide.", ja:"決める前に、その2つの計画を比較しなさい。", mixed:"二つの案を並べて、長所と短所を {{word}} した。", mixedToken:"compare", mixedTarget:"比較", caution:"compare A to B は「AをBになぞらえる」という比喩的な使い方もある。" },
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
  20: { meaning:"実際にそこにある・存在する", usage:"exist in a place / exist as a problem。通常、存在する対象を目的語には取らない。", decomp:"ラテン語 exsistere（現れる・存在する）に由来し、ex-（外へ）+ sistere（立たせる）と関係する。", example:"Life may exist on other planets.", ja:"ほかの惑星にも生命が存在するかもしれない。", mixed:"この森には、珍しい種類の鳥が {{word}} している。", mixedToken:"exist", mixedTarget:"存在", caution:"exist は自動詞。there is/are と exist を使い分ける。" }
};
const IMAGE_QUERIES = {
  1:"person making a commitment handshake promise", 2:"two objects side by side comparison", 3:"person complaining customer service", 4:"complex network of connected parts", 5:"person focusing on one task", 6:"checking confirming a document", 7:"person thinking considering options", 8:"container holding water inside", 9:"people signing a contract", 10:"team contributing pieces to a project", 11:"photo cropping frame", 12:"cruel act unfair treatment", 13:"two people debating discussion", 14:"person denying accusation gesture", 15:"person reaching for desired object", 16:"disturbing a quiet room interruption", 17:"efficient workflow organized tools", 18:"highlighting important text", 19:"teacher encouraging student", 20:"plant existing growing in soil"
};
function noteFor(w){return {...(NOTE_CONTENT[w.id]||{}),...(notesById[w.id]||{})};}
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
 return url
  ? '<img class="image-cue" loading="lazy" src="'+escapeHtml(url)+'" alt="'+escapeHtml(w.word)+'の画像" onerror="this.style.display=&quot;none&quot;;this.nextElementSibling.style.display=&quot;grid&quot;"><div class="image-missing" style="display:none">画像を読み込めませんでした</div>'
  : '<div class="image-missing"><strong>画像未設定</strong><span>意味に合う画像を選んで登録できます</span></div>';
}
function openNotes(){showView("notesView");$("#notesListPanel").classList.remove("hidden");$("#noteDetailPanel").classList.add("hidden");$("#noteSearch").value="";renderNoteList();window.scrollTo({top:0,behavior:"instant"});}
function renderNoteList(){
 const q=$("#noteSearch").value.trim().toLowerCase();
 const rows=WORDS.filter(w=>{const n=noteFor(w);return [w.word,w.translation,w.coreImage,n.meaning,n.usage].join(" ").toLowerCase().includes(q);});
 $("#notesListPanel").innerHTML=rows.map(w=>{const n=noteFor(w);return '<button class="note-list-item" data-id="'+w.id+'"><span class="note-list-word">'+escapeHtml(w.word)+'</span><span class="note-list-core">'+escapeHtml(n.meaning||w.translation)+'</span><span class="note-list-meta">'+escapeHtml(w.pos)+' · '+(imageUrl(w)?'画像あり':'画像未設定')+'</span></button>';}).join("")||'<div class="card">該当する単語がありません。</div>';
 $("#notesListPanel").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>openNote(Number(b.dataset.id)));
}
function openNote(id,autoplay=true){
 const w=WORDS.find(x=>x.id===id);if(!w)return;const n=noteFor(w);
 $("#notesListPanel").classList.add("hidden");const d=$("#noteDetailPanel");d.classList.remove("hidden");
 d.innerHTML='<button class="subtle-btn note-back" id="noteBack">← 単語一覧へ</button>'+
 '<div class="note-hero">'+imageCueMarkup(w)+'<p class="eyebrow">WORD NOTE</p><div class="note-title-row"><div class="note-word-line"><h2>'+escapeHtml(w.word)+'</h2><span class="pos">'+escapeHtml(w.pos)+'</span></div><button id="playWordAudio" class="audio-btn" type="button" aria-label="英単語の発音を再生">🔊 発音</button></div>'+
 '<p class="note-core">'+escapeHtml(w.coreImage||n.meaning||w.translation)+'</p></div>'+
 '<section class="note-section"><h3>語源・分解</h3><p>'+escapeHtml(n.decomp||"語源情報は未登録です。")+'</p></section>'+
 '<section class="note-section"><h3>使い方の骨格</h3><p>'+escapeHtml(n.usage||"使い方メモは未登録です。")+'</p></section>'+
 '<section class="note-section"><h3>例文</h3><p class="example-en">'+escapeHtml(n.example||"例文は未登録です。")+'</p><button class="reveal-translation" id="revealExample">日本語訳を見る</button><p id="exampleJa" class="example-ja hidden">'+escapeHtml(n.ja||"")+'</p></section>'+
 '<section class="note-section"><h3>日本語＋英語の混合例文</h3><p class="mixed-sentence">'+mixedExampleMarkup(n)+'</p><p class="hint">文中の英語部分を押すと、そこが表している元の日本語が赤字で表示されます。</p></section>'+
 (n.caution?'<details class="note-fold"><summary>注意訳・混同注意あり</summary><p>'+escapeHtml(n.caution)+'</p></details>':'<details class="note-fold"><summary>注意訳を追加する</summary><p>現時点で登録された注意訳はありません。</p></details>')+
 '<details class="note-fold"><summary>画像の設定・出典情報</summary><div class="image-workflow"><p>1. 画像を探す → 2. 画像ファイルのURLを入力 → 3. 出典・作者・ライセンスを記録して保存。</p><a class="search-image-link" href="'+commonsSearchUrl(w)+'" target="_blank" rel="noopener">Wikimedia Commonsで画像を探す ↗</a>'+
 '<label>画像ファイルURL<input id="noteImageUrl" type="url" placeholder="https://…/image.jpg" value="'+escapeHtml(n.imageUrl||"")+'"></label>'+
 '<label>出典ページURL<input id="noteImageSource" type="url" placeholder="画像の掲載ページURL" value="'+escapeHtml(n.imageSource||"")+'"></label>'+
 '<div class="image-meta-grid"><label>作者・権利者<input id="noteImageCreator" placeholder="作者名／不明" value="'+escapeHtml(n.imageCreator||"")+'"></label><label>ライセンス<input id="noteImageLicense" placeholder="例：CC BY-SA 4.0" value="'+escapeHtml(n.imageLicense||"")+'"></label></div>'+
 '<button id="saveImageData" class="primary-btn">画像情報を保存</button><p id="imageSaveStatus" class="hint" aria-live="polite"></p>'+
 '<p class="hint">画像URLと出典情報はこのブラウザのローカル保存に記録されます。別端末への同期はまだありません。画像が表示されない場合は、画像ファイルURLを確認してください。</p></div></details>';
 $("#noteBack").onclick=()=>{d.classList.add("hidden");$("#notesListPanel").classList.remove("hidden");renderNoteList();};
 $("#playWordAudio").onclick=()=>speakWord(w);
 if(autoplay)speakWord(w);
 $("#revealExample").onclick=()=>{$("#exampleJa").classList.toggle("hidden");$("#revealExample").textContent=$("#exampleJa").classList.contains("hidden")?"日本語訳を見る":"日本語訳を隠す";};
 const mixedToken=$("#mixedWordToken"),mixedTarget=$("#mixedTarget");
 if(mixedToken&&mixedTarget)mixedToken.onclick=()=>{mixedTarget.classList.toggle("hidden");mixedToken.setAttribute("aria-expanded",String(!mixedTarget.classList.contains("hidden")));};
 $("#saveImageData").onclick=()=>saveImageData(id);
 window.scrollTo({top:0,behavior:"instant"});
}
function speakWord(w){
 if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window))return;
 window.speechSynthesis.cancel();
 const utterance=new SpeechSynthesisUtterance(w.word);
 utterance.lang="en-US";utterance.rate=0.86;utterance.pitch=1;
 window.speechSynthesis.speak(utterance);
}
function saveImageData(id){
 const url=$("#noteImageUrl").value.trim(),source=$("#noteImageSource").value.trim();
 if(url&&!url.toLowerCase().startsWith("http://")&&!url.toLowerCase().startsWith("https://")){$("#imageSaveStatus").textContent="画像URLは http:// または https:// から始めてください。";return;}
 if(source&&!source.toLowerCase().startsWith("http://")&&!source.toLowerCase().startsWith("https://")){$("#imageSaveStatus").textContent="出典ページURLは http:// または https:// から始めてください。";return;}
 notesById[id]={...(notesById[id]||{}),imageUrl:url,imageSource:source,imageCreator:$("#noteImageCreator").value.trim(),imageLicense:$("#noteImageLicense").value.trim()};
 save();openNote(id,false);$("#imageSaveStatus").textContent="画像情報を保存しました。";
}
$("#notesBtn").onclick=openNotes;
$("#notesHomeBtn").onclick=()=>showView("homeView");
$("#noteSearch").addEventListener("input",renderNoteList);

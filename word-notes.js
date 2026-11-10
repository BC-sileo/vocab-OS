// Word-note module. Loaded after app.js so it can reuse WORDS, notesById, save(), showView() and imageUrl().
const NOTE_CONTENT = {
  1: { meaning:"自分をある行動・状態へ送り込み、引き受ける", usage:"commit to + 名詞 / 動名詞。「何かに自分を結びつける」感覚。commit a crime のように行為を実行する意味もある。", decomp:"ラテン語 committere（結びつける・委ねる）に由来。", example:"She committed herself to learning English.", ja:"彼女は英語を学ぶことに本腰を入れた。", mixed:"彼女は新しい学習計画に {{word}} した。", mixedToken:"commit", mixedTarget:"責任を持って取り組むと決めた", caution:"commit は「決める」だけでなく、約束や責任を引き受ける含みが出ることがある。", domainExamples:[{"domain":"ソフトウェア開発","expression":"commit changes to a repository","meaning":"変更をリポジトリの履歴に確定して記録する","explanation":"作業中の変更を、後から追跡できる履歴の一単位として確定する。"},{"domain":"プロジェクト管理","expression":"commit resources to a project","meaning":"プロジェクトに資源を投入すると決める","explanation":"時間・人員・予算などを、その計画に使うと約束する用法。"}] },
  2: { meaning:"複数のものを並べ、共通点や違いを見比べる", usage:"compare A with B：AとBを並べ、共通点・相違点を検討する。compare A to B：AをBになぞらえ、似ている点を示す。例：Compare this poem with that one.（2つの詩を比較して違いも検討する）／She compared his voice to the sound of rain.（声を雨音にたとえた）。⚠️ これは傾向で、完全な二分法ではない。with でも類似点を扱い、to でも比較の意味になることがある。文脈で判断する。", decomp:"ラテン語 comparare（比べる・並べる）に由来する。", example:"Compare the two plans before you decide.", ja:"決める前に、その2つの計画を比較しなさい。", mixed:"二つの案を並べて、長所と短所を {{word}} した。", mixedToken:"compare", mixedTarget:"比較", caution:"", domainExamples:[{"domain":"情報科学","expression":"compare two strings","meaning":"二つの文字列を比較する","explanation":"文字列の一致・不一致や、文字の並び順などを調べる処理。"},{"domain":"生物学","expression":"comparative anatomy","meaning":"比較解剖学","explanation":"異なる生物の身体構造を比べ、共通点や相違点を調べる分野。"}] },
  3: { meaning:"不満や苦情を言葉にして外へ出す", usage:"complain about + 対象 / complain to + 人。何について不満なのか、誰に言うのかを分ける。", decomp:"ラテン語 complangere（嘆き悲しむ）に由来する。", example:"He complained about the noise.", ja:"彼は騒音について苦情を言った。", mixed:"彼は店員に、商品の不具合について {{word}} した。", mixedToken:"complain", mixedTarget:"苦情を申し立て", caution:"complain は必ずしも「文句ばかり言う」という人格評価を含まない。", domainExamples:[{"domain":"医学","expression":"The patient complains of pain.","meaning":"患者が痛みを訴える","explanation":"診察で、患者が自覚症状を医療者に伝えるときの表現。"},{"domain":"消費者保護","expression":"complain to a regulator","meaning":"監督機関に苦情を申し立てる","explanation":"商品・サービスなどについて、問題を公的な窓口に訴える。"}] },
  4: { meaning:"多くの要素が絡み合い、単純には扱えない", usage:"a complex problem / a complex system。名詞 complex は「複合施設・複合体」など。", decomp:"ラテン語 complexus（絡み合ったもの）に由来し、com-（共に）+ plectere（編む・絡める）と関係する。", example:"The problem is more complex than it seems.", ja:"その問題は見た目より複雑だ。", mixed:"このゲームの攻略法は、見た目よりずっと {{word}} だ。", mixedToken:"complex", mixedTarget:"複雑", caution:"complex は「難しい」と完全に同義ではなく、要素や関係が入り組んでいることに焦点がある。", domainExamples:[{"domain":"数学","expression":"complex number","meaning":"複素数","explanation":"実数部と虚数部をもつ数。例として a + bi の形で表される。"},{"domain":"システム科学","expression":"complex system","meaning":"複雑系","explanation":"多数の要素が相互作用し、全体として単純には予測できない振る舞いを示す系。"}] },
  5: { meaning:"注意・力・資源を一点へ集める", usage:"concentrate on + 対象。集中する先には on を使う。", decomp:"center（中心）と関連づけ、「中心へ集める」と覚える学習用の連想が役立つ。", example:"I can't concentrate on this task.", ja:"この作業に集中できない。", mixed:"騒がしい場所でも、彼女は課題に {{word}} できた。", mixedToken:"concentrate", mixedTarget:"集中", caution:"集中する対象を言うときは concentrate on が基本。", domainExamples:[{"domain":"化学","expression":"concentrated solution","meaning":"濃厚溶液","explanation":"溶媒に対して溶質の割合が大きい溶液。concentrate の「集める」と関連する語。"},{"domain":"人口地理学","expression":"population is concentrated in urban areas","meaning":"人口が都市部に集中している","explanation":"人口分布の偏りを表し、特定の地域に人が集まっていることを示す。"}] },
  6: { meaning:"照合して、不確かだったことを確かなものにする", usage:"confirm a booking / confirm that ...。情報・予定・事実などを確かめ、確定させる。", decomp:"firm（堅い）と関連づけ、「確かな状態にする」と捉える。", example:"Please confirm your email address.", ja:"メールアドレスを確認してください。", mixed:"予約を確定する前に、日時を {{word}} してください。", mixedToken:"confirm", mixedTarget:"確認", caution:"check は広く「確認する」、confirm は正しい・確かだと確定させるニュアンスが出やすい。", domainExamples:[{"domain":"医学","expression":"confirm a diagnosis","meaning":"診断を確かめる","explanation":"検査結果や所見を照合し、疑われていた診断を裏づける。"},{"domain":"科学研究","expression":"confirm a hypothesis","meaning":"仮説を裏づける","explanation":"観察・実験の結果が仮説と整合することを示す。通常は「絶対に証明する」と同じではない。"}] },
  7: { meaning:"対象を頭の中に置き、判断材料としてよく考える", usage:"consider doing（〜することを検討する）/ consider A (to be) B。", decomp:"ラテン語 considerare に由来する。現代英語では、対象を判断材料としてよく考える意味で使う。", example:"We're considering moving to Kyoto.", ja:"私たちは京都へ引っ越すことを検討している。", mixed:"彼らは新しい勉強法を {{word}} している。", mixedToken:"consider", mixedTarget:"検討", caution:"consider の後ろは通常、動名詞 doing。consider to do とはしない。", domainExamples:[{"domain":"法学","expression":"consider the evidence","meaning":"証拠を考慮する","explanation":"判断を下す前に、証拠を検討材料として評価する。"},{"domain":"環境アセスメント","expression":"consider the environmental impact","meaning":"環境への影響を考慮する","explanation":"事業や計画を評価するとき、環境に及ぼす影響を判断材料に含める。"}] },
  8: { meaning:"何かを内側に収め、範囲の中に含む", usage:"contain A（Aを含む・収容する）。物理的な容器にも抽象的な内容にも使う。", decomp:"ラテン語 continere（中に保つ）に由来し、con-（共に・完全に）+ tenere（保つ）と関係する。", example:"This bottle contains clean water.", ja:"この瓶にはきれいな水が入っている。", mixed:"この資料は、今回必要なデータをすべて {{word}} している。", mixedToken:"contain", mixedTarget:"含んで", caution:"contain は「含む／収容する」。include は全体の一部として含めることに焦点がある。", domainExamples:[{"domain":"化学","expression":"The solution contains a solute.","meaning":"その溶液は溶質を含んでいる","explanation":"溶液の内部に、溶媒に溶けた物質が含まれていることを表す。"},{"domain":"数学・集合論","expression":"Set A contains set B.","meaning":"集合Aは集合Bを含む","explanation":"Bのすべての要素がAにも属するという包含関係を表す。"}] },
  9: { meaning:"条件を定めて当事者を結びつける契約／契約する", usage:"sign a contract（契約に署名する）/ contract with a company。動詞には「縮む」「病気にかかる」など別の意味もある。", decomp:"ラテン語 contractus（合意・契約）に由来し、con-（共に）+ trahere（引く）と関係する。", example:"They signed a contract yesterday.", ja:"彼らは昨日、契約に署名した。", mixed:"その会社と正式に {{word}} を結んだ。", mixedToken:"contract", mixedTarget:"契約", caution:"contract は名詞・動詞で発音が変わる場合があり、意味も文脈で判断する。", domainExamples:[{"domain":"法学・労働法","expression":"employment contract","meaning":"雇用契約","explanation":"雇用する側と働く側の権利・義務などを定める契約。"},{"domain":"生理学","expression":"The muscle contracts.","meaning":"筋肉が収縮する","explanation":"筋肉が力を発揮し、長さや張力を変化させる。contract の別語義。"}] },
  10: { meaning:"全体に対して、自分の一部を差し出す・寄与する", usage:"contribute to + 名詞 / 動名詞。to は前置詞なので後ろに名詞相当が来る。", decomp:"con-（共に）と tribuere（割り当てる・与える）に関連し、全体や目的に何かを提供する意味につながる。", example:"Everyone contributed to the project.", ja:"全員がそのプロジェクトに貢献した。", mixed:"地域の活動に少しでも {{word}} したい。", mixedToken:"contribute", mixedTarget:"貢献", caution:"contribute to doing の形では to の後ろが動名詞になる。", domainExamples:[{"domain":"経済学","expression":"contribute to GDP","meaning":"GDPに寄与する","explanation":"ある産業・活動が、国内総生産の一部を生み出すことを表す。"},{"domain":"遺伝学","expression":"Genes contribute to a trait.","meaning":"遺伝子が形質に寄与する","explanation":"形質は複数の遺伝要因や環境要因の影響を受け、その一部を遺伝子が担う。"}] },
  11: { meaning:"全体から一部分を切り取る／切り取られた部分", usage:"crop a photo（写真をトリミングする）/ a crop of rice（米の作物・収穫）。", decomp:"画像編集では「枠の外を切り落として一部を残す」という動きを思い浮かべる。", example:"Crop the image to remove the empty space.", ja:"余白を取り除くために画像をトリミングして。", mixed:"SNSに載せる前に、写真を正方形に {{word}} しておこう。", mixedToken:"crop", mixedTarget:"トリミング", caution:"crop は写真の切り抜きだけでなく、農作物・収穫という意味もある。", domainExamples:[{"domain":"農学","expression":"crop rotation","meaning":"輪作","explanation":"同じ土地で栽培する作物を順番に変える農法。crop はここでは農作物。"},{"domain":"画像処理","expression":"crop an image","meaning":"画像を切り抜く","explanation":"画像全体から必要な範囲を残し、周辺部分を取り除く操作。"}] },
  12: { meaning:"相手の苦痛を顧みず、残酷なことをする", usage:"be cruel to + 人・動物。人や動物に対して残酷である、という形を取る。", decomp:"ラテン語 crudelis（残酷な）に由来する。", example:"It is cruel to laugh at someone in pain.", ja:"苦しんでいる人を笑うのは残酷だ。", mixed:"弱い立場の人を笑うのは {{word}} な行為だ。", mixedToken:"cruel", mixedTarget:"残酷", caution:"cruel は行為や扱いを評価する語で、単に厳しい（strict）とは異なる。", domainExamples:[{"domain":"動物福祉","expression":"cruel treatment of animals","meaning":"動物への残酷な扱い","explanation":"動物に不必要な苦痛を与える扱いを問題にするときの表現。"},{"domain":"法学","expression":"cruel and unusual","meaning":"残酷で異常な","explanation":"英米法の人権・刑事司法の議論で使われる定型表現。"}] },
  13: { meaning:"異なる主張を出し合い、理由をぶつけて論じる", usage:"debate an issue / debate with someone / a debate about education。", decomp:"主張をぶつけ合う場面を想像すると、単なる雑談との違いが見える。", example:"The students debated the proposal.", ja:"生徒たちはその提案について議論した。", mixed:"委員会では予算案について長時間 {{word}} した。", mixedToken:"debate", mixedTarget:"議論", caution:"debate は対立する立場や論点のぶつかり合いが前景化しやすい。", domainExamples:[{"domain":"政治学","expression":"parliamentary debate","meaning":"議会討論","explanation":"議会で、法案や政策などについて異なる立場から主張を述べ合う。"},{"domain":"哲学","expression":"the debate over free will","meaning":"自由意志をめぐる論争","explanation":"自由意志が存在するかなど、対立する立場の理由を検討する議論。"}] },
  14: { meaning:"事実・要求・許可などを認めることを拒む", usage:"deny a claim / deny doing（〜したことを否定する）/ deny that ...。", decomp:"ラテン語 denegare（否定する・拒む）に由来する。", example:"She denied taking the money.", ja:"彼女はそのお金を取ったことを否定した。", mixed:"彼女はその発言をしたことを {{word}} した。", mixedToken:"deny", mixedTarget:"否定", caution:"deny doing は「〜したことを否定する」。refuse to do は「〜することを拒む」。", domainExamples:[{"domain":"情報セキュリティ","expression":"deny access","meaning":"アクセスを拒否する","explanation":"利用者やプログラムが対象の情報・機能へアクセスすることを認めない。"},{"domain":"法学","expression":"deny a claim","meaning":"請求・主張を認めない","explanation":"相手の請求や主張を受け入れないと、正式に表明する。"}] },
  15: { meaning:"欲しいもの・望む状態へ強く心が向くこと", usage:"desire something / desire to do。名詞・動詞の両方で使う。", decomp:"欲求が対象へ向かうことを意味の核にする。", example:"She desires to understand the reason.", ja:"彼女はその理由を理解したいと強く望んでいる。", mixed:"彼の最大の {{word}} は、世界の仕組みを理解することだ。", mixedToken:"desire", mixedTarget:"願望", caution:"desire は want より改まった語で、強い願望を表すことが多い。", domainExamples:[{"domain":"経済学","expression":"consumer desire for a product","meaning":"消費者が製品を欲する気持ち","explanation":"消費者の欲求は、選好や需要を考える際の要素になる。desire 自体が需要量を意味するわけではない。"},{"domain":"心理学","expression":"desire for social connection","meaning":"人とのつながりを求める欲求","explanation":"他者との関係や所属を求める心理的な動機を表す。"}] },
  16: { meaning:"普段の流れ・状態を乱す、邪魔する", usage:"disturb someone / disturb the peace / Do not disturb。", decomp:"ラテン語 disturbare（乱す）に由来し、dis-（ばらばらに）+ turbare（乱す）と関係する。", example:"Sorry to disturb you so late.", ja:"こんな遅い時間にお邪魔してすみません。", mixed:"夜遅くに電話して、彼の休息を {{word}} してしまった。", mixedToken:"disturb", mixedTarget:"邪魔", caution:"interrupt は進行中の行為を途中で遮ること、disturb は平穏・状態を乱すことに焦点がある。", domainExamples:[{"domain":"物理学","expression":"disturb the equilibrium","meaning":"平衡状態を乱す","explanation":"外から作用を加え、系をそれまでの平衡状態からずらす。"},{"domain":"睡眠医学","expression":"disturb sleep","meaning":"睡眠を妨げる","explanation":"騒音や環境要因などが、通常の睡眠の連続性を損なうことを表す。"}] },
  17: { meaning:"無駄を抑え、少ない資源で望む結果を出す", usage:"an efficient method / efficient use of time。方法・仕組み・仕事の進め方に使う。", decomp:"effect（効果）と同じ語族。efficient は資源や手間の無駄が少ないことに焦点を置く。", example:"This is a more efficient way to study.", ja:"これはより効率的な勉強法だ。", mixed:"この新しい仕組みなら、作業をもっと {{word}} に進められる。", mixedToken:"efficient", mixedTarget:"効率的", caution:"efficient は「無駄が少ない」、effective は「狙った効果がある」。両者は同じではない。", domainExamples:[{"domain":"計算機科学","expression":"an efficient algorithm","meaning":"効率のよいアルゴリズム","explanation":"処理時間やメモリなどの計算資源を、比較的少なく使って目的を達成する。"},{"domain":"工学","expression":"energy-efficient system","meaning":"エネルギー効率の高いシステム","explanation":"同じ目的・出力を、より少ないエネルギーで実現する仕組み。"}] },
  18: { meaning:"重要な部分を強く目立たせる・強調する", usage:"emphasize a point / emphasize that ...。", decomp:"名詞 emphasis（強調）と同じ語族。emphasize は重要な点を明確に示すこと。", example:"The report emphasizes the need for change.", ja:"その報告書は変化の必要性を強調している。", mixed:"発表では、先生がこの点を特に {{word}} した。", mixedToken:"emphasize", mixedTarget:"強調", caution:"emphasize は言葉や説明で強調すること。highlight は視覚的に目立たせる意味でも使う。", domainExamples:[{"domain":"音声学","expression":"emphasize a syllable","meaning":"音節を強調する","explanation":"発話の中で特定の音節を目立たせる。強勢やイントネーションが関係する。"},{"domain":"教育","expression":"emphasize a key concept","meaning":"重要概念を強調する","explanation":"授業や教材で、特定の概念が重要だと明確に示す。"}] },
  19: { meaning:"相手が前へ進めるよう、勇気や支えを与える", usage:"encourage someone to do。人に何かをするよう促す・励ます。", decomp:"courage（勇気）と関連づけ、「勇気を与える」と考えると覚えやすい。", example:"My teacher encouraged me to ask questions.", ja:"先生は私に質問するよう促してくれた。", mixed:"先生は私が挑戦できるように {{word}} してくれた。", mixedToken:"encourage", mixedTarget:"励まして", caution:"encourage は「励ます」だけでなく、行動を促す意味でも使う。", domainExamples:[{"domain":"教育学","expression":"encourage inquiry","meaning":"探究を促す","explanation":"学習者が自分で問いを立て、調べ、考えることを後押しする。"},{"domain":"公衆衛生","expression":"encourage physical activity","meaning":"身体活動を促す","explanation":"健康づくりの取り組みで、日常的に体を動かす行動を後押しする。"}] },
  20: { meaning:"実際にそこにある・存在する", usage:"exist in a place / exist as a problem。通常、存在する対象を目的語には取らない。", decomp:"ラテン語 exsistere（現れる・存在する）に由来し、ex-（外へ）+ sistere（立たせる）と関係する。", example:"Life may exist on other planets.", ja:"ほかの惑星にも生命が存在するかもしれない。", mixed:"この森には、珍しい種類の鳥が {{word}} している。", mixedToken:"exist", mixedTarget:"存在", caution:"exist は自動詞。there is/are と exist を使い分ける。", domainExamples:[{"domain":"数学","expression":"A solution exists.","meaning":"解が存在する","explanation":"条件を満たす解が少なくとも一つあることを表す。存在を示すことと、解を具体的に求めることは別。"},{"domain":"生態学","expression":"The species exists in this habitat.","meaning":"その種はこの生息地に存在する","explanation":"特定の生物種が、その環境に生息していることを述べる。"}] },
  21: { meaning:"何かを得る／ある状態や結果に至る。構文によって「理解する」「人に行動してもらう」などの意味にもなる。", usage:"get + noun（得る・受け取る）／get + adjective（〜の状態になる）／get it（理解する）／get + person + to do（人に〜してもらう）。意味を構文ごとに整理する。", decomp:"get は構文によって「得る」「〜になる」「理解する」「人に〜してもらう」などを表す。", example:"It's getting dark.", ja:"暗くなってきている。", mixed:"説明を聞いて、ようやくその意味が {{word}} できた。", mixedToken:"get", mixedTarget:"理解", caution:"get + 人 + to do は「人に頼む・働きかけるなどして、〜してもらう」という形。", domainExamples:[{"domain":"コンピュータネットワーク","expression":"HTTP GET request","meaning":"HTTPのGETリクエスト","explanation":"サーバー上のリソースを取得するために送るHTTPメソッド。日常語の get と同じく「得る・取得する」に結びつく。"},{"domain":"英文法","expression":"get + adjective","meaning":"〜の状態になる","explanation":"get tired / get cold のように、状態の変化を表す構文。"}] },
  22: { meaning:"人・物・場所・計画などを手放して離れる／続けるのをやめる。", usage:"abandon a plan（計画を断念する）／abandon a place（場所を去る・捨てる）／abandon oneself to ...（感情などに身を任せる）。最後の形は独立した構文として扱う。", decomp:"語源情報よりも、目的語と構文による訳の違いを優先する。", example:"They abandoned the plan after the costs increased.", ja:"費用が増えたため、彼らはその計画を断念した。", mixed:"費用が増えたため、彼らはその計画を {{word}} した。", mixedToken:"abandon", mixedTarget:"断念", caution:"abandon oneself to ... は通常の「対象を手放す」と同じ訳にせず、構文ごとに覚える。", domainExamples:[{"domain":"考古学","expression":"abandon a settlement","meaning":"集落を放棄する","explanation":"人々が居住をやめた集落を調査するときなどに使われる。放棄の理由は個別に検討する必要がある。"},{"domain":"農業地理学","expression":"abandon agricultural land","meaning":"農地の耕作をやめる","explanation":"土地利用の変化や耕作放棄地の発生を説明するときに使う。"}] },
  23: { meaning:"人・物・状態などを別のものに結びつけて示す前置詞。意味は関係の種類と文脈によって変わる。", usage:"with + person（同伴）／with + tool（道具）／with + feature（特徴）／happy with + result（感情・評価の対象）。「関係」だけで済ませず、具体的な関係の種類を見分ける。", decomp:"語源情報よりも、同伴・道具・特徴・対象などの用法群を区別することを優先する。", example:"She cut the paper with scissors.", ja:"彼女ははさみで紙を切った。", mixed:"彼女は {{word}} を使って紙を切った。", mixedToken:"with", mixedTarget:"道具・手段", caution:"with を常に「一緒に」と訳さない。後ろの名詞句と文全体の関係から意味を判断する。", domainExamples:[{"domain":"化学","expression":"react with oxygen","meaning":"酸素と反応する","explanation":"物質と酸素の間で化学反応が起こることを表す。with は反応相手を示す。"},{"domain":"統計学","expression":"correlation with age","meaning":"年齢との相関","explanation":"ある変数と年齢の間に、統計的な関連が見られることを示す。相関だけで因果関係までは確定しない。"}] },
  24: { meaning:"前置詞・副詞・形容詞・接続詞として、対象・周辺・概数・時点などを表す。", usage:"about + 名詞（話題）／about + 場所（周辺）／about + 数量（概数）／be about to do（近い未来を表す構文）。最後の構文の意味は独立したMeaningに分けてある。", decomp:"語義を一つの日本語訳にまとめず、後ろに続く要素と文中の働きで区別する。", example:"The train is about to leave.", ja:"列車はまさに出発しようとしている。", mixed:"列車は {{word}} 出発するところだ。", mixedToken:"about to", mixedTarget:"まさに〜するところ", caution:"be about to do は「〜について」ではなく、近い未来の出来事を表す構文。about 単独の基本語義と分けて登録する。", domainExamples:[{"domain":"数学・幾何学","expression":"rotate about an axis","meaning":"軸の周りに回転する","explanation":"回転の中心となる軸を示す about の空間的な用法。"},{"domain":"科学計測","expression":"about 5 kilometers","meaning":"約5キロメートル","explanation":"測定値を厳密な一点ではなく、およその値として示す。"}] },
  25: { meaning:"名詞では肩から手まで伸びる身体の腕、機械の腕、組織の部門など。動詞では武器を装備させる。", usage:"an arm（腕）／the arm of a chair（椅子の肘掛け）／the research arm of a company（企業の研究部門）／arm A with B（AにBを装備させる）。武器を表す arms は独立したMeaningに分けてある。", decomp:"身体の腕から、形や働きが似た機械の腕・組織の部門へ用法が広がる。動詞 arm は別に「武装させる」。", example:"The robot has a long mechanical arm.", ja:"そのロボットには長い機械の腕がある。", mixed:"ロボットは長い {{word}} を使って部品をつかんだ。", mixedToken:"arm", mixedTarget:"腕", caution:"身体部位としては肩から手までを指す。手首までに限定しない。単数 arm と複数 arms（武器）も区別する。", domainExamples:[{"domain":"人類学・身体計測","expression":"arm span","meaning":"両腕を左右に広げたときの長さ","explanation":"身体計測で用いられる語。arm は身体の腕を指す。"},{"domain":"ロボット工学","expression":"robotic arm","meaning":"ロボットアーム","explanation":"物体をつかむ・動かすなど、人の腕に似た働きをするロボットの機構。"}] },
  26: { meaning:"行事・学校などに出席する。attend to は注意を向ける、問題に対処する、必要な世話をする。", usage:"attend + meeting / school（前置詞を挟まず目的語を取る）／attend to + problem / customer / what節（to を伴う構文）。attend to は対象に注意を向け、必要な対応をする。", decomp:"出席する用法と attend to の用法を、構文ごとに分けて覚える。", example:"A nurse attended to the patient.", ja:"看護師がその患者の世話をした。", mixed:"看護師は患者の必要に {{word}} した。", mixedToken:"attend to", mixedTarget:"注意を向けて対応", caution:"attend to の中心は「注意を向ける／対処する・世話をする」。単に「付き添う」と同一視しない。人に付き添う意味の attend は限定的・改まった用法として扱う。", domainExamples:[{"domain":"教育","expression":"attend a lecture","meaning":"講義に出席する","explanation":"授業や講演の場に出て、そこに参加することを表す。"},{"domain":"医学・看護","expression":"attend to a patient","meaning":"患者に注意を払い、必要な対応をする","explanation":"患者の状態に気を配り、必要なケアを行う。attend to の用法。"}] },
  27: { meaning:"動詞では関連づける・交際する、名詞では仲間・同僚、形容詞では関連した・共同の。", usage:"associate A with B（AをBと関連づける）／associate with someone（人と交際する）／an associate（仲間・同僚）／associate + 名詞（形容詞用法）。associate professor は肩書きとしてMeaningに分けてある。", decomp:"動詞・名詞・形容詞を同じ綴りの別品詞として整理する。associate professor は肩書きとしての用法。", example:"Many people associate this color with peace.", ja:"多くの人がこの色を平和と結びつける。", mixed:"多くの人はこの色を平和と {{word}} する。", mixedToken:"associate", mixedTarget:"関連づけ", caution:"associate は動詞・名詞に加えて形容詞でも使う。associate professor は「准教授」と訳す肩書き。", domainExamples:[{"domain":"統計学","expression":"be associated with","meaning":"〜と関連している","explanation":"二つの変数に統計的な関連があることを述べる。関連があるだけで因果関係を意味するとは限らない。"},{"domain":"大学制度","expression":"associate professor","meaning":"准教授","explanation":"大学の教員職位を表す肩書き。associate の一般的な形容詞訳だけでは処理しない。"}] }
};
const IMAGE_QUERIES = {
  1:"person making a commitment handshake promise", 2:"two objects side by side comparison", 3:"person complaining customer service", 4:"complex network of connected parts", 5:"person focusing on one task", 6:"checking confirming a document", 7:"person thinking considering options", 8:"container holding water inside", 9:"people signing a contract", 10:"team contributing pieces to a project", 11:"photo cropping frame", 12:"cruel act unfair treatment", 13:"two people debating discussion", 14:"person denying accusation gesture", 15:"person reaching for desired object", 16:"disturbing a quiet room interruption", 17:"efficient workflow organized tools", 18:"highlighting important text", 19:"teacher encouraging student", 20:"plant existing growing in soil", 21:"person understanding a concept", 22:"abandoning a plan", 23:"scissors cutting paper with tool", 24:"about preposition surrounding topic approximate", 25:"human arm from shoulder to hand mechanical arm", 26:"attend meeting nurse caring patient", 27:"associate connection colleague related people"
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
// Lexical sense relations are separate from grammatical constructions.
// The central image remains user-authored; this map records only meanings and their relations.
const SEMANTIC_MAPS = {
  2: {
    nodes: [
      {id:"examine",kind:"基本義",label:"共通点・相違点を見比べる",description:"複数の対象を並べ、どこが同じでどこが異なるかを検討する。"},
      {id:"liken",kind:"意味の展開",label:"AをBになぞらえる",description:"二つの対象を比べ、特に類似性に注目してAをBにたとえる。"}
    ],
    edges: [
      {from:"examine",to:"liken",type:"類似性への注目",description:"比較のうち、共通点・似ている点を前面に出すと「AをBになぞらえる」という意味になる。"}
    ]
  },
  21: {
    nodes: [
      {id:"obtain",kind:"基本義",label:"得る・受け取る",description:"物・情報・機会などを自分の側に得る、または受け取る。"},
      {id:"understand",kind:"抽象的な展開",label:"理解する",description:"情報や意味を受け取り、頭の中でつかむ。get it などに現れる。"}
    ],
    edges: [
      {from:"obtain",to:"understand",type:"抽象化",description:"物を得る意味から、情報・意味を受け取って理解する意味へ広がる。"}
    ],
    independentMeanings: [
      {label:"状態変化",description:"get + 形容詞で、ある状態・性質へ変化する。例：get tired（疲れる）。"},
      {label:"人への働きかけ",description:"get + 人 + to do で、人に働きかけて何かをしてもらう。説得・依頼・手配など、文脈によって具体的な関わり方が変わる。"}
    ]
  },
  22: {
    nodes: [
      {id:"leave",kind:"基本義",label:"手放す・見捨てる・断念する",description:"人・場所・物・計画などから離れ、見捨てたり、続けることをやめたりする。"},
      {id:"surrender",kind:"構文による意味の展開",label:"身を委ねる",description:"abandon oneself to ... では、自分自身を目的語にして、感情・行動などに身を任せる。"}
    ],
    edges: [
      {from:"leave",to:"surrender",type:"再帰構文での展開",description:"「自分を手放す」という形を取ることで、自分を何かに委ねる意味になる。通常の abandon + 目的語とは構文を区別する。"}
    ]
  },
  23: {
    nodes: [
      {id:"accompaniment",kind:"基本的な関係",label:"同伴・共在",description:"人や物が、別の人・物・出来事と一緒にある関係を示す。"},
      {id:"means",kind:"関係の拡張",label:"道具・手段",description:"動作に伴って使われる道具や手段を示す。"},
      {id:"feature",kind:"関係の拡張",label:"特徴・付帯情報",description:"人や物に伴っている特徴・性質を示す。"},
      {id:"target",kind:"関係の拡張",label:"感情・評価の対象",description:"満足・不満などの感情や評価が結びつく対象を示す。"}
    ],
    edges: [
      {from:"accompaniment",to:"means",type:"動作に伴うもの",description:"人や物が一緒にある関係から、動作に伴って用いられる手段・道具を示す。"},
      {from:"accompaniment",to:"feature",type:"対象に伴う性質",description:"対象に付随している特徴を、その対象と一緒にある情報として示す。"},
      {from:"accompaniment",to:"target",type:"関係の抽象化",description:"人・物との結びつきを、感情や評価が向けられる対象との関係に広げる。"}
    ]
  },
  24: {
    nodes: [
      {id:"around-place",kind:"基本義",label:"〜の周辺に・〜を取り巻いて",description:"場所や範囲の周囲にあることを表す。"},
      {id:"around-topic",kind:"抽象的な展開",label:"〜について",description:"話題・問題などを取り巻く内容、つまり何について扱うかを示す。"},
      {id:"approximate",kind:"抽象的な展開",label:"およそ・約",description:"数量や時刻の近く・周辺を表し、厳密な一点ではない概数を示す。"}
    ],
    edges: [
      {from:"around-place",to:"around-topic",type:"抽象化",description:"空間的に何かの周囲にある関係から、話題の周辺にある内容＝「〜について」へ広がる。"},
      {from:"around-place",to:"approximate",type:"範囲の拡張",description:"一点に限定せず、その近辺・周辺を表すことから概数を示す。"}
    ],
    independentMeanings: [
      {label:"be about to do",description:"「まさに〜しようとしている」。近い未来を表す構文で、about の「周辺・およそ」とは別に構文として覚える。"}
    ]
  },
  25: {
    nodes: [
      {id:"body-arm",kind:"基本義",label:"身体の腕",description:"肩から手までの上肢を指す。"},
      {id:"mechanical-arm",kind:"形状・機能の類似",label:"機械などの腕",description:"人の腕に似た形や働きを持つ機械の部位を指す。"},
      {id:"organizational-arm",kind:"比喩的な展開",label:"組織の部門・一部門",description:"大きな組織の一部として働く部門・支部を指す。"}
    ],
    edges: [
      {from:"body-arm",to:"mechanical-arm",type:"形状・機能の類似",description:"身体の腕に似た形や、物をつかむ・動かす働きから機械の部位を指す。"},
      {from:"mechanical-arm",to:"organizational-arm",type:"比喩的な拡張",description:"全体の一部として外へ伸び、特定の働きを担う部分という比喩で組織の部門を指す。"}
    ],
    independentMeanings: [
      {label:"武装させる（動詞）",description:"arm A with B で、AにBを装備させる。身体の腕から直接導ける意味ではない。"},
      {label:"武器（arms）",description:"arms は複数形で「武器」を表すことがある。身体の腕とは別の語義として扱う。"}
    ]
  },
  26: {
    nodes: [
      {id:"attend-event",kind:"基本義",label:"行事・学校などに出席する",description:"会議・授業・学校などの場に出て、その場にいる。"},
      {id:"attend-attention",kind:"構文による展開",label:"注意を向ける",description:"attend to ... で、人・話・問題などに意識を向ける。"},
      {id:"attend-care",kind:"意味の展開",label:"対応する・世話をする",description:"attend to ... で、対象に注意を向け、必要な対応や世話をする。"}
    ],
    edges: [
      {from:"attend-event",to:"attend-attention",type:"対象への関与",description:"attend a meeting はその場に出席する用法、attend to a problem は対象に注意を向ける用法。構文は異なるが、対象に関わるという点で関連する。"},
      {from:"attend-attention",to:"attend-care",type:"具体的な対応",description:"対象に注意を向けることが、問題への対処や人の世話という行動になる。"}
    ]
  },
  27: {
    nodes: [
      {id:"associate-link",kind:"基本義",label:"AをBと関連づける",description:"人・物・考えなどを互いに結びつけて捉える。"},
      {id:"associate-social",kind:"意味の展開",label:"人と交際する・付き合う",description:"associate with someone で、その人と関係を持ち、交際する。"},
      {id:"associate-person",kind:"名詞への展開",label:"仲間・同僚",description:"同じ組織・仕事・活動などで関係を持つ人を指す。"},
      {id:"associate-adj",kind:"形容詞用法",label:"関連した・共同の",description:"名詞を修飾し、関係・共同などのつながりを表す。"}
    ],
    edges: [
      {from:"associate-link",to:"associate-social",type:"人間関係への展開",description:"物事を結びつける意味から、人と人との関係・交際を表す。"},
      {from:"associate-social",to:"associate-person",type:"関係する人",description:"関係を持つ相手を、その関係にある仲間・同僚として名詞で表す。"},
      {from:"associate-link",to:"associate-adj",type:"関係の状態",description:"何かと結びついている状態を、形容詞として表す。"}
    ],
    independentMeanings: [
      {label:"associate professor",description:"大学の職位名で「准教授」。associate の一般的な「関連した」という意味だけから訳を作らず、肩書きとして覚える。"}
    ]
  }
};

function renderSemanticMap(w,n){
 const map=n.semanticMap||SEMANTIC_MAPS[w.id];
 if(!map||!Array.isArray(map.nodes)||map.nodes.length<2||!Array.isArray(map.edges)||!map.edges.length)return "";
 const byId=Object.fromEntries(map.nodes.map(node=>[node.id,node]));
 const nodes=map.nodes.map(node=>'<article class="semantic-node"><span class="semantic-node-kind">'+escapeHtml(node.kind||"語義")+'</span><strong>'+escapeHtml(node.label)+'</strong><p>'+escapeHtml(node.description||"")+'</p></article>').join("");
 const edges=map.edges.map(edge=>{
  const from=byId[edge.from],to=byId[edge.to];
  if(!from||!to)return "";
  return '<article class="semantic-edge"><div class="semantic-edge-route"><span>'+escapeHtml(from.label)+'</span><span class="semantic-edge-arrow">→</span><span>'+escapeHtml(to.label)+'</span></div><span class="semantic-edge-kind">'+escapeHtml(edge.type||"意味の関係")+'</span><p>'+escapeHtml(edge.description||"")+'</p></article>';
 }).join("");
 return '<section class="note-section semantic-map-section"><h3>SEMANTIC MAP</h3><div class="semantic-map-nodes">'+nodes+'</div><div class="semantic-map-edges">'+edges+'</div></section>';
}
function renderDomainExamples(n){
 const examples=Array.isArray(n.domainExamples)?n.domainExamples.filter(item=>item&&item.expression):[];
 const content=examples.length
  ? '<div class="domain-example-list">'+examples.map(item=>'<article class="domain-example"><div class="domain-example-top"><span class="domain-example-domain">'+escapeHtml(item.domain||"分野")+'</span><strong>'+escapeHtml(item.expression)+'</strong></div><p class="domain-example-meaning">'+escapeHtml(item.meaning||"")+'</p>'+(item.explanation?'<p class="domain-example-explanation">'+escapeHtml(item.explanation)+'</p>':"")+'</article>').join("")+'</div>'
  : '<p class="domain-example-empty">この単語が他分野で使われる実例を、確認でき次第ここに追加します。</p>';
 return '<section class="note-section domain-examples-section"><h3>FIELD CONNECTIONS</h3><div class="domain-examples-heading">他分野での用例</div>'+content+'</section>';
}
function renderIndependentMeanings(w,n){
 let meanings;
 if(Array.isArray(n.independentMeanings))meanings=n.independentMeanings;
 else if(Array.isArray(SEMANTIC_MAPS[w.id]?.independentMeanings))meanings=SEMANTIC_MAPS[w.id].independentMeanings;
 else if(n.semanticMap||SEMANTIC_MAPS[w.id])meanings=[];
 else meanings=n.meaning?[{label:"基本義",description:n.meaning}]:[];
 if(!meanings.length)return "";
 return '<section class="note-section meaning-section"><h3>MEANING</h3>'+(n.meaning?'<p class="meaning-overview">'+escapeHtml(n.meaning)+'</p>':"")+'<div class="meaning-list">'+meanings.map(item=>{
  const entry=typeof item==="string"?{label:"独立した語義",description:item}:item;
  return '<article class="meaning-item">'+(entry.label?'<strong>'+escapeHtml(entry.label)+'</strong>':"")+'<p>'+escapeHtml(entry.description||entry.meaning||"")+'</p></article>';
 }).join("")+'</div></section>';
}
// Every word uses the same usage-component schema.
// Differences between words live in data (items, selectable variants and examples), not in custom renderers.
const USAGE_COMPONENTS = {
  2: { items: [
    { id:"comparison", parts:["compare","A",{choice:true},"B"], selected:"with", open:false, expanded:false, options:[
      {value:"with",label:"with",explanation:"AとBを並べ、共通点や相違点を検討する。",example:"I compared the two phones with each other.",ja:"私はその2台のスマートフォンを互いに比較した。"},
      {value:"to",label:"to",explanation:"AをBになぞらえ、類似性に注目する傾向がある。with / to の使い分けは絶対ではなく、文脈によって重なる。",example:"She compared his voice to the sound of rain.",ja:"彼女は彼の声を雨音にたとえた。"}
    ]}
  ]},
  6: { items: [
    {id:"confirm-noun",parts:["confirm","名詞"],explanation:"情報・予定などを照合し、正しい／確定したものにする。",example:"Please confirm your email address.",ja:"メールアドレスを確認してください。",expanded:false},
    {id:"confirm-that",parts:["confirm","that + 文"],explanation:"「〜ということ」を事実として確かめる。",example:"She confirmed that the meeting was canceled.",ja:"彼女は会議が中止になったことを確認した。",expanded:false}
  ]},
  21: { items: [
    {id:"get-noun",parts:["get","名詞"],explanation:"物・情報などを得る、受け取る。",example:"I got an email from the school.",ja:"学校からメールを受け取った。",expanded:false},
    {id:"get-adjective",parts:["get","形容詞"],explanation:"ある状態へ変化する。",example:"It's getting dark.",ja:"暗くなってきている。",expanded:false},
    {id:"get-it",parts:["get","it"],explanation:"文脈や意味を理解する。ひとかたまりの構文として覚える。",example:"I get it now.",ja:"今はその意味が分かる。",expanded:false},
    {id:"get-person",parts:["get","人","to do"],explanation:"人に頼む・働きかけるなどして、何かをしてもらう。",example:"I got him to help me.",ja:"私は彼に手伝ってもらった。",expanded:false}
  ]},
  22: { items: [
    {id:"abandon-object",parts:["abandon",{choice:true}],selected:"object",open:false,expanded:false,options:[
      {value:"object",label:"object",explanation:"人・場所・物・計画などを手放して離れる、または続けるのをやめる。目的語によって自然な訳が変わる。",example:"They abandoned the plan.",ja:"彼らはその計画を断念した。"},
      {value:"oneself",label:"oneself to + 名詞",explanation:"abandon oneself to ... は「感情などに身を任せる」。通常の他動詞用法と区別して構文ごと覚える。",example:"He abandoned himself to despair.",ja:"彼は絶望に身を任せた。"}
    ]}
  ]},
  23: { items: [
    {id:"with-relations",parts:["with",{choice:true}],selected:"person",open:false,expanded:false,options:[
      {value:"person",label:"人",explanation:"同伴する人を表す。with は「一緒に」という関係を示す。",example:"I went with my brother.",ja:"私は兄弟と一緒に行った。"},
      {value:"tool",label:"道具・手段",explanation:"道具・手段を表す。単に「一緒に」と訳すのではなく、何を使って行うかを示す。",example:"She cut the paper with scissors.",ja:"彼女ははさみで紙を切った。"},
      {value:"feature",label:"特徴",explanation:"人や物が持つ特徴・付帯情報を示す。",example:"A girl with blue eyes stood there.",ja:"青い目の少女がそこに立っていた。"},
      {value:"feeling",label:"感情・評価の対象",explanation:"感情や評価が向けられる対象を示すことがある。",example:"I'm happy with the result.",ja:"私はその結果に満足している。"}
    ]}
  ]},
  26: { items: [
    {id:"attend-event",parts:["attend","行事 / 授業"],explanation:"会議・授業・行事などに出席する。目的語を直接続ける。",example:"She attends every lecture.",ja:"彼女はすべての講義に出席する。"},
    {id:"attend-to",parts:["attend to","対象"],explanation:"attend to をひとかたまりの群動詞として扱う。対象に注意を向け、必要に応じて対応・世話をする。",example:"The nurse attended to the patient.",ja:"看護師は患者の世話をした。"}
  ]},
  1: { items: [
    {id:"auto-1-1",parts:["commit","to","名詞 / 動名詞"],explanation:"commit to は計画・約束などに自分を結びつけ、責任を持って取り組む。to は前置詞。",example:"She committed to learning English.",ja:"彼女は英語を学ぶことに本腰を入れた。"},
    {id:"auto-1-2",parts:["commit","犯罪・過ちなど"],explanation:"commit + 名詞で犯罪・過ちなどを実行する。",example:"He committed a serious crime.",ja:"彼は重大な犯罪を犯した。"}
  ]},
  3: { items: [
    {id:"auto-3-1",parts:["complain","about","対象"],explanation:"何について不満を述べるかを示す。",example:"They complained about the noise.",ja:"彼らは騒音について苦情を言った。"},
    {id:"auto-3-2",parts:["complain","to","人"],explanation:"誰に苦情を伝えるかを示す。",example:"I complained to the manager.",ja:"私は店長に苦情を伝えた。"},
    {id:"auto-3-3",parts:["complain","of","症状"],explanation:"病気・痛みなどの症状を訴える、やや改まった表現。",example:"The patient complained of a headache.",ja:"患者は頭痛を訴えた。"}
  ]},
  4: { items: [
    {id:"auto-4-1",parts:["a","complex","problem / system"],explanation:"複数の要素や関係が絡み合った問題・体系。",example:"Climate change is a complex problem.",ja:"気候変動は複雑な問題だ。"},
    {id:"auto-4-2",parts:["a","complex","of","建物・施設など"],explanation:"関連する複数の建物・施設などから成る複合体。",example:"The hospital complex includes several buildings.",ja:"その病院複合施設はいくつかの建物から成る。"}
  ]},
  5: { items: [
    {id:"auto-5-1",parts:["concentrate","on","対象 / 動名詞"],explanation:"注意・努力などを何に向けて集中させるかを示す。",example:"She concentrated on solving the problem.",ja:"彼女はその問題を解くことに集中した。"},
    {id:"auto-5-2",parts:["concentrate","資源・力など"],explanation:"何かを一か所・一方向に集める。",example:"The company concentrated its resources on research.",ja:"その会社は研究に資源を集中させた。"}
  ]},
  7: { items: [
    {id:"auto-7-1",parts:["consider","動名詞"],explanation:"〜することを検討する。consider の後ろに to do は通常置かない。",example:"We're considering moving to Kyoto.",ja:"私たちは京都へ引っ越すことを検討している。"},
    {id:"auto-7-2",parts:["consider","名詞"],explanation:"対象を考慮する・よく考える。",example:"You should consider the risks.",ja:"その危険性を考慮すべきだ。"},
    {id:"auto-7-3",parts:["consider","A","(to be)","B"],explanation:"AをBだと見なす。",example:"Many people consider him a genius.",ja:"多くの人が彼を天才だと考えている。"}
  ]},
  8: { items: [
    {id:"auto-8-1",parts:["contain","名詞"],explanation:"容器・文書・集合などが何かを内部に含む。",example:"This bottle contains water.",ja:"この瓶には水が入っている。"},
    {id:"auto-8-2",parts:["be contained","in","場所・範囲"],explanation:"何かがある範囲の中に含まれている。",example:"The details are contained in the report.",ja:"詳細はその報告書に記載されている。"}
  ]},
  9: { items: [
    {id:"auto-9-1",parts:["contract","with","相手"],explanation:"相手と契約を結ぶ。",example:"The company contracted with a local supplier.",ja:"その会社は地元の供給業者と契約した。"},
    {id:"auto-9-2",parts:["contract","for","仕事・サービス"],explanation:"特定の仕事・サービスを対象とする契約。",example:"They won a contract for the construction work.",ja:"彼らは建設工事の契約を獲得した。"},
    {id:"auto-9-3",parts:["contract","病気"],explanation:"病気にかかる。名詞「契約」とは異なる動詞用法。",example:"He contracted the disease abroad.",ja:"彼は海外でその病気にかかった。"}
  ]},
  10: { items: [
    {id:"auto-10-1",parts:["contribute","to","名詞 / 動名詞"],explanation:"全体・結果・目的に何かを加え、貢献する。to は前置詞。",example:"Everyone contributed to the project.",ja:"全員がそのプロジェクトに貢献した。"},
    {id:"auto-10-2",parts:["contribute","金銭・時間・知識など"],explanation:"寄付・提供するものを直接目的語に置く。",example:"She contributed money to the fund.",ja:"彼女はその基金にお金を寄付した。"}
  ]},
  11: { items: [
    {id:"auto-11-1",parts:["crop","画像・写真など"],explanation:"画像の周辺を切り取り、必要な範囲を残す。",example:"I cropped the photo before posting it.",ja:"投稿する前に写真をトリミングした。"},
    {id:"auto-11-2",parts:["a","crop","of","作物"],explanation:"農作物・収穫物を表す名詞用法。",example:"Rice is an important crop in Japan.",ja:"米は日本の重要な作物だ。"}
  ]},
  12: { items: [
    {id:"auto-12-1",parts:["be cruel","to","人・動物"],explanation:"人や動物に対して残酷である。",example:"It is cruel to animals.",ja:"それは動物に対して残酷だ。"},
    {id:"auto-12-2",parts:["cruel","treatment / punishment"],explanation:"残酷な扱い・処罰。",example:"The law prohibits cruel treatment.",ja:"その法律は残酷な扱いを禁じている。"}
  ]},
  13: { items: [
    {id:"auto-13-1",parts:["debate","論点・問題"],explanation:"ある論点について討論する。目的語を直接続けられる。",example:"They debated the proposal.",ja:"彼らはその提案について討論した。"},
    {id:"auto-13-2",parts:["debate","with","人"],explanation:"誰と討論するかを示す。",example:"She debated with her classmates.",ja:"彼女はクラスメートたちと討論した。"},
    {id:"auto-13-3",parts:["a debate","about / over","テーマ"],explanation:"テーマをめぐる討論・論争。",example:"There is a debate over the new policy.",ja:"新しい政策をめぐって議論がある。"}
  ]},
  14: { items: [
    {id:"auto-14-1",parts:["deny","名詞"],explanation:"要求・主張・事実などを認めない。",example:"He denied the accusation.",ja:"彼はその告発を否定した。"},
    {id:"auto-14-2",parts:["deny","動名詞"],explanation:"〜したことを否定する。",example:"She denied taking the money.",ja:"彼女はそのお金を取ったことを否定した。"},
    {id:"auto-14-3",parts:["deny","that + 文"],explanation:"〜ということを否定する。",example:"They denied that the report was accurate.",ja:"彼らはその報告が正確だということを否定した。"}
  ]},
  15: { items: [
    {id:"auto-15-1",parts:["desire","名詞"],explanation:"何かを強く望む。名詞では「欲求・願望」。",example:"She desires success.",ja:"彼女は成功を強く望んでいる。"},
    {id:"auto-15-2",parts:["desire","to do"],explanation:"〜したいと望む。改まった表現。",example:"He desires to learn more.",ja:"彼はもっと学びたいと望んでいる。"},
    {id:"auto-15-3",parts:["a desire","for","名詞"],explanation:"何かに対する願望・欲求。",example:"The desire for knowledge is powerful.",ja:"知識を求める欲求は強い。"}
  ]},
  16: { items: [
    {id:"auto-16-1",parts:["disturb","人"],explanation:"人の平穏・集中・休息などを妨げる。",example:"Sorry to disturb you.",ja:"お邪魔してすみません。"},
    {id:"auto-16-2",parts:["disturb","平穏・均衡・秩序など"],explanation:"保たれている状態を乱す。",example:"The noise disturbed the peace of the town.",ja:"その騒音は町の平穏を乱した。"},
    {id:"auto-16-3",parts:["Do not disturb"],explanation:"「邪魔をしないでください」という定型表現。",example:"The sign said, “Do not disturb.”",ja:"その表示には「起こさないでください」と書かれていた。"}
  ]},
  17: { items: [
    {id:"auto-17-1",parts:["be efficient","at","仕事・活動"],explanation:"特定の仕事・活動を効率よくこなす。",example:"She is efficient at managing projects.",ja:"彼女はプロジェクト管理を効率よくこなす。"},
    {id:"auto-17-2",parts:["an efficient use","of","資源・時間など"],explanation:"資源や時間を無駄なく使うこと。",example:"We need a more efficient use of energy.",ja:"エネルギーをもっと効率よく使う必要がある。"}
  ]},
  18: { items: [
    {id:"auto-18-1",parts:["emphasize","点・重要性など"],explanation:"重要な点を強調する。",example:"The report emphasizes the need for change.",ja:"その報告書は変化の必要性を強調している。"},
    {id:"auto-18-2",parts:["emphasize","that + 文"],explanation:"〜ということを強く述べる。",example:"She emphasized that accuracy matters.",ja:"彼女は正確さが重要だと強調した。"}
  ]},
  19: { items: [
    {id:"auto-19-1",parts:["encourage","人","to do"],explanation:"人を励ましたり促したりして、何かをするよう働きかける。",example:"My teacher encouraged me to ask questions.",ja:"先生は私に質問するよう促してくれた。"},
    {id:"auto-19-2",parts:["encourage","名詞"],explanation:"活動・考え・成長などを促進する。",example:"The program encourages creativity.",ja:"そのプログラムは創造性を促す。"}
  ]},
  20: { items: [
    {id:"auto-20-1",parts:["exist","in","場所・状況"],explanation:"ある場所・状況に存在する。",example:"Many species exist in this region.",ja:"この地域には多くの種が生息している。"},
    {id:"auto-20-2",parts:["There","exists","名詞"],explanation:"〜が存在する、という存在構文。",example:"There exists a better solution.",ja:"もっとよい解決策が存在する。"},
    {id:"auto-20-3",parts:["exist","as","役割・形態"],explanation:"〜として存在する。",example:"The tradition still exists as a local custom.",ja:"その伝統は今も地域の慣習として残っている。"}
  ]},
  24: { items: [
    {id:"auto-24-1",parts:["be","about","テーマ"],explanation:"話題・内容が何についてのものかを示す。",example:"The book is about space.",ja:"その本は宇宙についての本だ。"},
    {id:"auto-24-2",parts:["about","数値"],explanation:"数値の前で「およそ・約」を表す。",example:"The trip takes about two hours.",ja:"その旅行には約2時間かかる。"},
    {id:"auto-24-3",parts:["be","about to","do"],explanation:"まさに〜しようとしている。about to を一まとまりの構文として扱う。",example:"I was about to call you.",ja:"ちょうどあなたに電話しようとしていた。"}
  ]},
  25: { items: [
    {id:"auto-25-1",parts:["arm","人・集団","with","武器"],explanation:"人や集団に武器を装備させる。",example:"The group was armed with rifles.",ja:"その集団はライフルで武装していた。"},
    {id:"auto-25-2",parts:["arm oneself","with","知識・情報など"],explanation:"知識・情報などを身につけ、備える比喩的用法。",example:"Arm yourself with the facts.",ja:"事実を身につけて備えなさい。"},
    {id:"auto-25-3",parts:["arms"],explanation:"複数形 arms は「武器・兵器」を表す名詞。",example:"The country reduced its arms imports.",ja:"その国は武器の輸入を減らした。"}
  ]},
  27: { items: [
    {id:"auto-27-1",parts:["associate","A","with","B"],explanation:"AをBと関連づける。",example:"People often associate red with danger.",ja:"人々は赤を危険と結びつけることが多い。"},
    {id:"auto-27-2",parts:["be associated","with","対象"],explanation:"〜と関連している。",example:"The disease is associated with smoking.",ja:"その病気は喫煙と関連している。"},
    {id:"auto-27-3",parts:["associate","with","人"],explanation:"人と交際する・付き合う。",example:"He associates with artists.",ja:"彼は芸術家たちと付き合っている。"}
  ]},

  28: {items:[{id:"lex-28",parts:["be appropriate","for","名詞"],explanation:"特定の相手・状況・目的にふさわしい。",example:"This course is appropriate for beginners.",ja:"この講座は初学者に適している。"}]},
  29: {items:[{id:"lex-29",parts:["appreciate","名詞 / 動名詞"],explanation:"価値を認める、ありがたく思う。",example:"I appreciate your help.",ja:"あなたの助けに感謝します。"}]},
  30: {items:[{id:"lex-30",parts:["an aspect","of","名詞"],explanation:"ある物事の一側面・特徴を示す。",example:"We discussed an important aspect of the issue.",ja:"私たちはその問題の重要な側面を議論した。"}]},
  31: {items:[{id:"lex-31",parts:["an atmosphere","of","名詞"],explanation:"どのような雰囲気かを示す。",example:"The room had an atmosphere of trust.",ja:"その部屋には信頼の雰囲気があった。"}]},
  32: {items:[{id:"lex-32",parts:["attempt","to do"],explanation:"何かをしようと試みる。",example:"They attempted to solve the problem.",ja:"彼らはその問題を解決しようと試みた。"}]},
  33: {items:[{id:"lex-33",parts:["be available","to","人"],explanation:"人が利用できる状態にある。",example:"The service is available to all members.",ja:"そのサービスは全会員が利用できる。"}]},
  34: {items:[{id:"lex-34",parts:["account for","名詞"],explanation:"原因を説明する、または全体の中の割合を占める。account for を一まとまりの群動詞として扱う。",example:"This factor accounts for the difference.",ja:"この要因がその違いを説明する。"}]},
  35: {items:[{id:"lex-35",parts:["adapt","to","環境・条件"],explanation:"新しい環境や条件に自分が適応する。",example:"Children adapt quickly to new environments.",ja:"子どもは新しい環境にすぐ適応する。"}]},
  36: {items:[{id:"lex-36",parts:["admire","人","for","性質・行動"],explanation:"人を、その性質や行動を理由に尊敬する。",example:"I admire her for her honesty.",ja:"私は彼女の誠実さを尊敬している。"}]},
  37: {items:[{id:"lex-37",parts:["admit","that + 文"],explanation:"～という事実を認める。",example:"He admitted that he was wrong.",ja:"彼は自分が間違っていたことを認めた。"}]},
  38: {items:[{id:"lex-38",parts:["advance","知識・理解・計画など"],explanation:"知識や物事をより進んだ段階へ進める。",example:"The discovery advanced medical research.",ja:"その発見は医学研究を前進させた。"}]},
  39: {items:[{id:"lex-39",parts:["aesthetic","価値・感覚・様式"],explanation:"美や芸術に関する性質を表す。",example:"The design has strong aesthetic appeal.",ja:"そのデザインには強い美的魅力がある。"}]},
  40: {items:[{id:"lex-40",parts:["affect","名詞"],explanation:"人・物事に作用し、変化をもたらす。",example:"Weather can affect our mood.",ja:"天候は私たちの気分に影響することがある。"}]},
  41: {items:[{id:"lex-41",parts:["a level / society","of","affluence"],explanation:"豊かさの程度や、豊かな社会を表す。",example:"The area is known for its affluence.",ja:"その地域は豊かさで知られている。"}]},
  42: {items:[{id:"lex-42",parts:["can afford","to do"],explanation:"金銭・時間などの余裕があって何かができる。",example:"We can afford to wait.",ja:"私たちには待つ余裕がある。"}]},
  43: {items:[{id:"lex-43",parts:["aim","to do"],explanation:"何かを達成することを目指す。",example:"The project aims to reduce waste.",ja:"その計画は廃棄物の削減を目指している。"}]},
  44: {items:[{id:"lex-44",parts:["a common ancestor","of","名詞"],explanation:"共通の祖先を表す。",example:"The two species share a common ancestor.",ja:"その2種は共通の祖先を持つ。"}]},
  45: {items:[{id:"lex-45",parts:["apply A","to","B"],explanation:"知識・原理・規則などを具体的な対象に適用する。",example:"Apply this rule to the next question.",ja:"この規則を次の問題に適用しなさい。"}]},
  46: {items:[{id:"lex-46",parts:["an approach","to","名詞"],explanation:"問題や課題に取り組むための方法。",example:"We need a new approach to education.",ja:"教育への新しい取り組み方が必要だ。"}]},
  47: {items:[{id:"lex-47",parts:["argue","that + 文"],explanation:"根拠を示しながら～だと論じる。",example:"The researchers argue that more evidence is needed.",ja:"研究者たちは、さらに証拠が必要だと論じている。"}]},

};

function renderUsageFrame(w){
 const data=USAGE_COMPONENTS[w.id];
 if(!data||!data.items||!data.items.length)return "<p>"+escapeHtml(noteFor(w).usage||"使い方メモは未登録です。")+"</p>";
 return '<div class="usage-component-list">'+data.items.map(item=>{
  const selected=(item.options||[]).find(option=>option.value===item.selected)||(item.options||[])[0];
  const detail=selected||item;
  const parts=item.parts||[];
  const diagram='<div class="usage-diagram">'+parts.map(part=>{
   if(part&&typeof part==="object"&&part.choice){
    const options=item.options||[];
    return '<span class="usage-choice-wrap"><button type="button" class="usage-choice" data-usage-action="toggle" data-usage-item="'+escapeHtml(item.id)+'" aria-expanded="'+Boolean(item.open)+'">'+escapeHtml(detail.label||detail.value||"選択")+'</button><span class="usage-choice-list'+(item.open?"":" hidden")+'">'+options.map(option=>'<button type="button" class="usage-choice-option'+(option.value===item.selected?" is-selected":"")+'" data-usage-select="'+escapeHtml(option.value)+'" data-usage-item="'+escapeHtml(item.id)+'">'+escapeHtml(option.label||option.value)+'</button>').join("")+'</span></span>';
   }
   return '<span class="usage-part'+(part==="A"||part==="B"||part==="名詞"||part==="形容詞"||part==="人"||/名詞|形容詞|動名詞|to do|do$|対象|テーマ|論点|仕事|活動|作物|資源|時間|数値|人・|場所|範囲|症状|状態|環境|条件|性質|行動|価値|感覚|様式|知識|理解|計画|目的|用途|課題|問題|分野|原因|目標|目的語|人$|物$|^A$|^B$/.test(part)?" usage-slot":"")+'">'+escapeHtml(part)+'</span>';
  }).join('<span class="usage-join"> </span>')+'</div>';
  const shown=item.expanded
   ? '<div class="usage-example"><p class="usage-example-en">'+escapeHtml(detail.example||"例文は未登録です。")+'</p><p class="usage-example-ja translation-text">'+escapeHtml(detail.ja||"")+'</p><button type="button" class="subtle-btn usage-example-button" data-usage-action="back" data-usage-item="'+escapeHtml(item.id)+'">骨格に戻る</button></div>'
   : diagram;
  const action=item.expanded?"":"<button type=\"button\" class=\"subtle-btn usage-example-button\" data-usage-action=\"example\" data-usage-item=\""+escapeHtml(item.id)+"\">例</button>";
  return '<article class="usage-item"><div class="usage-item-top">'+shown+action+'</div><p class="usage-explanation">'+escapeHtml(detail.explanation||detail.meaning||"")+'</p></article>';
 }).join("")+'</div>';
}
const WORD_MEANINGS_BY_WORD = {"appropriate":{"meaning":"状況・目的・基準に合っていること。動詞では、何かを特定の用途に充てたり、自分の用途に取り込んだりする。","independentMeanings":[{"label":"形容詞：状況に合っている","description":"特定の場面・目的・相手にふさわしく、適切である。appropriate for ～ は「～に適切な」、appropriate to ～ は「～にふさわしい」。"},{"label":"動詞：目的に割り当てる","description":"資金・時間・資源などを、特定の目的のために確保・配分する。やや改まった語。"},{"label":"動詞：自分の用途に取り込む","description":"他人のもの・考え・資金などを自分の用途に使う。許可なく行う場合は「盗用する・横領する」に近い意味になる。"}],"usage":"形容詞 appropriate for / to + 名詞。動詞 appropriate A for + 目的。動詞は形容詞とは別の語義なので区別する。","example":"Choose a method appropriate to the problem.","ja":"その問題に適した方法を選びなさい。","mixed":"この場面では、より {{word}} な表現を選ぼう。","mixedToken":"appropriate","mixedTarget":"状況に合った・適切な","caution":"appropriate は形容詞「適切な」と動詞「割り当てる／自分の用途に取り込む」を区別する。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/appropriate_1","https://www.oxfordlearnersdictionaries.com/definition/english/appropriate_2"]},"appreciate":{"meaning":"人・物事の価値や良さ、重要性を認め、それを十分に理解する。そこから感謝や価値の上昇も表す。","independentMeanings":[{"label":"価値・良さを認める","description":"人や作品、行為などの優れた点を理解し、高く評価する。"},{"label":"ありがたく思う","description":"助け・親切・配慮などを受け、その価値を認識して感謝する。appreciate + 名詞／動名詞。"},{"label":"重要性を理解する","description":"状況の難しさや問題の重大さを十分に理解する。appreciate that ... の形がよく使われる。"},{"label":"（価値・価格が）上がる","description":"資産・通貨などの価値が時間とともに上昇する。経済・金融で使う自動詞用法。"}],"usage":"appreciate + 名詞 / 動名詞。appreciate that + 文。金融分野では value / currency appreciates の形もある。","example":"I appreciate your taking the time to explain it.","ja":"時間を取って説明してくれたことに感謝します。","mixed":"彼女は相手の努力を心から {{word}} している。","mixedToken":"appreciate","mixedTarget":"価値を認めている・高く評価している","caution":"appreciate は相手の行為や物事の価値を認識して感謝・評価する語。単なる定型的な「ありがとう」より意味が広い。","sources":["https://dictionary.cambridge.org/dictionary/english/appreciate"]},"aspect":{"meaning":"一つの物事を成り立たせている、特定の側面・特徴・切り口。","independentMeanings":[{"label":"側面・特徴","description":"複雑な物事の一部分として注目できる特徴や要素。aspect of ～ が基本形。"},{"label":"観点・見方","description":"物事をどの角度から捉えるかという見方。"},{"label":"文法：アスペクト","description":"動作や状態を、完了・進行など時間的な内部構造の観点から捉える文法概念。"}],"usage":"an aspect of + 名詞。the economic / social / technical aspect のように、どの側面かを形容詞で限定する。","example":"We need to consider every aspect of the problem.","ja":"その問題のあらゆる側面を考慮する必要がある。","mixed":"この問題には、まだ見落としている {{word}} がある。","mixedToken":"aspect","mixedTarget":"側面・切り口","caution":"aspect は物事全体そのものではなく、そこから取り出して見る一側面を指す。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/aspect"]},"atmosphere":{"meaning":"ある場所や天体を取り巻く気体、または場所・集団を包むように感じられる空気や雰囲気。","independentMeanings":[{"label":"大気","description":"地球や惑星などを取り巻く気体の層。the Earth's atmosphere / the atmosphere of Mars。"},{"label":"室内・場所の空気","description":"ある空間に存在する空気の状態。humid atmosphere（湿った空気）など。"},{"label":"雰囲気","description":"場所・状況・集団に感じられる全体的な気分や空気。a friendly / tense / relaxed atmosphere。"}],"usage":"the atmosphere。雰囲気では an atmosphere of + 名詞、または create / maintain an atmosphere の形。","example":"The room had a calm and welcoming atmosphere.","ja":"その部屋には落ち着いた親しみやすい雰囲気があった。","mixed":"その部屋には、落ち着いた {{word}} が漂っていた。","mixedToken":"atmosphere","mixedTarget":"雰囲気・場の空気","caution":"「大気」と「雰囲気」は同じ名詞の異なる語義。雰囲気は気体そのものを意味しない。","sources":["https://www.oxfordlearnersdictionaries.co.uk/definition/english/atmosphere"]},"attempt":{"meaning":"難しいことや達成したいことに向けて、実際にやってみる行為・試み。","independentMeanings":[{"label":"名詞：試み","description":"何かを成し遂げようとする行為。成功したかどうかは含意しないが、困難なことへの挑戦を表すことが多い。"},{"label":"動詞：試みる","description":"難しい課題などを実際にやってみる。attempt to do または attempt + 名詞。"}],"usage":"attempt to do。名詞では make an attempt to do / an attempt at + 名詞。動詞は attempt the task のように目的語を直接取る。","example":"She made several attempts to solve the puzzle.","ja":"彼女はそのパズルを解こうと何度か試みた。","mixed":"彼はその難問の解決を {{word}} した。","mixedToken":"attempt","mixedTarget":"試みた・やってみた","caution":"attempt は「成功する」ことまでは意味しない。try より改まった響きがある。","sources":["https://www.oxfordlearnersdictionaries.com/us/definition/english/attempt_1","https://www.oxfordlearnersdictionaries.com/definition/english/attempt_2"]},"available":{"meaning":"必要なときに使える・手に入る状態にあること。人については、対応する時間や余裕があること。","independentMeanings":[{"label":"利用できる・入手できる","description":"物・情報・サービスなどが使用可能、または手に入る状態。"},{"label":"人の手が空いている","description":"人が忙しくなく、対応したり参加したりできる状態。be available to do / be available to someone。"},{"label":"選択肢・時間が空いている","description":"席・部屋・日時などが予約されておらず、利用できる状態。"}],"usage":"be available for + 用途 / be available to + 人 / be available to do。","example":"The information is available to all students.","ja":"その情報はすべての生徒が利用できる。","mixed":"この資料はオンラインで {{word}} だ。","mixedToken":"available","mixedTarget":"利用可能・入手可能","caution":"available は「存在する」だけでなく、必要な人が実際に利用・入手できる状態を表す。","sources":["https://dictionary.cambridge.org/dictionary/english/available"]},"account":{"meaning":"出来事や金銭などを記録・説明したもの、または銀行などに設ける管理上の口座。動詞・群動詞では説明や割合も表す。","independentMeanings":[{"label":"名詞：口座・アカウント","description":"銀行などで金銭を預けたり管理したりするための契約・記録。オンラインサービスの利用者情報にも使う。"},{"label":"名詞：説明・報告","description":"出来事や状況について、経過や内容を説明したもの。an account of ～。"},{"label":"名詞：考慮・重要性","description":"take ～ into account で「～を考慮に入れる」。of little / no account は「ほとんど重要でない」。"},{"label":"動詞・群動詞：account for","description":"原因を説明する、全体の中の割合を占める、または管理する金銭の使途を説明する。"}],"usage":"an account of + 出来事。take + 名詞 + into account。account for は群動詞として一まとまりで覚える。","example":"The report gives a detailed account of the event.","ja":"その報告書は出来事を詳しく説明している。","mixed":"出来事の詳しい {{word}} を彼女が残した。","mixedToken":"account","mixedTarget":"説明・報告","caution":"bank account の「口座」と an account of の「説明」は文脈で区別する。account for は別のまとまり。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/account_1","https://www.oxfordlearnersdictionaries.com/definition/english/account_2","https://www.oxfordlearnersdictionaries.com/definition/english/account-for"]},"adapt":{"meaning":"環境・目的・条件の変化に合わせて、自分や物事の形・方法を変えること。","independentMeanings":[{"label":"自分が適応する","description":"新しい環境・状況・人間関係などに合わせて、自分の行動や考え方を変える。adapt to ～。"},{"label":"物事を適合させる","description":"計画・方法・設計などを別の条件や用途に合うよう変更する。adapt A to / for B。"},{"label":"作品を翻案・改作する","description":"小説などを映画・舞台・別媒体に合う形へ作り替える。adapt A for B / into B。"}],"usage":"adapt to + 環境・条件。adapt A for + 用途。adapt A into B。自分が変わる用法と、対象を変える他動詞用法を区別する。","example":"The company adapted its product to local needs.","ja":"その会社は製品を現地のニーズに合わせて改良した。","mixed":"新しい環境に合わせて生活習慣を {{word}} させた。","mixedToken":"adapt","mixedTarget":"適応・適合させた","caution":"adapt to は「自分が適応する」、adapt A to B は「AをBに合うよう変える」。","sources":["https://dictionary.cambridge.org/dictionary/english/adapt"]},"admire":{"meaning":"人の性質・行動を価値あるものとして尊敬する、または物の美しさ・見事さに感心して眺める。","independentMeanings":[{"label":"尊敬する・高く評価する","description":"人の能力・性格・行動などを優れたものとして認める。admire A for B。"},{"label":"感心して眺める","description":"景色・作品・服装などの美しさや見事さをじっくり見る。"}],"usage":"admire + 人 / 物。admire 人 for + 性質・行動。admire the view のように対象を直接続ける。","example":"I admire her for her patience and honesty.","ja":"私は彼女の忍耐強さと誠実さを尊敬している。","mixed":"彼は彼女の粘り強さを心から {{word}} している。","mixedToken":"admire","mixedTarget":"尊敬・高く評価","caution":"admire は「尊敬する」と「美しいものを鑑賞する」の両方に使える。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/admire"]},"admit":{"meaning":"認めたくないことも含め、事実や責任を認めること。また、人や物が入る・参加することを許す。","independentMeanings":[{"label":"事実・誤りを認める","description":"真実だと認める。しばしば不本意さやためらいを含む。admit that ... / admit doing / admit to ～。"},{"label":"入場・参加を許す","description":"人が場所や組織に入ることを認める。admit A to / into B。"},{"label":"入院させる・収容する","description":"治療や保護のため、病院などに正式に受け入れる。be admitted to hospital。"},{"label":"証拠などを認める","description":"法廷などで、証拠を正式に受け入れ、審理で扱えるものとする。"}],"usage":"admit + 名詞 / that + 文 / doing。admit to + 名詞・動名詞。人を admit to / into + 場所・組織。","example":"He admitted that he had made a mistake.","ja":"彼は自分が間違いを犯したことを認めた。","mixed":"彼は自分の誤りを率直に {{word}} した。","mixedToken":"admit","mixedTarget":"認めた","caution":"admit doing は「したことを認める」。deny doing はその否定。admit には入場許可の用法もある。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/admit"]}};
const WORD_MEANINGS_BY_WORD_2 = {"advance":{"meaning":"前へ進むこと、または物事をより進んだ状態へ発展させること。名詞ではその前進・進歩や前払いも表す。","independentMeanings":[{"label":"動詞：前進する・進む","description":"人・物・計画などが前方や次の段階へ進む。"},{"label":"動詞：発展させる・促進する","description":"知識・技術・計画などをより進んだ段階へ進める。advance our understanding など。"},{"label":"名詞：進歩・発展","description":"知識・技術・理解などが以前より進んだこと。an advance in ～。"},{"label":"名詞：前払い・事前の","description":"本来の時期より前に支払われる金銭。in advance は「前もって」。"}],"usage":"advance in + 分野。advance + 知識・計画など。名詞 an advance in ～ / in advance。","example":"Recent advances in science have changed our lives.","ja":"科学の最近の進歩は私たちの生活を変えた。","mixed":"新しい技術が研究を大きく {{word}} させた。","mixedToken":"advance","mixedTarget":"前進・発展させた","caution":"名詞の advance は「進歩」と「前払い」など複数の用法がある。in advance は「前もって」。","sources":["https://www.oxfordlearnersdictionaries.com/us/definition/english/advance_1","https://www.oxfordlearnersdictionaries.com/definition/english/advance_2"]},"aesthetic":{"meaning":"美や芸術に関わる性質・判断・考え方。形容詞では美的なこと、名詞では美的様式や美学を表す。","independentMeanings":[{"label":"形容詞：美的な・芸術に関する","description":"美や芸術、その価値や感じ方に関係する。aesthetic value / appreciation など。"},{"label":"形容詞：見た目が美しい","description":"機能だけでなく、外観やデザインの美しさを評価する。"},{"label":"名詞：美的様式・美意識","description":"作品やデザインを特徴づける美の考え方・様式。an aesthetic。"},{"label":"関連語：aesthetics（美学）","description":"aesthetics は美や芸術の性質・価値を考察する哲学の一分野。単数形 aesthetic は作品やデザインの美的様式・美意識を指す。"}],"usage":"aesthetic + 名詞。名詞では an aesthetic、学問分野では aesthetics。","example":"The building combines practical design with aesthetic appeal.","ja":"その建物は実用的な設計と美的魅力を兼ね備えている。","mixed":"この作品の {{word}} を、色彩と構図の両面から考えたい。","mixedToken":"aesthetic","mixedTarget":"美的様式・美意識","caution":"aesthetic は形容詞「美的な」が基本。名詞では様式・美意識、aesthetics は学問としての美学を表す。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/aesthetic_1","https://www.oxfordlearnersdictionaries.com/definition/english/aesthetic_2"]},"affect":{"meaning":"人や物事に作用して、状態・結果・感情などに変化をもたらすこと。","independentMeanings":[{"label":"影響を与える・変化させる","description":"人・物・状況などに作用し、その状態や結果を変える。affect A / be affected by B。"},{"label":"感情を動かす","description":"出来事・作品などが人の気持ちに強く作用する。be deeply affected by ～。"},{"label":"（態度・話し方などを）装う","description":"実際とは違う話し方・態度・性質などを意図的に身につけて見せる。やや改まった用法。"}],"usage":"affect + 目的語。be affected by + 原因。装う意味では affect an accent / manner など。","example":"The change in temperature affects plant growth.","ja":"気温の変化は植物の成長に影響を与える。","mixed":"睡眠不足は集中力に大きく {{word}} する。","mixedToken":"affect","mixedTarget":"影響する・変化を与える","caution":"動詞 affect は通常「影響を与える」。名詞 effect（結果・効果）と混同しない。","sources":["https://dictionary.cambridge.org/dictionary/english/affect","https://www.oxfordlearnersdictionaries.com/definition/english/affect1"]},"affluence":{"meaning":"お金や物質的な資源に恵まれ、生活水準が高い状態。","independentMeanings":[{"label":"富裕・物質的な豊かさ","description":"多くの財産や所得を持ち、比較的高い生活水準を享受している状態。不可算名詞。"},{"label":"社会・地域の豊かさ","description":"個人だけでなく、社会や地域に広がる経済的な豊かさを表すこともある。"}],"usage":"a period / society / level of affluence。関連形容詞は affluent（裕福な）。","example":"Growing affluence has changed the way people live.","ja":"豊かさの拡大は人々の暮らし方を変えた。","mixed":"地域の {{word}} は、住民の暮らしにも表れている。","mixedToken":"affluence","mixedTarget":"経済的な豊かさ・富裕","caution":"affluence は一時的にお金が多いことより、豊かな状態・生活水準を表す名詞。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/affluence"]},"afford":{"meaning":"必要な金銭・時間・余裕などがあり、何かを行えること。文脈によっては何かを与える・もたらすこと。","independentMeanings":[{"label":"金銭・時間などの余裕がある","description":"費用や時間を負担しても支障がないので、購入・実行できる。通常 can / could / be able to とともに使う。"},{"label":"（否定文で）～する余裕がない・許されない","description":"cannot afford to do は、金銭的にできないだけでなく、失敗・遅延などの悪い結果を招く余裕がないことも表す。"},{"label":"（機会・保護などを）与える","description":"改まった用法で、何かを人に与える・可能にする。"}],"usage":"can afford + 名詞 / to do。cannot afford to do は「～する余裕がない／～するわけにはいかない」。afford 人 物 の形もある。","example":"We can't afford to waste any more time.","ja":"これ以上時間を無駄にする余裕はない。","mixed":"その費用を払う余裕がなく、I can't {{word}} it。","mixedToken":"afford","mixedTarget":"それを買う・支払うだけの余裕がある","caution":"can afford to do は能力一般ではなく、金銭・時間・事情などの余裕を表す。cannot afford は「危険を冒せない」にもなる。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/afford","https://dictionary.cambridge.org/ja/dictionary/english/afford"]},"aim":{"meaning":"達成したい目的を定め、そこへ向けて行動すること。動詞では目標を目指す、または対象へ向けること。","independentMeanings":[{"label":"名詞：目的・目標","description":"行動や計画によって達成しようとしていること。the aim of ～ / with the aim of doing。"},{"label":"動詞：目指す","description":"ある目標や結果を達成しようとする。aim to do / aim for ～ / aim at ～。"},{"label":"動詞：方向を向ける","description":"視線・カメラ・光などを特定の対象へ向ける。aim A at B。"}],"usage":"aim to do。aim for / at + 目標。aim A at B は物を対象へ向ける。","example":"The project aims to improve access to education.","ja":"その計画は教育を受ける機会の改善を目指している。","mixed":"彼女は研究者になることを {{word}} している。","mixedToken":"aim","mixedTarget":"目指している","caution":"aim at は目標・対象へ向けること、aim to do は行動・結果を目指すことに焦点がある。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/aim_1","https://www.oxfordlearnersdictionaries.com/definition/english/aim_2"]},"ancestor":{"meaning":"現在の人・生物・物事よりも前の世代や段階にあり、その起源・系譜につながるもの。","independentMeanings":[{"label":"家系上の祖先","description":"自分より何世代も前に生きていた家族・血縁上の先祖。"},{"label":"生物学上の祖先","description":"現在の生物が進化してきた系統の、過去の個体群や共通の祖先。a common ancestor。"},{"label":"物事の前身","description":"現在の機械・制度・考え方などにつながる、より古い形や先行するもの。"}],"usage":"an ancestor of + 人・生物・物。share a common ancestor は「共通の祖先を持つ」。","example":"The two species share a common ancestor.","ja":"その2種は共通の祖先を持つ。","mixed":"この設計は、現代の機械の遠い {{word}} と言える。","mixedToken":"ancestor","mixedTarget":"前身・祖先","caution":"ancestor は人間の家系だけでなく、生物の進化や技術・制度の系譜にも使う。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/ancestor"]},"apply":{"meaning":"何かを特定の対象・状況へ向けて用いること。申し込む、規則などを当てはめる、物質を塗る、などを表す。","independentMeanings":[{"label":"申し込む・申請する","description":"仕事・学校・許可・奨学金などを得るため、正式に求める。apply for + 対象 / apply to + 機関。"},{"label":"当てはまる・適用される","description":"規則・条件・原則などが特定の人や状況に関係する。apply to + 対象。"},{"label":"適用する・応用する","description":"方法・知識・原則などを、具体的な問題や対象に用いる。apply A to B。"},{"label":"塗る・つける","description":"クリーム・塗料などを表面に広げてつける。apply cream to the skin。"},{"label":"専念する","description":"apply oneself to ～ で、仕事・学習などに自分の力を注ぐ。"}],"usage":"apply for + 申請するもの。apply to + 機関 / 対象。apply A to B。apply oneself to + 名詞・動名詞。","example":"We can apply this principle to other problems.","ja":"この原理をほかの問題にも応用できる。","mixed":"この原理を具体的な問題に {{word}} してみよう。","mixedToken":"apply","mixedTarget":"当てはめる・応用する","caution":"apply for は「～に申し込む」、apply to は「～に当てはまる／～へ申し込む（機関）」、apply A to B は「AをBに適用する」。","sources":["https://www.oxfordlearnersdictionaries.co.uk/definition/english/apply"]},"approach":{"meaning":"対象へ近づくこと、または問題・課題に向き合うための方法や取り組み方。","independentMeanings":[{"label":"動詞：近づく","description":"人・場所・時期・数量などとの距離が縮まる。approach + 対象。"},{"label":"動詞：人に話を持ちかける","description":"依頼・相談・提案などのために人や組織に接触する。approach 人 about / for ～。"},{"label":"動詞：問題に取り組む","description":"問題・課題をどのような方法で扱うかを決めて着手する。approach a problem / task。"},{"label":"名詞：方法・取り組み方","description":"問題を解決したり課題を扱ったりするための考え方・手順。an approach to ～。"},{"label":"名詞：接近・接近路","description":"人・季節・時期などが近づくこと。また、場所へ通じる道。"}],"usage":"動詞 approach + 人 / 場所 / 問題（通常、目的語の前に to を置かない）。名詞 an approach to + 名詞。","example":"We need a different approach to the problem.","ja":"その問題には別の取り組み方が必要だ。","mixed":"難しい課題ほど、どのように {{word}} するかが重要だ。","mixedToken":"approach","mixedTarget":"取り組む・向き合う","caution":"動詞は approach the problem と直接目的語を取る。名詞は an approach to the problem と to を使う。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/approach_2","https://www.oxfordlearnersdictionaries.com/us/definition/american_english/approach_2"]},"argue":{"meaning":"意見の違いを言葉でぶつけ合うこと、または理由や根拠を示して主張を論じること。","independentMeanings":[{"label":"口論する・言い争う","description":"意見の不一致から、相手と強い調子で言葉を交わす。argue with 人 about / over ～。"},{"label":"理由を挙げて論じる","description":"根拠を示しながら、ある考えが正しい・妥当だと主張する。argue that ...。"},{"label":"賛成・反対の立場を論じる","description":"argue for ～ は支持する理由を述べ、argue against ～ は反対する理由を述べる。"}],"usage":"argue with + 人 about / over + 話題。argue that + 文。argue for / against + 主張・案。","example":"The researchers argue that more evidence is needed.","ja":"研究者たちは、さらに証拠が必要だと論じている。","mixed":"彼はデータを根拠に、自説が正しいと {{word}} した。","mixedToken":"argue","mixedTarget":"理由を挙げて論じた","caution":"argue は感情的な「口論」と、根拠に基づく「論証・主張」の両方に使う。debate より一方の立場を主張する形にもなりやすい。","sources":["https://www.oxfordlearnersdictionaries.com/definition/english/argue"]}};
function noteFor(w){return {...(NOTE_CONTENT[w.id]||{}),...(WORD_MEANINGS_BY_WORD[w.word]||{}),...(WORD_MEANINGS_BY_WORD_2[w.word]||{}),...(notesById[w.id]||{})};}
function coreImageFromMemo(memo){const value=String(memo||"");if(value[0]!=="_")return "";const end=value.indexOf(" ");return value.slice(1,end<0?undefined:end);}
function effectiveCoreImage(w,n=noteFor(w)){return coreImageFromMemo(n.memo)||n.coreImage||w.coreImage||"";}
const CORE_IMAGE_DEFAULTS = {
 appropriate:"状況・目的にぴたりと合う",appreciate:"価値を認め、その重みを感じ取る",aspect:"全体から切り出して見る一面",
 atmosphere:"その場全体を包み込む空気",attempt:"目標へ向けて実際に手を伸ばす",available:"必要なときに使える状態にある",
 account:"出来事や金銭を記録し説明できる形にする",adapt:"条件に合わせて形や方法を変える",admire:"優れた価値を認め、心を向けて見る",
 admit:"内に入れる、または事実として受け入れる",advance:"前方や次の段階へ進める",aesthetic:"美しさに関わる感じ方・判断",
 affect:"外から作用して状態を変える",affluence:"資源に満たされ余裕がある状態",afford:"余裕があって何かを可能にする",
 aim:"狙いを定めて方向づける",ancestor:"今につながる前の世代・元",apply:"対象に向けて当てる、適用する",
 approach:"対象へ近づき、向き合う",argue:"理由を示して主張を押し出す"
};
function seedCoreImageMemos(){
 let changed=false;
 WORDS.forEach(w=>{
  const current=notesById[w.id]||{};
  const fromMemo=coreImageFromMemo(current.memo);
  if(fromMemo){w.coreImage=fromMemo;return;}
  const core=CORE_IMAGE_DEFAULTS[w.word]||w.coreImage;
  if(!core||w.pending)return;
  const memo=String(current.memo||"");
  notesById[w.id]={...current,memo:"_"+core+(memo?" "+memo:""),coreImageFromMemo:true};
  w.coreImage=core;changed=true;
 });
 if(changed)save();
}
seedCoreImageMemos();
function renderMemoSection(n){return '<section class="note-section memo-section"><div class="memo-heading"><h3>MY MEMO</h3><span class="memo-autosave">自動保存</span></div><textarea id="wordMemo" class="word-memo" rows="5" placeholder="この単語についての気づき・疑問・自分なりの例文などを自由に記録"></textarea><p class="hint memo-format-hint">先頭に <code>_コアイメージ</code> と書くと、最初の半角スペースまでがコアイメージとして単語ノートに反映されます。</p><p id="memoSaveStatus" class="hint memo-save-status" aria-live="polite">入力内容はこの端末に自動保存されます。</p></section>';}
function bindWordMemo(id,n){const field=$("#wordMemo");if(!field)return;field.value=typeof n.memo==="string"?n.memo:"";field.addEventListener("input",()=>{const previous=notesById[id]||{};const memo=field.value;const coreValue=coreImageFromMemo(memo);const next={...previous,memo};const w=WORDS.find(item=>item.id===id);if(coreValue){next.coreImageFromMemo=true;if(w)w.coreImage=coreValue;}else if(previous.coreImageFromMemo){delete next.coreImageFromMemo;if(w)w.coreImage="";}notesById[id]=next;save();const core=$("#noteCoreImageValue");if(core){const value=effectiveCoreImage(w||{coreImage:""},noteFor(w||{id}));core.textContent=value;core.classList.toggle("hidden",!value);}const status=$("#memoSaveStatus");if(status)status.textContent="保存済み";});}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function visualSearchQuery(w){return IMAGE_QUERIES[w.id]||w.imageSearch||w.word;}
function commonsSearchUrl(w){return "https://commons.wikimedia.org/w/index.php?search="+encodeURIComponent(visualSearchQuery(w))+"&title=Special:MediaSearch&type=image";}
function mixedExampleMarkup(n){
 const template=n.mixed||"混合例文は未登録です。";
 const token=n.mixedToken||"";
 const parts=template.split("{{word}}");
 if(parts.length<2||!token)return escapeHtml(template);
 return escapeHtml(parts[0])+'<button id="mixedWordToken" class="mixed-token" type="button" aria-expanded="false">'+escapeHtml(token)+'</button>'+escapeHtml(parts.slice(1).join("{{word}}"))+'<span id="mixedTarget" class="mixed-target translation-text hidden">'+escapeHtml(n.mixedTarget||"")+'</span>';
}
function renderMixedSentence(n){return '<section class="note-section mixed-sentence-section"><h3>MIX SENTANCE</h3><p class="mixed-sentence">'+mixedExampleMarkup(n)+'</p><p class="hint">英語部分をタップすると、元の日本語表現を表示。</p></section>';}
function imageCueMarkup(w){
 const url=imageUrl(w);
 return url ? '<img class="image-cue" loading="lazy" src="'+escapeHtml(url)+'" alt="'+escapeHtml(w.word)+'の画像" onerror="this.remove()">' : "";
}
let noteListScrollY=0;
function openNotes(){activeDecompFilter="";noteListScrollY=0;showView("notesView");$("#notesListPanel").classList.remove("hidden");$("#noteDetailPanel").classList.add("hidden");$("#noteSearch").value="";renderNoteList();window.scrollTo({top:0,behavior:"instant"});}
function noteSearchText(w,n){
 const map=n.semanticMap||SEMANTIC_MAPS[w.id];
 const mapText=map&&Array.isArray(map.nodes)?map.nodes.map(node=>[node.label,node.description,node.kind].join(" ")).join(" "):"";
 const independent=n.independentMeanings||map?.independentMeanings||[];
 const independentText=Array.isArray(independent)?independent.map(item=>typeof item==="string"?item:[item.label,item.description,item.meaning].join(" ")).join(" "):"";
 const domainText=Array.isArray(n.domainExamples)?n.domainExamples.map(item=>[item.domain,item.expression,item.meaning,item.explanation].join(" ")).join(" "):"";
 return [w.word,w.translation,effectiveCoreImage(w,n),w.ven??"",n.meaning,n.usage,mapText,independentText,domainText].join(" ").toLowerCase();
}
function renderNoteList(){
 const q=$("#noteSearch").value.trim().toLowerCase();
 const rows=WORDS.slice().sort((a,b)=>{const av=Number.isFinite(a.ven)?a.ven:-1,bv=Number.isFinite(b.ven)?b.ven:-1;return bv-av||a.word.localeCompare(b.word);}).filter(w=>{const n=noteFor(w),text=noteSearchText(w,n);return text.includes(q)&&(!activeDecompFilter||(NOTE_PARTS[w.id]||[]).includes(activeDecompFilter));});
 $("#notesListPanel").innerHTML='<div class="ven-sort-caption">VEN度順（高い順）</div>'+(activeDecompFilter?'<button class="subtle-btn" id="clearDecompFilter">← 全単語に戻る：'+escapeHtml(activeDecompFilter)+'</button>':"")+rows.map(w=>{const n=noteFor(w);return '<button class="note-list-item" data-id="'+w.id+'"><span class="note-list-word">'+escapeHtml(w.word)+'</span><span class="note-list-core">'+escapeHtml(n.meaning||w.translation)+'</span><span class="note-list-meta">'+escapeHtml(w.pos)+' · '+(Number.isFinite(w.ven)?'VEN度 '+w.ven:'VEN度未設定')+(w.pending?' · 内容登録待ち':'')+(n.memo?' · メモあり':'')+(typeof window.learningBadgeFor==="function"?window.learningBadgeFor(w.id):"")+' · '+(imageUrl(w)?'画像あり':'画像未設定')+'</span></button>';}).join("")||'<div class="card">該当する単語がありません。</div>';
 const clear=$("#clearDecompFilter");if(clear)clear.onclick=()=>{activeDecompFilter="";renderNoteList();};
 $("#notesListPanel").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>openNote(Number(b.dataset.id)));
}
function openNote(id,autoplay=true){
 if(!$("#notesListPanel").classList.contains("hidden"))noteListScrollY=window.scrollY;
 const w=WORDS.find(x=>x.id===id);if(!w)return;const n=noteFor(w);
 $("#notesListPanel").classList.add("hidden");const d=$("#noteDetailPanel");d.classList.remove("hidden");d.classList.remove("translation-hidden");
 if(w.pending){
  d.innerHTML='<button class="subtle-btn note-back" id="noteBack">← 単語一覧へ</button><div class="note-title-row"><div class="note-word-line"><h2>'+escapeHtml(w.word)+'</h2><span class="pos">未登録</span></div><span class="ven-detail">VEN度 '+escapeHtml(w.ven)+'</span><button type="button" class="weak-toggle" data-weak-toggle="'+w.id+'">苦手にする</button><button id="playWordAudio" class="audio-btn" type="button">🔊 発音</button></div><section class="ven-pending-card"><strong>単語登録済み・内容作成待ち</strong><p>現在は綴りとVEN度だけを登録している。語義・品詞・コアイメージ・語法などを確認してから学習カードに追加する。</p></section>'+renderMemoSection(n);
 $("#noteBack").onclick=()=>{d.classList.add("hidden");$("#notesListPanel").classList.remove("hidden");renderNoteList();requestAnimationFrame(()=>window.scrollTo({top:noteListScrollY,behavior:"instant"}));};
  $("#playWordAudio").onclick=()=>speakWord(w);
  bindWordMemo(id,n);
  if(autoplay)speakWord(w);
  return;
 }
 d.innerHTML='<button class="subtle-btn note-back" id="noteBack">← 単語一覧へ</button><div class="translation-toolbar"><span>日本語訳</span><button type="button" id="toggleTranslations" class="subtle-btn translation-toggle-visible" aria-pressed="false">訳を隠す</button></div>'+
 '<div class="note-hero">'+imageCueMarkup(w)+'<div class="note-title-row"><div class="note-word-line"><h2>'+escapeHtml(w.word)+'</h2><span class="pos">'+escapeHtml(w.pos)+'</span></div><button id="playWordAudio" class="audio-btn" type="button" aria-label="英単語の発音を再生">🔊 発音</button><button type="button" class="weak-toggle" data-weak-toggle="'+w.id+'">苦手にする</button></div>'+
 (effectiveCoreImage(w,n)?'<p id="noteCoreImageValue" class="note-core">'+escapeHtml(effectiveCoreImage(w,n))+'</p>':'<p id="noteCoreImageValue" class="note-core hidden"></p>')+'</div>'+
 renderSemanticMap(w,n)+renderIndependentMeanings(w,n)+renderMixedSentence(n)+renderDomainExamples(n)+renderMemoSection(n)+
 '<section class="note-section"><p>'+escapeHtml(n.decomp||"語源情報は未登録です。")+'</p>'+renderDecompParts(w)+'</section>'+
 '<section class="note-section">'+renderUsageFrame(w)+(USAGE_COMPONENTS[w.id]?'':('<p class="example-en">'+escapeHtml(n.example||"例文は未登録です。")+'</p>'+(w.id===2?'<p class="hint">before you decide＝「決める前に」。時を表す節で、compare の語法の例外ではない。</p>':'')+'<p id="exampleJa" class="example-ja translation-text">'+escapeHtml(n.ja||"")+'</p>'))+(n.caution?'<p class="usage-warning">⚠️ '+escapeHtml(n.caution)+'</p>':'')+'</section>'+
 
 

 '<details class="note-fold"><summary>画像の設定・出典情報</summary><div class="image-workflow"><p>画像を端末から選ぶか、画像検索で候補を探して登録できます。</p>'+
 '<div class="image-pick-row"><button id="chooseLocalImage" class="secondary-wide-btn" type="button">📁 端末から画像を選ぶ</button><input id="noteImageFile" type="file" accept="image/*" hidden></div>'+
 '<div class="commons-search"><label>画像検索語<input id="commonsImageQuery" type="search" value="'+escapeHtml(visualSearchQuery(w))+'" placeholder="英語で具体的に入力"></label><button id="openGoogleImages" class="secondary-wide-btn" type="button">🔎 Google画像検索を開く</button><p class="hint">候補画像を端末に保存し、「端末から画像を選ぶ」で登録できます。画像の利用条件と出典を確認してください。</p><button id="searchCommonsImages" class="subtle-btn" type="button">Wikimedia Commons内も検索</button><p id="commonsSearchStatus" class="hint" aria-live="polite"></p><div id="commonsImageResults" class="commons-image-results"></div></div>'+
 '<label>画像ファイルURL<input id="noteImageUrl" type="url" placeholder="URLで登録する場合 https://…" value="'+escapeHtml(n.imageUrl||"")+'"></label>'+
 '<label>出典ページURL<input id="noteImageSource" type="url" placeholder="画像の掲載ページURL" value="'+escapeHtml(n.imageSource||"")+'"></label>'+
 '<div class="image-meta-grid"><label>作者・権利者<input id="noteImageCreator" placeholder="作者名／不明" value="'+escapeHtml(n.imageCreator||"")+'"></label><label>ライセンス<input id="noteImageLicense" placeholder="例：CC BY-SA 4.0" value="'+escapeHtml(n.imageLicense||"")+'"></label></div>'+
 '<button id="saveImageData" class="primary-btn">画像情報を保存</button><p id="imageSaveStatus" class="hint" aria-live="polite"></p>'+
 '<p class="hint">端末から選んだ画像は縮小してこのブラウザ内に保存します。URL画像と同じく、出典・作者・ライセンスは必要に応じて記録してください。別端末への同期はありません。</p></div></details>';
 bindWordMemo(id,n);
 $("#noteBack").onclick=()=>{d.classList.add("hidden");$("#notesListPanel").classList.remove("hidden");renderNoteList();requestAnimationFrame(()=>window.scrollTo({top:noteListScrollY,behavior:"instant"}));};
 d.querySelectorAll("[data-part]").forEach(btn=>btn.onclick=()=>{activeDecompFilter=btn.dataset.part;d.classList.add("hidden");$("#notesListPanel").classList.remove("hidden");$("#noteSearch").value="";renderNoteList();window.scrollTo({top:0,behavior:"instant"});});
 d.addEventListener("click",event=>{
  const target=event.target.closest("[data-usage-action],[data-usage-select]");
  if(!target||!d.contains(target))return;
  const scrollY=window.scrollY;
  const itemId=target.dataset.usageItem;
  const component=(USAGE_COMPONENTS[w.id]||{items:[]}).items.find(item=>item.id===itemId);
  if(!component)return;
  if(target.hasAttribute("data-usage-select")){
   component.selected=target.dataset.usageSelect;
   component.open=false;
   component.expanded=false;
  }else{
   const action=target.dataset.usageAction;
   if(action==="toggle")component.open=!component.open;
   if(action==="example"){component.expanded=true;component.open=false;}
   if(action==="back")component.expanded=false;
  }
  const frame=d.querySelector(".usage-component-list");
  if(frame)frame.outerHTML=renderUsageFrame(w);
  requestAnimationFrame(()=>window.scrollTo({top:scrollY,behavior:"instant"}));
 });
 $("#playWordAudio").onclick=()=>speakWord(w);
 if(autoplay)speakWord(w);
 const translationToggle=$("#toggleTranslations");if(translationToggle)translationToggle.onclick=()=>{const hidden=d.classList.toggle("translation-hidden");translationToggle.textContent=hidden?"訳を表示":"訳を隠す";translationToggle.classList.toggle("translation-toggle-hidden",hidden);translationToggle.classList.toggle("translation-toggle-visible",!hidden);translationToggle.setAttribute("aria-pressed",String(hidden));};
 const mixedToken=$("#mixedWordToken"),mixedTarget=$("#mixedTarget");
 if(mixedToken&&mixedTarget)mixedToken.onclick=()=>{mixedTarget.classList.toggle("hidden");mixedToken.setAttribute("aria-expanded",String(!mixedTarget.classList.contains("hidden")));};
 $("#saveImageData").onclick=()=>saveImageData(id);
 $("#chooseLocalImage").onclick=()=>$("#noteImageFile").click();
 $("#openGoogleImages").onclick=()=>{const query=$("#commonsImageQuery").value.trim()||visualSearchQuery(w);window.open("https://www.google.com/search?tbm=isch&q="+encodeURIComponent(query),"_blank","noopener");};
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

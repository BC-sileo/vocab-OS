# 4語による単語ノート品質検証 v0.1

## この文書の位置づけ

これは三層評価ルーブリックを実際の単語に当てた**校正用の下書き**。完成済みのアプリ内ノートではなく、実機テストもしていない。例文・主要語義は辞書で確認し、採用前に再校正する。

- 第1層：必須品質（意味・構文・例文）— 各0〜2点、合計6点。0点や重大な誤りがあれば採用しない。
- 第2層：理解品質（コアイメージ・語義の構造・転用可能性）— 各0〜2点、合計6点。
- 第3層：補助情報（語源など）— 有用性を個別評価し、不要ならN/A。下書き段階で無理に点数を埋めない。

## 1. compare

**品詞：** 動詞

**意味の核：** 二つ以上のものを並べて見て、似ている点や違う点を調べる。

**主要構文**
- compare A with B：AとBを比較し、共通点・相違点を検討する。
- compare A to B：AをBになぞらえる／比較する。類似性や比喩的な見方が前景化することがある。

**例文**
- I compared the two phones with each other.
  - 私はその2台のスマートフォンを互いに比較した。
- She compared his voice to the sound of rain.
  - 彼女は彼の声を雨音にたとえた。

**注意：** with は相違点、to は類似性・比喩という傾向を学習の手掛かりにできるが、絶対的な規則ではない。実際の用法は重なり、文脈にも左右される。

**暫定採点**
- 第1層：意味2／構文2／例文2 = **6/6**
- 第2層：コアイメージ2／語義構造2／転用可能性2 = **6/6**
- 第3層：N/A（語源などを足す必要性を現時点では認めない）

**判断：** 合格候補。特に「with/toの違いは絶対ではない」という注意が、誤った一般化を防ぐ。辞書の追加用例を確認したうえで採用する。

**参照**
- Cambridge Dictionary, compare: https://dictionary.cambridge.org/dictionary/english/compare
- Language Portal of Canada, compare to / compare with: https://www.noslangues-ourlanguages.gc.ca/en/writing-tips-plus/compare-to-compare-with

## 2. get

**品詞：** 動詞

**意味の核：** 人や物が、ある結果・状態に至ること。何かを得る、状態が変わる、理解に至る、または誰か・何かをある状態や行動へ向かわせる用法がある。

**主要用法のまとまり**
- obtain / receive：何かを得る、受け取る。
- become + adjective：ある状態になる。
- get + object + adjective / past participle：人や物をある状態にする、またはその状態にしてもらう。構文ごとに意味を確認する。
- get it：意味・状況を理解する。
- get someone to do something：人を説得するなどして、何かをするようにさせる。

**例文**
- I got a message from her.
  - 彼女からメッセージを受け取った。
- It's getting dark.
  - 暗くなってきている。
- I get it now.
  - 今はその意味が分かる。
- I got him to help me.
  - 彼に手伝ってもらえるよう説得した／頼んで手伝ってもらった。

**注意：** 「状態・結果に至る」という核は意味をつなぐ手掛かりになるが、get の全用法を一つの絵だけで処理できるわけではない。特に get + object + to do と get + object + adjective / past participle は型と意味をセットで学ぶ。

**暫定採点**
- 第1層：意味1／構文2／例文2 = **5/6**（学習用の主要用法に限定した選定であり、主要語義の網羅性は追加確認が必要）
- 第2層：コアイメージ2／語義構造2／転用可能性2 = **6/6**
- 第3層：N/A（語源を足す前に構文整理を優先）

**判断：** 合格確定ではなく、拡張・校正候補。get は非常に多義的なので、頻出用法の網羅性を確認し、核から説明できる用法と個別に覚える用法を明示する。

**参照**
- Cambridge Dictionary, get: https://dictionary.cambridge.org/dictionary/english/get
- Cambridge Dictionary, get grammar: https://dictionary.cambridge.org/grammar/british-grammar/get

## 3. abandon

**品詞：** 動詞

**意味の核：** 人・場所・物・計画などを手放し、そこから離れる／続けるのをやめる。

**主要用法**
- abandon a car / a place：車を置き去りにする／場所を去る。
- abandon a plan / an attempt：計画・試みを断念する。
- abandon someone：人を見捨てる。
- abandon oneself to something：感情などに身を任せる。この形は通常の「対象を手放す」と同じように訳すと誤解しやすいため、構文ごとに扱う。

**例文**
- They abandoned the plan after the costs increased.
  - 費用が増えたため、彼らはその計画を断念した。
- The sailors abandoned the ship.
  - 船員たちは船を捨てた。
- He abandoned himself to despair.
  - 彼は絶望に身を任せた。

**注意：** 最初の二つは「続ける・保持することをやめる」という核で結びつけやすい。一方、abandon oneself to ... は構文ごと覚える必要がある。目的語が人・場所・計画のどれかで、日本語訳が変わる。

**暫定採点**
- 第1層：意味2／構文2／例文2 = **6/6**
- 第2層：コアイメージ2／語義構造2／転用可能性1 = **5/6**
- 第3層：N/A（語源を追加する前に用法の正確さを優先）

**判断：** 合格候補。コアイメージは有用だが、abandon oneself to ... は独立した構文メモとして残す。

**参照**
- Cambridge Dictionary, abandon: https://dictionary.cambridge.org/dictionary/english/abandon

## 4. with

**品詞：** 前置詞

**仮説：** with のすべての用法を「関係がある」とまとめるだけでは抽象的すぎ、学習者が意味を予測できない。ひとつの万能イメージを決め打ちせず、用法群とそのつながりを検証する。

**主要用法群**
- 同伴：with my brother（兄弟と一緒に）
- 道具・手段：cut it with scissors（はさみでそれを切る）
- 特徴・付帯情報：a girl with blue eyes（青い目の少女）
- 感情・評価の対象：I'm happy with the result.（その結果に満足している）

**例文**
- I went with my brother.
  - 私は兄弟と一緒に行った。
- She cut the paper with scissors.
  - 彼女ははさみで紙を切った。
- I'm happy with the result.
  - 私はその結果に満足している。

**注意：** 「一緒に」だけでは道具・特徴・感情の対象を自然に説明できず、「関係」だけでは何でも説明できてしまう。候補となる核は、具体例を予測・説明できるかで評価する。説明力が足りなければ、関連する用法群として分ける方がよい。

**暫定採点**
- 第1層：意味1／構文2／例文2 = **5/6**（用法群の整理は初稿。重要な用法を追加確認する必要がある）
- 第2層：コアイメージ1／語義構造2／転用可能性1 = **4/6**
- 第3層：N/A

**判断：** 要改訂。現時点で「関係」という抽象的な説明をコアイメージとして採用しない。用法群の関係をさらに調べ、説明力のある核が見つからなければ複数のまとまりで教える。

**参照**
- Cambridge Dictionary, with: https://dictionary.cambridge.org/dictionary/english/with
- Cambridge Dictionary, with grammar: https://dictionary.cambridge.org/grammar/british-grammar/with

## 全体の結果

| 単語 | 第1層（必須） | 第2層（理解） | 状態 |
|---|---:|---:|---|
| compare | 6/6 | 6/6 | 合格候補 |
| get | 5/6 | 6/6 | 主要用法の網羅性を追加確認 |
| abandon | 6/6 | 5/6 | 合格候補、構文メモを保持 |
| with | 5/6 | 4/6 | コアイメージを要改訂 |

この採点は設計を検証するための暫定採点で、辞書の全語義を網羅した最終評価ではない。とくに get と with は、コアイメージだけで全用法を説明できることを合格条件にしていない。

## 次の一手
1. この4語の構文・語義を、アプリ内ノートとして使える構造化データへ落とし込む。
2. 既存20語にも同じ三層評価を適用し、誤り・不足を見つける。
3. その後にスペル入力からの下書き生成を設計する。品質チェックを通さず自動生成結果を確定データとして保存しない。

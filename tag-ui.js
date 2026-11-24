/* UI for generic tags on words, senses, examples and collocations. */
(function(){
  "use strict";
  const tags=window.VocabOSTagStore;
  const $=selector=>document.querySelector(selector);
  const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const parseValue=raw=>raw===""?null:(Number.isFinite(Number(raw))?Number(raw):raw);
  const wordKey=word=>tags.normalizeWordKey(word.word);
  function stableEntityKey(value){
    const source=String(value??"").normalize("NFKC").trim().toLocaleLowerCase("en-US");
    let hash=2166136261;
    for(let i=0;i<source.length;i++)hash=Math.imul(hash^source.charCodeAt(i),16777619);
    return (hash>>>0).toString(36);
  }

  function wordTagMarkup(word){
    const current=tags.getWordTags(word.id);
    return '<section class="note-section word-tags-section"><h3>TAGS</h3><div class="word-tag-chips" id="wordTagChips">'+(current.map(tag=>'<span class="word-tag-chip">'+escapeHTML(tag.value===null?tag.name:tag.name+" "+tag.value)+'<button type="button" data-remove-word-tag="'+tag.id+'" data-tag-value="'+escapeHTML(JSON.stringify(tag.value))+'" aria-label="タグを削除">×</button></span>').join("")||'<span class="hint">タグなし</span>')+'</div><div class="word-tag-editor"><input id="wordTagName" type="text" placeholder="タグ名"><input id="wordTagValue" type="text" placeholder="値（任意）"><button id="addWordTag" type="button" class="subtle-btn">追加</button></div></section>';
  }
  function entityControlMarkup(type,id,wordId,label){
    const current=tags.getVisibleEntityTags(type,id,wordId);
    const chips=current.map(tag=>'<span class="word-tag-chip">'+escapeHTML(tag.value===null?tag.name:tag.name+" "+tag.value)+'<button type="button" data-remove-entity-tag="'+tag.id+'" data-tag-value="'+escapeHTML(JSON.stringify(tag.value))+'" aria-label="タグを削除">×</button></span>').join("");
    return '<div class="tag-entity-control" data-entity-type="'+escapeHTML(type)+'" data-entity-id="'+escapeHTML(id)+'" data-word-id="'+wordId+'">'+
      (chips?'<div class="word-tag-chips">'+chips+'</div>':'')+
      '<details class="tag-mini-editor"><summary>＋タグ</summary><div class="tag-mini-fields"><input type="text" data-entity-tag-name placeholder="タグ名"><input type="text" data-entity-tag-value placeholder="値（任意）"><button type="button" data-add-entity-tag class="subtle-btn">追加</button></div></details></div>';
  }
  function injectEntityControl(node,type,id,word,label,afterNode){
    if(!node||node.querySelector(":scope > .tag-entity-control"))return;
    const html=entityControlMarkup(type,id,word.id,label);
    if(afterNode)afterNode.insertAdjacentHTML("afterend",html);
    else node.insertAdjacentHTML("beforeend",html);
  }
  function decorateNoteEntities(word,detail){
    const prefix=wordKey(word);
    detail.querySelectorAll(".meaning-fold").forEach((node,index)=>{
      const title=node.querySelector("summary strong")?.textContent||("sense-"+index);
      const senseId=prefix+":sense:"+stableEntityKey(title);
      injectEntityControl(node,"sense",senseId,word,"語義");
      const example=node.querySelector(".meaning-example-fold");
      if(example){
        const sentence=example.querySelector(".meaning-example p")?.textContent||example.textContent||"example";
        injectEntityControl(node,"example",senseId+":example:"+stableEntityKey(sentence),word,"語義内の例文",example);
      }
    });
    detail.querySelectorAll(".domain-example").forEach((node,index)=>{
      const expression=node.querySelector(".domain-example-top strong")?.textContent||("domain-example-"+index);
      injectEntityControl(node,"example",prefix+":domain-example:"+stableEntityKey(expression),word,"他分野の用例");
    });
    detail.querySelectorAll(".usage-item").forEach((node,index)=>{
      const itemId=node.querySelector("[data-usage-item]")?.dataset.usageItem;
      const identity=itemId||stableEntityKey(node.querySelector(".usage-diagram")?.textContent||node.textContent||("collocation-"+index));
      injectEntityControl(node,"collocation",prefix+":collocation:"+identity,word,"語法・コロケーション");
    });
    const mixed=detail.querySelector(".mixed-sentence-section");
    if(mixed)injectEntityControl(mixed,"example",prefix+":mixed-sentence",word,"混合例文");
  }
  function bindWordTagEditor(word,detail){
    const section=detail.querySelector(".word-tags-section");if(!section)return;
    const refresh=()=>{
      const holder=section.querySelector("#wordTagChips");if(!holder)return;
      holder.innerHTML=tags.getWordTags(word.id).map(tag=>'<span class="word-tag-chip">'+escapeHTML(tag.value===null?tag.name:tag.name+" "+tag.value)+'<button type="button" data-remove-word-tag="'+tag.id+'" data-tag-value="'+escapeHTML(JSON.stringify(tag.value))+'" aria-label="タグを削除">×</button></span>').join("")||'<span class="hint">タグなし</span>';
    };
    section.addEventListener("click",event=>{
      const button=event.target.closest("[data-remove-word-tag]");
      if(!button)return;
      let value=null;try{value=JSON.parse(button.dataset.tagValue);}catch(_){}
      tags.removeTag("word",word.id,Number(button.dataset.removeWordTag),value);refresh();
    });
    const add=section.querySelector("#addWordTag");
    if(add)add.onclick=()=>{
      const name=section.querySelector("#wordTagName").value.trim(),raw=section.querySelector("#wordTagValue").value.trim();
      if(!name){section.querySelector("#wordTagName").focus();return;}
      if(tags.addTag("word",word.id,name,parseValue(raw),"manual",word.id))tags.save();
      section.querySelector("#wordTagName").value="";section.querySelector("#wordTagValue").value="";refresh();
    };
  }
  function bindEntityTagEditor(detail){
    detail.addEventListener("click",event=>{
      const control=event.target.closest(".tag-entity-control");if(!control||!detail.contains(control))return;
      const type=control.dataset.entityType,id=control.dataset.entityId,wordId=control.dataset.wordId;
      const remove=event.target.closest("[data-remove-entity-tag]");
      if(remove){
        let value=null;try{value=JSON.parse(remove.dataset.tagValue);}catch(_){}
        tags.removeTag(type,id,Number(remove.dataset.removeEntityTag),value);control.outerHTML=entityControlMarkup(type,id,wordId,"");
        return;
      }
      const add=event.target.closest("[data-add-entity-tag]");
      if(add){
        const name=control.querySelector("[data-entity-tag-name]").value.trim();
        const raw=control.querySelector("[data-entity-tag-value]").value.trim();
        if(!name){control.querySelector("[data-entity-tag-name]").focus();return;}
        tags.addEntityTag(type,id,wordId,name,parseValue(raw),"manual");tags.save();
        control.outerHTML=entityControlMarkup(type,id,wordId,"");
      }
    });
  }

  const originalOpenNote=window.openNote;
  if(typeof originalOpenNote==="function"){
    window.openNote=function(id,...args){
      originalOpenNote.call(this,id,...args);
      const word=window.getVocabOSWordById(id),detail=$("#noteDetailPanel");
      if(!word||!detail||detail.classList.contains("hidden"))return;
      const anchor=detail.querySelector(".note-hero")||detail.querySelector(".note-title-row");
      if(anchor)anchor.insertAdjacentHTML("afterend",wordTagMarkup(word));else detail.insertAdjacentHTML("beforeend",wordTagMarkup(word));
      bindWordTagEditor(word,detail);
      decorateNoteEntities(word,detail);
      bindEntityTagEditor(detail);
    };
  }

  const selectedWords=new Set();
  let currentPreview=null;
  function statusLabel(status){return status==="new"?"新規":status==="existing"?"既存":"類似候補あり";}
  function renderPreview(preview){
    const s=preview.summary;
    const summary='<div class="tag-import-summary"><span>新規 '+s.new+'</span><span>既存 '+s.existing+'</span><span>要確認 '+s.ambiguous+'</span><span>タグ追加 '+s.tagAdditions+'</span><span>値の競合 '+s.conflicts+'</span></div>';
    const rows=preview.items.map(item=>{
      const additions=item.additions.map(tag=>tag.name+(tag.value===null?"":" "+tag.value)).concat((item.entityTagAdditions||[]).map(tag=>tag.name+(tag.value===null?"":" "+tag.value)+" ["+tag.entityType+"]")).join(" · ")||"追加タグなし";
      const conflicts=item.conflicts.map(tag=>tag.name+"："+(item.existingTags||[]).filter(old=>old.name.toLowerCase()===tag.name.toLowerCase()).map(old=>old.value).join("/")+" → "+tag.value).concat((item.entityTagConflicts||[]).map(tag=>tag.name+" ["+tag.entityType+"] → "+tag.value)).join(" / ");
      const candidates=item.candidates.map(candidate=>candidate.word.word+"（距離 "+candidate.distance+"）").join("、");
      return '<div class="tag-import-row"><div><strong>'+escapeHTML(item.row.word)+'</strong><span class="tag-import-status status-'+item.status+'">'+statusLabel(item.status)+'</span></div><small>'+escapeHTML(additions)+'</small>'+(conflicts?'<small class="tag-import-conflict">'+escapeHTML(conflicts)+'</small>':"")+(candidates?'<small>類似候補：'+escapeHTML(candidates)+'（自動統合しません）</small>':"")+'</div>';
    }).join("");
    $("#tagImportPreviewPanel").innerHTML=summary+rows;
    $("#tagImportApply").disabled=!preview.items.length||(!s.new&&!s.existing);
  }
  function openImporter(){
    showView("tagImportView");
    $("#tagImportPreviewPanel").innerHTML="";
    $("#tagImportStatus").textContent="";
    currentPreview=null;$("#tagImportApply").disabled=true;
  }
  $("#tagImportBtn").addEventListener("click",openImporter);
  $("#tagImportBack").addEventListener("click",()=>showView("notesView"));
  $("#tagImportPreview").addEventListener("click",()=>{
    try{
      currentPreview=tags.previewImport($("#tagImportText").value);
      renderPreview(currentPreview);
      $("#tagImportStatus").textContent="プレビューを作成しました。類似候補のある行は安全のため自動登録しません。";
    }catch(error){
      currentPreview=null;$("#tagImportPreviewPanel").textContent=error.message;
      $("#tagImportApply").disabled=true;
    }
  });
  $("#tagImportApply").addEventListener("click",()=>{
    if(!currentPreview)return;
    const report=tags.applyImport(currentPreview,WORDS);
    if(window.rebuildVocabOSWordIndex)window.rebuildVocabOSWordIndex();
    if(typeof renderNoteList==="function")renderNoteList();
    if(window.refreshVocabOSWordList)window.refreshVocabOSWordList();
    currentPreview=null;$("#tagImportApply").disabled=true;
    $("#tagImportStatus").textContent="登録完了：新規 "+report.created+" 語、既存更新 "+report.updated+" 語、タグ追加 "+report.tagsAdded+" 件、要確認のため保留 "+report.skipped+" 件。";
    if(report.conflicts.length)$("#tagImportStatus").textContent+=" タグ値の競合 "+report.conflicts.length+" 件は両方保存しました。";
    $("#tagImportPreviewPanel").innerHTML="";
  });

  function downloadCSV(){
    const ids=Array.from(selectedWords);
    if(!ids.length){alert("先に書き出す単語を選択してください。");return;}
    const csv=tags.exportCSV(WORDS.filter(word=>ids.includes(String(word.id))));
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob),link=document.createElement("a");
    link.href=url;link.download="vocab-tags-"+new Date().toISOString().slice(0,10)+".csv";
    document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function decorateNoteList(){
    const panel=$("#notesListPanel");if(!panel)return;
    panel.querySelectorAll(".note-list-item").forEach(button=>{
      if(button.parentElement.classList.contains("note-list-row"))return;
      const wrapper=document.createElement("div");wrapper.className="note-list-row";
      const checkbox=document.createElement("input");checkbox.type="checkbox";checkbox.className="tag-word-select";checkbox.checked=selectedWords.has(String(button.dataset.id));
      checkbox.setAttribute("aria-label",button.querySelector(".note-list-word")?.textContent+"を一括操作の対象にする");
      checkbox.addEventListener("click",event=>event.stopPropagation());
      checkbox.addEventListener("change",()=>{
        const id=String(button.dataset.id);
        if(checkbox.checked)selectedWords.add(id);else selectedWords.delete(id);
        updateSelectionCount();
      });
      button.parentNode.insertBefore(wrapper,button);wrapper.appendChild(checkbox);wrapper.appendChild(button);
    });
    if(!panel.querySelector(".tag-bulk-tools")){
      const details=document.createElement("details");details.className="tag-bulk-tools";
      details.innerHTML='<summary>複数単語のタグ操作・CSV出力</summary><div class="tag-bulk-content"><div class="tag-bulk-actions"><button type="button" data-select-visible class="subtle-btn">表示中をすべて選択</button><button type="button" data-clear-selection class="subtle-btn">選択解除</button><span data-selection-count>0語選択中</span></div><div class="tag-bulk-fields"><input type="text" data-bulk-tag-name placeholder="タグ名"><input type="text" data-bulk-tag-value placeholder="値（任意）"><button type="button" data-bulk-add class="subtle-btn">選択語に追加</button><button type="button" data-bulk-remove class="subtle-btn">選択語から削除</button></div><button type="button" data-export-selected class="secondary-wide-btn">選択語と全タグをCSV出力</button><p class="hint" data-bulk-status>一括操作は単語レベルのタグが対象です。語義・例文・コロケーションのタグは各ノート内で編集できます。</p></div>';
      const sort=panel.querySelector(".note-sort-toolbar");if(sort)sort.insertAdjacentElement("afterend",details);else panel.prepend(details);
      details.addEventListener("click",event=>{
        const button=event.target.closest("button");if(!button)return;
        const ids=Array.from(selectedWords),status=details.querySelector("[data-bulk-status]");
        if(button.hasAttribute("data-select-visible")){
          panel.querySelectorAll(".tag-word-select").forEach(input=>{input.checked=true;selectedWords.add(String(input.closest(".note-list-row").querySelector(".note-list-item").dataset.id));});
          updateSelectionCount();return;
        }
        if(button.hasAttribute("data-clear-selection")){
          selectedWords.clear();panel.querySelectorAll(".tag-word-select").forEach(input=>input.checked=false);updateSelectionCount();return;
        }
        if(button.hasAttribute("data-bulk-add")){
          const name=details.querySelector("[data-bulk-tag-name]").value.trim(),raw=details.querySelector("[data-bulk-tag-value]").value.trim();
          if(!ids.length||!name){status.textContent="単語を選択し、タグ名を入力してください。";return;}
          const count=tags.bulkAddTag(ids,name,parseValue(raw),"bulk");
          status.textContent=count+"件のタグを追加しました。";if(typeof renderNoteList==="function")renderNoteList();return;
        }
        if(button.hasAttribute("data-bulk-remove")){
          const name=details.querySelector("[data-bulk-tag-name]").value.trim();
          if(!ids.length||!name){status.textContent="単語を選択し、削除するタグ名を入力してください。";return;}
          const count=tags.bulkRemoveTag(ids,name);
          status.textContent=count+"件のタグを削除しました。";if(typeof renderNoteList==="function")renderNoteList();return;
        }
        if(button.hasAttribute("data-export-selected"))downloadCSV();
      });
    }
    updateSelectionCount();
  }
  function updateSelectionCount(){
    const count=$("[data-selection-count]");
    if(!count)return;
    const next=selectedWords.size+"語選択中";
    // Avoid feeding our own text update back into the panel MutationObserver.
    if(count.textContent!==next)count.textContent=next;
  }
  const panel=$("#notesListPanel");
  if(panel){
    const observer=new MutationObserver(decorateNoteList);
    observer.observe(panel,{childList:true,subtree:true});
    decorateNoteList();
  }
})();
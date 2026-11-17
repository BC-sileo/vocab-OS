/* UI for generic lexical tags and safe import preview. */
(function(){
  "use strict";
  const tags=window.VocabOSTagStore;
  const $=selector=>document.querySelector(selector);
  const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  function tagMarkup(word){
    const current=tags.getWordTags(word.id);
    return '<section class="note-section word-tags-section"><h3>TAGS</h3><div class="word-tag-chips" id="wordTagChips">'+(current.map(tag=>'<span class="word-tag-chip">'+escapeHTML(tag.value===null?tag.name:tag.name+" "+tag.value)+'<button type="button" data-remove-tag="'+tag.id+'" data-tag-value="'+escapeHTML(JSON.stringify(tag.value))+'" aria-label="タグを削除">×</button></span>').join("")||'<span class="hint">タグなし</span>')+'</div><div class="word-tag-editor"><input id="wordTagName" type="text" placeholder="タグ名"><input id="wordTagValue" type="text" placeholder="値（任意）"><button id="addWordTag" type="button" class="subtle-btn">追加</button></div></section>';
  }
  function bindTagEditor(word){
    const section=$(".word-tags-section");if(!section)return;
    const refresh=()=>{
      const holder=$("#wordTagChips");if(!holder)return;
      holder.innerHTML=tags.getWordTags(word.id).map(tag=>'<span class="word-tag-chip">'+escapeHTML(tag.value===null?tag.name:tag.name+" "+tag.value)+'<button type="button" data-remove-tag="'+tag.id+'" data-tag-value="'+escapeHTML(JSON.stringify(tag.value))+'" aria-label="タグを削除">×</button></span>').join("")||'<span class="hint">タグなし</span>';
    };
    section.addEventListener("click",event=>{
      const button=event.target.closest("[data-remove-tag]");
      if(!button)return;
      let value=null;try{value=JSON.parse(button.dataset.tagValue);}catch(_){}
      tags.removeTag("word",word.id,Number(button.dataset.removeTag),value);refresh();
    });
    $("#addWordTag").onclick=()=>{
      const name=$("#wordTagName").value.trim(),raw=$("#wordTagValue").value.trim();
      if(!name){$("#wordTagName").focus();return;}
      const value=raw===""?null:(Number.isFinite(Number(raw))?Number(raw):raw);
      if(tags.addTag("word",word.id,name,value,"manual"))tags.save();
      $("#wordTagName").value="";$("#wordTagValue").value="";refresh();
    };
  }
  const originalOpenNote=window.openNote;
  if(typeof originalOpenNote==="function"){
    window.openNote=function(id,...args){
      originalOpenNote.call(this,id,...args);
      const word=window.getVocabOSWordById(id);
      const detail=$("#noteDetailPanel");
      if(!word||!detail||detail.classList.contains("hidden"))return;
      const anchor=detail.querySelector(".note-hero")||detail.querySelector(".note-title-row");
      if(anchor)anchor.insertAdjacentHTML("afterend",tagMarkup(word));else detail.insertAdjacentHTML("beforeend",tagMarkup(word));
      bindTagEditor(word);
    };
  }

  let currentPreview=null;
  function statusLabel(status){
    return status==="new"?"新規":status==="existing"?"既存": "類似候補あり";
  }
  function renderPreview(preview){
    const s=preview.summary;
    const summary='<div class="tag-import-summary"><span>新規 '+s.new+'</span><span>既存 '+s.existing+'</span><span>要確認 '+s.ambiguous+'</span><span>タグ追加 '+s.tagAdditions+'</span><span>値の競合 '+s.conflicts+'</span></div>';
    const rows=preview.items.map(item=>{
      const additions=item.additions.map(tag=>tag.name+(tag.value===null?"":" "+tag.value)).join(" · ")||"追加タグなし";
      const conflicts=item.conflicts.map(tag=>tag.name+"："+(item.existingTags||[]).filter(old=>old.name.toLowerCase()===tag.name.toLowerCase()).map(old=>old.value).join("/")+" → "+tag.value).join(" / ");
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
})();

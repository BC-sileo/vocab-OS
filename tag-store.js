/* Generic lexical tags and import foundation. Learning records remain in their own store. */
(function(global){
  "use strict";
  const STORAGE_KEY="vocabOS_tags_v1";
  const VERSION=1;
  let data=load();
  let wordIndex=new Map();

  function load(){
    try{
      const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
      if(value&&value.version===VERSION)return normalizeStore(value);
    }catch(error){console.warn("Tag data could not be loaded.",error);}
    return {version:VERSION,nextTagId:1,tags:[],assignments:[],customWords:[],imports:[]};
  }
  function normalizeStore(value){
    return {
      version:VERSION,nextTagId:Number(value.nextTagId)||1,
      tags:Array.isArray(value.tags)?value.tags:[],
      assignments:Array.isArray(value.assignments)?value.assignments:[],
      customWords:Array.isArray(value.customWords)?value.customWords:[],
      imports:Array.isArray(value.imports)?value.imports:[]
    };
  }
  function save(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));return true;}
    catch(error){console.error("Tag data could not be saved.",error);return false;}
  }
  function normalizeWordKey(value){
    return String(value??"").normalize("NFKC").trim().toLocaleLowerCase("en-US");
  }
  function rebuildIndex(words){
    wordIndex=new Map();
    words.forEach(word=>{
      const key=normalizeWordKey(word.word);
      if(key&&!wordIndex.has(key))wordIndex.set(key,word);
    });
    return wordIndex;
  }
  function tagDefinition(name){
    const key=String(name??"").normalize("NFKC").trim().toLocaleLowerCase("en-US");
    return data.tags.find(tag=>tag.key===key)||null;
  }
  function ensureTag(name){
    const clean=String(name??"").normalize("NFKC").trim();
    if(!clean)return null;
    const key=clean.toLocaleLowerCase("en-US");
    let tag=data.tags.find(item=>item.key===key);
    if(!tag){
      tag={id:data.nextTagId++,name:clean,key:key};
      data.tags.push(tag);
    }
    return tag;
  }
  function addTag(entityType,entityId,name,value,source){
    const tag=ensureTag(name);
    if(!tag)return false;
    const normalizedValue=value===undefined||value===null||value===""?null:value;
    const exists=data.assignments.some(item=>
      item.entityType===entityType&&String(item.entityId)===String(entityId)&&
      item.tagId===tag.id&&JSON.stringify(item.value??null)===JSON.stringify(normalizedValue)&&
      true
    );
    if(exists)return false;
    data.assignments.push({entityType,entityId,tagId:tag.id,value:normalizedValue,source:source||null});
    return true;
  }
  function removeTag(entityType,entityId,tagId,value){
    const before=data.assignments.length;
    data.assignments=data.assignments.filter(item=>!(
      item.entityType===entityType&&String(item.entityId)===String(entityId)&&
      (item.tagId===tagId)&&(value===undefined||JSON.stringify(item.value??null)===JSON.stringify(value))
    ));
    if(data.assignments.length!==before)save();
    return before-data.assignments.length;
  }
  function getTags(entityType,entityId){
    return data.assignments.filter(item=>item.entityType===entityType&&String(item.entityId)===String(entityId))
      .map(item=>{const def=data.tags.find(tag=>tag.id===item.tagId);return def?{id:def.id,name:def.name,value:item.value,source:item.source}:null;})
      .filter(Boolean);
  }
  function getWordTags(wordId){return getTags("word",wordId);}
  function getNumericValue(wordId,name){
    const key=String(name).toLocaleLowerCase("en-US");
    const matches=getWordTags(wordId).filter(tag=>tag.name.toLocaleLowerCase("en-US")===key&&typeof tag.value==="number");
    const distinct=Array.from(new Set(matches.map(tag=>tag.value)));
    return distinct.length===1?distinct[0]:undefined;
  }
  function tagsLabel(wordId){
    return getWordTags(wordId).map(tag=>tag.value===null?tag.name:tag.name+" "+tag.value).join(" · ");
  }
  function levenshtein(a,b){
    if(a===b)return 0;
    if(!a.length)return b.length;if(!b.length)return a.length;
    let prev=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      const row=[i];
      for(let j=1;j<=b.length;j++)row[j]=Math.min(row[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
      prev=row;
    }
    return prev[b.length];
  }
  function parseCSV(text){
    const first=(String(text).split(/\r?\n/).find(line=>line.trim())||"");
    const delimiter=first.includes("\t")?"\t":",";
    const rows=[];let row=[],field="",quoted=false;
    const source=String(text).replace(/^\uFEFF/,"");
    for(let i=0;i<source.length;i++){
      const ch=source[i],next=source[i+1];
      if(ch==='"'&&quoted&&next==='"'){field+='"';i++;}
      else if(ch==='"'){quoted=!quoted;}
      else if(ch===delimiter&&!quoted){row.push(field);field="";}
      else if((ch==="\n"||ch==="\r")&&!quoted){
        if(ch==="\r"&&next==="\n")i++;
        row.push(field);if(row.some(cell=>cell.trim()))rows.push(row);
        row=[];field="";
      }else field+=ch;
    }
    row.push(field);if(row.some(cell=>cell.trim()))rows.push(row);
    if(!rows.length)return [];
    const header=rows[0].map(v=>v.trim().toLowerCase());
    const hasHeader=header.some(v=>["word","単語","spelling"].includes(v));
    const columns=hasHeader?header:["word","tags","translation","pos","source"];
    const wordColumn=hasHeader?columns.findIndex(v=>["word","単語","spelling"].includes(v)):0;
    if(wordColumn<0)throw new Error("列名に word（または単語）が必要です。");
    if(hasHeader)rows.shift();
    return rows.map(cells=>{
      const get=names=>{const i=columns.findIndex(v=>names.includes(v));return i<0?"":String(cells[i]||"").trim();};
      return {
        word:String(cells[wordColumn]||"").trim(),
        tags:get(["tags","tag","タグ","tags"]),
        translation:get(["translation","meaning","意味","訳"]),
        pos:get(["pos","品詞"]),
        source:get(["source","出典"])
      };
    }).filter(item=>item.word);
  }
  function parseTagCell(value){
    return String(value||"").split(/[;；]/).map(part=>part.trim()).filter(Boolean).map(part=>{
      const index=part.indexOf(":");
      if(index<0)return {name:part,value:null};
      const name=part.slice(0,index).trim(),raw=part.slice(index+1).trim();
      const numeric=raw!==""&&Number.isFinite(Number(raw));
      return {name,value:numeric?Number(raw):raw};
    }).filter(tag=>tag.name);
  }
  function previewImport(text){
    const rawRows=parseCSV(text),grouped=new Map(),items=[];
    rawRows.forEach(row=>{
      const key=normalizeWordKey(row.word);if(!key)return;
      if(!grouped.has(key))grouped.set(key,{...row});
      else{const prior=grouped.get(key);prior.tags=[prior.tags,row.tags].filter(Boolean).join(";");prior.translation=prior.translation||row.translation;prior.pos=prior.pos||row.pos;prior.source=[prior.source,row.source].filter(Boolean).join(";");}
    });
    const rows=Array.from(grouped.values());
    rows.forEach(row=>{
      const key=normalizeWordKey(row.word);if(!key)return;
      const existing=wordIndex.get(key);
      const candidates=existing?[]:Array.from(wordIndex.entries()).map(([candidate,word])=>({distance:levenshtein(key,candidate),word}))
        .filter(item=>item.distance<=Math.max(1,Math.min(2,Math.floor(key.length/5))))
        .sort((a,b)=>a.distance-b.distance).slice(0,3);
      const currentTags=existing?getWordTags(existing.id):[];
      const incomingTags=parseTagCell(row.tags);
      const additions=incomingTags.filter(incoming=>!currentTags.some(current=>
        current.name.toLowerCase()===incoming.name.toLowerCase()&&JSON.stringify(current.value??null)===JSON.stringify(incoming.value??null)
      ));
      const conflicts=incomingTags.filter(incoming=>currentTags.some(current=>
        current.name.toLowerCase()===incoming.name.toLowerCase()&&JSON.stringify(current.value??null)!==JSON.stringify(incoming.value??null)
      ));
      items.push({row,key,existingId:existing?.id||null,status:existing?"existing":candidates.length?"ambiguous":"new",candidates,additions,conflicts});
    });
    return {items,summary:{
      new:items.filter(x=>x.status==="new").length,
      existing:items.filter(x=>x.status==="existing").length,
      ambiguous:items.filter(x=>x.status==="ambiguous").length,
      repeated:rawRows.length-items.length,
      tagAdditions:items.reduce((n,x)=>n+x.additions.length,0),
      conflicts:items.reduce((n,x)=>n+x.conflicts.length,0)
    }};
  }
  function applyImport(preview,words){
    const report={created:0,updated:0,tagsAdded:0,skipped:0,conflicts:[]};
    const addedInThisBatch=new Map();
    preview.items.forEach(item=>{
      if(item.status==="duplicate-in-file"){report.skipped++;return;}
      let word=wordIndex.get(item.key);
      if(!word&&item.status==="ambiguous"){report.skipped++;return;}
      if(!word){
        const id=Math.max(0,...words.map(w=>Number(w.id)||0),...data.customWords.map(w=>Number(w.id)||0))+1;
        word={id,word:item.row.word.trim(),translation:item.row.translation||"意味データ登録待ち",pos:item.row.pos||"未登録",coreImage:"",imageSearch:item.row.word.trim(),pending:!item.row.translation,imported:true};
        data.customWords.push(word);words.push(word);wordIndex.set(item.key,word);report.created++;
      }else{
        report.updated++;
        if((!word.translation||word.translation==="意味データ登録待ち")&&item.row.translation){word.translation=item.row.translation;word.pending=false;}
        if((!word.pos||word.pos==="未登録")&&item.row.pos)word.pos=item.row.pos;
      }
      const sources=String(item.row.source||"").split(/[;；]/).map(value=>value.trim()).filter(Boolean);
      sources.forEach(source=>{if(addTag("word",word.id,"出典",source,source))report.tagsAdded++;});
      const primarySource=sources[0]||null;
      item.additions.forEach(tag=>{if(addTag("word",word.id,tag.name,tag.value,primarySource))report.tagsAdded++;});
      item.conflicts.forEach(tag=>report.conflicts.push({word:word.word,tag:tag.name,existing:getWordTags(word.id).filter(t=>t.name.toLowerCase()===tag.name.toLowerCase()).map(t=>t.value),incoming:tag.value}));
      addedInThisBatch.set(item.key,word.id);
    });
    data.imports.push({at:Date.now(),summary:report,keys:Array.from(addedInThisBatch.keys())});
    save();rebuildIndex(words);
    return report;
  }
  function initialize(words){
    data.customWords.forEach(word=>{if(!words.some(existing=>normalizeWordKey(existing.word)===normalizeWordKey(word.word)))words.push(word);});
    words.forEach(word=>{
      if(Number.isFinite(Number(word.ven))){
        addTag("word",word.id,"VEN度",Number(word.ven),"legacy-migration");
        delete word.ven;
      }
    });
    rebuildIndex(words);save();
    return words;
  }
  function matchesTagQuery(wordId,query){
    const terms=String(query||"").trim().split(/\\s+AND\\s+|\\s+/i).filter(Boolean);
    const current=getWordTags(wordId);
    return terms.every(term=>{
      let negative=false;
      if(term.startsWith("!")){negative=true;term=term.slice(1);}
      const match=term.match(/^(.+?)(>=|<=|>|<|=|:)(.+)$/);
      let found=false;
      if(!match){
        found=current.some(tag=>tag.name.toLowerCase()===term.toLowerCase());
      }else{
        const name=match[1].trim().toLowerCase(),operator=match[2],raw=match[3].trim();
        const values=raw.split("|").map(value=>value.trim()).filter(Boolean);
        const candidates=current.filter(tag=>tag.name.toLowerCase()===name);
        found=candidates.some(tag=>values.some(value=>{
          const numeric=Number(value),tagNumeric=typeof tag.value==="number";
          if(operator==="="||operator===":")return tag.value===null?value.toLowerCase()===tag.name.toLowerCase():String(tag.value).toLowerCase()===value.toLowerCase();
          if(!tagNumeric||!Number.isFinite(numeric))return false;
          if(operator===">=")return tag.value>=numeric;
          if(operator==="<=")return tag.value<=numeric;
          if(operator===">")return tag.value>numeric;
          if(operator==="<")return tag.value<numeric;
          return false;
        }));
      }
      return negative?!found:found;
    });
  }
  function searchWords(words,query,requiredTags,excludedTags){
    const q=normalizeWordKey(query||"");
    const required=(requiredTags||[]).map(x=>String(x).toLowerCase());
    const excluded=(excludedTags||[]).map(x=>String(x).toLowerCase());
    return words.filter(word=>{
      const tags=getWordTags(word.id);
      const names=tags.map(tag=>tag.name.toLowerCase());
      if(required.some(name=>!names.includes(name)))return false;
      if(excluded.some(name=>names.includes(name)))return false;
      return !q||normalizeWordKey(word.word).includes(q)||normalizeWordKey(word.translation).includes(q);
    });
  }
  global.VocabOSTagStore={
    initialize,save,normalizeWordKey,rebuildIndex,findWord:key=>wordIndex.get(normalizeWordKey(key))||null,
    addTag,removeTag,getTags,getWordTags,getNumericValue,tagsLabel,ensureTag,matchesTagQuery,
    previewImport,applyImport,parseCSV,parseTagCell,searchWords,
    get definitions(){return data.tags.slice();},
    get customWords(){return data.customWords.slice();}
  };
})(window);

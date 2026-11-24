/* Export a non-destructive snapshot of Vocab OS local data before storage migrations. */
(function(){
  "use strict";
  const BUTTON_ID="exportBackupBtn";
  const STATUS_ID="backupStatus";
  const PREFIX="vocabOS_";
  const EXCLUDED_KEYS=new Set(["vocabOS_push_config_v1"]);

  function setStatus(message,isError){
    const node=document.getElementById(STATUS_ID);
    if(node){
      node.textContent=message;
      node.classList.toggle("is-error",!!isError);
    }
  }

  function collectBackup(){
    const data={};
    const keys=Object.keys(localStorage).filter(key=>key.startsWith(PREFIX)).sort();
    const included=[],excluded=[];
    for(const key of keys){
      if(EXCLUDED_KEYS.has(key)){
        excluded.push(key+"（API_TOKEN等の通知認証情報を含むため除外）");
        continue;
      }
      const raw=localStorage.getItem(key);
      if(raw===null)continue;
      try{data[key]=JSON.parse(raw);}
      catch(error){data[key]={__raw:raw};}
      included.push(key);
    }
    return {
      format:"vocab-os-backup",
      formatVersion:1,
      createdAt:new Date().toISOString(),
      app:"Vocab OS",
      data,
      manifest:{
        includedKeys:included,
        excludedKeys:excluded,
        note:"このバックアップは旧データをそのまま保存するスナップショットです。復元・移行時は語彙データと学習状態を分けて検証してください。通知API_TOKENは安全のため含まれません。"
      }
    };
  }

  function downloadBackup(){
    try{
      const backup=collectBackup();
      if(!backup.manifest.includedKeys.length){
        setStatus("保存対象のデータが見つかりませんでした。",true);
        return;
      }
      const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const anchor=document.createElement("a");
      const date=new Date().toISOString().slice(0,10);
      anchor.href=url;
      anchor.download="vocab-os-backup-"+date+".json";
      anchor.hidden=true;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      setStatus("バックアップを作成しました（"+backup.manifest.includedKeys.length+"個の保存領域）。ファイルを安全な場所に保管してください。");
    }catch(error){
      console.error("Vocab OS backup failed.",error);
      setStatus("バックアップを作成できませんでした。ブラウザの保存領域を確認してください。",true);
    }
  }

  const button=document.getElementById(BUTTON_ID);
  if(button)button.addEventListener("click",downloadBackup);
})();

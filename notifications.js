/* Optional push notification client. No network calls until the user enables it. */
(function(){
  "use strict";
  const STORAGE_KEY="vocabOS_push_config_v1";
  const $=id=>document.getElementById(id);
  function load(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");}catch(error){return {};}}
  function save(config){localStorage.setItem(STORAGE_KEY,JSON.stringify(config));}
  function setStatus(message,isError){
    const node=$("notificationStatus");
    if(node){node.textContent=message;node.classList.toggle("is-error",!!isError);}
  }
  function baseUrl(){return String($("notificationWorkerUrl").value||"").trim().replace(/\/+$/,"");}
  function token(){return String($("notificationApiToken").value||"").trim();}
  function randomDeviceId(){
    let config=load();
    if(!config.deviceId)config.deviceId=crypto.randomUUID();
    save(config);
    return config.deviceId;
  }
  function decodeBase64Url(value){
    const padded=value.replace(/-/g,"+").replace(/_/g,"/")+"===".slice((value.length+3)%4);
    const raw=atob(padded);
    return Uint8Array.from(raw,c=>c.charCodeAt(0));
  }
  async function api(path,method,body,config){
    const response=await fetch(config.workerUrl+path,{
      method:method,
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+config.apiToken},
      body:body?JSON.stringify(body):undefined
    });
    let data={};
    try{data=await response.json();}catch(error){}
    if(!response.ok)throw new Error(data.error||("サーバー応答 "+response.status));
    return data;
  }
  async function registerAndSubscribe(config){
    if(!("serviceWorker" in navigator)||!("PushManager" in window)||!("Notification" in window)){
      throw new Error("このブラウザはプッシュ通知に対応していません。");
    }
    if(!window.isSecureContext)throw new Error("HTTPSで開いてください。");
    const permission=await Notification.requestPermission();
    if(permission!=="granted")throw new Error("ブラウザの通知が許可されていません。");
    const publicConfig=await fetch(config.workerUrl+"/config",{cache:"no-store"});
    if(!publicConfig.ok)throw new Error("通知サーバーの設定を取得できません。");
    const serverConfig=await publicConfig.json();
    if(!serverConfig.publicKey)throw new Error("サーバーにVAPID公開鍵が設定されていません。");
    const registration=await navigator.serviceWorker.register("./sw.js",{scope:"./"});
    await navigator.serviceWorker.ready;
    let subscription=await registration.pushManager.getSubscription();
    if(!subscription){
      subscription=await registration.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:decodeBase64Url(serverConfig.publicKey)
      });
    }
    const deviceId=randomDeviceId();
    const dueAt=typeof window.getVocabOSNextDueAt==="function"?window.getVocabOSNextDueAt():null;
    await api("/subscribe","POST",{deviceId,subscription:subscription.toJSON(),dueAt},config);
    return deviceId;
  }
  async function enable(){
    const workerUrl=baseUrl(),apiToken=token();
    if(!/^https:\/\//i.test(workerUrl)||!apiToken){
      setStatus("Worker URLとAPI_TOKENを入力してください。",true);return;
    }
    const config=Object.assign(load(),{workerUrl,apiToken});
    save(config);
    setStatus("通知を設定しています…");
    try{
      const deviceId=await registerAndSubscribe(config);
      await api("/test","POST",{deviceId},config);
      setStatus("設定完了。テスト通知を送信しました。");
      await syncNextDue();
    }catch(error){setStatus("設定できませんでした："+error.message,true);}
  }
  async function syncNextDue(){
    const config=load();
    if(!config.workerUrl||!config.apiToken||!config.deviceId)return;
    try{
      const registration=await navigator.serviceWorker.getRegistration();
      if(!registration)return;
      const subscription=await registration.pushManager.getSubscription();
      if(!subscription)return;
      const dueAt=typeof window.getVocabOSNextDueAt==="function"?window.getVocabOSNextDueAt():null;
      await api("/schedule","POST",{deviceId:config.deviceId,dueAt},config);
    }catch(error){setStatus("復習予定の同期に失敗しました："+error.message,true);}
  }
  async function disable(){
    const config=load();
    try{
      const registration=await navigator.serviceWorker.getRegistration();
      if(registration){
        const subscription=await registration.pushManager.getSubscription();
        if(subscription)await subscription.unsubscribe();
      }
      if(config.workerUrl&&config.apiToken&&config.deviceId){
        await api("/unsubscribe","POST",{deviceId:config.deviceId},config);
      }
      localStorage.removeItem(STORAGE_KEY);
      $("notificationWorkerUrl").value="";
      $("notificationApiToken").value="";
      setStatus("この端末の通知を停止しました。");
    }catch(error){setStatus("停止処理に失敗しました："+error.message,true);}
  }
  window.VocabOSNotifications={syncNextDue};
  const enableButton=$("enableNotificationsBtn");
  const disableButton=$("disableNotificationsBtn");
  const config=load();
  if($("notificationWorkerUrl"))$("notificationWorkerUrl").value=config.workerUrl||"";
  if($("notificationApiToken"))$("notificationApiToken").value=config.apiToken||"";
  if(enableButton)enableButton.addEventListener("click",enable);
  if(disableButton)disableButton.addEventListener("click",disable);
  if(config.workerUrl&&config.apiToken&&config.deviceId){
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("./sw.js",{scope:"./"}).then(syncNextDue).catch(()=>{});
    }
  }
})();
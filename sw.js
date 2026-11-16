self.addEventListener("push",function(event){
  let message={title:"Vocab OS",body:"復習する単語があります。",url:"./"};
  if(event.data){
    try{message=Object.assign(message,event.data.json());}
    catch(error){message.body=event.data.text()||message.body;}
  }
  event.waitUntil(self.registration.showNotification(message.title||"Vocab OS",{
    body:message.body||"復習する単語があります。",
    tag:"vocab-os-review",
    renotify:false,
    data:{url:message.url||"./"}
  }));
});
self.addEventListener("notificationclick",function(event){
  event.notification.close();
  const target=new URL(event.notification.data&&event.notification.data.url||"./",self.location.origin).href;
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(function(windows){
    for(const client of windows){
      if(client.url===target||client.url.startsWith(target)){
        return client.focus();
      }
    }
    return clients.openWindow(target);
  }));
});
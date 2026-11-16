import { buildPushPayload } from "@block65/webcrypto-web-push";

const DEVICE_PREFIX = "device:";

function response(data,status,origin,env){
  const headers={"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"};
  if(origin && origin===env.ALLOWED_ORIGIN){
    headers["Access-Control-Allow-Origin"]=origin;
    headers["Access-Control-Allow-Methods"]="GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"]="Content-Type, Authorization";
    headers["Vary"]="Origin";
  }
  return new Response(status===204?null:JSON.stringify(data),{status,headers});
}
function validDeviceId(value){
  return typeof value==="string" && /^[a-f0-9-]{36}$/i.test(value);
}
function authorized(request,env){
  return !!env.API_TOKEN && request.headers.get("Authorization")==="Bearer "+env.API_TOKEN;
}
async function readBody(request){
  const raw=await request.text();
  if(raw.length>12000)throw new Error("Request body too large");
  return JSON.parse(raw);
}
async function sendPush(record,env,message){
  const payload=await buildPushPayload({
    data:JSON.stringify(message),
    options:{ttl:3600}
  },record.subscription,{
    subject:env.VAPID_SUBJECT,
    publicKey:env.VAPID_PUBLIC_KEY,
    privateKey:env.VAPID_PRIVATE_KEY
  });
  return fetch(record.subscription.endpoint,payload);
}

export default {
  async fetch(request,env){
    const origin=request.headers.get("Origin")||"";
    if(origin && origin!==env.ALLOWED_ORIGIN)return response({error:"Origin not allowed"},403,"",env);
    if(request.method==="OPTIONS")return response({ok:true},204,origin,env);
    const url=new URL(request.url);
    if(request.method==="GET" && url.pathname==="/health")return response({ok:true,plan:"free-compatible"},200,origin,env);
    if(request.method==="GET" && url.pathname==="/config"){
      return response({publicKey:env.VAPID_PUBLIC_KEY||"",appUrl:env.APP_URL||""},200,origin,env);
    }
    if(!authorized(request,env))return response({error:"Unauthorized"},401,origin,env);
    if(request.method!=="POST")return response({error:"Method not allowed"},405,origin,env);
    let body;
    try{body=await readBody(request);}catch(error){return response({error:"Invalid request body"},400,origin,env);}
    const deviceId=body&&body.deviceId;
    if(!validDeviceId(deviceId))return response({error:"Invalid deviceId"},400,origin,env);
    const key=DEVICE_PREFIX+deviceId;
    if(url.pathname==="/subscribe"){
      const sub=body.subscription;
      if(!sub || typeof sub.endpoint!=="string" || !sub.endpoint.startsWith("https://") || !sub.keys || !sub.keys.p256dh || !sub.keys.auth){
        return response({error:"Invalid push subscription"},400,origin,env);
      }
      const previous=await env.NOTIFICATIONS.get(key,"json");
      const record={
        subscription:sub,
        dueAt:previous&&Number.isFinite(previous.dueAt)?previous.dueAt:null,
        notifiedAt:previous&&Number.isFinite(previous.notifiedAt)?previous.notifiedAt:null,
        updatedAt:Date.now()
      };
      await env.NOTIFICATIONS.put(key,JSON.stringify(record));
      return response({ok:true},200,origin,env);
    }
    if(url.pathname==="/schedule"){
      const record=await env.NOTIFICATIONS.get(key,"json");
      if(!record||!record.subscription)return response({error:"Device is not subscribed"},404,origin,env);
      const dueAt=body.dueAt===null?null:Number(body.dueAt);
      if(dueAt!==null && (!Number.isFinite(dueAt)||dueAt<0))return response({error:"Invalid dueAt"},400,origin,env);
      if(dueAt!==record.dueAt)record.notifiedAt=null;
      record.dueAt=dueAt;
      record.updatedAt=Date.now();
      await env.NOTIFICATIONS.put(key,JSON.stringify(record));
      return response({ok:true,dueAt},200,origin,env);
    }
    if(url.pathname==="/test"){
      const record=await env.NOTIFICATIONS.get(key,"json");
      if(!record||!record.subscription)return response({error:"Device is not subscribed"},404,origin,env);
      try{
        const sent=await sendPush(record,env,{title:"Vocab OS",body:"通知設定を確認しました。",url:env.APP_URL});
        if(sent.status===404||sent.status===410){await env.NOTIFICATIONS.delete(key);return response({error:"Push subscription expired"},410,origin,env);}
        if(!sent.ok)return response({error:"Push service returned "+sent.status},502,origin,env);
        return response({ok:true},200,origin,env);
      }catch(error){return response({error:"Push test failed"},502,origin,env);}
    }
    if(url.pathname==="/unsubscribe"){
      await env.NOTIFICATIONS.delete(key);
      return response({ok:true},200,origin,env);
    }
    return response({error:"Not found"},404,origin,env);
  },
  async scheduled(controller,env,ctx){
    ctx.waitUntil((async function(){
      const listed=await env.NOTIFICATIONS.list({prefix:DEVICE_PREFIX,limit:100});
      for(const item of listed.keys){
        const record=await env.NOTIFICATIONS.get(item.name,"json");
        if(!record||!record.subscription||!Number.isFinite(record.dueAt)||record.dueAt>Date.now()||record.notifiedAt===record.dueAt)continue;
        try{
          const sent=await sendPush(record,env,{
            title:"Vocab OS",
            body:"復習期限が来た単語があります。",
            url:env.APP_URL
          });
          if(sent.status===404||sent.status===410){
            await env.NOTIFICATIONS.delete(item.name);
            continue;
          }
          if(sent.ok){
            record.notifiedAt=record.dueAt;
            record.updatedAt=Date.now();
            await env.NOTIFICATIONS.put(item.name,JSON.stringify(record));
          }
        }catch(error){
          // Retry on the next scheduled run; never switch plans or incur paid usage.
        }
      }
    })());
  }
};
(function(e,i,n){"use strict";const o=n.findByStoreName("UserStore");n.findByProps("sendAttachments");let a;var r={onLoad:function(){a=i.registerCommand({name:"petpet",displayName:"PetPet",displayDescription:"pet someone with a petpet",description:"pet someone with a petpet",options:[{name:"user",description:"name or id of the user",type:9,required:!0,displayName:"User",displayDescription:"Name or Id of the user"}],execute:s,applicationId:-1,inputType:1,type:1})},onUnload:function(){a()}};async function p(t){return await(await fetch(`https://api.obamabot.me/v2/image/petpet?image=${t.replace("webp","png")}`)).json()}async function s(t,c){const d=(await o.getUser(t[0].value)).getAvatarURL(512);return{content:(await p(d)).url}}return e.default=r,Object.defineProperty(e,"__esModule",{value:!0}),e})({},vendetta.commands,vendetta.metro);

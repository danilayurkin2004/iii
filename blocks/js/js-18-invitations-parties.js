const inviteCap=n=>Math.max(0,Math.min(100,Math.round(n)));
const invitationActivities={
 park:{name:'Прогулка в парке',verb:'прогуляться в парке',fee:0,minAge:0,happy:4},
 cinema:{name:'Приглашение в кино',verb:'сходить в кино',fee:14,minAge:6,happy:6},
 picnic:{name:'Семейный пикник',verb:'устроить пикник',fee:10,minAge:0,happy:5},
 museum:{name:'Вместе в музей',verb:'посетить музей',fee:15,minAge:5,happy:4},
 cafe:{name:'Встреча в кафе',verb:'посидеть в кафе',fee:18,minAge:10,happy:5},
 party:{name:'Приглашение на вечеринку',verb:'прийти на домашнюю вечеринку',fee:0,minAge:10,happy:7},
 date:{name:'Приглашение на свидание',verb:'встретиться на свидании',fee:20,minAge:16,happy:6}
};
function invitationHost(s,invite){return invite.hostType==='parent'?s.parents[Number(invite.hostId)]:s.friends.find(f=>f.id===invite.hostId);}
function ensureHostNetwork(s,host,rng){host.networkIds??=[];host.networkIds=host.networkIds.filter(id=>s.networkPeople.some(p=>p.id===id&&p.status!=='deceased'&&(!p.metFriendId||s.friends.some(f=>f.id===p.metFriendId&&f.bond>0&&!f.formerFriend&&f.status!=='deceased'))));
 if(s.networkPeople.length>=58){const used=new Set(s.friends.filter(f=>f.bond>0&&!f.formerFriend).flatMap(f=>f.networkIds||[]));for(const invite of s.invitations.filter(i=>i.status==='pending'))for(const guest of invite.guests)if(guest.type==='network')used.add(guest.id);s.networkPeople=s.networkPeople.filter(p=>used.has(p.id));}
 while(host.networkIds.length<2&&s.networkPeople.length<60){const gender=rng()<.5?'female':'male',id='n'+s.nextNetworkId++;let name=randomName(s.country,gender,rng),seed=socialHash(s.name+s.country+id);const used=new Set([...s.friends,...s.parents,...s.relatives,...s.networkPeople].map(p=>p.name)),local=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);for(let n=0;used.has(name)&&n<10;n++)name=randomName(s.country,gender,local);const p={id,name,gender,age:Math.max(5,s.age+Math.floor(rng()*5)-2),kind:['supportive','creative'][rng()<.5?0:1],status:'alive',metFriendId:null};s.networkPeople.push(p);host.networkIds.push(p.id);}
}
function partyGuests(s,host,rng){ensureHostNetwork(s,host,rng);const guests=s.friends.filter(f=>f.id!==host.id&&f.status!=='deceased'&&f.bond>=60&&!f.formerFriend&&(!f.country||f.country===s.country)&&(host.links[f.id]||0)>=40).slice(0,3).map(f=>({type:'friend',id:f.id,name:f.name,gender:f.gender,age:f.age,relationship:'Общий друг'}));for(const id of host.networkIds){const p=s.networkPeople.find(p=>p.id===id);if(!p||p.status==='deceased')continue;const known=p.metFriendId&&s.friends.find(f=>f.id===p.metFriendId&&f.bond>0&&!f.formerFriend);if(known){if(!guests.some(g=>g.type==='friend'&&g.id===known.id))guests.push({type:'friend',id:known.id,name:known.name,gender:known.gender,age:known.age,relationship:'Общий знакомый'});}else guests.push({type:'network',id:p.id,name:p.name,gender:p.gender,age:p.age,relationship:'Друг хозяина; вы ещё не знакомы'});}return guests;}
function createInvitation(s,hostType,hostId,activity,econ,rng=Math.random){
 if(activity==='date'&&hostType==='parent')return null;
 const info=invitationActivities[activity];if(!info||s.age<info.minAge||!['parent','friend','partner'].includes(hostType))return null;
 const host=invitationHost(s,{hostType,hostId});if(!host||host.status==='deceased'||host.country&&host.country!==s.country||s.mobility?.assignment?.days>=180||hostType!=='parent'&&(host.bond<40||host.formerFriend)||hostType==='partner'&&s.partnerId!==hostId||activity==='date'&&(!canRomance(s,host)||hostId!==s.partnerId&&s.partner))return null;
 const fee=hostType==='parent'&&s.age<18?0:Math.round(info.fee*econ.cost),guests=activity==='party'&&hostType!=='parent'?partyGuests(s,host,rng):[];
 const invite={id:'invite-'+s.nextInvitationId++,age:s.age,hostType,hostId:String(hostId),activity,fee,resource:hostType==='parent'?.25:.5,status:'pending',guests};s.invitations.push(invite);s.invitations=s.invitations.filter(i=>i.status==='pending'||i.age>=s.age-5).slice(-40);return invite;
}
function invitationEvent(s,invite){const host=invitationHost(s,invite),activity=invitationActivities[invite.activity],who=(invite.hostType==='parent'?host.role+': ':'')+host.name;
 const text=`${who} приглашает тебя ${activity.verb}.${invite.hostType==='partner'?' Инициатива исходит от партнёра.':''}\n${invite.guests.length?'Гости:\n'+invite.guests.map(g=>`${g.name} — ${g.relationship}`).join('\n')+'\n':''}${invite.fee?'Твои расходы: '+invite.fee+' $. Каждый оплачивает свою часть.':invite.hostType==='parent'&&s.age<18?'Расходы берёт на себя родитель.':'Платить за участие не нужно.'}`;
 const choice=(label,response,meetId)=>({label,effect:'invitation',invitationId:invite.id,response,...(meetId?{meetId}:{}),cost:response==='accept'?invite.fee:0,result:response==='accept'?'Приглашение принято.':'Ты вежливо отказался от приглашения.'});
 return {title:activity.name,text,choices:[choice('Принять приглашение'+(invite.fee?' · '+invite.fee+' $':''),'accept'),...invite.guests.filter(g=>g.type==='network').slice(0,2).map(g=>choice('Пойти и познакомиться: '+g.name,'accept',g.id)),choice('Вежливо отказаться','decline')]};
}
function incomingInvitation(s,econ,rng){if(s.age<1||rng()> (s.age<10?.35:.75))return null;const sources=[];
 for(let i=0;i<s.parents.length;i++){const p=s.parents[i];if(p.status!=='deceased'&&p.bond>=40&&(!p.country||p.country===s.country))sources.push({type:'parent',id:String(i)});}
 if(s.age>=10)for(const f of s.friends)if(personAvailable(f)&&f.status!=='deceased'&&f.bond>=40&&!f.formerFriend&&(!f.country||f.country===s.country)){const type=f.id===s.partnerId?'partner':'friend';for(let k=0;k<(type==='partner'?4:3);k++)sources.push({type,id:f.id});}
 if(!sources.length)return null;const host=sources[Math.min(sources.length-1,Math.floor(rng()*sources.length))],f=host.type==='parent'?s.parents[Number(host.id)]:s.friends.find(f=>f.id===host.id);
 const activities=host.type==='parent'?['park','picnic','cinema','museum']:host.type==='partner'?['date','cinema','cafe','park','party']:['park','cinema','cafe','party'];if(host.type==='friend'&&canRomance(s,f)&&f.feelings>=65&&!s.partner)activities.push('date');const allowed=activities.filter(id=>s.age>=invitationActivities[id].minAge&&venueOpen(s,id)),activity=allowed[Math.min(allowed.length-1,Math.floor(rng()*allowed.length))],invite=createInvitation(s,host.type,host.id,activity,econ,rng);return invite?invitationEvent(s,invite):null;
}
function applyInvitationChoice(s,c,rng){const invite=s.invitations.find(i=>i.id===c.invitationId);if(!invite||invite.status!=='pending')return {error:'Это приглашение уже завершено.'};const host=invitationHost(s,invite);
 if(c.response==='decline'){invite.status='declined';return {text:host?`Ты вежливо отклонил приглашение ${host.name}. Можно встретиться в другой раз.`:'Ты отказался от встречи.'};}
 if(c.response!=='accept')return {error:'Выбери, принять приглашение или отказаться.'};
 if(!host||host.status==='deceased'||host.country&&host.country!==s.country||s.mobility?.assignment?.days>=180||invite.age!==s.age||invite.hostType!=='parent'&&(host.bond<=0||host.formerFriend))return {error:'Приглашение больше не актуально. Можно отказаться от него.'};
 if(invite.activity==='date'&&(invite.hostType==='parent'||!canRomance(s,host))||invite.hostType==='partner'&&s.partnerId!==invite.hostId)return {error:'Личная встреча больше не актуальна. Можно отказаться от приглашения.'};
 if(s.energy<invite.resource)return {error:'На этот год недостаточно ресурса для встречи. Можно вежливо отказаться.'};if(s.money<invite.fee)return {error:`На встречу нужно ${invite.fee} $. Можно вежливо отказаться.`};
 let newcomer=null;if(c.meetId){const guest=invite.guests.find(g=>g.type==='network'&&g.id===c.meetId),person=s.networkPeople.find(p=>p.id===c.meetId);if(!guest||!person||person.status==='deceased')return {error:'Этого гостя сейчас нет на встрече.'};if(s.friends.filter(f=>f.bond>0).length>=12)return {error:'Круг общения уже большой. Можно пойти без нового знакомства.'};newcomer=person;}
 s.money-=invite.fee;s.energy-=invite.resource;host.bond=inviteCap(host.bond+6);if(host.trust!==undefined)host.trust=inviteCap(host.trust+4);s.happy=inviteCap(s.happy+invitationActivities[invite.activity].happy);if(invite.hostType!=='parent')deepenTrust(s,host,'time',3);if(invite.hostType!=='parent')sharedFeelings(s,host,invite.activity==='date'?7:3);if(s.partnerId===host.id)s.relation=host.bond;
 for(const guest of invite.guests)if(guest.type==='friend'){const f=s.friends.find(f=>f.id===guest.id&&f.bond>0&&!f.formerFriend);if(f){deepenTrust(s,f,'time',2);f.bond=inviteCap(f.bond+3);f.trust=inviteCap(f.trust+2);}}
 let met='';if(newcomer){let f=newcomer.metFriendId&&s.friends.find(f=>f.id===newcomer.metFriendId);if(!f){f=spawnFriend(s,rng,false,newcomer);newcomer.metFriendId=f.id;}f.links[host.id]=75;host.links[f.id]=75;met=` Ты познакомился с ${f.name}. Контакт появился в отношениях.`;}
 invite.status='accepted';cleanSocialLinks(s);return {text:`${invitationActivities[invite.activity].name}: ты провёл время с ${host.name}. ${invite.guests.length?'На встрече были общие знакомые и друзья хозяина. ':''}${invite.fee?'Расходы '+invite.fee+' $.':'Участие без личных расходов.'}${met}`};
}


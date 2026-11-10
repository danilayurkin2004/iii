const aptitudeNames={sports:'спорт',arts:'искусство',technical:'инженерия',medicine:'медицина',it:'информационные технологии',education:'обучение и педагогика',business:'управление и финансы',service:'помощь людям и сервис'};
function createAptitudes(rng){const keys=Object.keys(aptitudeNames),values=Object.fromEntries(keys.map(k=>[k,20+Math.min(60,Math.floor(rng()*61))])),top=Math.max(...Object.values(values)),best=keys.filter(k=>values[k]===top);return {values,focus:best[Math.min(best.length-1,Math.floor(rng()*best.length))],hintAge:7+Math.min(6,Math.floor(rng()*7)),hintShown:false};}
function initAptitudes(s){if(s.aptitudes)return;let hash=0;for(const c of s.name+s.country)hash=(Math.imul(hash,31)+c.codePointAt(0))>>>0;const keys=Object.keys(aptitudeNames),best=keys.slice().sort((a,b)=>(s.skills?.[b]||0)-(s.skills?.[a]||0));s.aptitudes={values:Object.fromEntries(keys.map(k=>[k,50])),focus:best[0]||keys[hash%keys.length],hintAge:7+hash%7,hintShown:s.age>13};}
function aptitudeGain(s,field,base){if(base<=0)return base;return Math.max(1,Math.round(base*(.8+(s.aptitudes?.values[field]??50)/250)));}
const aptitudeClues={sports:'Тебе особенно нравится движение, а новые упражнения осваиваются уверенно. Возможно, стоит попробовать спортивную секцию.',arts:'Ты замечаешь цвета, звуки и образы и с интересом придумываешь своё. Возможно, тебе понравятся творческие занятия.',technical:'Ты любишь разбираться, как устроены вещи, и находишь удачные решения в задачах с конструкциями.',medicine:'Тебя интересуют устройство организма и помощь тем, кому нездоровится. Это может стать одним из будущих направлений.',it:'Ты увлечённо ищешь закономерности и интересуешься компьютерными задачами.',education:'Ты терпеливо объясняешь другим и радуешься, когда у них получается понять новое.',business:'Ты хорошо замечаешь, как распределять дела и договариваться о совместных планах.',service:'Ты внимателен к людям, замечаешь их потребности и охотно помогаешь.'};

function socialHash(text){let n=2166136261;for(const c of String(text))n=Math.imul(n^c.codePointAt(0),16777619)>>>0;return n;}
function personGender(s,person){return person.gender||inferNameGender(person.name,s.country)||(person.id===s.partnerId?(s.gender==='male'?'female':'male'):socialHash(person.name+'|'+person.id)%2?'male':'female');}
function canRomance(s,f){return s.age>=16&&f.age>=16&&s.gender!==personGender(s,f)&&f.status!=='deceased'&&f.bond>0&&(s.partnerId===f.id||!['dating','married'].includes(f.life?.relationship));}
function cleanSocialLinks(s){
 syncBestFriend(s);
 const friends=s.friends||[],removed=new Set();
 for(const f of friends){f.hasBeenFriend??=f.bond>=60;if(f.bond>=60&&f.status!=='deceased'){f.hasBeenFriend=true;f.formerFriend=false;}else if(f.hasBeenFriend||f.bond<=0||f.status==='deceased'){f.formerFriend=true;removed.add(f.id);f.links={};}}
 for(const f of friends)if(f.networkIds)f.networkIds=f.networkIds.filter(id=>!(s.networkPeople||[]).some(p=>p.id===id&&p.metFriendId&&removed.has(p.metFriendId)));
 const known=new Set(friends.filter(f=>f.status!=='deceased'&&f.bond>0&&!f.formerFriend).map(f=>f.id));
 for(const f of friends)for(const id of Object.keys(f.links||{}))if(id===f.id||removed.has(id)||!known.has(id))delete f.links[id];
}


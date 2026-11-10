const childhoodDefinitions=[
 ['lullaby','Колыбельная перед сном',0,3,'parent','поёт тебе колыбельную','Слушать и успокоиться',{happy:4,health:1},'Поиграть перед сном',{creativity:2}],
 ['first-steps','Первые шаги рядом с близкими',0,2,'parent','помогает тебе сделать первые уверенные шаги','Потренироваться вместе',{sports:2,health:2},'Немного отдохнуть',{happy:3}],
 ['family-book','Семейное чтение',1,9,'parent','предлагает вместе рассмотреть книгу','Слушать и задавать вопросы',{iq:3,academics:2},'Придумать свою сказку',{creativity:4}],
 ['kitchen','Маленький помощник на кухне',3,9,'parent','готовит ужин и предлагает безопасное задание','Помочь приготовить',{happy:3},{service:2},'Понаблюдать',{iq:2}],
 ['board-game','Настольная игра дома',4,9,'parent','достаёт настольную игру','Играть по правилам',{iq:3},'Придумать свой вариант',{creativity:3}],
 ['shared-toy','Игрушка на двоих',2,9,'sibling','просит ненадолго дать твою игрушку','Поделиться',{happy:3},'Предложить играть вместе',{creativity:2,happy:2}],
 ['building','Строительство домашнего города',4,9,'sibling','строит город из конструктора','Присоединиться',{creativity:3},{technical:2},'Нарисовать план',{iq:2}],
 ['siblings-school','Старший помогает с уроками',6,9,'older-sibling','предлагает разобрать трудное задание','Разобраться вместе',{academics:4},'Попробовать самостоятельно',{iq:2}],
 ['family-park','Семейная прогулка',0,9,'parent','собирается с тобой в парк','Пойти вместе',{happy:3,health:2},'Поиграть дома',{creativity:2}],
 ['garden-help','Дела в семейном саду',4,9,'grandparent','предлагает посадить небольшое растение','Посадить и ухаживать',{happy:3},{service:2},'Нарисовать растение',{creativity:3}],
 ['museum-child','Первый поход в музей',5,9,'parent','хочет показать тебе интересную выставку','Рассмотреть экспонаты',{iq:3},'Зарисовать впечатления',{creativity:3}],
 ['family-photo','Семейный фотоальбом',0,9,'parent','показывает фотографии семьи','Рассматривать вместе',{happy:4},'Попросить рассказать историю',{iq:2}],
 ['grandma-stories','Истории бабушки',2,9,'grandmother','рассказывает о своём детстве','Слушать и расспрашивать',{iq:2,happy:2},'Нарисовать услышанное',{creativity:3}],
 ['grandpa-bike','Дедушка учит кататься',5,9,'grandfather','помогает освоить велосипед на безопасной площадке','Потренироваться',{sports:4,health:1},'Начать с короткой прогулки',{health:2}],
 ['grandma-craft','Урок рукоделия',5,9,'grandmother','предлагает сделать простую поделку','Мастерить вместе',{creativity:3},{arts:2},'Придумать свой рисунок',{creativity:2}],
 ['grandpa-workshop','В мастерской дедушки',6,9,'grandfather','показывает, как устроены простые инструменты','Разобраться под присмотром',{iq:2},{technical:3},'Нарисовать схему',{creativity:2}],
 ['sibling-birthday','Праздник брата или сестры',3,9,'sibling','готовится отмечать день рождения','Сделать открытку',{creativity:3,happy:2},'Помочь украсить комнату',{happy:3}],
 ['family-moving','Семейная перестановка',3,9,'parent','предлагает придумать, как удобнее расставить вещи','Помочь с планом',{iq:2},'Украсить свой уголок',{creativity:3}],
 ['school-prep','Подготовка к школе вместе',5,7,'parent','предлагает подготовить школьные принадлежности','Позаниматься вместе',{academics:4},'Обсудить, что тревожит',{happy:4}],
 ['family-music','Музыкальный вечер дома',1,9,'parent','предлагает послушать музыку и попробовать спеть','Подпевать',{creativity:3},{arts:2},'Двигаться под музыку',{sports:2,happy:2}]
];
function familyPerson(s,role){if(role==='parent'){const p=s.parents.find(p=>p.status==='home')||s.parents.find(p=>p.status!=='deceased');return p?{person:p,type:'parent',id:String(s.parents.indexOf(p)),label:p.role}:null;}const r=s.relatives.find(r=>r.status!=='deceased'&&(role==='sibling'?['brother','sister'].includes(r.role):role==='older-sibling'?['brother','sister'].includes(r.role)&&r.age>=s.age+2:role==='grandparent'?['grandmother','grandfather'].includes(r.role):r.role===role));return r?{person:r,type:'relative',id:r.id,label:kinRoleNames[r.role]}:null;}
const childhoodEventIds=childhoodDefinitions.map(d=>'family-'+d[0]);
function familyChildEvents(s){if(s.age>=10)return [];const events=[];for(const row of childhoodDefinitions){const [id,title,min,max,role,description,yes,changes,...rest]=row;if(s.age<min||s.age>max)continue;const who=familyPerson(s,role);if(!who)continue;const skills=typeof rest[0]==='object'?rest.shift():undefined,[alternative,alternativeChanges]=rest;const choice=(label,stats,bond,skills)=>({label,effect:'life',cost:0,result:`${who.label} ${who.person.name}: вы провели время вместе.`,changes:stats,familyTarget:{type:who.type,id:who.id},familyBond:bond,...(skills?{skills}:{})});events.push({id:'family-'+id,title,text:`${who.label} ${who.person.name} ${description}.`,min,max,tag:'any',choices:[choice(yes,changes,5,skills),choice(alternative,alternativeChanges,2)]});}return events;}
function pickChildhoodEvent(s,rng){const pool=familyChildEvents(s);if(!pool.length)return null;const fresh=pool.filter(e=>!s.recentEvents.includes(e.id)),source=fresh.length?fresh:pool,e=source[Math.min(source.length-1,Math.floor(rng()*source.length))];s.recentEvents.push(e.id);s.recentEvents=s.recentEvents.slice(-12);return e;}


// A deliberately simplified game model, not live immigration or economic data.
const countryGroups={
eu:'at be bg hr cy cz dk ee fi fr de gr hu ie it lv lt lu mt nl pl pt ro sk si es se'.split(' '),
eea:'is li no ch'.split(' '),
schengen:'at be bg hr cz dk ee fi fr de gr hu is it lv li lt lu mt nl no pl pt ro sk si es se ch'.split(' '),
gulf:'ae sa qa kw bh om'.split(' '),
restricted:'kp'.split(' '),
conflict:'af sy ye sd ss so ly'.split(' '),
eastAsia:'cn jp kr kp mn tw'.split(' '),
oceania:'au nz fj ki mh fm nr pw pg ws sb to tv vu'.split(' '),
americas:'ag ar bs bb bz bo br ca cl co cr cu dm do ec sv gd gt gy ht hn jm mx ni pa py pe kn lc vc sr tt us uy ve'.split(' '),
europe:'al ad am at az by be ba bg hr cy cz dk ee fi fr ge de gr hu is ie it kz lv li lt lu mt md mc me nl mk no pl pt ro ru sm rs sk si es se ch tr ua gb va'.split(' '),
africa:'dz ao bj bw bf bi cv cm cf td km cg cd ci dj eg gq er sz et ga gm gh gn gw ke ls lr mg mw ml mr mu ma mz na ne ng rw st sn sc sl so za ss sd tz tg tn ug zm zw'.split(' ')
};
const languageNames={en:'Английский',es:'Испанский',fr:'Французский',pt:'Португальский',ar:'Арабский',ru:'Русский',de:'Немецкий',it:'Итальянский',zh:'Китайский',ja:'Японский',ko:'Корейский',hi:'Хинди',bn:'Бенгальский',ur:'Урду',fa:'Персидский',tr:'Турецкий',vi:'Вьетнамский',th:'Тайский',id:'Индонезийский',ms:'Малайский',sw:'Суахили',am:'Амхарский',sq:'Албанский',hy:'Армянский',az:'Азербайджанский',be:'Белорусский',bg:'Болгарский',bs:'Боснийский',hr:'Хорватский',cs:'Чешский',da:'Датский',et:'Эстонский',fi:'Финский',ka:'Грузинский',el:'Греческий',he:'Иврит',hu:'Венгерский',is:'Исландский',kk:'Казахский',ky:'Киргизский',lo:'Лаосский',lv:'Латышский',lt:'Литовский',mk:'Македонский',mn:'Монгольский',me:'Черногорский',nl:'Нидерландский',no:'Норвежский',pl:'Польский',ro:'Румынский',sr:'Сербский',sk:'Словацкий',sl:'Словенский',sv:'Шведский',uk:'Украинский',uz:'Узбекский',tg:'Таджикский',tk:'Туркменский',ca:'Каталанский',km:'Кхмерский',my:'Бирманский',ne:'Непальский',si:'Сингальский',dz:'Дзонг-кэ',dv:'Дивехи',ps:'Пушту',ti:'Тигринья',so:'Сомалийский',rw:'Киньяруанда',rn:'Кирунди',mg:'Малагасийский',ht:'Гаитянский креольский',mt:'Мальтийский'};
const languageGroups={
en:'ag au bs bb bz bw ca dm fj gm gh gd gy ie jm ke ki ls lr mh mu fm na nr nz ng pw pg ph rw kn lc vc ws sc sl sg sb za ss tz to tt tv ug gb us vu zm zw',
es:'ar bo cl co cr cu do ec sv gq gt hn mx ni pa py pe es uy ve',
fr:'fr be bj bf cm cf td km cg cd ci dj ga gn lu ml mc ne sn tg',pt:'ao br cv gw mz st tl pt',
ar:'dz bh eg iq jo kw lb ly mr ma om ps qa sa sd sy tn ae ye',ru:'ru',de:'at de li ch',it:'it sm va',
zh:'cn',ja:'jp',ko:'kr kp',hi:'in',bn:'bd',ur:'pk',fa:'ir',tr:'tr',vi:'vn',th:'th',id:'id',ms:'my bn',sw:'tz',am:'et',sq:'al',hy:'am',az:'az',be:'by',bg:'bg',bs:'ba',hr:'hr',cs:'cz',da:'dk',et:'ee',fi:'fi',ka:'ge',el:'gr cy',he:'il',hu:'hu',is:'is',kk:'kz',ky:'kg',lo:'la',lv:'lv',lt:'lt',mk:'mk',mn:'mn',me:'me',nl:'nl sr',no:'no',pl:'pl',ro:'ro md',sr:'rs',sk:'sk',sl:'si',sv:'se',uk:'ua',uz:'uz',tg:'tj',tk:'tm',ca:'ad',km:'kh',my:'mm',ne:'np',si:'lk',dz:'bt',dv:'mv',ps:'af',ti:'er',so:'so',rw:'rw',rn:'bi',mg:'mg',ht:'ht',mt:'mt'
};
const localLanguages=Object.fromEntries(Object.entries(languageGroups).flatMap(([language,codes])=>codes.split(' ').map(c=>[c,language])));
function localLanguage(country){return localLanguages[country]||'en';}
function languageLevel(s,country){return s.mobility?.languages?.[localLanguage(country)]??(country===s.country&&!s.mobility?100:0);}
function worldRegion(country){return countryGroups.americas.includes(country)?'Америка':countryGroups.europe.includes(country)?'Европа':countryGroups.oceania.includes(country)?'Океания':countryGroups.africa.includes(country)?'Африка':'Азия';}
function economyFor(code,s=null){const e=regionalEconomy(code);return applyEconomicClimate({...e,tuition:code==='us'?18000:Math.round(6000*e.cost),healthCost:code==='us'?3500:Math.round(1000*e.cost)},s,code);}
function freeMovement(passport,destination){return passport===destination||[...countryGroups.eu,...countryGroups.eea].includes(passport)&&[...countryGroups.eu,...countryGroups.eea].includes(destination);}
const visaWaiverUS='ad au at be bn hr cz dk ee fi fr de gr hu is ie il it jp lv li lt lu mt mc nl nz no pl pt kr sm sg sk si es se ch gb'.split(' ');
function entryRule(passport,destination){
 if(freeMovement(passport,destination))return {kind:'free',name:passport===destination?'Гражданство страны':'Свободное передвижение ЕС / ЕЭЗ и Швейцарии',fee:0,days:90,work:true,note:'Для длительного проживания нужна местная регистрация; вне страны гражданства сохраняются требования к основанию проживания.'};
 if(countryGroups.restricted.includes(destination))return {kind:'restricted',name:'Организованный въезд',fee:0,days:0,work:false,note:'Индивидуальные поездки и обычная иммиграция в эту страну в игре недоступны.'};
 if(destination==='us')return {kind:visaWaiverUS.includes(passport)?'eta':'visa',name:visaWaiverUS.includes(passport)?'ESTA / программа безвизового въезда':'Гостевая виза B-1/B-2',fee:visaWaiverUS.includes(passport)?40:185,days:visaWaiverUS.includes(passport)?90:180,work:false,note:'Гостевой въезд не разрешает работать. ESTA зависит от паспорта и истории поездок; в игре личные исключения не моделируются.'};
 if(destination==='ca')return {kind:visaWaiverUS.includes(passport)||passport==='us'?'eta':'visa',name:'eTA или гостевая виза',fee:visaWaiverUS.includes(passport)?7:100,days:180,work:false,note:'Разрешение на въезд и разрешение на работу — разные документы.'};
 if(destination==='gb')return {kind:visaWaiverUS.includes(passport)||passport==='us'?'eta':'visa',name:'ETA или Standard Visitor',fee:visaWaiverUS.includes(passport)||passport==='us'?22:130,days:180,work:false,note:'Великобритания не входит в свободное передвижение ЕС. Для работы нужно отдельное основание.'};
 if(destination==='au'||destination==='nz')return {kind:visaWaiverUS.includes(passport)||passport==='us'?'eta':'visa',name:destination==='au'?'ETA / гостевая виза':'NZeTA / гостевая виза',fee:destination==='au'?140:65,days:90,work:false,note:'Туристический въезд не даёт права на обычную оплачиваемую работу.'};
 if(countryGroups.schengen.includes(destination)){const waived=visaWaiverUS.includes(passport)||'us ca br ar cl co cr mx pa py pe uy ge ua md al ba me mk rs ae'.split(' ').includes(passport);return {kind:waived?'waiver':'visa',name:waived?'Короткая безвизовая поездка':'Шенгенская виза C',fee:waived?0:100,days:90,work:false,note:'До 90 дней в любые 180 дней во всей Шенгенской зоне; без права на работу. Учитываются все поездки в зону за игровой год.'};}
 if('ar bo br cl co cr ec mx pa pe uy'.split(' ').includes(destination)&&'ru us ca gb ar br cl co mx pe uy'.split(' ').includes(passport))return {kind:'waiver',name:'Короткая безвизовая поездка',fee:0,days:90,work:false,note:'Безвизовый визит не означает право жить и работать постоянно.'};
 if('tr ge am kz kg uz tj'.split(' ').includes(destination)&&'ru by am kz kg ua'.split(' ').includes(passport))return {kind:'waiver',name:'Короткая безвизовая поездка',fee:0,days:90,work:false,note:'Для длительного пребывания нужны регистрация и законное основание. Специальные трудовые соглашения упрощены.'};
 if(destination==='jp'||destination==='kr'){const waived=visaWaiverUS.includes(passport)||passport==='us'||passport==='ca';return {kind:waived?'eta':'visa',name:destination==='kr'?'K-ETA / гостевая виза':'Краткосрочный въезд / гостевая виза',fee:waived?15:45,days:90,work:false,note:'Работа требует отдельного статуса; приглашение работодателя и квалификация проверяются отдельно.'};}
 return {kind:'visa',name:'Гостевая виза / электронное разрешение',fee:Math.round(65*economyFor(destination).cost),days:30,work:false,note:'Для остальных направлений действует обобщённая игровая процедура с проверкой паспорта, средств, страховки и цели поездки.'};
}
function residenceRule(destination,route){const expensive=['us','ca','gb','au','nz'].includes(destination),gulf=countryGroups.gulf.includes(destination);const names={work:expensive?'Рабочая виза с приглашением работодателя':gulf?'ВНЖ и разрешение на работу от спонсора':'Национальная рабочая виза / ВНЖ',study:'Студенческая виза / ВНЖ',family:'Воссоединение семьи',investor:'Предпринимательский / инвестиционный ВНЖ',free:'Регистрация проживания'};
 return {name:names[route]||names.work,fee:route==='free'?40:Math.round((expensive?900:gulf?550:280)*economyFor(destination).cost),funds:Math.round((route==='investor'?(destination==='us'?800000:expensive?150000:80000):route==='study'?13000:route==='family'?10000:6000)*economyFor(destination).cost),years:route==='study'?4:route==='free'?10:3,sponsorBound:route==='work'&&(gulf||destination==='us'),note:route==='work'?'Нужны приглашение, подходящая квалификация и язык. Сложность отбора, признание регулируемого диплома и вероятность отказа учитываются.':route==='study'?'Нужны зачисление, оплата обучения и средства на проживание. Основная работа недоступна; подработка ограничена 20 ч/нед.':route==='family'?'В этой модели основание — брак с гражданином страны. Незарегистрированная пара сама по себе не даёт разрешение.':route==='investor'?'Нужны подтверждённые средства и бизнес-план. Это временное разрешение, а не покупка гражданства. Реальные программы различаются по стране.':'После въезда нужно зарегистрировать адрес и иметь средства на проживание.'};
}
function workAccess(s,sector='service',companyId=null,side=false){const m=s.mobility;if(!m)return null;const permit=m.permits.find(p=>p.country===s.country&&p.purpose!=='visit'&&p.expires>s.age),citizen=m.citizenship===s.country||m.citizenships?.includes(s.country),free=freeMovement(m.citizenship,s.country);
 if(!citizen&&!free&&!permit)return 'Для работы нужно действующее разрешение на проживание и работу.';
 if(permit?.purpose==='study'&&!side)return 'Студенческий статус разрешает только подработку до 20 ч/нед, основная работа недоступна.';
 if(permit?.sponsorBound&&companyId&&permit.companyId!==companyId)return 'Разрешение привязано к работодателю. Сначала нужно новое приглашение и разрешение.';
 const required=['medicine','education'].includes(sector)?75:sector==='it'||sector==='technical'?60:50;
 if(languageLevel(s,s.country)<required)return `Местный язык: нужно ${required}/100 (${languageNames[localLanguage(s.country)]}).`;
 if(!citizen&&['medicine','education'].includes(sector)&&!m.recognitions.some(r=>r.country===s.country&&r.field===sector))return 'Для этой профессии нужно признание диплома в стране проживания.';
 return null;
}
function selfEmploymentAccess(s){const m=s.mobility;if(!m||m.citizenship===s.country||m.citizenships?.includes(s.country)||freeMovement(m.citizenship,s.country))return null;const p=m.permits.find(p=>p.country===s.country&&p.expires>s.age&&['investor','family','permanent'].includes(p.purpose));return p?null:'Текущий статус не разрешает самостоятельный бизнес. Нужен предпринимательский или семейный ВНЖ.';}


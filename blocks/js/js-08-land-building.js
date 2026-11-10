// Static city parcels share the same game geography as the housing catalogue.
const landDistricts={outskirts:{name:'Окраина',rate:25,x:20,y:72},suburbs:{name:'Пригород',rate:40,x:18,y:26},residential:{name:'Жилой район',rate:90,x:41,y:65},business:{name:'Деловой район',rate:150,x:73,y:29},center:{name:'Центр',rate:230,x:61,y:48}};
const landZones={residential:'Жилое строительство',mixed:'Жильё и тихий бизнес',commercial:'Коммерческая земля'};
const landPlots=Object.entries(landDistricts).flatMap(([district,d])=>Object.keys(landZones).map((zone,i)=>({id:district+'-'+zone,district,zone,area:[500,700,1000][i],price:d.rate*[500,700,1000][i],title:['Участок для дома','Участок смешанного назначения','Участок для предприятия'][i],address:`${{outskirts:'Сосновая дорога',suburbs:'Садовая улица',residential:'Кленовая улица',business:'Проектный проезд',center:'Театральная улица'}[district]}, участок ${i+1}`,x:d.x+i*2,y:d.y-i*3})));
const landById=new Map(landPlots.map(p=>[p.id,p]));
const buildingPlans={
 compact:{name:'Одноэтажный дом',kind:'home',area:70,rooms:2,cost:52000,comfort:76,upkeep:1600,detail:'Две комнаты · кухня-гостиная · небольшая терраса'},
 family:{name:'Семейный дом',kind:'home',area:115,rooms:4,cost:85000,comfort:89,upkeep:2700,detail:'Четыре комнаты · два санузла · крытая веранда'},
 villa:{name:'Дом с большой террасой',kind:'home',area:200,rooms:6,cost:165000,comfort:97,upkeep:5500,detail:'Два этажа · кабинет · гардеробная · просторная терраса'},
 pavilion:{name:'Коммерческий павильон',kind:'business',area:80,cost:45000,upkeep:1350,types:['coffee','clothing','beauty','delivery','studio','fitness'],detail:'Зал · подсобное помещение · санузел'},
 workshop:{name:'Мастерская со складом',kind:'business',area:160,cost:85000,upkeep:2550,types:['garage','delivery','studio'],detail:'Два рабочих бокса · склад · административная комната'},
 venue:{name:'Коммерческое здание',kind:'business',area:300,cost:165000,upkeep:4950,types:['coffee','clothing','beauty','fitness','hotel','nightclub','delivery','studio'],detail:'Большой зал · служебные комнаты · отдельный вход'},
 farmstead:{name:'Фермерский комплекс',kind:'business',area:200,cost:55000,upkeep:2200,types:['farm'],detail:'Теплица · хозяйственные постройки · площадка для техники'}
};
const buildPhases=[{name:'Проект и разрешения',share:.1},{name:'Фундамент и коробка',share:.45},{name:'Крыша и коммуникации',share:.25},{name:'Отделка и ввод в эксплуатацию',share:.2}];
function planAllowed(plot,planId){const p=buildingPlans[planId];return !!p&&p.area<=plot.area*.6&&(p.kind==='home'?plot.zone!=='commercial':plot.zone!=='residential'&&(planId!=='workshop'||plot.zone==='commercial')&&(planId!=='venue'||plot.zone==='commercial')&&(planId!=='farmstead'||plot.zone==='commercial'&&['outskirts','suburbs'].includes(plot.district)));}
function builtHomeId(plotId,planId){return 'built-'+plotId+'-'+planId;}
const buildableHomes=landPlots.flatMap(plot=>Object.entries(buildingPlans).filter(([id,p])=>p.kind==='home'&&planAllowed(plot,id)).map(([id,p])=>({id:builtHomeId(plot.id,id),title:p.name+' · '+landDistricts[plot.district].name,kind:id==='villa'?'villa':'house',district:plot.district,rooms:p.rooms,area:p.area,price:Math.round(plot.price+p.cost*1.18),rent:Math.round((plot.price+p.cost*1.18)*.005),upkeep:p.upkeep,comfort:p.comfort,floor:id==='villa'?'2 этажа':'1 этаж',detail:p.detail,constructed:true,plotId:plot.id,planId:id})));
function landTraffic(plot,type){const generic={outskirts:.73,suburbs:.84,residential:1.04,business:1.19,center:1.32};if(type==='farm')return plot.district==='outskirts'?1.13:1.05;if(['garage','delivery'].includes(type))return {outskirts:1.15,suburbs:1.08,residential:.96,business:1.04,center:.83}[plot.district];if(type==='studio')return 1;return generic[plot.district];}


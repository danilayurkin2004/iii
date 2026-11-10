
// 193 UN member states + the two UN observer states (Holy See and Palestine).
// ISO codes are stable identifiers; the game's economy is not real-world statistics.
const codes=`af al dz ad ao ag ar am au at az bs bh bd bb by be bz bj bt bo ba bw br bn bg bf bi cv kh cm ca cf td cl cn co km cg cd cr ci hr cu cy cz dk dj dm do ec eg sv gq er ee sz et fj fi fr ga gm ge de gh gr gd gt gn gw gy ht hn hu is in id ir iq ie il it jm jp jo kz ke ki kp kr kw kg la lv lb ls lr ly li lt lu mg mw my mv ml mt mh mr mu mx fm md mc mn me ma mz mm na nr np nl nz ni ne ng mk no om pk pw pa pg py pe ph pl pt qa ro ru rw kn lc vc ws sm st sa sn rs sc sl sg sk si sb so za ss es lk sd sr se ch sy tj tz th tl tg to tt tn tr tm tv ug ua ae gb us uy uz vu va ve vn ye zm zw ps`.split(' ');
if(codes.length!==195||new Set(codes).size!==195)throw Error('Country catalogue must contain 195 unique states');
const names=new Intl.DisplayNames(['ru'],{type:'region'});
const worldCountries=Object.fromEntries(codes.map(code=>[code,{name:names.of(code.toUpperCase()),city:'',currency:'$',income:1,cost:1,tuition:6000,healthCost:1000,description:'Место рождения. Стоимость жизни и события — условная игровая модель.'}]));

const economyRegions={
 northAmerica:{name:'Северная Америка',income:1.3,cost:1.2,codes:'us ca mx ag bs bb bz cr cu dm do sv gd gt ht hn jm ni pa kn lc vc tt'},
 southAmerica:{name:'Южная Америка',income:.75,cost:.72,codes:'ar bo br cl co ec gy py pe sr uy ve'},
 westEurope:{name:'Западная Европа',income:2,cost:1.7,codes:'ad at be cy dk fi fr de gr is ie it li lu mt mc nl no pt sm es se ch gb va'},
 eastEurope:{name:'Восточная Европа',income:.95,cost:.85,codes:'al by ba bg hr cz ee hu lv lt md me mk pl ro ru rs sk si ua'},
 africa:{name:'Африка',income:.42,cost:.5,codes:'dz ao bj bw bf bi cv cm cf td km cg cd ci dj eg gq er sz et ga gm gh gn gw ke ls lr mg mw ml mr mu ma mz na ne ng rw st sn sc sl so za ss sd tz tg tn ug zm zw'},
 centralAsia:{name:'Средняя Азия',income:.62,cost:.6,codes:'kz kg tj tm uz'},
 eastAsia:{name:'Восточная и Юго-Восточная Азия',income:1,cost:.95,codes:'bn kh cn id jp kp kr la my mn mm ph sg th tl vn'},
 oceania:{name:'Океания',income:1.05,cost:1.05,codes:'au nz fj ki mh fm nr pw pg ws sb to tv vu'},
 southWestAsia:{name:'Южная и Западная Азия',income:.7,cost:.7,codes:'af am az bh bd bt ge in ir iq il jo kw lb mv np om pk ps qa sa lk sy tr ae ye'}
};
const regionByCountry=Object.fromEntries(Object.entries(economyRegions).flatMap(([key,r])=>r.codes.split(' ').map(c=>[c,key])));
const nationIndices={us:[2.2,2,82],ru:[1,1,61],co:[.8,.75,53],ca:[2.18,1.85,85],de:[2.24,1.82,87],fr:[2.08,1.78,85],gb:[2.16,1.93,84],au:[2.3,1.95,88],nz:[1.95,1.82,86],no:[2.85,2.36,94],ch:[3.1,2.6,96],se:[2.25,1.95,91],dk:[2.4,2.1,92],fi:[2.1,1.9,90],nl:[2.28,1.93,90],jp:[1.9,1.6,87],kr:[1.86,1.53,85],cn:[1.12,.92,69],sg:[2.65,2.2,91],in:[.47,.49,43],pk:[.36,.43,36],bd:[.33,.4,34],br:[.83,.8,55],mx:[.92,.82,57],cl:[1.03,.91,65],ar:[.79,.74,57],za:[.67,.65,48],ng:[.34,.48,30],ke:[.4,.49,35],eg:[.42,.49,39],et:[.24,.37,24],so:[.18,.39,15],ss:[.17,.4,14],kz:[.73,.67,57],kg:[.4,.46,37],uz:[.45,.48,41],tj:[.31,.41,30],tm:[.5,.52,44],ua:[.51,.58,45],pl:[1.22,1.09,72],cz:[1.43,1.21,77],es:[1.43,1.26,78],pt:[1.14,1.14,75],it:[1.53,1.36,79],il:[2.01,1.92,82],ae:[1.95,1.68,81],qa:[2.25,1.78,83],sa:[1.55,1.24,71],kw:[1.79,1.46,77],tr:[.78,.73,57],af:[.2,.35,18],sy:[.21,.42,19],ye:[.19,.39,16],kp:[.24,.42,22]};
const countryRanks=Object.fromEntries(Object.keys(worldCountries).sort().map((c,i)=>[c,i+1]));
function economyRegion(country){return regionByCountry[country]||'southWestAsia';}
function regionalEconomy(country){if(!Object.hasOwn(worldCountries,country))return {income:1,cost:1,standard:56,region:'southWestAsia',regionName:economyRegions.southWestAsia.name};const region=economyRegion(country),base=economyRegions[region],rank=countryRanks[country]||1,variation=.77+((rank*37)%47)/100,specific=nationIndices[country],income=specific?.[0]??base.income*variation,cost=specific?.[1]??base.cost*(.84+((rank*19)%31)/100),exact=['ru','us','co'].includes(country);return {income:exact?income:Number((income+rank/100000).toFixed(5)),cost:exact?cost:Number((cost+rank/120000).toFixed(5)),standard:specific?.[2]??Math.max(12,Math.min(94,Math.round(25+income*25+rank%8))),region,regionName:base.name};}


const clothingProducts=[
{id:'tee',name:'Базовая футболка',slot:'clothes',value:'tshirt',price:15,description:'Повседневная одежда'},
{id:'hoodie',name:'Мягкое худи',slot:'clothes',value:'hoodie',price:45,description:'Для прогулок и отдыха'},
{id:'shirt',name:'Классическая рубашка',slot:'clothes',value:'shirt',price:40,description:'На работу и встречи'},
{id:'sweater',name:'Тёплый свитер',slot:'clothes',value:'sweater',price:60,description:'Для прохладных дней'},
{id:'jacket',name:'Городская куртка',slot:'clothes',value:'jacket',price:120,description:'Практичная верхняя одежда'},
{id:'suit',name:'Деловой костюм',slot:'clothes',value:'suit',price:300,description:'Для официальных встреч'},
{id:'dress',name:'Платье для особого случая',slot:'clothes',value:'dress',price:160,description:'Для праздников и вечеринок'},
{id:'sportswear',name:'Спортивная форма',slot:'clothes',value:'sport',price:45,description:'Для активного отдыха'},
{id:'uniform',name:'Школьная форма',slot:'clothes',value:'uniform',price:40,description:'Аккуратный школьный комплект'},
{id:'scrubs',name:'Медицинский костюм',slot:'clothes',value:'scrubs',price:65,description:'Практичная рабочая одежда'},
{id:'glasses-round',name:'Круглые очки',slot:'glasses',value:'round',price:80,description:'Оправа для образа'},
{id:'glasses-square',name:'Прямоугольные очки',slot:'glasses',value:'square',price:85,description:'Лаконичная оправа'},
{id:'sunglasses',name:'Солнцезащитные очки',slot:'glasses',value:'sun',price:50,description:'Аксессуар для прогулок'},
{id:'cap',name:'Кепка',slot:'hat',value:'cap',price:20,description:'Повседневный головной убор'},
{id:'beanie',name:'Вязаная шапка',slot:'hat',value:'beanie',price:25,description:'Для холодной погоды'},
{id:'beret',name:'Берет',slot:'hat',value:'beret',price:35,description:'Небольшой акцент в образе'},
{id:'headband',name:'Повязка на голову',slot:'hat',value:'headband',price:12,description:'Для спортивного или повседневного образа'},
{id:'studs',name:'Серьги-гвоздики',slot:'earrings',value:'stud',price:30,description:'Небольшие украшения'},
{id:'hoops',name:'Серьги-кольца',slot:'earrings',value:'hoop',price:50,description:'Выразительный аксессуар'},
{id:'chain',name:'Цепочка',slot:'necklace',value:'chain',price:120,description:'Украшение на каждый день'},
{id:'pendant',name:'Подвеска',slot:'necklace',value:'pendant',price:180,description:'Для особого образа'},
{id:'polo',name:'Поло с мягким воротником',slot:'clothes',value:'polo',price:35,description:'Аккуратный повседневный фасон'},
{id:'striped-tee',name:'Полосатая футболка',slot:'clothes',value:'striped',price:25,description:'Контрастные полосы и круглый вырез'},
{id:'longsleeve',name:'Хлопковый лонгслив',slot:'clothes',value:'longsleeve',price:30,description:'Длинные рукава для прохладного вечера'},
{id:'denim-jacket',name:'Джинсовая куртка',slot:'clothes',value:'denim',price:90,description:'Отложной воротник, карманы и контрастная строчка'},
{id:'bomber',name:'Городской бомбер',slot:'clothes',value:'bomber',price:110,description:'Короткая куртка с молнией и трикотажным воротником'},
{id:'leather-jacket',name:'Кожаная куртка',slot:'clothes',value:'leather',price:280,description:'Косая молния, лацканы и выразительные детали'},
{id:'trench',name:'Классический тренч',slot:'clothes',value:'trench',price:180,description:'Лёгкое пальто с широкими лацканами и поясом'},
{id:'coat',name:'Шерстяное пальто',slot:'clothes',value:'coat',price:250,description:'Строгий силуэт для холодного сезона'},
{id:'puffer',name:'Стёганый пуховик',slot:'clothes',value:'puffer',price:160,description:'Объёмный воротник и тёплые стёганые секции'},
{id:'cardigan',name:'Вязаный кардиган',slot:'clothes',value:'cardigan',price:70,description:'Мягкий трикотаж поверх базового топа'},
{id:'turtleneck',name:'Однотонная водолазка',slot:'clothes',value:'turtleneck',price:45,description:'Высокий воротник и лаконичный силуэт'},
{id:'blouse',name:'Блуза с воротником',slot:'clothes',value:'blouse',price:65,description:'Небольшой воротник и лёгкие складки'},
{id:'sundress',name:'Летний сарафан',slot:'clothes',value:'sundress',price:55,description:'Открытые плечи и контрастные бретели'},
{id:'evening-dress',name:'Вечернее платье',slot:'clothes',value:'eveningdress',price:320,description:'Глубокий вырез и деликатные декоративные акценты'},
{id:'tracksuit',name:'Спортивный костюм',slot:'clothes',value:'tracksuit',price:85,description:'Молния и двойные полосы на рукавах'},
{id:'basketball-jersey',name:'Баскетбольная майка',slot:'clothes',value:'jersey',price:40,description:'Командный номер и контрастная окантовка'},
{id:'tailored-vest',name:'Костюм с жилетом',slot:'clothes',value:'vest',price:190,description:'Жилет поверх рубашки для собранного образа'},
{id:'plaid-overshirt',name:'Рубашка в клетку',slot:'clothes',value:'overshirt',price:50,description:'Свободная посадка и крупная клетка'},
{id:'home-robe',name:'Мягкий домашний халат',slot:'clothes',value:'robe',price:45,description:'Широкий воротник и пояс для спокойного вечера'},
{id:'kimono',name:'Кимоно с контрастной отделкой',slot:'clothes',value:'kimono',price:130,description:'Запах и широкий пояс'},
{id:'aviator-glasses',name:'Очки-авиаторы',slot:'glasses',value:'aviator',price:110,description:'Тонкая металлическая оправа и затемнённые линзы'},
{id:'cat-eye-glasses',name:'Очки «Кошачий глаз»',slot:'glasses',value:'catEye',price:95,description:'Приподнятые уголки выразительной оправы'},
{id:'bucket-hat',name:'Хлопковая панама',slot:'hat',value:'bucket',price:28,description:'Мягкие поля и простроченный край'},
{id:'sun-visor',name:'Спортивный козырёк',slot:'hat',value:'visor',price:18,description:'Защищает от солнца и оставляет причёску открытой'},
{id:'fedora',name:'Фетровая шляпа',slot:'hat',value:'fedora',price:75,description:'Лента и аккуратные поля'},
{id:'straw-hat',name:'Соломенная шляпа',slot:'hat',value:'straw',price:35,description:'Широкие поля для солнечного дня'},
{id:'headscarf',name:'Платок для волос',slot:'hat',value:'headscarf',price:25,description:'Мягко обрамляет голову и завязывается сбоку'},
{id:'drop-earrings',name:'Серьги-подвески',slot:'earrings',value:'drop',price:80,description:'Небольшие подвески с геометрической формой'},
{id:'ear-cuffs',name:'Минималистичные каффы',slot:'earrings',value:'cuff',price:45,description:'Акцент на верхней части уха'},
{id:'pearl-necklace',name:'Жемчужная нить',slot:'necklace',value:'pearls',price:160,description:'Классическое украшение у основания шеи'},
{id:'choker',name:'Тонкий чокер',slot:'necklace',value:'choker',price:35,description:'Лаконичное украшение, плотно прилегающее к шее'},
{id:'layered-necklace',name:'Многослойное колье',slot:'necklace',value:'layered',price:95,description:'Две тонкие цепочки разной длины'}
];
clothingProducts.push(...[['rugby','Рубашка для регби',65],['henley','Хенли',45],['varsity','Университетская куртка',140],['doubleSuit','Двубортный костюм',360],['wrapdress','Платье с запахом',110],['sailor','Блуза с морским воротником',75],['knitdress','Вязаное платье',95],['tailored','Приталенный жакет',180]].map(([value,name,price])=>({id:value,name,slot:'clothes',value,price,description:'Новый фасон для повседневного и особого образа'})));
const clothingCategories={all:'Все вещи',casual:'На каждый день',formal:'Деловая одежда и форма',outerwear:'Верхняя одежда',sport:'Спортивная',home:'Для дома',accessories:'Аксессуары',owned:'Мой гардероб'};
function clothingCategory(p){if(p.slot!=='clothes')return 'accessories';if(['jacket','denim','bomber','leather','trench','coat','puffer','varsity'].includes(p.value))return 'outerwear';if(['suit','shirt','dress','uniform','scrubs','blouse','eveningdress','vest','doubleSuit','tailored'].includes(p.value))return 'formal';if(['sport','tracksuit','jersey'].includes(p.value))return 'sport';if(['robe','kimono'].includes(p.value))return 'home';return 'casual';}
const electronicProducts=[
{id:'phone-basic',name:'Простой смартфон',category:'phone',price:120,effect:'social',description:'Связь, мессенджеры и повседневные задачи'},
{id:'phone-mid',name:'Смартфон среднего класса',category:'phone',price:450,effect:'social',description:'Хорошая камера и быстрые приложения'},
{id:'phone-flagship',name:'Флагманский смартфон',category:'phone',price:1100,effect:'social',description:'Мощная камера и большой экран'},
{id:'laptop-study',name:'Ноутбук для учёбы',category:'computer',price:650,effect:'study',description:'Документы, занятия и первые проекты'},
{id:'desktop-office',name:'Домашний компьютер',category:'computer',price:550,effect:'study',description:'Учёба и небольшие IT-заказы'},
{id:'laptop-pro',name:'Ноутбук для разработки',category:'computer',price:1400,effect:'study',description:'Работа над программами и собственными проектами'},
{id:'gaming-pc',name:'Игровой компьютер',category:'computer',price:1800,effect:'play',description:'Игры, общение и разработка'},
{id:'tablet',name:'Планшет',category:'creative',price:350,effect:'creative',description:'Рисование, заметки и чтение'},
{id:'camera',name:'Цифровая камера',category:'creative',price:650,effect:'creative',description:'Фотопрогулки и портфолио'},
{id:'reader',name:'Электронная книга',category:'leisure',price:120,effect:'study',description:'Книги и самостоятельное обучение'},
{id:'headphones',name:'Беспроводные наушники',category:'leisure',price:80,effect:'rest',description:'Музыка и спокойный отдых'},
{id:'console',name:'Игровая приставка',category:'leisure',price:500,effect:'play',description:'Игры в свободное время'},
{id:'television',name:'Домашний телевизор',category:'home',price:650,effect:'rest',description:'Фильмы и вечера дома'}
];
const shopCap=n=>Math.max(0,Math.min(100,Math.round(n)));
function initShopping(s){if(!s.shopping){const wardrobe=new Set(['tee','hoodie']);for(const item of clothingProducts)if(s.appearance?.[item.slot]===item.value)wardrobe.add(item.id);s.shopping={wardrobe:[...wardrobe],electronics:[],activeComputer:null};}return s.shopping;}
function canWear(s,key,value){if(!s.shopping)return true;const item=clothingProducts.find(p=>p.slot===key&&p.value===value);return !item||s.shopping.wardrobe.includes(item.id);}
function computerReady(s){const inventory=s.shopping;return !!inventory?.electronics.some(r=>r.id===inventory.activeComputer&&r.condition>=30&&electronicProducts.find(p=>p.id===r.id)?.category==='computer');}
function shoppingAction(s,id,value){initShopping(s);if(!s.alive)return 'Жизнь завершена.';if(s.event||s.prison)return 'Сначала заверши текущее событие.';const cost=['wear','computer'].includes(id)?0:id==='useElectronics'?.5:.25;if(s.energy<cost)return 'На этот год недостаточно ресурса.';let text='';
if(id==='buyClothing'||id==='wear'){const item=clothingProducts.find(p=>p.id===value);if(!item)return 'Одежда не найдена.';if(!styleAllowed(s.gender,item.slot,item.value))return 'Эта вещь находится в другом разделе стиля.';const owned=s.shopping.wardrobe.includes(item.id);if(id==='buyClothing'){if(owned)return 'Эта вещь уже есть в гардеробе.';if(s.money<item.price)return `Нужно ${item.price} $.`;s.money-=item.price;s.shopping.wardrobe.push(item.id);text=`Покупка одежды: ${item.name}, ${item.price} $. Вещь добавлена в гардероб.`;}else{if(!owned)return 'Сначала купи эту вещь.';text=`Новый образ: ${item.name}.`;}s.appearance[item.slot]=item.value;
}else if(['buyElectronics','useElectronics','repairElectronics','sellElectronics','computer'].includes(id)){const item=electronicProducts.find(p=>p.id===value),record=s.shopping.electronics.find(r=>r.id===value);if(!item)return 'Техника не найдена.';
 if(id==='buyElectronics'){if(record)return 'Такое устройство уже есть.';if(s.money<item.price)return `Нужно ${item.price} $.`;s.money-=item.price;s.shopping.electronics.push({id:item.id,condition:100,years:0,useYear:-1,repairYear:-1});if(item.category==='computer')s.shopping.activeComputer=item.id;text=`Покупка электроники: ${item.name}, ${item.price} $.${item.category==='computer'?' Домашний компьютер поможет учёбе и IT-проектам.':''}`;}
 else{if(!record)return 'У тебя нет этого устройства.';
 if(id==='sellElectronics'){const price=Math.round(item.price*.7*Math.max(.15,.83**record.years)*record.condition/100);s.money+=price;s.shopping.electronics=s.shopping.electronics.filter(r=>r.id!==item.id);if(s.shopping.activeComputer===item.id)s.shopping.activeComputer=null;text=`Продано устройство: ${item.name}, ${price} $.`;}
 else if(id==='repairElectronics'){if(record.condition>=95)return 'Устройство пока не нуждается в ремонте.';if(record.repairYear===s.age)return 'Это устройство уже ремонтировали в этом году.';const fee=Math.max(15,Math.round(item.price*.12));if(s.money<fee)return `Нужно ${fee} $.`;s.money-=fee;record.condition=Math.min(100,record.condition+45);record.repairYear=s.age;text=`Ремонт устройства: ${item.name}, ${fee} $. Состояние ${record.condition}/100.`;}
 else if(record.condition<30)return 'Сначала отремонтируй устройство.';
 else if(id==='computer'){if(item.category!=='computer')return 'Выбери домашний компьютер или ноутбук.';s.shopping.activeComputer=item.id;text=`Для домашних проектов выбран ${item.name}.`;}
 else{if(s.age<5)return 'Самостоятельные занятия с техникой доступны с 5 лет.';if(record.useYear===s.age)return 'В этом году ты уже выделил время занятиям с этим устройством.';record.useYear=s.age;record.condition=Math.max(0,record.condition-1);if(item.effect==='study'){s.iq=shopCap(s.iq+2);s.academics=shopCap(s.academics+4);}if(item.effect==='creative'){s.creativity=shopCap(s.creativity+4);s.portfolio=shopCap(s.portfolio+3);}if(item.effect==='social')s.personality.sociability=shopCap(s.personality.sociability+2);s.happy=shopCap(s.happy+(item.effect==='play'||item.effect==='rest'?6:3));s.stress=shopCap(s.stress-5);text=`Время с устройством «${item.name}»: ${item.effect==='study'?'самостоятельная учёба улучшила знания':item.effect==='creative'?'творческий проект пополнил портфолио':item.effect==='social'?'общение добавило уверенности':'отдых помог восстановиться'}.`;}
 }
}else return 'Неизвестное действие в покупках.';s.energy-=cost;s.log.push({age:s.age,text,kind:'life'});return null;}
function shoppingYear(s){initShopping(s);if(computerReady(s)&&(s.uni||s.college||s.clubs?.includes('computer')||s.side?.id==='web')){s.skills.it=shopCap(s.skills.it+2);s.academics=shopCap(s.academics+2);s.log.push({age:s.age,text:'Домашний компьютер помог учебным занятиям и IT-проектам: навык +2, учёба +2.',kind:'normal'});}for(const r of s.shopping.electronics){r.years++;r.condition=Math.max(0,r.condition-(r.id===s.shopping.activeComputer?7:5));}}


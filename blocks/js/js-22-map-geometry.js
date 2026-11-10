// Connected schematic street network. Water geometry is shared by SVG and tests.
const riverCurves=[[[930,-30],[900,20],[815,40],[780,130]],[[780,130],[745,195],[840,235],[805,325]],[[805,325],[780,410],[665,425],[655,520]],[[655,520],[640,590],[700,665],[745,715]]];
const lakeCurves=[[[78,430],[100,395],[120,425],[145,410]],[[145,410],[184,388],[210,427],[180,456]],[[180,456],[166,474],[182,508],[144,520]],[[144,520],[119,535],[95,520],[82,520]],[[82,520],[61,522],[72,500],[49,488]],[[49,488],[27,477],[53,449],[61,452]],[[61,452],[72,455],[65,442],[78,430]]];
const point=(x,y)=>({x,y});
function curvePoint(c,t){const a=(1-t)**3,b=3*(1-t)**2*t,d=3*(1-t)*t*t,e=t**3;return point(a*c[0][0]+b*c[1][0]+d*c[2][0]+e*c[3][0],a*c[0][1]+b*c[1][1]+d*c[2][1]+e*c[3][1]);}
const sampleCurves=curves=>curves.flatMap(c=>Array.from({length:81},(_,i)=>curvePoint(c,i/80)));
const riverSamples=sampleCurves(riverCurves),lakeSamples=sampleCurves(lakeCurves);
function curvesPath(curves,closed=false){return 'M'+curves[0][0].join(' ')+curves.map(c=>'C'+c.slice(1).map(p=>p.join(' ')).join(' ')).join('')+(closed?'Z':'');}
const riverPath=curvesPath(riverCurves),lakePath=curvesPath(lakeCurves,true);
function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=dx||dy?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy))):0;return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
function inPolygon(p,vertices){let inside=false;for(let i=0,j=vertices.length-1;i<vertices.length;j=i++){const a=vertices[i],b=vertices[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;}return inside;}
function mapWaterAt(p,padding=0){for(let i=1;i<riverSamples.length;i++)if(segmentDistance(p,riverSamples[i-1],riverSamples[i])<=38.5+padding)return true;if(inPolygon(p,lakeSamples))return true;for(let i=0;i<lakeSamples.length;i++)if(segmentDistance(p,lakeSamples[i],lakeSamples[(i+1)%lakeSamples.length])<=1+padding)return true;return false;}
function landSegment(a,b,padding=6){const steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/3));for(let i=0;i<=steps;i++)if(mapWaterAt(point(a.x+(b.x-a.x)*i/steps,a.y+(b.y-a.y)*i/steps),padding))return false;return true;}
const nodeById=new Map(),edges=[];
const node=(x,y)=>{const id=x+':'+y;if(!nodeById.has(id))nodeById.set(id,{id,x,y});return nodeById.get(id);};
function road(x1,y1,x2,y2,bridge=false){const a=point(x1,y1),b=point(x2,y2);if(!bridge&&!landSegment(a,b))return;if(bridge&&(mapWaterAt(a,8)||mapWaterAt(b,8)))throw Error('Bridge must start and end on land');edges.push({id:'road-'+edges.length,a:node(x1,y1),b:node(x2,y2),bridge,length:Math.hypot(x2-x1,y2-y1)});}
const roadColumns=[30,230,330,430,520,610,890,970],roadRows=[50,130,210,280,350,420,560,630];
for(const x of roadColumns)for(let i=1;i<roadRows.length;i++)road(x,roadRows[i-1],x,roadRows[i]);
for(const y of roadRows){for(let i=1;i<6;i++)road(roadColumns[i-1],y,roadColumns[i],y);road(890,y,970,y);}
road(610,350,730,350);road(730,350,860,350,true);road(860,350,890,350);
road(520,560,590,560);road(590,560,710,560,true);road(710,560,890,560);
road(-20,350,30,350);road(430,-20,430,50);road(430,630,430,720);road(970,50,1020,50);road(970,630,1020,630);
const mapRoads=edges,mapNodes=[...nodeById.values()];
const adjacency=new Map(mapNodes.map(n=>[n.id,[]]));for(const e of mapRoads){adjacency.get(e.a.id).push({node:e.b,weight:e.length});adjacency.get(e.b.id).push({node:e.a,weight:e.length});}
function closestNode(p){const distance=n=>(n.x-p.x)**2+(n.y-p.y)**2;const nearest=mapNodes.filter(n=>n.x>=30&&n.x<=970&&n.y>=50&&n.y<=630).sort((a,b)=>distance(a)-distance(b));return nearest.find(n=>landSegment(p,n,0))||mapNodes.reduce((a,b)=>distance(a)<distance(b)?a:b);}
function mapLandPoint(p){if(!mapWaterAt(p,12))return p;const nearest=mapNodes.filter(n=>n.x>20&&n.x<980&&n.y>20&&n.y<680).reduce((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)<Math.hypot(b.x-p.x,b.y-p.y)?a:b);return point(nearest.x,nearest.y);}
const mapRouteCache=new Map();
function mapRoute(from,to){const key=[from.x,from.y,to.x,to.y].join(':');if(mapRouteCache.has(key))return mapRouteCache.get(key);from=mapLandPoint(from);to=mapLandPoint(to);const start=closestNode(from),end=closestNode(to),dist=new Map([[start.id,0]]),prev=new Map(),todo=new Set(mapNodes.map(n=>n.id));while(todo.size){let current=null;for(const id of todo)if(dist.has(id)&&(current===null||dist.get(id)<dist.get(current)))current=id;if(current===null)break;todo.delete(current);if(current===end.id)break;for(const edge of adjacency.get(current)){const value=dist.get(current)+edge.weight;if(value<(dist.get(edge.node.id)??Infinity)){dist.set(edge.node.id,value);prev.set(edge.node.id,current);}}}if(!dist.has(end.id))return [];const result=[end];let id=end.id;while(id!==start.id){id=prev.get(id);if(!id)return [];result.unshift(nodeById.get(id));}mapRouteCache.set(key,result);if(mapRouteCache.size>64)mapRouteCache.delete(mapRouteCache.keys().next().value);return result;}


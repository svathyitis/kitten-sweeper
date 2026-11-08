(function(){
const LEVELS={chill:{c:8,r:8,m:8},normal:{c:9,r:12,m:18},chaos:{c:10,r:14,m:32}};
const $=id=>document.getElementById(id);
const boardEl=$('board'),leftEl=$('left'),timeEl=$('time'),faceEl=$('face'),msgEl=$('msg'),modeEl=$('mode'),bestEl=$('best');
let level='chill',g,timer,flagMode=false;
const WIN=["all cats left alone. you're literally him.","zero cats woken. slay.","purrfect. no notes."];
const LOSE=["you woke the grumpy cat. it's giving chaos.","oof. cat said no. try again.","bestie... that was a cat."];
const FUR=['#ffc48a','#d9d4e8','#ffe6a8','#b8b0a8','#ffd1c4'];
const pick=a=>a[Math.floor(Math.random()*a.length)];
function bestKey(){return 'kitten-sweeper-best-'+level}
function showBest(){let b=null;try{b=localStorage.getItem(bestKey())}catch(e){}bestEl.textContent=b?'best: '+b+'s':''}
function newGame(){
  clearInterval(timer);const L=LEVELS[level];
  g={c:L.c,r:L.r,m:L.m,cells:[],started:false,over:false,flags:0,opened:0,t:0};
  for(let i=0;i<g.c*g.r;i++)g.cells.push({mine:false,open:false,flag:false,n:0});
  boardEl.style.setProperty('--cols',g.c);boardEl.innerHTML='';
  g.cells.forEach((cell,i)=>{
    const b=document.createElement('button');b.className='cell';b.type='button';b.setAttribute('role','gridcell');b.setAttribute('aria-label','hidden tile');
    b.addEventListener('click',()=>tap(i));
    b.addEventListener('contextmenu',e=>{e.preventDefault();toggleFlag(i)});
    let lp=null,fired=false;
    b.addEventListener('touchstart',()=>{fired=false;lp=setTimeout(()=>{fired=true;if(navigator.vibrate)navigator.vibrate(15);toggleFlag(i)},380)},{passive:true});
    const end=e=>{clearTimeout(lp);if(fired&&e.cancelable)e.preventDefault()};
    b.addEventListener('touchend',end);b.addEventListener('touchmove',()=>clearTimeout(lp),{passive:true});
    cell.el=b;boardEl.appendChild(b);
  });
  faceEl.innerHTML=catSVG('happy');timeEl.textContent='0';leftEl.textContent=g.m;
  msgEl.textContent='tap to sweep. hold or use flag mode to drop a fish on a sus tile.';showBest();
}
function nb(i){const x=i%g.c,y=(i-x)/g.c,out=[];
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(nx>=0&&ny>=0&&nx<g.c&&ny<g.r)out.push(ny*g.c+nx)}return out}
function place(safe){
  const ban=new Set([safe,...nb(safe)]);let p=0;
  while(p<g.m){const i=Math.floor(Math.random()*g.cells.length);if(ban.has(i)||g.cells[i].mine)continue;g.cells[i].mine=true;p++}
  g.cells.forEach((c,i)=>c.n=nb(i).filter(j=>g.cells[j].mine).length);
}
function render(i){
  const c=g.cells[i],el=c.el;el.className='cell';el.textContent='';
  if(c.open){el.classList.add('open');
    if(c.mine){el.innerHTML=catSVG('grumpy',FUR[i%FUR.length]);el.classList.add('boom')}
    else if(c.n){el.textContent=c.n;el.classList.add('n'+c.n);el.setAttribute('aria-label',c.n+' nearby')}
    else el.setAttribute('aria-label','empty');
  }else if(c.flag){el.innerHTML=fishSVG();el.setAttribute('aria-label','flagged')}
  else el.setAttribute('aria-label','hidden tile');
}
function startTimer(){g.started=true;g.t0=Date.now();timer=setInterval(()=>{g.t=Math.floor((Date.now()-g.t0)/1000);timeEl.textContent=g.t},250)}
function tap(i){
  if(g.over)return;const c=g.cells[i];
  if(flagMode&&!c.open){toggleFlag(i);return}
  if(c.open){chord(i);return}
  if(c.flag)return;
  if(!g.started){place(i);startTimer()}
  reveal(i);check();
}
function reveal(i){
  const stack=[i];
  while(stack.length){const k=stack.pop(),c=g.cells[k];
    if(c.open||c.flag)continue;c.open=true;g.opened++;
    if(c.mine){lose(k);return}
    render(k);if(c.n===0)nb(k).forEach(j=>stack.push(j));}
}
function chord(i){
  const c=g.cells[i];if(!c.n)return;const ns=nb(i);
  if(ns.filter(j=>g.cells[j].flag).length!==c.n)return;
  ns.forEach(j=>{if(!g.over)reveal(j)});check();
}
function toggleFlag(i){
  if(g.over)return;const c=g.cells[i];if(c.open)return;
  c.flag=!c.flag;g.flags+=c.flag?1:-1;leftEl.textContent=g.m-g.flags;render(i);
}
function check(){
  if(g.over)return;
  if(g.opened===g.cells.length-g.m){
    g.over=true;clearInterval(timer);faceEl.innerHTML=catSVG('love','#ffd1e8');
    g.cells.forEach((c,i)=>{if(c.mine){c.flag=false;c.el.innerHTML=catSVG('love',FUR[i%FUR.length]);c.el.className='cell open win'}});leftEl.textContent=0;
    const t=Math.floor((Date.now()-g.t0)/1000);timeEl.textContent=t;
    let note='';try{const b=+localStorage.getItem(bestKey());if(!b||t<b){localStorage.setItem(bestKey(),t);note=' new best!!'}}catch(e){}
    msgEl.textContent=pick(WIN)+note;showBest();
  }
}
function lose(hit){
  g.over=true;clearInterval(timer);faceEl.innerHTML=catSVG('sad','#c9c3ff');
  g.cells.forEach((c,i)=>{
    if(c.mine&&!c.flag){c.open=true;render(i);if(i===hit)c.el.classList.add('boom');else c.el.classList.remove('boom')}
    else if(!c.mine&&c.flag){c.el.classList.add('wrong');c.el.innerHTML=crossSVG()}
  });
  render(hit);boardEl.classList.add('shake');setTimeout(()=>boardEl.classList.remove('shake'),400);
  msgEl.textContent=pick(LOSE);
}
faceEl.addEventListener('click',newGame);
modeEl.addEventListener('click',()=>{flagMode=!flagMode;modeEl.setAttribute('aria-pressed',flagMode);modeEl.querySelector('b').textContent=flagMode?'on':'off'});
document.querySelectorAll('.levels button').forEach(b=>b.addEventListener('click',()=>{
  level=b.dataset.level;document.querySelectorAll('.levels button').forEach(x=>x.classList.toggle('on',x===b));newGame()}));
newGame();
})();

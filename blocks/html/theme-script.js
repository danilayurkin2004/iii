// Runs before CSS so the saved/system theme is applied before the first paint.
(()=>{
  const key='lifeline-theme',root=document.documentElement;
  const system=window.matchMedia('(prefers-color-scheme: dark)');
  let preference='system';
  try{const saved=localStorage.getItem(key);if(['light','dark','system'].includes(saved))preference=saved;}catch{}
  const resolved=()=>preference==='system'?(system.matches?'dark':'light'):preference;
  function sync(){const dark=resolved()==='dark';
    for(const button of document.querySelectorAll('[data-theme-toggle]')){
      button.setAttribute('aria-pressed',String(dark));
      button.setAttribute('aria-label',dark?'Включить светлую тему':'Включить ночную тему');
      button.title=dark?'Светлая тема':'Ночная тема';
      button.querySelector('[data-theme-icon]').textContent=dark?'☀':'☾';
      button.querySelector('[data-theme-label]').textContent=dark?'Дневная':'Ночная';
    }
    for(const select of document.querySelectorAll('[data-theme-preference]'))select.value=preference;
  }
  function apply(){const theme=resolved();root.dataset.theme=theme;root.style.colorScheme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#142019':'#f5f5f0');sync();}
  function set(value){if(!['light','dark','system'].includes(value))return;preference=value;try{localStorage.setItem(key,value);}catch{}apply();}
  window.LifelineTheme={sync,set,get preference(){return preference;}};
  apply();
  document.addEventListener('click',event=>{if(event.target.closest('[data-theme-toggle]'))set(resolved()==='dark'?'light':'dark');});
  document.addEventListener('change',event=>{if(event.target.matches('[data-theme-preference]'))set(event.target.value);});
  document.addEventListener('DOMContentLoaded',sync,{once:true});
  window.addEventListener('storage',event=>{if(event.key!==key&&event.key!==null)return;preference=['light','dark','system'].includes(event.newValue)?event.newValue:'system';apply();});
  const changed=()=>{if(preference==='system')apply();};
  if(system.addEventListener)system.addEventListener('change',changed);else system.addListener(changed);
})();
<style>/* Shared palette: theme switching changes variables, never rewrites the page. */

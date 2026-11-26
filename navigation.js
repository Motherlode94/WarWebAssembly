const pages=[...document.querySelectorAll('#page-content > section')];
const links=[...document.querySelectorAll('a[href^="#"]')];
const ids=new Set(pages.map(p=>p.id));
function route(){const requested=location.hash.slice(1),id=ids.has(requested)?requested:'home';for(const page of pages)page.hidden=page.id!==id;for(const link of links){if(link.getAttribute('href')==='#'+id)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}document.title=(pages.find(p=>p.id===id)?.querySelector('h1,h2')?.textContent||'Accueil')+' — WarWebAssembly';window.scrollTo(0,0);}
for(const link of links)link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1);if(!ids.has(id)||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();if(location.hash!=='#'+id)history.pushState(null,'','#'+id);route();});
window.addEventListener('popstate',route);window.addEventListener('hashchange',route);route();

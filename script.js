const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.textContent=open?'×':'☰'});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='☰'}));
const modal=document.querySelector('.video-modal');
const modalVideo=modal?.querySelector('video');
document.querySelectorAll('.play-video').forEach(button=>button.addEventListener('click',()=>{if(!modal||!modalVideo)return;modalVideo.src=button.dataset.video;modal.classList.add('open');modal.setAttribute('aria-hidden','false');modalVideo.play().catch(()=>{});}));
function closeVideo(){if(!modal||!modalVideo)return;modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
modal?.querySelector('.video-close')?.addEventListener('click',closeVideo);
modal?.addEventListener('click',e=>{if(e.target===modal)closeVideo();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVideo();});

document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  menuToggle?.addEventListener('click',()=>{
    if(!nav) return;
    const isOpen=nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded','false');
    menuToggle?.setAttribute('aria-label','Abrir menu');
  }));

  const modal=document.querySelector('.video-modal');
  const modalVideo=modal?.querySelector('video');
  let videoHistoryOpen=false;

  function closeVideo(fromPopstate=false){
    if(!modal||!modalVideo||!modal.classList.contains('open')) return;
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.muted=false;
    modalVideo.load();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(!fromPopstate && videoHistoryOpen){
      videoHistoryOpen=false;
      history.back();
    } else {
      videoHistoryOpen=false;
    }
  }

  document.querySelectorAll('.play-video').forEach(button=>button.addEventListener('click',()=>{
    if(!modal||!modalVideo)return;
    modalVideo.src=button.dataset.video;
    modalVideo.muted=button.dataset.muted==='true';
    if(button.dataset.muted==='true'){ modalVideo.volume=0; modalVideo.defaultMuted=true; } else { modalVideo.volume=1; modalVideo.defaultMuted=false; }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    history.pushState({rafaVideo:true},'',location.href);
    videoHistoryOpen=true;
    modalVideo.play().catch(()=>{});
  }));
  modal?.querySelector('.video-close')?.addEventListener('click',()=>closeVideo());
  modal?.addEventListener('click',e=>{if(e.target===modal)closeVideo();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVideo();});
  window.addEventListener('popstate',()=>{if(modal?.classList.contains('open'))closeVideo(true);});
});

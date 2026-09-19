// Cambiá únicamente estas rutas para actualizar todas las fotos de la presentación.
const images = { portada:"images/portada.png", materiales:"images/materiales.jpg", practica:"images/practica.jpeg", guirnalda:"images/guirnalda.jpg", montaje:"images/montaje.png", resultado:"images/montaje.png", happydeco:"images/HAPPYDECO.jpeg", eventosSociales:"images/eventos sociales.jpeg", ambientacionesTematicas:"images/ambientaciones tematicas.jpeg", montajesPersonalizados:"images/montajes personalizado.jpeg" };
document.querySelectorAll('[data-image]').forEach(box=>{const image=new Image();image.onload=()=>{box.classList.add('has-image');box.style.backgroundImage=`url("${images[box.dataset.image]}")`};image.src=images[box.dataset.image]});
const slides=[...document.querySelectorAll('.slide')],counter=document.querySelector('#counter'),bar=document.querySelector('#progress');let current=0;
function show(index){
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,position)=>{
    const visible=position===current;
    slide.classList.toggle('active',visible);
    slide.hidden=!visible;
    slide.setAttribute('aria-hidden',String(!visible));
  });
  counter.textContent=`${current+1} / ${slides.length}`;
  bar.style.width=`${(current+1)/slides.length*100}%`;
  history.replaceState(null,'',`#${current+1}`);
}
document.querySelector('#next').addEventListener('click',()=>show(current+1));
document.querySelector('#prev').addEventListener('click',()=>show(current-1));
document.querySelector('#present').addEventListener('click',()=>document.documentElement.requestFullscreen?.());
document.addEventListener('keydown',event=>{if(['ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();show(current+1)}else if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();show(current-1)}else if(event.key==='Home')show(0);else if(event.key==='End')show(slides.length-1)});
window.addEventListener('hashchange',()=>show(Math.max(0,Number(location.hash.slice(1))-1)));
let startX;document.addEventListener('touchstart',event=>startX=event.changedTouches[0].screenX);document.addEventListener('touchend',event=>{const delta=event.changedTouches[0].screenX-startX;if(Math.abs(delta)>45)show(current+(delta<0?1:-1))});
show(Math.max(0,Number(location.hash.slice(1))-1));

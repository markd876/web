(()=>{"use strict";let e=[];const n=["C","D","H","S"],t=["J","Q","K","A"];let r=0,c=0,a=100,s=0;const i=document.querySelector("#btnPedir"),o=document.querySelector("#btnDetener"),d=document.querySelector("#btnNuevo"),l=document.querySelectorAll("small"),u=document.querySelector("#mas5"),m=document.querySelector("#mas10"),T=document.querySelector("#mas20"),x=document.querySelector("#por2"),p=document.querySelector("#menos5"),q=document.querySelector("#menos10"),y=document.querySelector("#menos20"),E=document.querySelector("#entre2"),L=document.querySelector("#reiniciar"),S=document.querySelector("#allin"),b=document.querySelector("#jugador-cartas"),f=document.querySelector("#computadora-cartas");l[1].innerText=a,l[0].innerText=s;const k=()=>{for(let t=2;t<=10;t++)for(let r of n)e.push(t+r);for(let r of n)for(let n of t)e.push(n+r);e=_.shuffle(e)};k();const v=()=>{if(0===e.length)throw"No hay mas cartas en el deck";return e.pop()};v();const g=e=>{const n=e.substring(0,e.length-1);return isNaN(n)?"A"===n?11:10:1*n},h=e=>{do{const n=v();c+=g(n),l[3].innerText=c;const t=document.createElement("img");if(t.src=`assets/cartas/${n}.png`,t.classList.add("carta"),f.append(t),e>21){console.warn("Perdiste"),a-=s,l[1].innerText=a;break}c>21?(console.warn("Ganaste!"),a+=s,l[1].innerText=a):c>r?(console.warn("Perdiste"),a-=s,l[1].innerText=a):c===r&&console.warn("Empate")}while(c<e&&e<=21)};g(v());i.addEventListener("click",()=>{if(a<=0)return alert("Estas en bancarrota bro, no puedes jugar mas"),!1;if(s>a)return alert("No puedes apostar mas de lo que tienes"),!1;if(0===s&&a>0)return alert("Debes hacer una apuesta"),!1;const e=v();r+=g(e),l[2].innerText=r;const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),b.append(n),r>21?(i.disabled=!0,o.disabled=!0,h(r)):21===r&&(i.disabled=!0,o.disabled=!0,h(r))}),o.addEventListener("click",()=>{if(i.disabled=!0,o.disabled=!0,0===r)return console.warn("No pediste ninguna carta"),!1;h(r)}),d.addEventListener("click",()=>{e=[],k(),r=0,c=0,l[2].innerText=r,l[3].innerText=c,f.innerHTML="",b.innerHTML="",i.disabled=!1,o.disabled=!1,l[1].innerText=a,s=0,l[0].innerText=s}),u.addEventListener("click",()=>{s+=5,l[0].innerText=s}),m.addEventListener("click",()=>{s+=10,l[0].innerText=s}),T.addEventListener("click",()=>{s+=20,l[0].innerText=s}),x.addEventListener("click",()=>{s*=2,l[0].innerText=s}),p.addEventListener("click",()=>{s-=5,l[0].innerText=s}),q.addEventListener("click",()=>{s-=10,l[0].innerText=s}),y.addEventListener("click",()=>{s-=20,l[0].innerText=s}),E.addEventListener("click",()=>{s/=2,l[0].innerText=s}),L.addEventListener("click",()=>{s=0,l[0].innerText=s}),S.addEventListener("click",()=>{s=a,l[0].innerText=s})})();
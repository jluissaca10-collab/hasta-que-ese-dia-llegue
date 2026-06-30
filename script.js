/* =========================================================
   CONFIGURACIÓN — CONTRASEÑAS REALES
   ========================================================= */

const FECHA_DIA_CERO = new Date(2026, 6, 11, 0, 0, 0); // mes 6 = julio

const DIAS = [
  { id:0,  fecha:"2026-06-29", etiqueta:"Introducción", fechaTexto:"30 jun", type:"intro", noPass:true,
    files:["introduccion1.jpg.PNG","introduccion2.jpg.PNG","introduccion3.jpg.PNG"] },

  { id:1,  fecha:"2026-06-29", etiqueta:"Día -10", fechaTexto:"1 jul",  type:"image", files:["dia10.jpg.PNG"], pass:"2023" },
  { id:2,  fecha:"2026-06-29", etiqueta:"Día -9",  fechaTexto:"2 jul",  type:"image", files:["dia9.jpg.PNG"],  pass:"Medellin" },
  { id:3,  fecha:"2026-06-29", etiqueta:"Día -8",  fechaTexto:"3 jul",  type:"image", files:["dia8.jpg.PNG"],  pass:"Blanco" },
  { id:4,  fecha:"2026-06-29", etiqueta:"Día -7",  fechaTexto:"4 jul",  type:"video", files:["dia7.MP4"],      pass:"Pintando" },
  { id:5,  fecha:"2026-06-29", etiqueta:"Día -6",  fechaTexto:"5 jul",  type:"image", files:["dia6.jpg.PNG"],  pass:"Calentado" },
  { id:6,  fecha:"2026-06-29", etiqueta:"Día -5",  fechaTexto:"6 jul",  type:"image", files:["dia5.jpg.PNG"],  pass:"Sammy Juice Chick" },
  { id:7,  fecha:"2026-06-29", etiqueta:"Día -4",  fechaTexto:"7 jul",  type:"video", files:["dia7.mp4"],      pass:"Broncoffee" },
  { id:8,  fecha:"2026-06-29", etiqueta:"Día -3",  fechaTexto:"8 jul",  type:"image", files:["dia3.jpg.PNG"],  pass:"02/05/2026" },
  { id:9,  fecha:"2026-06-29", etiqueta:"Día -2",  fechaTexto:"9 jul",  type:"image", files:["dia2.jpg.PNG"],  pass:"Real Madrid" },
  { id:10, fecha:"2026-06-29", etiqueta:"Día -1",  fechaTexto:"10 jul", type:"image", files:["dia1.jpg.PNG"],  pass:"The devil wears prada 2" },
  { id:11, fecha:"2026-06-29", etiqueta:"Día 0",   fechaTexto:"11 jul", type:"image", files:["dia0.jpg.PNG"],  pass:"Rehobot" },
];

/* =========================================================
   LÓGICA
   ========================================================= */
const $ = (s)=>document.querySelector(s);

function hoyISO(){
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;
}
function estaDisponible(dia){
  return dia.fecha <= hoyISO();
}

/* ---- Pantalla de bienvenida ---- */
$("#enterBtn").addEventListener("click", ()=>{
  $("#welcome").classList.remove("active");
  $("#main").classList.add("active");
  renderEnvelopes();
});

/* ---- Contador ---- */
function tick(){
  const ahora = new Date();
  let diff = FECHA_DIA_CERO - ahora;
  const lbl = $("#countdown-label");
  if(diff <= 0){
    $("#cd-days").textContent="00";$("#cd-hours").textContent="00";
    $("#cd-mins").textContent="00";$("#cd-secs").textContent="00";
    lbl.textContent = "Ese día por fin llegó ❤";
    return;
  }
  const d=Math.floor(diff/86400000); diff-=d*86400000;
  const h=Math.floor(diff/3600000);  diff-=h*3600000;
  const m=Math.floor(diff/60000);    diff-=m*60000;
  const s=Math.floor(diff/1000);
  $("#cd-days").textContent=String(d).padStart(2,"0");
  $("#cd-hours").textContent=String(h).padStart(2,"0");
  $("#cd-mins").textContent=String(m).padStart(2,"0");
  $("#cd-secs").textContent=String(s).padStart(2,"0");
  lbl.textContent="Faltan para el día 0";
}
setInterval(tick,1000); tick();

/* ---- Render de sobres ---- */
function renderEnvelopes(){
  const cont = $("#envelopes");
  cont.innerHTML="";
  DIAS.forEach((dia,i)=>{
    const disp = estaDisponible(dia);
    const el = document.createElement("div");
    el.className = "envelope " + (disp ? "available" : "locked");
    el.style.animationDelay = (i*0.05)+"s";
    el.innerHTML = `
      <div class="flap"></div>
      <div class="seal">❤</div>
      <div class="day-label">${dia.etiqueta}</div>
      <div class="day-date">${dia.fechaTexto}</div>
    `;
    if(disp){
      el.addEventListener("click", ()=>abrirSobre(dia));
    }else{
      el.addEventListener("click", ()=>{
        el.animate(
          [{transform:"translateX(0)"},{transform:"translateX(-5px)"},
           {transform:"translateX(5px)"},{transform:"translateX(0)"}],
          {duration:300}
        );
      });
    }
    cont.appendChild(el);
  });
}

/* ---- Abrir sobre ---- */
let diaActual = null;

function abrirSobre(dia){
  diaActual = dia;
  if(dia.noPass){
    mostrarContenido(dia);
  }else{
    abrirPass(dia);
  }
}

/* ---- Modal de contraseña ---- */
function abrirPass(dia){
  $("#passTitle").textContent = dia.etiqueta;
  $("#passInput").value="";
  $("#passError").textContent="";
  abrirModal("passModal");
  setTimeout(()=>$("#passInput").focus(),200);
}

$("#passSubmit").addEventListener("click", validarPass);
$("#passInput").addEventListener("keydown",(e)=>{ if(e.key==="Enter") validarPass(); });

function validarPass(){
  if(!diaActual) return;
  const val = $("#passInput").value.trim();
  if(val === diaActual.pass){
    cerrarModal("passModal");
    mostrarContenido(diaActual);
  }else{
    $("#passError").textContent = "Contraseña incorrecta. Inténtalo de nuevo.";
    $("#passInput").focus();
  }
}

/* ---- Modal de contenido ---- */
let introIndex = 0;

function mostrarContenido(dia){
  const body = $("#contentBody");
  const controls = $("#introControls");
  body.innerHTML="";
  controls.classList.remove("show");

  if(dia.type === "video"){
    const v = document.createElement("video");
    v.src = dia.files[0];
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    body.appendChild(v);

  }else if(dia.type === "intro"){
    introIndex = 0;
    controls.classList.add("show");
    renderIntro(dia);

  }else{
    const img = document.createElement("img");
    img.src = dia.files[0];
    img.alt = dia.etiqueta;
    body.appendChild(img);
  }

  abrirModal("contentModal");
}

function renderIntro(dia){
  const body = $("#contentBody");
  body.innerHTML="";
  const img = document.createElement("img");
  img.src = dia.files[introIndex];
  img.alt = "Introducción "+(introIndex+1);
  body.appendChild(img);
  $("#introCounter").textContent = `${introIndex+1} / ${dia.files.length}`;
  $("#introNext").textContent = (introIndex === dia.files.length-1) ? "Volver al menú" : "Siguiente";
}

$("#introNext").addEventListener("click", ()=>{
  if(!diaActual || diaActual.type!=="intro") return;
  if(introIndex < diaActual.files.length-1){
    introIndex++;
    renderIntro(diaActual);
  }else{
    cerrarModal("contentModal");
  }
});

/* ---- Utilidades de modal ---- */
function abrirModal(id){ document.getElementById(id).classList.add("open"); }
function cerrarModal(id){
  const m = document.getElementById(id);
  m.classList.remove("open");
  if(id==="contentModal") $("#contentBody").innerHTML="";
}
document.querySelectorAll("[data-close]").forEach(btn=>{
  btn.addEventListener("click", ()=>cerrarModal(btn.dataset.close));
});
document.querySelectorAll(".modal").forEach(m=>{
  m.addEventListener("click",(e)=>{ if(e.target===m) cerrarModal(m.id); });
});

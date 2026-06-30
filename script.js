const inicio=new Date("2026-06-30");

const cartas=[

{
nombre:"Introducción",
fecha:0,
password:"intro",
imagen:"cartas/introduccion.jpg"
},

{
nombre:"Día -10",
fecha:1,
password:"dia10",
imagen:"cartas/dia10.jpg"
},

{
nombre:"Día -9",
fecha:2,
password:"dia9",
imagen:"cartas/dia9.jpg"
},

{
nombre:"Día -8",
fecha:3,
password:"dia8",
imagen:"cartas/dia8.jpg"
},

{
nombre:"Día -7",
fecha:4,
password:"dia7",
imagen:"cartas/dia7.jpg"
},

{
nombre:"Día -6",
fecha:5,
password:"dia6",
imagen:"cartas/dia6.jpg"
},

{
nombre:"Día -5",
fecha:6,
password:"dia5",
imagen:"cartas/dia5.jpg"
},

{
nombre:"Día -4",
fecha:7,
password:"dia4",
imagen:"cartas/dia4.jpg"
},

{
nombre:"Día -3",
fecha:8,
password:"dia3",
imagen:"cartas/dia3.jpg"
},

{
nombre:"Día -2",
fecha:9,
password:"dia2",
imagen:"cartas/dia2.jpg"
},

{
nombre:"Día -1",
fecha:10,
password:"dia1",
imagen:"cartas/dia1.jpg"
},

{
nombre:"Día 0",
fecha:11,
password:"final",
video:"cartas/final.mp4"
}

];

const sobres=document.getElementById("sobres");

const hoy=new Date();

const dias=Math.floor((hoy-inicio)/86400000);

document.getElementById("contador").innerHTML=
dias<11?
"Faltan "+(11-dias)+" días ❤️":
"Hoy es ese día ❤️";

cartas.forEach((c,i)=>{

let div=document.createElement("div");

div.className="sobre";

div.innerHTML="💌 "+c.nombre;

div.onclick=()=>seleccionar(i);

sobres.appendChild(div);

});

let actual;

function seleccionar(i){

actual=i;

document.getElementById("password").value="";

document.getElementById("mensaje").innerHTML="";

document.getElementById("imagenCarta").style.display="none";

document.getElementById("videoCarta").style.display="none";

document.getElementById("tituloCarta").innerHTML=cartas[i].nombre;

if(dias<cartas[i].fecha){

document.getElementById("mensaje").innerHTML="Todavía no... vuelve mañana ❤️";

}else{

document.getElementById("mensaje").innerHTML="";

}

document.getElementById("modal").style.display="block";

}

function abrirCarta(){

if(dias<cartas[actual].fecha)return;

if(document.getElementById("password").value!=cartas[actual].password){

alert("Contraseña incorrecta");

return;

}

if(cartas[actual].imagen){

let img=document.getElementById("imagenCarta");

img.src=cartas[actual].imagen;

img.style.display="block";

}

if(cartas[actual].video){

let v=document.getElementById("videoCarta");

v.src=cartas[actual].video;

v.style.display="block";

}

}

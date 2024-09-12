// Variables
const toggleBtn = document.getElementById('btn-reportes');
const card = document.getElementById('seccion-reportes');
const balance = document.getElementById('seccion-balance');
const operaciones = document.getElementById('seccion-operaciones');
const filtros = document.getElementById ('seccion-filtros');
const resumenReportes = document.getElementById ('reporteResumen');
const reporteCategorías = document.getElementById ('reporteCategorías');
const reporteMes = document.getElementById ('reporteMes');


// Mostrar solo reportes //
toggleBtn.addEventListener('click', function () {
  card.classList.remove('hidden');
  balance.classList.add('hidden'); 
  operaciones.classList.add('hidden');
  filtros.classList.add('hidden');
});

// //Reportes sin operaciones//
 toggleBtn.addEventListener('click', function (){
    resumenReportes.classList.add('hidden');
    reporteCategorías.classList.add('hidden');
    reporteMes.classList.add('hidden');
});


// BTN NUEVA OPERACION - ENRUTADO - HIDDEN //
const operacion = document.getElementById('seccion-operacion');
const reportes = document.getElementById('seccion-reportes');
const nuevaOperacionBtn = document.getElementById('btn-nueva-operacion'); 
const seccionOperacion = document.getElementById('seccion-operacion'); 
const seccionOperaciones = document.getElementById('seccion-operaciones'); 

nuevaOperacionBtn.addEventListener('click', function () {
    operacion.classList.remove('hidden'); 
    balance.classList.add('hidden');       
    reportes.classList.add('hidden');     
    filtros.classList.add('hidden');       
    seccionOperacion.classList.remove('hidden'); 
    seccionOperaciones.classList.add('hidden');  
  });

 /*btn categorias*/
 const toggleCategoriasBtn = document.getElementById('btn-categorias');
 const seccionCategorias = document.getElementById('seccion-categorias');
 
 /*btn que solo muestra categorias*/
 toggleCategoriasBtn.addEventListener('click', function () {
   seccionCategorias.classList.remove('hidden'); 
   balance.classList.add('hidden');
   operaciones.classList.add('hidden'); 
   filtros.classList.add('hidden'); 
 });
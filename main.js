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

